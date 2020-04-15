//Getting data and place  it
const sectors = ['северный', 'северо-восточный', 'восточный', 'юго-восточный', 'южный', 'юго-западный', 'западный', 'северо-западный', 'северный']; 
const time_day = ["Утром: ", "Днём: ", "Вечером: ", "Ночью: "];
const months = ['января', 'февраля', 'марта', 'апреля','мая', 'июня', 'июля', 'августа','сентября'];
const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда','Четверг', 'Пятница', 'Суббота'];

let afterStr = "&deg;<br>";
let NowDate = new Date();
let weatherIcon = document.createElement('img');
    


function addTo(add, to, newProperty, removeProperty){
    let div = document.createElement('div');
    div.className = add;
    if(newProperty != null){
        div.classList.add(newProperty);
    }
    if(removeProperty != 0){
        div.classList.remove(removeProperty);
    }
    document.querySelector(to).append(div.cloneNode(true));
}





for (let i = 0; i < 7; i++){
    addTo(`day${i}`, '.Week', 'day');
}


// Определение геолокации 


if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=ru&appid=04a8f926516de8567795579044b734ab`)
            .then(function (resp) { return resp.json() })
            .then(function (data) { 
                for(let i = 0; i < 7; i++){
    
                    addTo(`day${i}Head`, `.day${i}`);
    
                    document.querySelector(`.day${i}Head`).innerHTML += (`${days[((NowDate.getDay() + i) % 7)]} ${(NowDate.getDate() + i)} ${months[(NowDate.getMonth() % 12)]}<br>`);
                    document.querySelector(`.day${i}Head`).innerHTML += ((`${data.daily[i].weather[0].description}`).charAt(0).toUpperCase() + (`${data.daily[i].weather[0].description}<br><br>`).slice(1));

                    addTo(`day${i}Body`, `.day${i}`, 'dayFlex');
                    addTo(`dayText${i}`, `.day${i}Body`);

                    document.querySelector(`.dayText${i}`).innerHTML += (time_day[0] + Math.round(data.daily[i].temp.day - 273) + afterStr);
                    document.querySelector(`.dayText${i}`).innerHTML += (time_day[1] + Math.round(data.daily[i].temp.morn - 273) + afterStr);
                    document.querySelector(`.dayText${i}`).innerHTML += (time_day[2] + Math.round(data.daily[i].temp.eve - 273) + afterStr);
                    document.querySelector(`.dayText${i}`).innerHTML += (time_day[3] + Math.round(data.daily[i].temp.night - 273) + afterStr);

                    addTo(`dayIcon${i}`, `.day${i}Body`);
    
                    weatherIcon.classList.add("weatherIcon1");
                    weatherIcon.src = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`;
                    document.querySelector(`.dayIcon${i}`).append(weatherIcon.cloneNode(true));
                }
    

//Блок погоды на сегодня

                addTo('CurrentDayUp', '.Today', null, 'day');
    
                document.querySelector('.CurrentDayUp').innerHTML += (`<h4>Сегодня ${data.current.weather[0].description}`);
    
                addTo('CurrentDayDown', '.Today', 'CurrentDayDown')
                addTo('Today_Right', '.CurrentDayDown')
                addTo('CurrentDayDownLeft', '.CurrentDayDown')
    



                document.querySelector('.Today_Right').innerHTML += (`Температура: ${Math.round(data.current.temp - 273)}&deg;<br>`);
                document.querySelector('.Today_Right').innerHTML += (`Ощущается как: ${Math.round(data.current.feels_like - 273)}&deg;<br>`);
                document.querySelector('.Today_Right').innerHTML += (`Давление: ${Math.round(data.current.pressure/1.333)} мм рт. ст.<br>`);
                document.querySelector('.Today_Right').innerHTML += (`Влажность: ${data.current.humidity} %<br>`);
                document.querySelector('.Today_Right').innerHTML += (`Ветер: ${sectors[Math.round(data.current.wind_deg/45)]} ${data.current.wind_speed} м/с<br>`);
     


//иконки погоды
                weatherIcon.classList.remove("weatherIcon1");
                weatherIcon.classList.add("weatherIcon0");
                weatherIcon.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
                document.querySelector(`.CurrentDayDownLeft`).append(weatherIcon.cloneNode(true));
            }); 
    });     
}   