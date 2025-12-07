import React from 'react';
import './DarkModeToggle.css';

export default function DarkModeToggle({ isDarkMode, onToggle }) {
  return (
    <button 
      className="dark-mode-toggle" 
      onClick={onToggle}
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
}