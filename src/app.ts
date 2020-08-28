import express from 'express'
import axios from 'axios'
import Ddos from 'ddos'
import multer from 'multer'
import bodyParser from 'body-parser'
import Telegram from 'telegraf'

import { MailGunWebHookHandler } from '../util/MailGun'

import { bot, telegram } from './bot'
const port = process.env.PORT || 3000
require('dotenv').config()

export const app = express()
const ddos = new Ddos({
	burst: 10,
	limit: 30,
	checkinterval: 3,
	errormessage: 'Slow down bro. Too many request'
})

app.use(ddos.express)

app.get('/', (req, res) => {
	res.send({ sucess: true })
})

app.use(bodyParser.urlencoded({ extended: false }))
app.post('/mail', multer().any(), (req, res) => {
	const { message, chatID } = MailGunWebHookHandler(req, res)
	telegram.sendMessage(chatID, message)
	res.end()
})

app.get('/test', (req, res) => {
	res.send('hello')
})

app.post('/telegraf', bot.webhookCallback('/telegraf'))
