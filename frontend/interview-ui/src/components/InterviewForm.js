import React, { useState } from 'react';
import FeedbackDisplay from './FeedbackDisplay';
import QuestionDisplay from './QuestionDisplay';
import questionsData from '../data/behavioral_questions.json';

const allQuestions = questionsData.behavioral_questions;
const getRandomQuestion = () =>
  allQuestions[Math.floor(Math.random() * allQuestions.length)];

function InterviewForm() {
  const [question, setQuestion] = useState(getRandomQuestion()); // SET RANDOM QUESTION INITIALLY
  const [response, setResponse] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      const res = await fetch('http://localhost:5000/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, response }),
      });
      const data = await res.json();
      setFeedback(data);
    } catch (err) {
      setFeedback({ feedback: 'Error getting feedback.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>NXTRound Prep</h2>

      <QuestionDisplay question={question} onChange={setQuestion} />

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
