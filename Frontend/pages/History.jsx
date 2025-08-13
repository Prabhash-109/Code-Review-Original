import React, { useEffect, useState } from 'react';
import './History.css';

const History = ({ theme }) => {
  const [history, setHistory] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('codeReviewHistory')) || [];
    setHistory(stored);
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const deleteEntry = (index) => {
    const updatedHistory = [...history];
    updatedHistory.splice(index, 1);
    setHistory(updatedHistory);
    localStorage.setItem('codeReviewHistory', JSON.stringify(updatedHistory));
  };

  const getFirstLine = (code) => {
    const firstLine = code.trim().split('\n')[0];
    return firstLine.length > 50 ? firstLine.slice(0, 50) + '...' : firstLine;
  };

  return (
    <div className={`history-wrapper ${theme}`}>
      <h2>📜 Code Review History</h2>
      {history.length === 0 ? (
        <p className="empty-msg">No history yet.</p>
      ) : (
        history.map((entry, index) => (
          <div key={index} className="history-entry">
            <div className="entry-header" onClick={() => toggleExpand(index)}>
              <span className="entry-title">{getFirstLine(entry.code)}</span>
              <button className="delete-btn" onClick={(e) => {
                e.stopPropagation();
                deleteEntry(index);
              }}>🗑️</button>
            </div>

            {expandedIndex === index && (
              <div className="full-entry">
                <div className="block">
                  <strong>Code:</strong>
                  <pre><code>{entry.code}</code></pre>
                </div>
                <div className="block">
                  <strong>AI Review:</strong>
                  <pre><code>{entry.result}</code></pre>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default History;
