import axios from 'axios';

const API_BASE_URL = 'https://admin.nordhilfe.vision2co.de/api/';

export const getTrainingSessions = async () => {
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
}

export const getLocations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}locations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
}