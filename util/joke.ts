import axios from 'axios'

interface JokeResponse {
	setup: string
	punchline: string
}

export async function getDevJoke(): Promise<JokeResponse> {
	const { data } = await axios.get(`https://official-joke-api.appspot.com/jokes/programming/random`)
	return {
		setup: data[0].setup,
		punchline: data[0].punchline
	}
}

export async function getJoke(): Promise<JokeResponse> {
	const { data } = await axios.get(`https://official-joke-api.appspot.com/jokes/random`)
	return {
		setup: data.setup,
		punchline: data.punchline
	}
}

export async function getKnockJoke(): Promise<JokeResponse> {
	const { data } = await axios.get(`https://official-joke-api.appspot.com/jokes/knock-knock/random`)
	return {
		setup: data[0].setup,
		punchline: data[0].punchline
	}
}
