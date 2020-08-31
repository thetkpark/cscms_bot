import crypto from 'crypto'
import { Request, Response } from 'express'
require('dotenv').config()

interface Mailgun {
	message: string
	chatID: number
}

export function MailGunWebHookHandler(req: Request, res: Response): Mailgun {
	const value: string = req.body.timestamp + req.body.token
	const hash: string = crypto
		.createHmac('sha256', process.env.MAILGUN_API_KEY as string)
		.update(value)
		.digest('hex')
	if (hash !== req.body.signature) {
		return {
			message: `Invalid signature webhook signature`,
			chatID: 834716830
		}
	}
	let chatID
	if (req.body.recipient.includes('thanaphon')) chatID = 877836201
	else if (req.body.recipient.includes('sethanant')) chatID = 834716830
	else chatID = -320729079
	const message = `📩 New Email\nSender: ${req.body.sender} \nRecipient: ${req.body.recipient}\nSubject: ${req.body.subject}`
	return { message, chatID }
}
