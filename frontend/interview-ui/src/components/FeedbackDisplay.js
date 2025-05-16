function FeedbackDisplay({ feedback }) {
    console.log(feedback)
    if (!feedback) return null;
  
    const sectionTitles = {
      situation: "situation",
      task: "task",
      action: "action",
      result: "result"
    };
  
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Feedback</h3>
  
        {/* Render each STAR section */}
        {Object.entries(sectionTitles).map(([key, label]) => {
          const section = feedback[key];
          if (!section) return null;
          return (
            <div key={key} style={{ marginBottom: 16 }}>
              <strong>{label} — {section.clarity_score}/10 clarity, {section.completeness_score}/10 completeness</strong>
              <p style={{ whiteSpace: 'pre-wrap', marginTop: 4 }}>{section.response}</p>
            </div>
          );
        })}
  
        {/* Overall Score */}
        <div style={{ marginTop: 20 }}>
          <strong>Overall Score:</strong>
          <p>{feedback.overall_score}</p>
        </div>
  
        {/* Additional Summary Feedback */}
        <div style={{ marginTop: 10 }}>
          <strong>Summary:</strong>
          <p style={{ whiteSpace: 'pre-wrap' }}>{feedback.feedback}</p>
        </div>
      </div>
    );
  }
  
  export default FeedbackDisplay;
  