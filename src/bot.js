const axios = require('axios')
const telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')

const { convertTime, getTime } = require('../util/Time')
const { getAnalysis } = require('../util/cloudflare')
const { getCurrentWeather, getPollution } = require('../util/weather')
const { getDevJoke, getJoke, getKnockJoke } = require('../util/joke')

require('dotenv').config()
require('../util/checkDown')

const bot = new telegraf(process.env.BOT_TOKEN)
const telegram = new Telegram(process.env.BOT_TOKEN)

bot.start((ctx) => {
    console.log(ctx.update.message.chat.id)
    ctx.reply('Welcome! use /status to get status of the server')
})


////////Command Zone/////////


bot.command('status', async (ctx) => {
    let reply
    try{
        const {data} = await axios.get(`${process.env.ENDPOINT}:61208/api/3/all`)
        const time = convertTime(data.now)
        reply = `Time: ${time}\nServer status: ✅\nCPU Usage: ${data.cpu.total}%\nMemory Usage: ${data.mem.percent}%\nUptime: ${data.uptime}`
    }
    catch{
        const time = getTime()
        reply = `Time: ${time}\nServer status: 🚨\nFailed to get the status`
    }
    
    ctx.reply(reply)
    
})


bot.command('analysis', async (ctx) => {
    const reply = await getAnalysis(24)
    ctx.reply(reply)
})

bot.command('weather', async (ctx) => {
    const reply = await getCurrentWeather()
    ctx.reply(reply)
})

bot.command('pollution', async (ctx) => {
    const reply = await getPollution()
    ctx.reply(reply)
})

bot.command('devjoke', async (ctx) => {
    const reply = await getDevJoke()
    ctx.reply(`Get ready for it`)
    await setTimeout(() => {
        ctx.reply(reply.setup)
    }, 2000);
    await setTimeout(() => {
        ctx.reply(reply.punchline)
    }, 5000);
})

bot.command('joke', async (ctx) => {
    const reply = await getJoke()
    ctx.reply(`Here it goes~`)
    await setTimeout(() => {
        ctx.reply(reply.setup)
    }, 2000);
    await setTimeout(() => {
        ctx.reply(reply.punchline)
    }, 5000);
})

bot.command('knockjoke', async (ctx) => {
    const reply = await getKnockJoke()
    ctx.reply(`*At the door*`)
    await setTimeout(() => {
        ctx.reply(reply.setup)
    }, 2000);
    await setTimeout(() => {
        ctx.reply(reply.punchline)
    }, 5000);
})

bot.on('location', (ctx) => {
    console.log(ctx.update.message.location)
})


bot.on('text', (ctx) => {
    const message = ctx.update.message.text
    ctx.reply("HELLO")
})




////////Server Zone/////////


bot.telegram.setWebhook(`${process.env.URL}/telegraf`)


module.exports = bot