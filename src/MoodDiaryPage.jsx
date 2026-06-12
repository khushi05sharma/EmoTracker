import { useState, useEffect } from "react";
import MoodForm from "./MoodForm";
import TodayNote from "./TodayNote";
import "./MoodDiaryPage.css";

// Quotes data directly in this file
const moodQuotes = {
  happy: [
    "When you’re happy, the world feels softer 💛✨",
    "Your Joy Inspires! 🌟",
    "Celebrate This Moment! 🎉",
    "Happiness Looks Good On You! 💛",
    "Spread That Smile! 😊",
    "You're Doing Amazing! 🌈",
    "You deserve this happiness. Every bit of it 💖🙂",
    "Keep The Good Vibes Going! ☀️",
  ],
  sad: [
    "Some days ache, and that’s human 💙😔",
    "You're Stronger Than You Know 💪",
    "Even the darkest clouds pass 🌙💫",
    "Be Gentle With Yourself 💙",
    "You're Not Alone 🤝",
    "Healing Takes Time 🌱",
    "Brighter Days Ahead ☀️",
    "Your feelings matter, even the painful ones 💙",
  ],
  excited: [
    "Let's Go! 🚀",
    "Your Energy Is Contagious! ⚡",
    "Your excitement makes everything brighter 🌈🤩",
    "The Best Is Yet To Come! 🎊",
    "Ride This Wave! 🌊",
    "Hold onto this feeling — it’s special 🌟🤍",
    "Your heart is racing for a reason 💓✨",
    "Embrace The Adventure! 🎢",
  ],
  bored: [
    "Slow days have their own rhythm 🎧😌",
    "Spark Your Curiosity! 🔥",
    "Try Something Different! 🎨",
    "You’re allowed to be still 🌙✨",
    "Let your mind wander a little 🌾💭",
    "Break The Routine! 🌀",
    "This pause might be exactly what you need 😌🌿",
    "Time For A Change! 🌟",
  ],
  confused: [
    "Clarity Will Come 🌅",
    "Even confusion has a purpose 🌸🤔",
    "One Step At A Time 👣",
    "You’re learning, even when it feels messy 🌱🤔",
    "Confusion means you’re growing 🌱✨",
    "You'll Figure It Out 💡",
    "Take A Deep Breath 🌬️",
    "It's Okay Not To Know 🌈",
  ],
  other: [
    "Your Feelings Are Valid ✨",
    "Express Yourself Freely 🎭",
    "Every Emotion Matters 💫",
    "You’re doing better than you think 🌱✨",
    "Be kind to yourself today 💛✨",
    "Be True To Yourself 🦋",
    "Your Journey Is Unique 🛤️",
    "Embrace All Of You 💖",
  ],
};

// Get random quote function
const getRandomQuote = (mood) => {
  const quotes = moodQuotes[mood] || moodQuotes.other;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

// Celebration Component (inline)
function QuoteCelebration({ quote, mood, onComplete }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!quote) return null;

  return (
    <div className={`celebration-overlay ${isVisible ? "visible" : ""}`}>
      <div className={`celebration-content mood-${mood}`}>
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>
        <div className="quote-text">{quote}</div>
      </div>
    </div>
  );
}

export default function MoodDiaryPage({ onSaveNote }) {
  const [moodNote, setMoodNote] = useState("");
  const [emotion, setEmotion] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationQuote, setCelebrationQuote] = useState("");
  const currDate = new Date().toISOString().split("T")[0];

  const handleSave = (note, selectedEmotion) => {
    const newNote = { date: currDate, mood: selectedEmotion, text: note };
    setMoodNote(note);
    setEmotion(selectedEmotion);

    if (onSaveNote) {
      onSaveNote(newNote);
    }

    const quote = getRandomQuote(selectedEmotion);
    setCelebrationQuote(quote);
    setShowCelebration(true);
  };

  const handleCelebrationComplete = () => {
    setShowCelebration(false);
    setCelebrationQuote("");
  };

  return (
    <>
      <main className="moodDiaryPage">
        <MoodForm onSave={handleSave} />
        <TodayNote date={currDate} note={moodNote} emotion={emotion} />
      </main>

      {showCelebration && (
        <QuoteCelebration
          quote={celebrationQuote}
          mood={emotion}
          onComplete={handleCelebrationComplete}
        />
      )}
    </>
  );
}
