import React from "react";
import "./NotesDisplay.css";

const NotesDisplay = ({ notes }) => {
  return (
    <div className="notes-display-container">
      {notes.length > 0 ? (
        notes.map((note, index) => (
          <div key={index} className="note-card">
            <h3>{note.date}</h3>
            <h4>{note.mood}</h4>
            <p>{note.text}</p>
          </div>
        ))
      ) : (
        <p className="no-notes">No notes available for the selected date.</p>
      )}
    </div>
  );
};

export default NotesDisplay;
