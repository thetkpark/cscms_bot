const axios = require('axios')
require('dotenv').config()

async function getCurrentWeather(){
    const url = `http://dataservice.accuweather.com/currentconditions/v1/3558717?apikey=${process.env.WEATHER_API_KEY}`
    const {data} = await axios.get(url)
    const temp = data[0].Temperature.Metric
    return `Time: ${data[0].LocalObservationDateTime}\n🌡 Temperatur: ${temp.Value}℃\n💦 Precipitation: ${data[0].HasPrecipitation}\n⛅️ Description: ${data[0].WeatherText}`
    
}
module.exports = {
    getCurrentWeather
}