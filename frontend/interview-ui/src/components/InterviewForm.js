import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackDisplay from './FeedbackDisplay'; // Make sure this path is correct

function InterviewForm() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/question')
      .then(res => setQuestion(res.data.question))
      .catch(err => console.error("Failed to fetch question", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      const res = await axios.post('http://localhost:5000/feedback', {
        question,
        response
      });
      setFeedback(res.data); // Use full JSON object
    } catch (err) {
      setFeedback({ feedback: 'Error getting feedback.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>NXTRound Prep</h2>

      <div className="box">
        <strong>Question:</strong>
        <p>{question}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="box">
          <textarea
            rows={6}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Type your response here..."
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Evaluating...' : 'Submit'}
          </button>

          {loading && <div className="spinner"></div>}
        </div>
      </form>

      {feedback && (
        <div className="box">
          <FeedbackDisplay feedback={feedback} />
        </div>
      )}
    </div>
  );
}

export default InterviewForm;
