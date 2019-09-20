const axios = require('axios');
const Telegram = require('telegraf/telegram')

const telegram = new Telegram(process.env.BOT_TOKEN);

let isUp;

async function getInitState () {
    try{
        const data = await axios('http://35.240.129.191:61208/api/3/uptime');
        if (data.status === 200) isUp = true;
        else if (data.status != 200) isUp = false;
    }
    catch{
        isUp = false
    }

    console.log(`Init complete, Server is up: ${isUp}`);
    telegram.sendMessage(834716830, `Init status complete, Server up: ${isUp}`);
    
} 
//834716830
//-320729079
getInitState();

setInterval(async () => {
    try{
        const data = await axios('http://35.240.129.191:61208/api/3/uptime')
        if (data.status === 200 && isUp == false) {
            isUp = true
            console.log(isUp)
            telegram.sendMessage(834716830, 'Server is UP!');
        }
        else if(data.status != 200 && isUp == false) {
            isUp = false
            telegram.sendMessage(834716830, `There is a problem. Not getting 200`);
        }
    }
    catch{
        if(isUp == true){
            isUp = false;
            telegram.sendMessage(834716830, `Server is DOWN!`);
        }
    }
    
}, 10000);

