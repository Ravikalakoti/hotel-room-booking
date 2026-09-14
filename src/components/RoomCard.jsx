export default function RoomCard({ room, isSelected, isAvailable, onSelect }) {
  const disabled = !isAvailable;

  return (
    <button
      type="button"
      className={`room-card ${isSelected ? 'room-card--selected' : ''} ${
        disabled ? 'room-card--disabled' : ''
      }`}
      onClick={() => onSelect(room.code)}
      disabled={disabled}
      aria-pressed={isSelected}
    >
      <div className="room-card__top">
        <span className="room-card__code">{room.code}</span>
        {disabled && <span className="room-card__badge">Booked for these dates</span>}
      </div>
      <h3 className="room-card__type">{room.type}</h3>
      <dl className="room-card__meta">
        <div>
          <dt>Rate</dt>
          <dd>₹{room.pricePerNight.toLocaleString('en-IN')} / night</dd>
        </div>
        <div>
          <dt>Sleeps</dt>
          <dd>{room.maxGuests} guests</dd>
        </div>
      </dl>
    </button>
  );
}
