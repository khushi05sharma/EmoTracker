import { useState } from "react";
import MoodForm from "./MoodForm";
import TodayNote from "./TodayNote";

export default function MoodDiaryPage({ onSaveNote }) {
  const [moodNote, setMoodNote] = useState("");
  const [emotion, setEmotion] = useState("");
  const currDate = new Date().toISOString().split("T")[0]; // Use ISO format (YYYY-MM-DD)

  const handleSave = (note, emotion) => {
    const newNote = { date: currDate, mood: emotion, text: note };
    setMoodNote(note);
    setEmotion(emotion);
    onSaveNote(newNote);
  };

  return (
    <main className="moodDiaryPage">
      <MoodForm onSave={handleSave} />
      <TodayNote date={currDate} note={moodNote} emotion={emotion} />
    </main>
  );
}
