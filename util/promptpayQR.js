const qrcode = require('qrcode')
const generatePayload = require('promptpay-qr')
const imgur = require('imgur')
const promptpayId = '0856608000'

async function generatePromptPayQR (amount) {
    const payload = generatePayload(promptpayId, { amount })
    const options = { type: 'png', color: { dark: '#003b6a', light: '#f7f8f7' } }

    try{
        const png = await qrcode.toDataURL(payload, options)
        return png
    }
    catch(err){
        return err
    }

}

async function getPromptPayQR(amount){
    try{
        const png = await generatePromptPayQR(parseInt(amount))
        let payload = png.split(',')
        const url = await imgur.uploadBase64(payload[1])
        return url.data.link
    }
    catch(err){
        return err.message
    }

}




module.exports = getPromptPayQR;