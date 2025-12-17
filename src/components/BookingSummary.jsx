import { useBooking } from "../context/BookingContext";

const BookingSummary = () => {
  const { booking } = useBooking();

  return (
    <div className="p-2 border rounded mt-4">
      <h2 className="font-bold mb-2">Booking Summary</h2>
      <p>
        <strong>Date:</strong> {booking.date || "-"}
      </p>
      <p>
        <strong>Slot:</strong> {booking.slot || "-"}
      </p>
      <p>
        <strong>Court:</strong> {booking.selectedCourt?.name || "-"}
      </p>
      <p>
        <strong>Equipment:</strong>{" "}
        {booking.selectedEquipment.map((e) => e.name).join(", ") || "-"}
      </p>
      <p>
        <strong>Coach:</strong> {booking.selectedCoach?.name || "None"}
      </p>
      <p>
        <strong>Total Price:</strong> ${booking.price.toFixed(2)}
      </p>
    </div>
  );
};

export default BookingSummary;
