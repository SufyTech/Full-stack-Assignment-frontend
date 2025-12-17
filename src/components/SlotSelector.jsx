import { useBooking } from "../context/BookingContext";

const slots = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

const SlotSelector = () => {
  const { booking, setBooking } = useBooking();

  return (
    <div className="mb-4">
      <label className="block font-bold mb-1">Select Slot:</label>
      <select
        value={booking.slot}
        onChange={(e) => setBooking({ ...booking, slot: e.target.value })}
        className="border p-2 rounded w-full"
      >
        <option value="">-- Choose Slot --</option>
        {slots.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SlotSelector;
