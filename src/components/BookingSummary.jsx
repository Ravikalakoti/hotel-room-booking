export default function BookingSummary({ room, nights, total }) {
  if (!room || nights === 0) {
    return (
      <div className="summary summary--empty">
        <p>Pick your dates and a room to see the price.</p>
      </div>
    );
  }

  return (
    <div className="summary">
      <h3>Booking summary</h3>

      <dl className="summary__rows">
        <div>
          <dt>Room</dt>
          <dd>
            {room.code} · {room.type}
          </dd>
        </div>

        <div>
          <dt>Nights</dt>
          <dd>{nights}</dd>
        </div>

        <div>
          <dt>Rate</dt>
          <dd>
            ₹{room.pricePerNight.toLocaleString('en-IN')} / night
          </dd>
        </div>
      </dl>

      <div className="summary__total">
        <span>Total</span>
        <strong>₹{total.toLocaleString('en-IN')}</strong>
      </div>
    </div>
  );
}
