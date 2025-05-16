function getScoreColorClass(score) {
    if (score <= 3) return 'text-red';
    if (score <= 7) return 'text-yellow';
    return 'text-green';
  }
  
  function FeedbackDisplay({ feedback }) {
    if (!feedback) return null;
  
    const sectionTitles = {
      situation: "Situation",
      task: "Task",
      action: "Action",
      result: "Result"
    };
  
    const sectionKeys = Object.keys(sectionTitles);
    const clarityScores = sectionKeys.map(k => feedback[k]?.clarity_score || 0);
    const completenessScores = sectionKeys.map(k => feedback[k]?.completeness_score || 0);
  
    const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
  
    const avgClarity = Number(avg(clarityScores).toFixed(2));
    const avgCompleteness = Number(avg(completenessScores).toFixed(2));
  
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Feedback</h3>
  
        {sectionKeys.map(key => {
          const section = feedback[key];
          if (!section) return null;
          return (
            <div key={key} className="box">
              <h4>{sectionTitles[key]}</h4>
              <p>
                <strong>Clarity:</strong>{' '}
                <span className={getScoreColorClass(section.clarity_score)}>
                  {section.clarity_score}/10
                </span>
              </p>
              <p>
                <strong>Completeness:</strong>{' '}
                <span className={getScoreColorClass(section.completeness_score)}>
                  {section.completeness_score}/10
                </span>
              </p>
              <p style={{ whiteSpace: 'pre-wrap' }}>{section.response}</p>
            </div>
          );
        })}
  
        <div className="box">
          <h4>Overall Score</h4>
          <p>
            <strong>Clarity:</strong>{' '}
            <span className={getScoreColorClass(avgClarity)}>{avgClarity}/10</span>
          </p>
          <p>
            <strong>Completeness:</strong>{' '}
            <span className={getScoreColorClass(avgCompleteness)}>{avgCompleteness}/10</span>
          </p>
        </div>
  
        <div className="box">
          <h4>Summary</h4>
          <p style={{ whiteSpace: 'pre-wrap' }}>{feedback.feedback}</p>
        </div>
      </div>
    );
  }
  
  export default FeedbackDisplay;
  