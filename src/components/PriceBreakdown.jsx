import { useEffect } from "react";
import { useBooking } from "../context/BookingContext";

const PriceBreakdown = () => {
  const { booking, setBooking } = useBooking();

  useEffect(() => {
    if (!booking.selectedCourt) return;

    let price = booking.selectedCourt.basePrice;

    booking.selectedEquipment.forEach((eq) => {
      price += eq.price;
    });

    if (booking.selectedCoach) price += booking.selectedCoach.fee;

    const hour = parseInt(booking.slot.split(":")[0]);
    const day = new Date(booking.date).getDay();

    if (hour >= 18 && hour <= 21) price *= 1.2; // peak
    if (day === 0 || day === 6) price *= 1.1; // weekend
    if (booking.selectedCourt.type === "indoor") price *= 1.1; // indoor

    setBooking((prev) => ({ ...prev, price }));
  }, [
    booking.selectedCourt,
    booking.selectedEquipment,
    booking.selectedCoach,
    booking.slot,
    booking.date,
  ]);

  return (
    <div className="p-4 border rounded-lg bg-gray-50 mb-4">
      <h2 className="font-bold mb-2 text-lg">Price Breakdown</h2>
      <p className="text-xl font-semibold">
        Total: ${booking.price.toFixed(2)}
      </p>
    </div>
  );
};

export default PriceBreakdown;
