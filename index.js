//const express = require('express')
const axios = require('axios');
const telegraf = require('telegraf')
require('dotenv').config()
//const port = process.env.port || 8000

//const app = express();
const bot = new telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply('Welcome! use /status to get status of the server'))

bot.command('status', async (ctx) => {
    //const {data} = await axios.get('http://icanhazip.com')
    const {data} = await axios.get('http://35.240.129.191:61208/api/3/all');
    const reply = `Time: ${data.now}\nCPU Usage: ${data.cpu.total}%\nMemory Usage: ${data.mem.percent}%\nUptime: ${data.uptime}`
    ctx.reply(reply)
})

bot.on('text', ({ replyWithHTML }) => replyWithHTML('<b>Hello</b>'))

bot.launch()

//app.listen(port, () => console.log(`Running on ${port}`))

