const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Parse an ISO date string ("YYYY-MM-DD") as a UTC date. */
export function parseISODate(isoString) {
  const [year, month, day] = isoString.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

/** Get today's date as an ISO string using the local timezone. */
export function todayISODate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
