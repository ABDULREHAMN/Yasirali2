/**
 * Automatic date system utilities for dashboard data generation and filtering
 */

export interface FormattedDailyData {
  date: string
  revenue: string
  impressions: string
  clicks: string
  ctr: string
  ecpm: string
}

/**
 * Format a date to "MMM DD, YYYY" format
 */
export function formatDateDisplay(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }
  return date.toLocaleDateString("en-US", options)
}

/**
 * Parse "MMM DD, YYYY" format to Date object
 */
export function parseFormattedDate(dateStr: string): Date {
  return new Date(dateStr)
}

/**
 * Get today's date in display format
 */
export function getTodayDate(): string {
  return formatDateDisplay(new Date())
}

/**
 * Create a zero-value formatted data entry
 */
export function createZeroFormattedEntry(dateStr: string): FormattedDailyData {
  return {
    date: dateStr,
    revenue: "$0.00",
    impressions: "0",
    clicks: "0",
    ctr: "0.00%",
    ecpm: "$0.00",
  }
}

/**
 * Generate all missing entries from startDate to today
 * Only adds entries that don't already exist
 */
export function generateAllMissingEntries(
  existingData: FormattedDailyData[],
  startDateStr: string,
): FormattedDailyData[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const startDate = parseFormattedDate(startDateStr)
  startDate.setHours(0, 0, 0, 0)

  const missingEntries: FormattedDailyData[] = []
  const currentDate = new Date(startDate)

  while (currentDate <= today) {
    const dateStr = formatDateDisplay(currentDate)
    if (!existingData.some((item) => item.date === dateStr)) {
      missingEntries.push(createZeroFormattedEntry(dateStr))
    }
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return missingEntries
}

/**
 * Filter data by date range
 * Returns entries within the specified number of days from today
 */
export function filterByDateRange(
  allData: FormattedDailyData[],
  days: number | null,
): FormattedDailyData[] {
  if (days === null) return allData

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() - (days - 1))

  return allData.filter((item) => {
    const itemDate = parseFormattedDate(item.date)
    itemDate.setHours(0, 0, 0, 0)
    return itemDate >= startDate && itemDate <= today
  })
}

/**
 * Filter data for Last 3 Months (approximately 90 days)
 */
export function filterBy3Months(allData: FormattedDailyData[]): FormattedDailyData[] {
  return filterByDateRange(allData, 90)
}

/**
 * Filter data for Last 6 Months (approximately 180 days)
 */
export function filterBy6Months(allData: FormattedDailyData[]): FormattedDailyData[] {
  return filterByDateRange(allData, 180)
}

/**
 * Filter data for Last Year (approximately 365 days)
 */
export function filterBy1Year(allData: FormattedDailyData[]): FormattedDailyData[] {
  return filterByDateRange(allData, 365)
}

/**
 * Get data for a specific date range key
 */
export function getDataForDateRange(
  allData: FormattedDailyData[],
  rangeKey: string,
): FormattedDailyData[] {
  switch (rangeKey) {
    case "Last 7 Days":
      return filterByDateRange(allData, 7)
    case "Last 30 Days":
      return filterByDateRange(allData, 30)
    case "Last 3 Months":
      return filterBy3Months(allData)
    case "Last 6 Months":
      return filterBy6Months(allData)
    case "1 Year":
      return filterBy1Year(allData)
    default:
      return allData
  }
}
