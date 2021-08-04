import express from 'express'
import multer from 'multer'
import bodyParser from 'body-parser'
import { MailGunWebHookHandler } from '../util/MailGun'
import { bot, telegram } from './bot'
require('dotenv').config()

export const app = express()

app.get('/', (req, res) => {
	res.send({ sucess: true })
})

app.use(bodyParser.urlencoded({ extended: false }))
app.post('/mail', multer().any(), (req, res) => {
// 	const { message, chatID } = MailGunWebHookHandler(req, res)
// 	telegram.sendMessage(chatID, message)
	res.end()
})

app.get('/test', (req, res) => {
	res.send('hello')
})

app.post('/telegraf', bot.webhookCallback('/telegraf'))
