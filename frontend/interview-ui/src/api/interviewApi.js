import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const getQuestion = async () => {
  const res = await axios.get(`${BASE_URL}/question`);
  return res.data.question;
};

export const postResponse = async (question, response) => {
  const res = await axios.post(`${BASE_URL}/feedback`, {
    question,
    response,
  });
  return res.data.feedback;
};
