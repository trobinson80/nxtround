function FeedbackDisplay({ feedback }) {
    if (!feedback) return null;
  
    const sectionTitles = {
      situation: "Situation",
      task: "Task",
      action: "Action",
      result: "Result"
    };
  
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Feedback</h3>
  
        {Object.entries(sectionTitles).map(([key, label]) => {
          const section = feedback[key];
          if (!section) return null;
          return (
            <div key={key} className="box">
              <h4>{label}</h4>
              <p><strong>Clarity:</strong> {section.clarity_score}/10</p>
              <p><strong>Completeness:</strong> {section.completeness_score}/10</p>
              <p style={{ whiteSpace: 'pre-wrap' }}>{section.response}</p>
            </div>
          );
        })}
  
        <div className="box">
          <h4>Overall Score</h4>
          <p>{feedback.overall_score}</p>
        </div>
  
        <div className="box">
          <h4>Summary</h4>
          <p style={{ whiteSpace: 'pre-wrap' }}>{feedback.feedback}</p>
        </div>
      </div>
    );
  }
  
  export default FeedbackDisplay;
  