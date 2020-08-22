const axios = require('axios')
const telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')

const { convertTime, getTime } = require('../util/Time')
const { getAnalysis } = require('../util/cloudflare')
const { getCurrentWeather, getPollution } = require('../util/weather')
const { getDevJoke, getJoke, getKnockJoke } = require('../util/joke')
const spacer = require('../util/space')
const airtable = require('../util/Airtable')
const getPromptPayQR = require('../util/promptpayQR')
require('dotenv').config()
require('../util/checkDown')

const bot = new telegraf(process.env.BOT_TOKEN)
const telegram = new Telegram(process.env.BOT_TOKEN)

bot.start(async ctx => {
	let message = `Welcome! use /status to get status of the server`
	const chatID = ctx.update.message.from.id

	let name
	if (ctx.update.message.from.last_name == undefined) name = ctx.update.message.from.first_name
	else name = ctx.update.message.from.first_name + ctx.update.message.from.last_name

	const users = await airtable.findUser(chatID) //See if user is already in db
	if (users.length == 0) {
		try {
			await airtable.addUser(name, chatID)
			message = `Welcome! start using now. User "/setqr #yourPromptPayID" to setup generating PromptPayQR feature.`
		} catch (err) {
			console.log(err)
			message = `There is an error. Try again please`
		}
	}
	ctx.reply(message)
})

////////Command Zone/////////

bot.hears('/status', async ctx => {
	let reply
	try {
		const { data } = await axios.get(`${process.env.ENDPOINT}:61208/api/3/all`)
		const time = convertTime(data.now)
		reply = `Time: ${time}\nServer status: ✅\nCPU Usage: ${data.cpu.total}%\nMemory Usage: ${data.mem.percent}%\nUptime: ${data.uptime}`
	} catch {
		const time = getTime()
		reply = `Time: ${time}\nServer status: 🚨\nFailed to get the status`
	}

	ctx.reply(reply)
})

bot.command('analysis', async ctx => {
	const reply = await getAnalysis(24)
	ctx.reply(reply)
})

bot.command('weather', async ctx => {
	const reply = await getCurrentWeather()
	ctx.reply(reply)
})

bot.command('pollution', async ctx => {
	const reply = await getPollution()
	ctx.reply(reply)
})

bot.command('devjoke', async ctx => {
	const reply = await getDevJoke()
	ctx.reply(`Get ready for it`)
	await setTimeout(() => {
		ctx.reply(reply.setup)
	}, 2000)
	await setTimeout(() => {
		ctx.reply(reply.punchline)
	}, 5000)
})

bot.command('joke', async ctx => {
	const reply = await getJoke()
	ctx.reply(`Here it goes~`)
	await setTimeout(() => {
		ctx.reply(reply.setup)
	}, 2000)
	await setTimeout(() => {
		ctx.reply(reply.punchline)
	}, 5000)
})

bot.command('knockjoke', async ctx => {
	const reply = await getKnockJoke()
	ctx.reply(`*At the door*`)
	await setTimeout(() => {
		ctx.reply(reply.setup)
	}, 2000)
	await setTimeout(() => {
		ctx.reply(reply.punchline)
	}, 5000)
})

bot.hears(/(\/space)\s(.*)/, ctx => {
	const word = /(\/space)\s(.*)/.exec(ctx.update.message.text)
	if (word[2]) {
		ctx.reply(spacer(word[2]))
	} else {
		ctx.reply('Something went wrong')
	}
})

bot.hears(/(\/setqr)( {0,1})(\d{10,})/, async ctx => {
	const request = /(setqr)( {0,1})(\d{10,})/.exec(ctx.update.message.text)
	try {
		await airtable.setPromptPayID(ctx.update.message.from.id, request[3])
		ctx.reply(`Your PromptPayQR is set to ${request[3]}`)
	} catch (err) {
		ctx.reply(err)
	}
})

bot.hears(/([Qq][Rr])(.*)/, async ctx => {
	const request = /([Qq][Rr])(.*)/.exec(ctx.update.message.text)
	const user = await airtable.getPromptPayID(ctx.update.message.from.id)
	const qr = await getPromptPayQR(user[0].fields.PromptPay, request[2])
	ctx.replyWithPhoto(qr)
})

bot.on('text', ctx => {
	const message = ctx.update.message.text
	ctx.reply('HELLO')
})

////////Server Zone/////////

bot.telegram.setWebhook(`${process.env.URL}/telegraf`)

module.exports = {
	bot,
	telegram
}
