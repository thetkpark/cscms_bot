const axios = require('axios')
const { convertTime } = require('./Time')
require('dotenv').config()

async function getCurrentWeather(){
    const url = `http://dataservice.accuweather.com/currentconditions/v1/3558717?apikey=${process.env.WEATHER_API_KEY}`
    try{
        const {data} = await axios.get(url)
        const temp = data[0].Temperature.Metric
        return `Time: ${convertTime(data[0].LocalObservationDateTime)}\n🌡 Temperatur: ${temp.Value}℃\n💦 Precipitation: ${data[0].HasPrecipitation}\n⛅️ Description: ${data[0].WeatherText}`
    }
    catch(err){
        return `🙀 Failed to get weather data. ${err.response.data.Message}`
    }
    
}

async function getPollution() {
    const url = `http://api.airvisual.com/v2/nearest_city?lat=13.650234&lon=100.496855&key=${process.env.AIR_VISUAL_API_KEY}`
    try{
        const {data} = await axios.get(url)
        const pollution = data.data.current.pollution
        let status
        if(pollution.aqius>=301) status = '☠️Hazardous☠️'
        else if(pollution.aqius>=201) status = 'Very Unhealthy 🤮'
        else if(pollution.aqius>=151) status = 'Unhealthy 😷'
        else if(pollution.aqius>=101) status = 'Unhealthy for Sensitive Groups 🤧'
        else if(pollution.aqius>=51) status = 'Moderate 😫'
        else if(pollution.aqius>=0) status = 'Good ☺️'
        return `Time: ${convertTime(pollution.ts)}\n💨 AQI: ${pollution.aqius}\n👀 Status: ${status}`
    }
    catch(err){
        return `💥 Failed to get pollution data. ${err.response.data.data.message}`
    }
}

getPollution()
module.exports = {
    getCurrentWeather,
    getPollution
}