import RoomCard from './RoomCard.jsx';

export default function RoomList({ rooms, selectedRoomCode, checkAvailability, onSelect }) {
  if (rooms.length === 0) {
    return <p className="empty-state">No rooms match that guest count.</p>;
  }

  return (
    <div className="room-list">
      {rooms.map((room) => (
        <RoomCard
          key={room.code}
          room={room}
          isSelected={room.code === selectedRoomCode}
          isAvailable={checkAvailability(room.code)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
