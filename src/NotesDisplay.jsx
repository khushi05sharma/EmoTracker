import React, { useState } from "react";
import "./NotesDisplay.css";

const NotesDisplay = ({ notes, onMoodHover, onDeleteNote }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDeleteClick = (index, e) => {
    e.stopPropagation(); // Prevent card hover from interfering
    setDeleteConfirm(index);
  };

  const confirmDelete = (index, e) => {
    e.stopPropagation();
    console.log('🗑️ Confirming delete for index:', index);
    onDeleteNote(index);
    setDeleteConfirm(null);
  };

  const cancelDelete = (e) => {
    e.stopPropagation();
    setDeleteConfirm(null);
  };

  return (
    <div className="notes-display-container">
      {notes.length > 0 ? (
        notes.map((note, index) => (
          <div 
            key={index} 
            className="note-card"
            onMouseEnter={() => deleteConfirm !== index && onMoodHover(note.mood)}
            onMouseLeave={() => deleteConfirm !== index && onMoodHover(null)}
          >
            {deleteConfirm === index ? (
              <div className="delete-confirmation">
                <p>Delete this note?</p>
                <div className="delete-buttons">
                  <button 
                    className="confirm-delete-btn"
                    onClick={(e) => confirmDelete(index, e)}
                  >
                    Yes
                  </button>
                  <button 
                    className="cancel-delete-btn"
                    onClick={cancelDelete}
                  >
                    No
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button 
                  className="delete-btn"
                  onClick={(e) => handleDeleteClick(index, e)}
                  aria-label="Delete note"
                >
                  ×
                </button>
                <h3>{note.date}</h3>
                <h4>{note.mood}</h4>
                <p>{note.text}</p>
              </>
            )}
          </div>
        ))
      ) : (
        <p className="no-notes">No notes available for the selected date.</p>
      )}
    </div>
  );
};

export default NotesDisplay;