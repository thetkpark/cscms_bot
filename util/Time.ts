export function convertTime(str: string): String {
	//const data = (\d{4})-(\d{2}-(\d{2}) (\d{2}):(\d{2}):(\d{2})).exec()
	const date = new Date(str)
	const time = date.toLocaleDateString('en-US-u-ca-gregory', {
		timeZone: 'Asia/Bangkok',
		hour12: false,
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		timeZoneName: 'short'
	})
	return time
}

export function getTime(): String {
	const today = new Date()
	const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
	const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
	const dateTime = date + ' ' + time
	return convertTime(dateTime)
}

console.log(getTime())

export function getISOTime(hour: number) {
	const date = new Date(Date.now())
	const pastDate = new Date(Date.now() - hour * 60 * 60 * 1000)
	return {
		now: date.toISOString(),
		since: pastDate.toISOString()
	}
}
