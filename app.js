const express = require('express')
const axios = require('axios');
const telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
const Ddos = require('ddos')
const { convertTime, getTime } = require('./src/Time')


require('dotenv').config()
require('./src/checkDown')
const port = process.env.PORT || 3000

const app = express()
const bot = new telegraf(process.env.BOT_TOKEN)
const telegram = new Telegram(process.env.BOT_TOKEN)

const ddos = new Ddos({
    burst:10, 
    limit:30,
    checkinterval: 3,
    errormessage: "Slow down bro. Too many request"
})

app.use(ddos.express);

bot.start((ctx) => {
    console.log(ctx.update.message.chat.id)
    ctx.reply('Welcome! use /status to get status of the server')
})


////////Command Zone/////////

bot.command('status', async (ctx) => {
    let reply
    try{
        const {data} = await axios.get('http://35.240.129.191:61208/api/3/all')
        const time = convertTime(data.now)
        reply = `Time: ${time}\nServer status: Up\nCPU Usage: ${data.cpu.total}%\nMemory Usage: ${data.mem.percent}%\nUptime: ${data.uptime}`
    }
    catch{
        const time = getTime()
        reply = `Time: ${time}\nServer status: Down\nFailed to get the status`
    }
    
    ctx.reply(reply)
    
})




bot.hears('fuck you', (ctx) => {
    return ctx.reply(`Fuck you too. 🖕`)
})

bot.on('text', ({ replyWithHTML }) => replyWithHTML('<b>Hello</b>'))




////////Server Zone/////////

//https://pacific-citadel-75808.herokuapp.com/webhook
bot.telegram.setWebhook('https://pacific-citadel-75808.herokuapp.com/webhook')

// bot.launch()

app.get('/', (req, res) => {
    res.send({ sucess: true })
})
app.use(bot.webhookCallback('/webhook'))


app.listen(port, () => console.log(`Running on ${port}`))

