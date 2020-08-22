function isThaiVowels(char) {
	const vowels = ['่', '้', '๊', '๋', 'ิ', 'ี', 'ึ', 'ื', '็', 'ั', 'ุ', 'ู', '์', 'ํ']

	if (vowels.includes(char)) {
		return true
	}
	return false
}

function removeTrailingSpace(text) {
	if (text[text.length - 1] === ' ') {
		return text.slice(0, -1)
	}

	return text
}

function spacer(sentence) {
	let result = ''

	sentence.split('').forEach(char => {
		if (char === ' ') {
			return
		}

		if (isThaiVowels(char)) {
			result = removeTrailingSpace(result)

			result += char + ' '
			return
		}

		if (char === 'ำ') {
			result = removeTrailingSpace(result)

			result += 'ํ า '
			return
		}

		result += char + ' '
	})

	result = removeTrailingSpace(result)

	return result
}

module.exports = spacer
