import { useState } from "react";
import "./MoodForm.css";

export default function MoodForm({ onSave }) {
  const [moodNote, setMoodNote] = useState("");
  const [emotion, setEmotion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (moodNote && emotion) {
      console.log("Mood Note: ", moodNote);
      console.log("Selected Emotion: ", emotion);
      onSave(moodNote, emotion);
      setMoodNote("");
      setEmotion("");
    }
  };

  return (
    <form className="moodForm" onSubmit={handleSubmit}>
      <textarea
        id="moodNote"
        value={moodNote}
        placeholder="Write a note about your mood today..."
        onChange={(e) => setMoodNote(e.target.value)}
        aria-label="Mood note"
        required
      ></textarea>

      <select
        id="emotion"
        value={emotion}
        aria-label="Select emotion"
        onChange={(e) => setEmotion(e.target.value)}
        required
      >
        <option value="">Select Emotion</option>
        <option value="happy">😊 Happy</option>
        <option value="sad">😢 Sad</option>
        <option value="excited">😆 Excited</option>
        <option value="bored">😐 Bored</option>
        <option value="confused">😕 Confused</option>
        <option value="other">🤔 Other</option>
      </select>

      <button type="submit" className="saveBtn">
        Save
      </button>
    </form>
  );
}
