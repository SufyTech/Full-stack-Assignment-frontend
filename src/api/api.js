// src/api/api.js
import axios from "axios";

// Use the live backend URL from environment variables
const BASE_URL = `${process.env.REACT_APP_API_URL}/api/bookings`;

/**
 * Create a new booking
 * @param {Object} bookingData
 *   {
 *     userName: string,
 *     courtId: string,        // MongoDB ObjectId
 *     date: string,           // "YYYY-MM-DD"
 *     slot: string,           // "HH:MM"
 *     equipmentIds: string[], // Array of ObjectIds
 *     coachId: string | null  // ObjectId or null
 *   }
 */
export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(BASE_URL, bookingData);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};
