import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InterviewForm() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/question')
      .then(res => setQuestion(res.data.question))
      .catch(err => console.error("Failed to fetch question", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback('');

    try {
      const res = await axios.post('http://localhost:5000/feedback', {
        question,
        response
      });
      setFeedback(res.data.feedback);
    } catch (err) {
      setFeedback('Error getting feedback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>🧠 Behavioral Interview Bot</h2>

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
          <h3>Feedback</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{feedback}</pre>
        </div>
      )}
    </div>
  );
}

export default InterviewForm;
