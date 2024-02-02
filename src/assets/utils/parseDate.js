const parseDate = (dateString, timeString) => {
    
    const [day, month, year] = dateString.split('-');
    const [hours, minutes] = timeString.split(':');
    return new Date(year, month - 1, day, hours, minutes);
}
 
export default parseDate;