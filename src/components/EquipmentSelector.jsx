// src/components/EquipmentSelector.jsx
import { useBooking } from "../context/BookingContext";

const equipmentList = [
  { id: "694478f6a532961fcd0ffcc5", name: "Racket", price: 5 },
  { id: "694478f6a532961fcd0ffcc6", name: "Shoes", price: 3 },
];

const EquipmentSelector = () => {
  const { booking, setBooking } = useBooking();

  const toggleEquipment = (id) => {
    let updated = booking.equipmentIds || [];
    if (updated.includes(id)) {
      updated = updated.filter((e) => e !== id);
    } else {
      updated.push(id);
    }
    setBooking({ ...booking, equipmentIds: updated });
  };

  return (
    <div>
      <label className="font-semibold mb-2 block">Select Equipment</label>
      <div className="flex flex-wrap gap-2">
        {equipmentList.map((eq) => (
          <button
            key={eq.id}
            onClick={() => toggleEquipment(eq.id)}
            className={`px-3 py-1 rounded-lg border ${
              booking.equipmentIds?.includes(eq.id)
                ? "bg-blue-600 text-white"
                : "border-gray-300"
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
