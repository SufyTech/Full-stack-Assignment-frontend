// src/components/CoachSelector.jsx
import { useBooking } from "../context/BookingContext";

const coaches = [
  { id: null, name: "No Coach", price: 0 },
  { id: "694479f9a532961fcd0ffcd6", name: "Coach John", price: 10 },
  { id: "694479f9a532961fcd0ffcd7", name: "Coach Sarah", price: 12 },
  { id: "694479f9a532961fcd0ffcd8", name: "Coach Mike", price: 8 },
];

const CoachSelector = () => {
  const { booking, setBooking } = useBooking();

  const handleSelectCoach = (id) => {
    setBooking({ ...booking, coachId: id });
  };

  return (
    <div>
      <label className="font-semibold mb-2 block">Select Coach</label>
      <div className="flex flex-wrap gap-2">
        {coaches.map((coach) => (
          <button
            key={coach.id ?? "no-coach"}
            onClick={() => handleSelectCoach(coach.id)}
            className={`px-3 py-1 rounded-lg border ${
              booking.coachId === coach.id
                ? "bg-blue-600 text-white"
                : "border-gray-300"
            }`}
          >
            {coach.name} {coach.price > 0 && `($${coach.price})`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CoachSelector;
