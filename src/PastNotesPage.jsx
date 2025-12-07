import { useState } from "react";
import React from "react";
import DateInput from "./DateInput";
import NotesDisplay from "./NotesDisplay";
import "./PastNotesPage.css";

export default function PastNotesPage({ notes, onDeleteNote }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [hoveredMood, setHoveredMood] = useState(null);

  // Filter notes based on the selected date
  const filteredNotes = selectedDate
    ? notes.filter((note) => note.date === selectedDate)
    : notes;

  // Get original indices for filtered notes
  const getOriginalIndex = (filteredIndex) => {
    if (!selectedDate) return filteredIndex;
    return notes.findIndex(note => note === filteredNotes[filteredIndex]);
  };

  return (
    <div className={`page-wrapper ${hoveredMood ? `mood-${hoveredMood}` : ''}`}>
      {/* Past Notes Header - NOW INCLUDED HERE */}
      <header className="past-notes-header">
        <h1>Past Notes</h1>
      </header>

      {/* Main content */}
      <div className="content-wrapper">
        <DateInput selectedDate={selectedDate} onDateChange={setSelectedDate} />
        <NotesDisplay 
          notes={filteredNotes} 
          onMoodHover={setHoveredMood}
          onDeleteNote={(index) => onDeleteNote(getOriginalIndex(index))}
        />
      </div>
    </div>
  );
}