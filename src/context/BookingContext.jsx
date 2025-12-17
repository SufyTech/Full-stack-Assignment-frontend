import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [booking, setBooking] = useState({
    date: "",
    slot: "",
    selectedCourt: null,
    selectedEquipment: [],
    selectedCoach: null,
    price: 0,
    waitlist: false,
  });

  return (
    <BookingContext.Provider value={{ booking, setBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
