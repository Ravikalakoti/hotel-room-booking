const OPTIONS = [
  { value: 0, label: 'Any room size' },
  { value: 2, label: '2+ guests' },
  { value: 3, label: '3+ guests' },
  { value: 4, label: '4+ guests' },
];

export default function GuestFilter({ minGuests, onChange }) {
  return (
    <label className="field field--inline">
      <span className="field__label">Guests</span>
      <select value={minGuests} onChange={(event) => onChange(Number(event.target.value))}>
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
