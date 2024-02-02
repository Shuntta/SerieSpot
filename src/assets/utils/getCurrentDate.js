const getCurrentData = () => {

    const currentTime = new Date();
    const day = String(currentTime.getDate()).padStart(2, '0');
    const month = String(currentTime.getMonth()+1).padStart(2, '0');
    const year = currentTime.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}

export default getCurrentData;