const FormatDate = (input) => {
    const datePart = input?.match(/\d+/g)
    if(datePart !== undefined){
        const year = datePart[0].substring(0,4)
        const month = datePart[1]
        const day = datePart[2]
        return day + '/' + month + '/' + year;
    }
}

export default FormatDate
