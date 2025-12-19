import { useBooking } from "../context/BookingContext";

// Define available equipment and coaches with IDs
const equipmentList = [
  { id: "694478f6a532961fcd0ffcc5", name: "Racket", price: 5 },
  { id: "694478f6a532961fcd0ffcc6", name: "Shoes", price: 3 },
];

const coaches = [
  { id: null, name: "No Coach", price: 0 },
  { id: "694479f9a532961fcd0ffcd6", name: "Coach John", price: 10 },
  { id: "694479f9a532961fcd0ffcd7", name: "Coach Sarah", price: 12 },
  { id: "694479f9a532961fcd0ffcd8", name: "Coach Mike", price: 8 },
];

const BookingSummary = () => {
  const { booking } = useBooking();

  // 1️⃣ Calculate total price
  let total = 0;

  // Court price
  if (booking.courtId) {
    total += booking.courtName?.includes("Indoor") ? 500 : 300;
  }

  // Equipment price & map IDs to names
  const equipmentNames = (booking.equipmentIds || [])
    .map((id) => {
      const eq = equipmentList.find((e) => e.id === id);
      if (eq) {
        total += eq.price;
        return eq.name;
      }
      return null;
    })
    .filter(Boolean);

  // Coach price & name
  let coachName = "No Coach";
  if (booking.coachId) {
    const coach = coaches.find((c) => c.id === booking.coachId);
    if (coach) {
      total += coach.price;
      coachName = coach.name;
    }
  }

  return (
    <div className="mt-6 p-4 border rounded-xl bg-gray-50">
      <h2 className="text-xl font-semibold mb-3">Booking Summary</h2>
      <div className="space-y-1">
        <p>
          <strong>Date:</strong> {booking.date || "-"}
        </p>
        <p>
          <strong>Slot:</strong> {booking.slot || "-"}
        </p>
        <p>
          <strong>Court:</strong> {booking.courtId ? booking.courtName : "-"}
        </p>
        <p>
          <strong>Equipment:</strong>{" "}
          {equipmentNames.length > 0 ? equipmentNames.join(", ") : "None"}
        </p>
        <p>
          <strong>Coach:</strong> {coachName}
        </p>
        <p className="mt-2 font-bold">Total: ${total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default BookingSummary;
