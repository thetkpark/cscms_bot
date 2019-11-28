const AirtablePlus = require('airtable-plus');
require('dotenv').config()

const airtable = new AirtablePlus({
    baseID: 'appYvqSHFL5G5lRaC',
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: 'User_List',
});

async function findUser(chatID) {
    let users
    try{
        users = await airtable.read({
            filterByFormula: `ChatID = "${chatID}"`,
            maxRecords: 20, // optional
        })
    }
    catch(err){
        console.log(err)
        return err
    }
    return users
}


async function addUser(username, chatID) {
    try{
        await airtable.create({
            Name: username,
            ChatID: chatID
        })
    }
    catch(err){
        console.log(err);
        throw err
    }
}


// async function updateUser(chatID, ) {
    
// }

async function setPromptPayID(chatID, promptPayID) {
    try{
        await airtable.updateWhere( 
            `ChatID = "${chatID}"`,
            { PromptPay: promptPayID }
        )
    }
    catch(err){
        return err
    }
}

async function getPromptPayID(chatID) {
    try{
        const user = await airtable.read({
            filterByFormula: `ChatID = "${chatID}"`,
            maxRecords: 1
        })
        return user
    }
    catch(err){
        return err
    }
}


module.exports = {
    findUser,
    addUser,
    setPromptPayID,
    getPromptPayID
}