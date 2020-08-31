const AirtablePlus = require('airtable-plus')
require('dotenv').config()

const airtable = new AirtablePlus({
	baseID: 'appYvqSHFL5G5lRaC',
	apiKey: process.env.AIRTABLE_API_KEY,
	tableName: 'User_List'
})

export async function findUser(chatID: String) {
	let users
	try {
		users = await airtable.read({
			filterByFormula: `ChatID = "${chatID}"`,
			maxRecords: 20 // optional
		})
	} catch (err) {
		console.log(err)
		return err
	}
	return users
}

export async function addUser(username: String, chatID: String) {
	try {
		await airtable.create({
			Name: username,
			ChatID: chatID.toString()
		})
	} catch (err) {
		console.log(err)
		throw err
	}
}

// async function updateUser(chatID, ) {

// }

export async function setPromptPayID(chatID: String, promptPayID: String) {
	try {
		await airtable.updateWhere(`ChatID = "${chatID}"`, { PromptPay: promptPayID })
	} catch (err) {
		return err
	}
}

export async function getPromptPayID(chatID: String) {
	try {
		const user = await airtable.read({
			filterByFormula: `ChatID = "${chatID}"`,
			maxRecords: 1
		})
		return user
	} catch (err) {
		return err
	}
}
