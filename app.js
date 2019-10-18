const express = require('express')
const axios = require('axios')
const Ddos = require('ddos')
const multer = require('multer')
const bodyParser = require('body-parser')
const Telegram = require('telegraf/telegram')

const MailGunWebHookHandler = require('./util/MailGun')

const telegram = new Telegram(process.env.BOT_TOKEN)
const bot = require('./src/bot')
const port = process.env.PORT || 3000
require('dotenv').config()

const app = express()
const ddos = new Ddos({
    burst:10, 
    limit:30,
    checkinterval: 3,
    errormessage: "Slow down bro. Too many request"
})

app.use(ddos.express);


app.get('/', (req, res) => {
    res.send({ sucess: true })
})

app.use(bodyParser.urlencoded({extended: false}));
app.post('/mail', multer().any(), (req,res) => {
    const message = MailGunWebHookHandler(req,res);
    telegram.sendMessage(834716830, message)
    res.end()
})

app.post('/telegraf', bot.webhookCallback('/telegraf'))

app.listen(port, () => console.log(`Running on ${port}`))