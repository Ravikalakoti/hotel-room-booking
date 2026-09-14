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

/** Calculate the number of nights between check-in and check-out. */
export function calculateNights(checkIn, checkOut) {
  const nights = (parseISODate(checkOut) - parseISODate(checkIn)) / MS_PER_DAY;
  return Math.round(nights);
}

/** Calculate the total price for the stay. */
export function calculateTotal(nights, pricePerNight) {
  return nights * pricePerNight;
}

/**
 * Check whether two booking date ranges overlap.
 * The checkout date is exclusive, so another guest can check in that day.
 */
function rangesOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

/** Check whether a room is available for the selected date range. */
export function isRoomAvailable(roomCode, checkIn, checkOut, bookings) {
  if (!checkIn || !checkOut) return true;

  const start = parseISODate(checkIn);
  const end = parseISODate(checkOut);

  return !bookings.some((booking) => {
    if (booking.roomCode !== roomCode) return false;

    return rangesOverlap(
      start,
      end,
      parseISODate(booking.checkIn),
      parseISODate(booking.checkOut)
    );
  });
}

/**
 * Validate the booking selection and calculate the stay details.
 * Keeps the booking rules in one place so they are not duplicated in the UI.
 *
 * @param {Object} params
 * @param {string|null} params.checkIn Selected check-in date.
 * @param {string|null} params.checkOut Selected check-out date.
 * @param {Object|null} params.room Selected room.
 * @param {Array} params.bookings Existing bookings.
 * @returns {{ valid: boolean, errors: string[], nights: number, total: number }}
 */
export function validateBooking({ checkIn, checkOut, room, bookings = [] }) {
  const errors = [];

  if (!checkIn || !checkOut) {
    errors.push('Select both a check-in and a check-out date.');
  } else {
    const today = todayISODate();

    if (checkIn < today) {
      errors.push('Check-in date cannot be in the past.');
    }

    if (checkOut <= checkIn) {
      errors.push('Check-out date must be after the check-in date.');
    }
  }

  if (!room) {
    errors.push('Select a room.');
  }

  const canCalculate =
    checkIn && checkOut && checkOut > checkIn && room && errors.length === 0;

  const nights = canCalculate ? calculateNights(checkIn, checkOut) : 0;
  const total = canCalculate ? calculateTotal(nights, room.pricePerNight) : 0;

  return { valid: errors.length === 0, errors, nights, total };
}
