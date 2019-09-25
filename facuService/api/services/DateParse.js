module.exports.format = function parseDate(dateToParse) {
    let newDate = ''
    //EventDate Format
    let date = new Date(dateToParse)
    newDate = `${date.getFullYear()}-${formatNumber(date.getMonth() + 1)}-${formatNumber(date.getDate())} ` +
        `${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}`
        if(newDate.includes('00:00')){
            newDate = newDate.substring(0,10)
        }
    return newDate
}



function formatNumber(number) {
    return (number >= 0 && number < 10) ? `0${number}` : `${number}`
}