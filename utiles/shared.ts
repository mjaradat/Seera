

/**
 * 
 * @param date
 * @param dateToCompare
 * @param isEqualAllowed // To consder date from the past
 * @returns boolean
 */
export const isDateBefore = (date: Date, dateToCompare: Date, isEqualAllowed = false): boolean => {
    const isYearBefore = date.getFullYear() < dateToCompare.getFullYear()
    const isCurrentYear = date.getFullYear() === dateToCompare.getFullYear()
    if (isYearBefore) return true
    if (!isCurrentYear) return false

    const isMonthBefore = date.getMonth() < dateToCompare.getMonth()
    const isCurrentMonth = date.getMonth() === dateToCompare.getMonth()

    if (isMonthBefore) return true
    if (!isCurrentMonth) return false

    return (isEqualAllowed ? date.getDate() <= dateToCompare.getDate() : date.getDate() < dateToCompare.getDate())
}


/**
 * @description This function is checking on the passed date to validate 
 *              the type and the value because "valid date objects" and "valid dates" are not the same thing
 *              e.g. new Date('') is instanceof Date but it is invalid date
 * @param date 
 * @returns boolean
 */
export const isValidDate = (date: any): boolean => {
    return date instanceof Date && !isNaN(date as any);
}


// TODO: Need to add validation
export const dateDiffInDays = (d1: Date, d2: Date): number => {
    var t2 = d2.getTime();
    var t1 = d1.getTime();
    return Math.floor((t2 - t1) / (24 * 3600 * 1000))
}