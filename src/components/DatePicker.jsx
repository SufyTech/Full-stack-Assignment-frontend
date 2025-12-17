import { useBooking } from "../context/BookingContext";

const DatePicker = () => {
  const { booking, setBooking } = useBooking();

  return (
    <div className="mb-4">
      <label className="block font-bold mb-1">Select Date:</label>
      <input
        type="date"
        value={booking.date}
        onChange={(e) => setBooking({ ...booking, date: e.target.value })}
        className="border p-2 rounded"
      />
    </div>
  );
};

export default DatePicker;
