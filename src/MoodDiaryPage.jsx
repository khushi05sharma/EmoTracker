import { useState, useEffect } from "react";
import MoodForm from "./MoodForm";
import TodayNote from "./TodayNote";
import "./MoodDiaryPage.css";
import { getAIInsight } from "./services/geminiService";

// Celebration Component (inline)
function QuoteCelebration({ insight, mood, onComplete }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!insight) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  if (!insight) return null;

  return (
    <div className={`celebration-overlay ${isVisible ? "visible" : ""}`}>
      <div className={`celebration-content mood-${mood}`}>
        <button
          className="celebration-close-btn"
          onClick={handleClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>

        <div className="insight-container">
          <div className="insight-block">
            <p className="insight-label">Encouragement</p>
            <p className="insight-text">{insight.encouragement}</p>
          </div>

          <div className="insight-block">
            <p className="insight-label">Reflection</p>
            <p className="insight-text">{insight.reflection}</p>
          </div>

          <div className="insight-block">
            <p className="insight-label">For Tomorrow</p>
            <p className="insight-text">{insight.suggestion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MoodDiaryPage({ onSaveNote }) {
  const [moodNote, setMoodNote] = useState("");
  const [emotion, setEmotion] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  // will stores AI-generated response
  const [celebrationInsight, setCelebrationInsight] = useState(null);
  // for tracking the gemini response
  const [isLoading, setIsLoading] = useState(false);

  const currDate = new Date().toISOString().split("T")[0];

  const handleSave = async (note, selectedEmotion) => {
    setMoodNote(note);
    setEmotion(selectedEmotion);
    setIsLoading(true);

    try {
      // for sending user mood and journal entry to gemini
      const aiInsight = await getAIInsight(selectedEmotion, note);

      const newNote = {
        date: currDate,
        mood: selectedEmotion,
        text: note,
        aiInsight: aiInsight,
      };

      if (onSaveNote) {
        onSaveNote(newNote);
      }

      // will display AI-generated quotes popup
      setCelebrationInsight(aiInsight);
      setShowCelebration(true);
    } catch (error) {
      console.error("Failed to get AI insight:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCelebrationComplete = () => {
    setShowCelebration(false);
    setCelebrationInsight(null);
  };

  return (
    <>
      <main className="moodDiaryPage">
        <MoodForm onSave={handleSave} isLoading={isLoading} />
        <TodayNote date={currDate} note={moodNote} emotion={emotion} />
      </main>

      {showCelebration && (
        <QuoteCelebration
          insight={celebrationInsight}
          mood={emotion}
          onComplete={handleCelebrationComplete}
        />
      )}
    </>
  );
}
