function convertTime(str) {
    //const data = (\d{4})-(\d{2}-(\d{2}) (\d{2}):(\d{2}):(\d{2})).exec()
    const date = new Date(str)
    const time = date.toLocaleDateString('en-US-u-ca-gregory', {
        dateStyle: 'medium',
        timeZone: 'Asia/Bangkok',
        timeStyle: 'medium',
        hour12: false,
        weekday: 'short', 
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

function getTime(){
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;
    return convertTime(dateTime)
}

module.exports = {
    convertTime,
    getTime
}
