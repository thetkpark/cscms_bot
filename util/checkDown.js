const axios = require('axios')
const Telegram = require('telegraf/telegram')
const { convertTime, getTime } = require('./Time')

require('dotenv').config()
const telegram = new Telegram(process.env.BOT_TOKEN)

let isUp

async function getInitState() {
	try {
		const data = await axios(`${process.env.ENDPOINT}:61208/api/3/uptime`)
		if (data.status === 200) isUp = `✅`
		else if (data.status != 200) isUp = `⛔️`
	} catch {
		isUp = false
	}

	// console.log(`Init complete, Server is up: ${isUp}`)
	// telegram.sendMessage(834716830, `Init status complete, Server up: ${isUp}`);
}

getInitState()

setInterval(async () => {
	let message
	try {
		const data = await axios(`${process.env.ENDPOINT}:61208/api/3/uptime`)
		if (data.status === 200 && isUp == false) {
			isUp = true
			message = `Server is back to ONLINE! ✈️🚴🏼‍♀🤴👑`
		} else if (data.status != 200 && isUp == false) {
			isUp = false
			message = `There is a problem. Not getting 200 😑`
		}
	} catch {
		if (isUp == true) {
			isUp = false
			message = `Server is DOWN! 🚨💀`
		}
	}
	if (message != undefined) {
		telegram.sendMessage(834716830, `At ${getTime()}\n` + message)
	}
}, 10000)
