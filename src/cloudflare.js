const axios = require('axios')
const { convertTime, getTime, getISOTime } = require('./Time')
require('dotenv').config()

const config = {
    headers: {'Authorization': "Bearer " + process.env.CFTOKEN}
}




async function getAnalysis(hour) {
    const time = getISOTime(hour)
    const url = `https://api.cloudflare.com/client/v4/zones/${process.env.CFZONEID}/analytics/dashboard?since=${time.since}&until=${time.now}&continuous=true`
    try{
        const {data} = await axios.get(url, config)
        const sslPercentage = Math.round(data.result.totals.requests.ssl.encrypted/data.result.totals.requests.all*100)
        const reply = `Since: ${convertTime(data.result.totals.since)}\nUntil: ${convertTime(data.result.totals.until)}\n👋 Total Request: ${data.result.totals.requests.all}\n👨🏼‍💻 Uniques: ${data.result.totals.uniques.all}\n🔒 SSL: ${sslPercentage}%\n😈 Threats: ${data.result.totals.threats.all}`
        return reply
    }
    catch(err){
        return err.response.data.errors[0].message
    }
    
}

getAnalysis(24)

module.exports = {
    getAnalysis
}