const axios = require('axios')

async function getDevJoke(){
    const {data} = await axios.get(`https://official-joke-api.appspot.com/jokes/programming/random`)
    return {
        setup: data[0].setup, 
        punchline: data[0].punchline
    }
}

async function getJoke() {
    const {data} = await axios.get(`https://official-joke-api.appspot.com/jokes/random`)
    return {
        setup: data.setup, 
        punchline: data.punchline
    }
}

async function getKnockJoke() {
    const {data} = await axios.get(`https://official-joke-api.appspot.com/jokes/knock-knock/random`)
    return {
        setup: data[0].setup, 
        punchline: data[0].punchline
    }
}

module.exports = {
    getDevJoke,
    getJoke,
    getKnockJoke
}
