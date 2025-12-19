// src/components/SlotSelector.jsx
import { useBooking } from "../context/BookingContext";

const availableSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

const SlotSelector = ({ highlight, clearHighlight }) => {
  const { booking, setBooking } = useBooking();

  const handleSelect = (slot) => {
    setBooking({ ...booking, slot });
    if (clearHighlight) clearHighlight();
  };

  return (
    <div>
      <label className="font-semibold mb-2 block">Select Slot</label>
      <div className="flex flex-wrap gap-2">
        {availableSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => handleSelect(slot)}
            className={`px-3 py-1 rounded-lg border ${
              booking.slot === slot
                ? "bg-blue-600 text-white"
                : highlight
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlotSelector;
