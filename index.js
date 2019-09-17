const express = require('express')
const axios = require('axios');
const telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')

require('dotenv').config()
const port = process.env.PORT || 3000

const app = express()
const bot = new telegraf(process.env.BOT_TOKEN)

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

setInterval(async () => {
    let isUp = false
    const data = await axios('http://35.240.129.191:61208/api/3/uptime')
    if(data.status===200 && isUp == false){
        isUp = true
        telegram.sendMessage(834716830, 'Server is UP!')
    }
    if(data.status!=200 && isUp == true) {
        isUp = false
        telegram.sendMessage(834716830, `It's down!`)
    }
}, 10000);

app.listen(port, () => console.log(`Running on ${port}`))

