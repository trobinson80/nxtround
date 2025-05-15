function FeedbackDisplay({ feedback }) {
    if (!feedback) return null;
  
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Feedback</h3>
        <pre>{feedback}</pre>
      </div>
    );
  }
  
  export default FeedbackDisplay;
  