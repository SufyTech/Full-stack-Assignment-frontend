import { useEffect, useState } from "react";
import { useBooking } from "../context/BookingContext";
import DatePicker from "../components/DatePicker";
import SlotSelector from "../components/SlotSelector";
import CourtCard from "../components/CourtCard";
import EquipmentSelector from "../components/EquipmentSelector";
import CoachSelector from "../components/CoachSelector";
import PriceBreakdown from "../components/PriceBreakdown";
import BookingSummary from "../components/BookingSummary";
import { createBooking, addToWaitlist } from "../api/api";

const BookingPage = () => {
  const { booking, setBooking } = useBooking();
  const [message, setMessage] = useState("");

  const handleConfirmBooking = async () => {
    try {
      const res = await createBooking(booking);
      setMessage("✅ Booking confirmed!");
    } catch (err) {
      if (err.response?.status === 409) {
        await addToWaitlist(booking);
        setMessage("⚠ Slot full. Added to waitlist!");
      } else {
        setMessage("❌ Error: " + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Sports Court Booking
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <DatePicker />
            <SlotSelector />
            <CourtCard />
          </div>

          <div>
            <EquipmentSelector />
            <CoachSelector />
            <PriceBreakdown />
          </div>
        </div>

        <BookingSummary />

        <button
          onClick={handleConfirmBooking}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all"
        >
          Confirm Booking
        </button>

        {message && (
          <p className="mt-4 text-center text-lg font-semibold text-red-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
