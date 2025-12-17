import { useEffect, useState } from "react";
import { useBooking } from "../context/BookingContext";
import axios from "axios";

const BookingHistory = ({ userId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/bookings/history`,
          {
            params: { userId },
          }
        );
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookings();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Booking History
        </h1>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings yet.</p>
        ) : (
          <div className="grid gap-4">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="p-4 border rounded-lg hover:shadow-lg transition-all bg-gray-50"
              >
                <p>
                  <strong>Date:</strong> {b.date}
                </p>
                <p>
                  <strong>Slot:</strong> {b.slot}
                </p>
                <p>
                  <strong>Court:</strong> {b.courtName}
                </p>
                <p>
                  <strong>Equipment:</strong>{" "}
                  {b.equipment?.length ? b.equipment.join(", ") : "None"}
                </p>
                <p>
                  <strong>Coach:</strong> {b.coach || "None"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      b.status === "cancelled"
                        ? "text-red-600"
                        : b.status === "waitlist"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {b.status}
                  </span>
                </p>
                <p>
                  <strong>Total Price:</strong> ${b.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
