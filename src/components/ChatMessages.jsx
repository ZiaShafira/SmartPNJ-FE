import React from 'react';
import './Chatbot.css';
import logo from "../assets/smart-pnj.png";

const ChatMessages = ({ messages, chatContainerRef }) => {
  const formatMessageText = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary"
        >
          {part}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
};


  return (
    <div
      ref={chatContainerRef}
      className="flex-grow-1 overflow-auto mb-3 p-3 bg-superdash rounded"
    >
      {messages.map((msg, idx) => {
        const isUser = msg.sender === 'user';
        const justifyClass = isUser ? 'justify-content-end' : 'justify-content-start';
        const bubbleClass = isUser ? 'bg-message text-black' : 'bg-white border';
        const avatar = isUser ? '👤' : <img src={logo} alt="bot" className="avatar-img" />;

        return (
          <div key={idx} className={`d-flex ${justifyClass} mb-2`}>
            {!isUser && (
              <div className="me-2">
                <div className="avatar-circle">{avatar}</div>
              </div>
            )}
            <div
              className={`p-3 rounded shadow-sm ${bubbleClass}`}
              style={{
                maxWidth: '100%',
                width: 'fit-content',
              }}
            >
              <div
                style={{
                  whiteSpace: 'pre-wrap',
                  textAlign: !isUser && msg.text.length > 80 ? 'justify' : 'left',
                  lineHeight: '1.5',
                  fontSize: '1rem',
                  wordBreak: 'break-word',
                  padding: '4px 6px',
                }}
              >
                {formatMessageText(msg.text)}
              </div>
            </div>
            {isUser && (
              <div className="ms-2">
                <div className="avatar-circle">{avatar}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
