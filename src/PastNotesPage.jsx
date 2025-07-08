import { useState } from "react";
import React from "react";
import DateInput from "./DateInput";
import NotesDisplay from "./NotesDisplay";
import "./PastNotesPage.css";

export default function PastNotesPage({ notes }) {
  const [selectedDate, setSelectedDate] = useState("");

  // Filter notes based on the selected date
  const filteredNotes = selectedDate
    ? notes.filter((note) => note.date === selectedDate)
    : notes;

  return (
    <div className="box">
      <DateInput selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <NotesDisplay notes={filteredNotes} />
    </div>
  );
}
