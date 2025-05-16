import React, { useState } from 'react';
import questionsData from '../data/behavioral_questions.json';

function QuestionDisplay({ question, onChange }) {
  const questions = questionsData.behavioral_questions;
  const [selected, setSelected] = useState(question || '');

  const handleSelectChange = (e) => {
    const chosen = e.target.value;
    setSelected(chosen);
    onChange(chosen);
  };

  const handleRandomClick = () => {
    const random = questions[Math.floor(Math.random() * questions.length)];
    setSelected(random);
    onChange(random);
  };

  return (
    <div className="box" style={{ paddingTop: '3.5rem', position: 'relative' }}>
      {/* Top-left dropdown */}
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
        }}
      >
        <select
          value=""
          onChange={handleSelectChange}
          style={{
            width: '160px',
            height: '40px',
            padding: '0 0.5rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            lineHeight: '40px',
            boxSizing: 'border-box',
            appearance: 'auto',
          }}
        >
          <option value="" disabled hidden>
            Pick a Question
          </option>
          {questions.map((q, i) => (
            <option key={i} value={q}>
              {q}
            </option>
          ))}
        </select>
      </div>

      {/* Top-right random button (20px higher) */}
      <div
        style={{
          position: 'absolute',
          top: '-0.25rem', // moved up ~20px
          right: '1rem',
        }}
      >
        <button
          onClick={handleRandomClick}
          style={{
            width: '48px',
            height: '40px',
            backgroundColor: '#22c55e',
            border: 'none',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
            lineHeight: '1',
            boxSizing: 'border-box',
          }}
          aria-label="Pick a random question"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="white"
          >
            <path d="M16 3h5v5h-2V6.41l-5.3 5.3-1.4-1.42L17.59 5H16V3zm-5 5.17 1.41 1.41-6.59 6.59L3 12.41V15h2v-1.59l5-5zM21 19v-5h-5v2h1.59l-5.3 5.3 1.41 1.41L19 17.41V19h2z" />
          </svg>
        </button>
      </div>

      {/* Selected question display */}
      {selected && <p>{selected}</p>}
    </div>
  );
}

export default QuestionDisplay;
