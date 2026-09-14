import { useMemo, useState } from 'react';
import StepSection from './components/StepSection.jsx';
import DateRangeFields from './components/DateRangeFields.jsx';
import GuestFilter from './components/GuestFilter.jsx';
import RoomList from './components/RoomList.jsx';
import BookingSummary from './components/BookingSummary.jsx';
import { ROOMS, EXISTING_BOOKINGS } from './data/rooms.js';
import { isRoomAvailable, validateBooking } from './utils/booking.js';

export default function App() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [selectedRoomCode, setSelectedRoomCode] = useState(null);
  const [minGuests, setMinGuests] = useState(0);

  const selectedRoom = useMemo(
    () => ROOMS.find((room) => room.code === selectedRoomCode) ?? null,
    [selectedRoomCode]
  );

  const visibleRooms = useMemo(
    () => ROOMS.filter((room) => room.maxGuests >= minGuests),
    [minGuests]
  );

  const checkAvailability = (roomCode) =>
    isRoomAvailable(roomCode, checkIn, checkOut, EXISTING_BOOKINGS);

  const { errors, nights, total } = validateBooking({
    checkIn: checkIn || null,
    checkOut: checkOut || null,
    room: selectedRoom,
    bookings: EXISTING_BOOKINGS,
  });

  const hasStartedSelecting = Boolean(checkIn || checkOut || selectedRoomCode);

  return (
    <div className="page">
      <header className="page__header">
        <h1>Book Your Room</h1>
        <p className="page__subtitle">
          Choose your dates, pick a room, and we&rsquo;ll work out the total.
        </p>
      </header>

      <main className="layout">
        <div className="layout__main">
          <StepSection number={1} title="Choose your dates">
            <DateRangeFields
              checkIn={checkIn}
              checkOut={checkOut}
              onCheckInChange={setCheckIn}
              onCheckOutChange={setCheckOut}
            />
          </StepSection>

          <StepSection number={2} title="Pick a room">
            <GuestFilter minGuests={minGuests} onChange={setMinGuests} />
            <RoomList
              rooms={visibleRooms}
              selectedRoomCode={selectedRoomCode}
              checkAvailability={checkAvailability}
              onSelect={setSelectedRoomCode}
            />
          </StepSection>
        </div>

        <aside className="layout__aside">
          <StepSection number={3} title="Review">
            <BookingSummary
              room={selectedRoom}
              nights={nights}
              total={total}
              errors={errors}
              hasStartedSelecting={hasStartedSelecting}
            />
          </StepSection>
        </aside>
      </main>
    </div>
  );
}
