import { useBooking } from "../context/BookingContext";

const coaches = [
  { id: "c1", name: "Coach John", fee: 10 },
  { id: "c2", name: "Coach Sarah", fee: 12 },
  { id: "c3", name: "Coach Mike", fee: 8 },
];

const CoachSelector = () => {
  const { booking, setBooking } = useBooking();

  return (
    <div className="mb-4">
      <h2 className="font-bold mb-2 text-lg">Select Coach (optional)</h2>
      <select
        value={booking.selectedCoach?.id || ""}
        onChange={(e) =>
          setBooking({
            ...booking,
            selectedCoach: coaches.find((c) => c.id === e.target.value) || null,
          })
        }
        className="border p-2 rounded w-full"
      >
        <option value="">-- No Coach --</option>
        {coaches.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} (${c.fee})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CoachSelector;
