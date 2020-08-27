const AirtablePlus = require('airtable-plus')
require('dotenv').config()

const airtable = new AirtablePlus({
	baseID: 'appwXCisvWItAb0cj',
	apiKey: process.env.AIRTABLE_API_KEY,
	tableName: 'KMUTT_Restaurants'
})

async function randomRes() {
	let res
	try {
		res = await airtable.read()
		const index = Math.floor(Math.random() * res.length)
		return res[index].fields.Name
	} catch (err) {
		console.log(err)
		return err
	}
}

module.exports = {
	randomRes
}
