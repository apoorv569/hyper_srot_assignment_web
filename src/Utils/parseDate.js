export function compareDates(dateString1, dateString2) {
    // Parse the date strings into Date objects
    const date1 = parseDate(dateString1);
    const date2 = parseDate(dateString2);

    if (date1.getTime() < date2.getTime()) {
        return -1;
    } else if (date1.getTime() > date2.getTime()) {
        return 1;
    } else {
        return 0;
    }
}

export function parseDate(dateString) {
    if (dateString === null) {
        return null;
    }

    // Split the date string into day, month, and year parts
    const [day, month, year] = dateString.split('/');

    // Create a new Date object
    // NOTE: Months are 0-based, so subtract 1 from the month
    return new Date(year, month - 1, day);
}
