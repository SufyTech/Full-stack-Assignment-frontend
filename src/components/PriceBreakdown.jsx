// src/components/PriceBreakdown.jsx
import { useBooking } from "../context/BookingContext";
import { useEffect, useState } from "react";

const peakHours = ["18:00", "19:00", "20:00"];
const weekendMultiplier = 1.2;
const peakMultiplier = 1.5;
const indoorMultiplier = 1.2;

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

const PriceBreakdown = () => {
  const { booking } = useBooking();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!booking.courtId || !booking.slot || !booking.date) {
      setTotalPrice(0);
      return;
    }

    let basePrice = booking.courtName?.includes("Indoor") ? 500 : 300;

    // Determine peak hours
    let multiplier = 1;
    if (peakHours.includes(booking.slot)) multiplier *= peakMultiplier;

    // Check weekend
    const day = new Date(booking.date).getDay(); // 0 = Sunday, 6 = Saturday
    if (day === 0 || day === 6) multiplier *= weekendMultiplier;

    // Indoor premium
    if (booking.courtName?.includes("Indoor")) multiplier *= indoorMultiplier;

    let price = basePrice * multiplier;

    // Add equipment prices
    if (booking.equipmentIds?.length > 0) {
      for (let id of booking.equipmentIds) {
        const eq = equipmentList.find((e) => e.id === id);
        if (eq) price += eq.price;
      }
    }

    // Add coach price
    if (booking.coachId) {
      const coach = coaches.find((c) => c.id === booking.coachId);
      if (coach) price += coach.price;
    }

    setTotalPrice(price);
  }, [booking]);

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="font-semibold mb-2">Price Breakdown</h3>
      <p>Total: ${totalPrice.toFixed(2)}</p>
    </div>
  );
};

export default PriceBreakdown;
