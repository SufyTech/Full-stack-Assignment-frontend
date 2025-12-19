import { useEffect, useState } from "react";
import axios from "axios";

// Live backend URL
const BASE_URL = "https://court-backend-5ifj.onrender.com";

const BookingHistory = () => {
  // Get username from localStorage
  const [userName] = useState(localStorage.getItem("userName") || "");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Convert INR -> USD
  const convertToUSD = (inrAmount) => {
    const exchangeRate = 0.012;
    return (inrAmount * exchangeRate).toFixed(2);
  };

  // Fetch booking history
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/bookings/history`, {
        params: { userName },
      });
      setBookings(res.data);
      setError(null);
    } catch (err) {
      console.error("Booking history error:", err.response || err);
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userName) fetchBookings();
  }, [userName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading booking history...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!userName) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No user found. Please enter your name in Booking Page.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-4 sm:px-6 sm:py-6">
      <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-600">
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings found.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="p-4 sm:p-5 border rounded-xl bg-gray-50 hover:shadow-md transition"
              >
                {/* Booking Date & Slot */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {new Date(b.date).toDateString()}
                    </p>
                    <p className="text-sm text-gray-500">Slot: {b.slot}</p>
                  </div>
                  <span
                    className={`w-fit px-3 py-1 rounded-full text-xs font-bold ${
                      b.status === "cancelled"
                        ? "bg-red-100 text-red-600"
                        : b.status === "waitlisted"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {b.status.toUpperCase()}
                  </span>
                </div>

                {/* Court / Equipment / Coach */}
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Court:</strong> {b.courtId?.name || "Unknown"}
                  </p>
                  {b.status === "confirmed" && (
                    <>
                      <p>
                        <strong>Equipment:</strong>{" "}
                        {b.equipmentIds?.length
                          ? b.equipmentIds.map((eq) => eq.name).join(", ")
                          : "None"}
                      </p>
                      <p>
                        <strong>Coach:</strong> {b.coachId?.name || "None"}
                      </p>
                    </>
                  )}
                </div>

                {/* Price / Actions */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4">
                  {/* Price */}
                  <p className="font-bold text-gray-800">
                    {b.status === "confirmed"
                      ? `$${convertToUSD(b.totalPrice)}`
                      : b.status === "waitlisted"
                      ? "$0.00"
                      : ""}
                  </p>

                  {/* Cancel button */}
                  {b.status === "confirmed" && (
                    <button
                      onClick={async () => {
                        if (!window.confirm("Cancel this booking?")) return;
                        try {
                          await axios.patch(
                            `${BASE_URL}/api/bookings/${b._id}/cancel`
                          );
                          fetchBookings();
                        } catch {
                          alert("Failed to cancel booking");
                        }
                      }}
                      className="w-full sm:w-auto text-sm px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                    >
                      Cancel
                    </button>
                  )}

                  {/* Waitlisted message */}
                  {b.status === "waitlisted" && (
                    <p className="text-yellow-700 text-sm font-medium">
                      Court already booked. You are in waitlist.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
