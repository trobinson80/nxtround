function ResponseInput({ value, onChange, onSubmit, loading }) {
    return (
      <div>
        <textarea
          rows={6}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: '100%' }}
          placeholder="Type your response..."
        />
        <button onClick={onSubmit} disabled={loading}>
          {loading ? 'Analyzing...' : 'Submit'}
        </button>
      </div>
    );
  }
  
  export default ResponseInput;
  