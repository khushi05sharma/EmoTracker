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
    <div className={`box ${hoveredMood ? `mood-${hoveredMood}` : ''}`}>
      <DateInput selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <NotesDisplay 
        notes={filteredNotes} 
        onMoodHover={setHoveredMood}
      />
    </div>
  );
}