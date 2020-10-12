import qrcode, { QRCodeToDataURLOptions } from "qrcode";
const generatePayload = require('promptpay-qr')
const imgur = require('imgur')

export async function generatePromptPayQR(promptPayID: string, amount: number): Promise<string> {
	const payload = generatePayload(promptPayID, { amount })
	
	const options: QRCodeToDataURLOptions = { type: 'image/png' , color: { dark: '#003b6a', light: '#f7f8f7' }}

	try {
		const png: string = await qrcode.toDataURL(payload, options)
		return png
	} catch (err) {
		return err
	}
}

export async function getPromptPayQR(promptPayID: string, amount: string): Promise<string> {
	try {
		const png = await generatePromptPayQR(promptPayID, parseFloat(amount))
		let payload = png.split(',')
		const url = await imgur.uploadBase64(payload[1])
		return url.data.link
	} catch (err) {
		return err.message
	}
}
