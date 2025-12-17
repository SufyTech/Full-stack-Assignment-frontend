import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getAvailability = (courtId, date) =>
  axios.get(`${BASE_URL}/bookings/availability`, { params: { courtId, date } });

export const createBooking = (bookingData) =>
  axios.post(`${BASE_URL}/bookings`, bookingData);

export const getWaitlist = (courtId, date, slot) =>
  axios.get(`${BASE_URL}/bookings/waitlist`, {
    params: { courtId, date, slot },
  });

export const addToWaitlist = (data) =>
  axios.post(`${BASE_URL}/bookings/waitlist/test`, data); // for testing
