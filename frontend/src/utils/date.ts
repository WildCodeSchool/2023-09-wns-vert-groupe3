import { UserResearchDatesType } from "contexts/UserDatesResearchContext";

export interface DaysInMonthType {
  (month: NumberOfMonths, year: number): number;
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
export const isDateRangeOverlap = (
  dateRange: UserResearchDatesType,
  unavailableDates: Date[],
): boolean => {
  // Check if start date or end date is null and return false
  if (!dateRange.start || !dateRange.end) {
    return false;
  }

  // Check if start date is greater than end date and throw an error
  if (dateRange.start > dateRange.end) {
    throw new Error("Start date cannot be greater than the end date");
  }

  // Check if any unavailable date overlaps with the date range
  return unavailableDates.some(
    (d) =>
      // @ts-ignore
      d >= dateRange.start && d <= dateRange.end,
  );
};

/**
 * Returns an array of months between two dates
 *
 * @param dateRange - object with start and end date
 * @returns {Date[]} - array of months
 *
 * @example getMonthsBetweenDates(new Date(2024, 0, 1), new Date(2024, 3, 1))
 * returns [new Date(2024, 0, 1), new Date(2024, 1, 1), new Date(2024, 2, 1), new Date(2024, 3, 1)]
 *
 */
export const getMonthsBetweenDates = (
  startDate: Date,
  endDate: Date,
): Date[] => {
  const months: Date[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    months.push(new Date(currentDate));
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate(),
    );
  }

  return months;
};

/**
 * Returns the previous and next month for a given date
 *
 * @param {Date} date - a date
 * @returns {object} - object with previous and next month
 *
 * @example getPrevAndNextMonth(new Date(2024, 0, 1))
 * //returns { prev: new Date(2023, 11, 1), next: new Date(2024, 1, 1) }
 *
 */
export const getPrevAndNextDates = (date: Date): { prev: Date; next: Date } => {
  const prev = new Date(date.getFullYear(), date.getMonth() - 1);
  const next = new Date(date.getFullYear(), date.getMonth() + 1);

  return { prev, next };
};

/**
 * Returns the number of days between two dates
 *
 * @param {Date} start - a start date
 * @param {Date} end - an end date
 * @returns {number} - number of days
 *
 * @example daysBetweenDates(new Date(2024, 0, 1), new Date(2024, 0, 5)) //returns 4
 *
 */
export const daysBetweenDates = (start?: Date, end?: Date): number => {
  if (!start || !end) return 0;

  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = end.getTime() - start.getTime();
  return Math.round(diffInTime / oneDay);
};
