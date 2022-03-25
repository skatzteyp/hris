import React from 'react';
import './LoadingMessage.scss';

const LoadingMessage = ({ text }) => {
  return (
    <div className="loading-message">
      <div className="loading-wrapper">
        <span className="loading-circle"></span>
      </div>
      {text}
    </div>
  )
}

export default LoadingMessage;