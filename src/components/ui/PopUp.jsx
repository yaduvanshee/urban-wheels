import React from 'react';
import '../styles/PopUp.css';

export default function PopUp({ title, isOpen, onClose, onSubmit, children, width = 'max-w-md', savetext='Save' }) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className={`popup-box ${width}`}>
        <div className="popup-header">
          <h2>{title}</h2>
          <button className="popup-close" onClick={onClose}>×</button>
        </div>

        <div className="popup-body">{children}</div>

        <div className="popup-footer">
          <button className="popup-submit" onClick={onSubmit}>{savetext}</button>
          <button className="popup-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
