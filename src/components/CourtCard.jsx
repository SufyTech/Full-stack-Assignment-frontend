import { useBooking } from "../context/BookingContext";

const courts = [
  { id: "1", name: "Indoor Court 1", type: "indoor", basePrice: 20 },
  { id: "2", name: "Indoor Court 2", type: "indoor", basePrice: 20 },
  { id: "3", name: "Outdoor Court 1", type: "outdoor", basePrice: 15 },
  { id: "4", name: "Outdoor Court 2", type: "outdoor", basePrice: 15 },
];

const CourtCard = () => {
  const { booking, setBooking } = useBooking();

  return (
    <div className="mb-4">
      <h2 className="font-bold mb-2 text-lg">Select Court</h2>
      <div className="grid grid-cols-2 gap-4">
        {courts.map((court) => (
          <div
            key={court.id}
            onClick={() => setBooking({ ...booking, selectedCourt: court })}
            className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-lg ${
              booking.selectedCourt?.id === court.id
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-white"
            }`}
          >
            <h3 className="font-semibold">{court.name}</h3>
            <p>Type: {court.type}</p>
            <p>Base Price: ${court.basePrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourtCard;
