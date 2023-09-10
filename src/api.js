// src/api.js
import axios from 'axios';

const BASE_URL = 'https://1t6wp6obfh.execute-api.us-east-1.amazonaws.com/dev';

// Consulta la pregunta inicial
export const getInitialQuestion = async (userID) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userID}/questions/initial-question`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Guarda el evento del click asociandolo al usuario
export const postQuestion = async (userID, questionID) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/${userID}/questions/${questionID}`, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

