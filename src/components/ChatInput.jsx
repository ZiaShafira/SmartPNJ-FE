import React, { useState } from 'react';

const ChatInput = ({ question, setQuestion, handleSubmit, loading }) => {
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!question.trim()) {
      setError('Input tidak boleh kosong.');
      return;
    }

    setError('');
    handleSubmit(e);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="d-flex gap-2 flex-column">
        <div className="d-flex gap-2">
          <textarea
            rows="1"
            className="form-control"
            placeholder="Tulis pesan..."
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              setError('');
            }}
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn-dark" type="submit" disabled={loading}>
            {loading ? 'Mengirim...' : 'Kirim'}
          </button>
        </div>
        {error && <div className="text-danger" style={{ fontSize: '0.9rem' }}>{error}</div>}
      </form>
    </>
  );
};

export default ChatInput;
