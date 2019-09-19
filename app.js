const express = require('express')
const axios = require('axios');
const telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
const Ddos = require('ddos')

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
    errormessage: "Slow down bro. Too many request",
    testmode: true
})

app.use(ddos.express);

bot.start((ctx) => {
    console.log(ctx.update.message.chat.id)
    ctx.reply('Welcome! use /status to get status of the server')
})


bot.command('status', async (ctx) => {
    const {data} = await axios.get('http://35.240.129.191:61208/api/3/all');
    const reply = `Time: ${data.now}\nCPU Usage: ${data.cpu.total}%\nMemory Usage: ${data.mem.percent}%\nUptime: ${data.uptime}`
    ctx.reply(reply)
})

bot.hears('fuck you', (ctx) => {
    return ctx.reply(`Fuck you too. 🖕`)
})

bot.on('text', ({ replyWithHTML }) => replyWithHTML('<b>Hello</b>'))

bot.telegram.setWebhook('https://pacific-citadel-75808.herokuapp.com/webhook')

// bot.launch()

app.get('/', (req, res) => {
    res.send({ sucess: true })
})
app.use(bot.webhookCallback('/webhook'))


app.listen(port, () => console.log(`Running on ${port}`))

