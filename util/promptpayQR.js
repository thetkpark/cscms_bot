const qrcode = require('qrcode')
const generatePayload = require('promptpay-qr')
const imgur = require('imgur')

async function generatePromptPayQR (promptPayID, amount) {
    const payload = generatePayload(promptPayID, { amount })
    const options = { type: 'png', color: { dark: '#003b6a', light: '#f7f8f7' } }

    try{
        const png = await qrcode.toDataURL(payload, options)
        return png
    }
    catch(err){
        return err
    }

}

async function getPromptPayQR(promptPayID, amount){
    try{
        const png = await generatePromptPayQR(promptPayID, parseFloat(amount))
        let payload = png.split(',')
        const url = await imgur.uploadBase64(payload[1])
        return url.data.link
    }
    catch(err){
        return err.message
    }
}




module.exports = getPromptPayQR;