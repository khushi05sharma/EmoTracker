import { useState } from "react";
import React from "react";
import DateInput from "./DateInput";
import NotesDisplay from "./NotesDisplay";
import "./PastNotesPage.css";

export default function PastNotesPage({ notes }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [hoveredMood, setHoveredMood] = useState(null);

  // Filter notes based on the selected date
  const filteredNotes = selectedDate
    ? notes.filter((note) => note.date === selectedDate)
    : notes;

  return (
    <div className={`page-wrapper ${hoveredMood ? `mood-${hoveredMood}` : ''}`}>
      {/* Past Notes Header - THIS IS THE HEADER! */}
      <header className="past-notes-header">
        <h1>Past Notes</h1>
      </header>

      {/* Main content */}
      <div className="content-wrapper">
        <DateInput selectedDate={selectedDate} onDateChange={setSelectedDate} />
        <NotesDisplay 
          notes={filteredNotes} 
          onMoodHover={setHoveredMood}
        />
      </div>
    </div>
  );
}