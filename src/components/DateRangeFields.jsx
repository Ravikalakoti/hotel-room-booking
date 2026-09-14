import { todayISODate } from '../utils/booking.js';

export default function DateRangeFields({ checkIn, checkOut, onCheckInChange, onCheckOutChange }) {
  const today = todayISODate();

  return (
    <div className="date-fields">
      <label className="field">
        <span className="field__label">Check-in</span>
        <input
          type="date"
          value={checkIn}
          min={today}
          onChange={(event) => onCheckInChange(event.target.value)}
        />
      </label>
      <label className="field">
        <span className="field__label">Check-out</span>
        <input
          type="date"
          value={checkOut}
          min={checkIn || today}
          onChange={(event) => onCheckOutChange(event.target.value)}
        />
      </label>
    </div>
  );
}
