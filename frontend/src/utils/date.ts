interface DaysInMonthType {
  (month: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11, year: number): number;
}

/**
 * Returns the number of days in a month for a given year
 *
 * @param {number} month - a month number (0-11)
 * @param {number} year - a year (e.g. 2024)
 * @returns {number} - number of days in the month
 * @example daysInMonth(2, 2024) // returns 29
 * daysInMonth(1, 2024) // returns 31
 *
 */
export const daysInMonth: DaysInMonthType = (month, year): number => {
  return new Date(year, month, 0).getDate();
};

/**
 * Checks if there is an overlap between a start and end date and an array of dates
 * 
 * @param dateRange - object with start and end date
 * @param unavailableDates  - array of dates that are unavailable
 * @returns {boolean} - true if there is an overlap, false otherwise
 * 
 * @example isDateRangeOverlap(PRODUCT_UNAVAILABLE_DATES, USER_REQUESTED_RENT_DATES) // returns true
 * 
 * @throws {Error} - if the start date is greater than the end date
 * 
 */
export const isDateRangeOverlap = (dateRange: { start: Date, end: Date }, unavailableDates: Date[]): boolean => {
  if (dateRange.start > dateRange.end) {
    throw new Error("Start date cannot be greater than the end date");
  }

  return unavailableDates.some((d) =>
    d.getDate() >= dateRange.start.getDate() &&
    d.getDate() <= dateRange.end.getDate()
  );
};