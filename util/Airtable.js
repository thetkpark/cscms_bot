const Airtable = require('airtable-node');
require('dotenv').config()

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appYvqSHFL5G5lRaC')
  .table('User_List')


async function findUser(username) {
    const users = await airtable.list({
        filterByFormula: `({Name} = '${username}')`,
        maxRecords: 50, // optional
        sort: [{ field: 'Name', direction: 'asc' }], // optional
        cellFormat: 'json', // optional
    })
    return users.records
}


async function addUser(name, chatID, email) {
    
}



module.exports = {
    findUser,
    addUser
}