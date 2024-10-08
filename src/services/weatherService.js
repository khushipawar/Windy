import { DateTime } from "luxon";

const API_KEY = "5718610ce1ae9a5a695cf85e9d5cffbc";
const BASE_URL ="https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType,searchParams) =>{
    const url = new URL (BASE_URL + "/"+infoType);

    url.search = new URLSearchParams({
        ...searchParams, appid:API_KEY
    });

    return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) =>{
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
        timezone:timezone,
      } = data;

      const { main: details, icon } = weather[0];

      return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        dt,
        country,
        sunrise,
        sunset,
        details,
        icon,
        speed,
       timezone
      };

};


const formatForecastWeather  = (data) => {
let  {timezone,daily,hourly} = data;
daily = daily?.slice(1,6).map(d =>{
    return {
        title: formatToLocalTime(d.dt,timezone,'ccc'),
        temp:d.temp.day,
        icon:d.weather[0].icon

    }
});

hourly =  hourly?.slice().map(d =>{
    return {
        title: formatToLocalTime(d.dt,timezone,'hh:mm a'),
        temp:d.temp,
        icon:d.weather[0].icon

    }
});

return {timezone,daily,hourly};
};
const getFormattedWeatherData = async(searchParams) =>{
const formattedCurrentWeather = await getWeatherData('weather',searchParams)
.then(formatCurrentWeather);
// console.log(formattedCurrentWeather);
const {lat,lon} = formattedCurrentWeather;

const formattedForecastWeather = await getWeatherData('forecast',{lat,lon,exclude: 'current,minutely,alerts',units:searchParams.units}).then(formatForecastWeather);



return {...formattedCurrentWeather,...formattedForecastWeather};
};


const formatToLocalTime = (secs,timezone,format = "cccc,dd LLL yyyy' |Local time:'hh:mm a") => DateTime.fromSeconds(secs).setZone(timezone).toFormat(format);
console.log(formatToLocalTime)

const iconURLFromCode = (code)=>` https://openweathermap.org/img/wn/${code}@2x.png`;
export default getFormattedWeatherData;

export {formatToLocalTime,iconURLFromCode};