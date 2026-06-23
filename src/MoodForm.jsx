import { useState } from "react";
import "./MoodForm.css";

export default function MoodForm({ onSave, isLoading }) {
  const [moodNote, setMoodNote] = useState("");
  const [emotion, setEmotion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // only allow submit if we have both fields AND we're not already loading
    if (moodNote && emotion && !isLoading) {
      console.log("Mood Note: ", moodNote);
      console.log("Selected Emotion: ", emotion);
      onSave(moodNote, emotion);
      // clear form for next entry
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
        // using to disable text area while loading to prevent editing mid saving
        disabled={isLoading}
        required
      ></textarea>

      <select
        id="emotion"
        value={emotion}
        aria-label="Select emotion"
        onChange={(e) => setEmotion(e.target.value)}
        disabled={isLoading}
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

      <button
        type="submit"
        className="saveBtn"
        // disable button while waiting for Gemini to respond
        disabled={isLoading}
        style={{
          opacity: isLoading ? 0.6 : 1,
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Getting AI Insight..." : "Save"}
      </button>
    </form>
  );
}
