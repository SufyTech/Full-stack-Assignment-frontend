import { createContext, useContext, useState, useEffect } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [booking, setBooking] = useState({
    userName: "",
    courtId: null,
    date: null,
    slot: null,
    equipmentIds: [],
    coachId: null,
  });

  // 🔐 Load userName from localStorage on page refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("userName");
    if (savedUser) {
      setBooking((prev) => ({
        ...prev,
        userName: savedUser,
      }));
    }
  }, []);

  // 💾 Save userName whenever it changes
  useEffect(() => {
    if (booking.userName) {
      localStorage.setItem("userName", booking.userName);
    }
  }, [booking.userName]);

  return (
    <BookingContext.Provider value={{ booking, setBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
