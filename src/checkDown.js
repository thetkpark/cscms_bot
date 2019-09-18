const axios = require('axios');
const Telegram = require('telegraf/telegram')

const telegram = new Telegram(process.env.BOT_TOKEN);

let isUp;

async function getInitState () {
    const data = await axios('http://35.240.129.191:61208/api/3/uptime');
    if (data.status === 200) isUp = true;
    else if (data.status != 200) isUp = false;
    console.log(`Init complete, Server is up: ${isUp}`);
    return telegram.sendMessage(834716830, `Init complete, Server up: ${isUp}`);
} 

getInitState();

setInterval(async () => {
    const data = await axios('http://35.240.129.191:61208/api/3/uptime');
    if (data.status === 200 && isUp == false) {
        isUp = true;
        console.log(isUp);
        return telegram.sendMessage(834716830, 'Server is UP!');
    }
    else if (data.status != 200 && isUp == true) {
        isUp = false;
        console.log(isUp);
        return telegram.sendMessage(834716830, `It's down!`);
    }
}, 10000);

