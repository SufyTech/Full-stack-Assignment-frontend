import { useState, useEffect } from "react";
import { useBooking } from "../context/BookingContext";
import axios from "axios";

// Use your live backend URL
const BASE_URL = "https://court-backend-5ifj.onrender.com";

const BookingPage = () => {
  const { booking, setBooking } = useBooking();
  const [courts, setCourts] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch courts, equipment, and coaches from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courtsRes, equipmentRes, coachesRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/courts`),
          axios.get(`${BASE_URL}/api/equipment`),
          axios.get(`${BASE_URL}/api/coaches`),
        ]);
        setCourts(courtsRes.data);
        setEquipmentList(equipmentRes.data);
        setCoaches(coachesRes.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, []);

  const handleConfirmBooking = async () => {
    if (!booking.date || !booking.slot || !booking.courtId) {
      setMessage("❌ Please select Date, Slot, and Court!");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/bookings`, {
        userName: booking.userName || "Guest",
        courtId: booking.courtId,
        date: booking.date,
        slot: booking.slot,
        equipmentIds: booking.equipmentIds || [],
        coachId: booking.coachId || null,
      });

      setMessage(res.data.message);
    } catch (err) {
      setMessage("❌ Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-3 py-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
          Sports Court Booking
        </h1>

        {/* Select Date and Slot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="date"
              value={booking.date || ""}
              onChange={(e) =>
                setBooking((prev) => ({ ...prev, date: e.target.value }))
              }
              className="w-full p-2 border rounded-md mb-4"
            />
            <select
              value={booking.slot || ""}
              onChange={(e) =>
                setBooking((prev) => ({ ...prev, slot: e.target.value }))
              }
              className="w-full p-2 border rounded-md mb-4"
            >
              <option value="">Select Slot</option>
              {[
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
              ].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {/* Courts */}
            <div className="grid grid-cols-2 gap-2">
              {courts.map((court) => (
                <button
                  key={court._id}
                  onClick={() =>
                    setBooking((prev) => ({ ...prev, courtId: court._id }))
                  }
                  className={`p-2 border rounded ${
                    booking.courtId === court._id
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                >
                  {court.name} ({court.type})
                </button>
              ))}
            </div>
          </div>

          {/* Equipment & Coach */}
          <div className="space-y-4">
            <div>
              <h2 className="font-bold mb-2">Select Equipment</h2>
              {equipmentList.map((eq) => (
                <label key={eq._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={booking.equipmentIds?.includes(eq._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setBooking((prev) => ({
                          ...prev,
                          equipmentIds: [...(prev.equipmentIds || []), eq._id],
                        }));
                      } else {
                        setBooking((prev) => ({
                          ...prev,
                          equipmentIds: prev.equipmentIds.filter(
                            (id) => id !== eq._id
                          ),
                        }));
                      }
                    }}
                  />
                  {eq.name} (${eq.pricePerHour})
                </label>
              ))}
            </div>

            <div>
              <h2 className="font-bold mb-2">Select Coach</h2>
              <select
                value={booking.coachId || ""}
                onChange={(e) =>
                  setBooking((prev) => ({
                    ...prev,
                    coachId: e.target.value || null,
                  }))
                }
                className="w-full p-2 border rounded"
              >
                <option value="">No Coach</option>
                {coaches.map((coach) => (
                  <option key={coach._id} value={coach._id}>
                    {coach.name} (${coach.hourlyRate})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirmBooking}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl"
        >
          Confirm Booking
        </button>

        {message && (
          <p className="mt-4 text-center font-semibold text-red-500">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
