import axios from 'axios';

const API_BASE_URL = 'https://admin.nordhilfe.vision2co.de/api/';

export const getAvailableTrainingSessions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}trainingSessions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching training sessions:', error);
    throw error;
  }
};

export const getCourses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}courses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const getLocations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}locations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};

export interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  birthDate: string;
  course: string;
  date: string;
  paymentMethod: string;
  returnUrl: string;
  captchaToken: string;
}

export const createBooking = async (bookingData: BookingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}bookings`, bookingData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Fehler bei der Buchungsanfrage:', error);
    throw error;
  }
};

export const completePaypalBooking = async (token: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}bookings/paypal-complete`, {
      token,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Fehler bei PayPal-Bestätigung:', error);
    throw error;
  }
};