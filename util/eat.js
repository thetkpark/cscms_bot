const AirtablePlus = require('airtable-plus')
require('dotenv').config()

const airtable = new AirtablePlus({
	baseID: 'appwXCisvWItAb0cj',
	apiKey: process.env.AIRTABLE_API_KEY
})

async function randomRes() {
	try {
		const res = await airtable.read(
			{},
			{
				tableName: 'KMUTT_Restaurants'
			}
		)
		const index = Math.floor(Math.random() * res.length)
		return res[index].fields.Name
	} catch (err) {
		console.log(err)
		return err
	}
}

async function randomDrink() {
	try {
		const res = await airtable.read(
			{},
			{
				tableName: 'KMUTT_Drink'
			}
		)
		const index = Math.floor(Math.random() * res.length)
		return res[index].fields.Name
	} catch (err) {
		console.log(err)
		return err
	}
}

module.exports = {
	randomRes,
	randomDrink
}
