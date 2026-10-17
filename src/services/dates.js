import dayjs from 'dayjs';

/**
 * Format short date for session history (e.g. "10/15/2026" or locale string)
 */
export function formatSessionDate(timestamp = Date.now()) {
  return dayjs(timestamp).format('M/D/YYYY');
}

/**
 * Format date time for transcript export
 */
export function formatExportDateTime(timestamp = Date.now()) {
  return dayjs(timestamp).format('M/D/YYYY, h:mm:ss A');
}

/**
 * Calculate user daily practice streak based on recorded sessions
 */
export function calculateStreak(historyList = []) {
  if (!historyList || !historyList.length) return 0;

  // Extract unique day strings
  const sessionDays = new Set(historyList.filter(item => item && item.ts).map(item => dayjs(item.ts).format('YYYY-MM-DD')));

  let streak = 0;
  let cursor = dayjs();

  // If today has no session, check if yesterday had one to maintain streak
  if (!sessionDays.has(cursor.format('YYYY-MM-DD'))) {
    cursor = cursor.subtract(1, 'day');
  }

  while (sessionDays.has(cursor.format('YYYY-MM-DD'))) {
    streak++;
    cursor = cursor.subtract(1, 'day');
  }

  return streak;
}
