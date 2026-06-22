/**
 * Automatic date system utilities for dashboard data generation
 */

interface DailyData {
  date: string
  revenue: number
  impressions: number
  clicks: number
  ctr: string
  ecpm: string
}

interface FormattedDailyData {
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
 * Get today's date in display format
 */
export function getTodayDate(): string {
  return formatDateDisplay(new Date())
}

/**
 * Check if a date entry already exists in the data array
 */
export function hasDataForDate(dataArray: DailyData[], dateStr: string): boolean {
  return dataArray.some((item) => item.date === dateStr)
}

/**
 * Create a zero-value data entry for a specific date
 */
export function createZeroEntry(dateStr: string): DailyData {
  return {
    date: dateStr,
    revenue: 0.0,
    impressions: 0,
    clicks: 0,
    ctr: "0.00%",
    ecpm: "0.00",
  }
}

/**
 * Create a zero-value formatted data entry for reports
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
 * Generate entries from lastDate to today (inclusive)
 * Only adds entries that don't already exist
 */
export function generateMissingEntries(
  existingData: DailyData[],
  lastDateStr: string,
): DailyData[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Parse the last date string
  const lastDate = new Date(lastDateStr)
  lastDate.setHours(0, 0, 0, 0)

  const missingEntries: DailyData[] = []
  const currentDate = new Date(lastDate)
  currentDate.setDate(currentDate.getDate() + 1)

  while (currentDate <= today) {
    const dateStr = formatDateDisplay(currentDate)
    if (!hasDataForDate(existingData, dateStr)) {
      missingEntries.push(createZeroEntry(dateStr))
    }
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return missingEntries
}

/**
 * Generate formatted entries for reports (with currency formatting)
 * Only adds entries that don't already exist
 */
export function generateMissingFormattedEntries(
  existingData: FormattedDailyData[],
  lastDateStr: string,
): FormattedDailyData[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Parse the last date string
  const lastDate = new Date(lastDateStr)
  lastDate.setHours(0, 0, 0, 0)

  const missingEntries: FormattedDailyData[] = []
  const currentDate = new Date(lastDate)
  currentDate.setDate(currentDate.getDate() + 1)

  while (currentDate <= today) {
    const dateStr = formatDateDisplay(currentDate)
    if (!existingData.some((item) => item.date === dateStr)) {
      missingEntries.push(createZeroFormattedEntry(dateStr))
    }
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return missingEntries
}
