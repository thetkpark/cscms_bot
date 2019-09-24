const axios = require('axios')
const { convertTime, getTime } = require('./Time')
require('dotenv').config()

async function getCurrentWeather(){
    const lat = 13.63
    const long = 100.51
    const url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${lat},${long}?units=si`
    try{
        const {data} = await axios.get(url)
        const currently = data.currently;
        return `Time: ${getTime()}\n🌡 Temperature: ${currently.temperature}℃\n🥵 Feel likes: ${currently.apparentTemperature}\n💦 Humidity: ${currently.humidity}\n🌧 Precipitation: ${currently.precipProbability*100}%\n🌞 UV Index: ${currently.uvIndex}\n⛅️ Summary: ${currently.summary}`
    }
    catch(err){
        return `🙀 Failed to get weather data. ${err.response.data.Message}`
    }
    
}
getCurrentWeather().then(res => console.log(res))

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
        return `Time: ${convertTime(pollution.ts)}\n💨 AQI: ${pollution.aqius} -> ${status}`
    }
    catch(err){
        return `💥 Failed to get pollution data. ${err.response.data.data.message}`
    }
}

module.exports = {
    getCurrentWeather,
    getPollution
}