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
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 6000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!insight) return null;

  return (
    <div className={`celebration-overlay ${isVisible ? "visible" : ""}`}>
      <div className={`celebration-content mood-${mood}`}>
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>

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
  );
}

export default function MoodDiaryPage({ onSaveNote }) {
  const [moodNote, setMoodNote] = useState("");
  const [emotion, setEmotion] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationInsight, setCelebrationInsight] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const currDate = new Date().toISOString().split("T")[0];

  const handleSave = async (note, selectedEmotion) => {
    setMoodNote(note);
    setEmotion(selectedEmotion);
    setIsLoading(true);

    try {
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
        <MoodForm onSave={handleSave} />
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
