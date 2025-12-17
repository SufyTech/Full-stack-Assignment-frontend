import { useBooking } from "../context/BookingContext";

const equipmentList = [
  { id: "racket", name: "Racket", price: 5 },
  { id: "shoes", name: "Shoes", price: 3 },
];

const EquipmentSelector = () => {
  const { booking, setBooking } = useBooking();

  const toggleEquipment = (eq) => {
    const exists = booking.selectedEquipment.find((e) => e.id === eq.id);
    if (exists) {
      setBooking({
        ...booking,
        selectedEquipment: booking.selectedEquipment.filter(
          (e) => e.id !== eq.id
        ),
      });
    } else {
      setBooking({
        ...booking,
        selectedEquipment: [...booking.selectedEquipment, eq],
      });
    }
  };

  return (
    <div className="mb-4">
      <h2 className="font-bold mb-2 text-lg">Select Equipment</h2>
      <div className="flex gap-2">
        {equipmentList.map((eq) => (
          <button
            key={eq.id}
            onClick={() => toggleEquipment(eq)}
            className={`px-4 py-2 border rounded-full transition-all ${
              booking.selectedEquipment.find((e) => e.id === eq.id)
                ? "bg-green-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {eq.name} (${eq.price})
          </button>
        ))}
      </div>
    </div>
  );
};

export default EquipmentSelector;
