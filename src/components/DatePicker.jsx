// src/components/DatePicker.jsx
import { useBooking } from "../context/BookingContext";

const DatePicker = ({ highlight, clearHighlight }) => {
  const { booking, setBooking } = useBooking();

  const handleChange = (e) => {
    const selectedDate = e.target.value; // YYYY-MM-DD
    setBooking({ ...booking, date: selectedDate });
    if (clearHighlight) clearHighlight();
  };

  return (
    <div>
      <label className="font-semibold mb-2 block">Select Date</label>
      <input
        type="date"
        value={booking.date || ""}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-lg ${
          highlight ? "border-red-500" : "border-gray-300"
        }`}
      />
    </div>
  );
};

export default DatePicker;
