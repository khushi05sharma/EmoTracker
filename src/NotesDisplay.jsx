import React, { useState } from "react";
import "./NotesDisplay.css";

const NotesDisplay = ({ notes, onMoodHover, onDeleteNote }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  // to track which note card has its AI insight expanded
  const [expandedInsight, setExpandedInsight] = useState(null);

  const handleDeleteClick = (index, e) => {
    e.stopPropagation(); // Prevent card hover from interfering
    setDeleteConfirm(index);
  };

  const confirmDelete = (index, e) => {
    e.stopPropagation();
    console.log("🗑️ Confirming delete for index:", index);
    onDeleteNote(index);
    setDeleteConfirm(null);
  };

  const cancelDelete = (e) => {
    e.stopPropagation();
    setDeleteConfirm(null);
  };

  const toggleInsight = (index, e) => {
    e.stopPropagation();
    // open selected insight or close it if already open
    setExpandedInsight(expandedInsight === index ? null : index);
  };

  return (
    <div className="notes-display-container">
      {notes.length > 0 ? (
        notes.map((note, index) => (
          <div
            key={index}
            className={`note-card ${expandedInsight === index ? "insight-open" : ""}`}
            onMouseEnter={() =>
              deleteConfirm !== index &&
              expandedInsight !== index &&
              onMoodHover(note.mood)
            }
            onMouseLeave={() =>
              deleteConfirm !== index &&
              expandedInsight !== index &&
              onMoodHover(null)
            }
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
                  <button className="cancel-delete-btn" onClick={cancelDelete}>
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

                {/* show AI quotes only for notes created after Gemini integration */}
                {note.aiInsight && (
                  <div className="ai-insight-section">
                    <button
                      className="insight-toggle-btn"
                      onClick={(e) => toggleInsight(index, e)}
                    >
                      {expandedInsight === index
                        ? "Hide Note ▲"
                        : "A Note For You ✨"}
                    </button>

                    {expandedInsight === index && (
                      <div className="insight-card-content">
                        <div className="insight-card-block">
                          <span className="insight-card-label">
                            Encouragement
                          </span>
                          <p>{note.aiInsight.encouragement}</p>
                        </div>
                        <div className="insight-card-block">
                          <span className="insight-card-label">Reflection</span>
                          <p>{note.aiInsight.reflection}</p>
                        </div>
                        <div className="insight-card-block">
                          <span className="insight-card-label">
                            For Tomorrow
                          </span>
                          <p>{note.aiInsight.suggestion}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
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
