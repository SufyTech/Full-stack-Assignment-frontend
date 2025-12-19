import { useBooking } from "../context/BookingContext";

const CourtCard = ({ court, highlight, clearHighlight }) => {
  const { booking, setBooking } = useBooking();

  const handleSelect = () => {
    setBooking({ ...booking, courtId: court._id, courtName: court.name });
    if (clearHighlight) clearHighlight();
  };

  const isSelected = booking.courtId === court._id;

  return (
    <div
      onClick={handleSelect}
      className={`court-card p-4 border rounded-xl cursor-pointer transition-all ${
        isSelected
          ? "border-blue-600 bg-blue-100 text-blue-800"
          : highlight
          ? "border-red-500 bg-white text-gray-800"
          : "border-gray-300 bg-white text-gray-800"
      }`}
    >
      <h3 className="font-semibold">{court.name}</h3>
      <p className="text-sm">{court.type}</p>
    </div>
  );
};

export default CourtCard;
