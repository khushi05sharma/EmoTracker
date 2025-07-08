import "./TodayNote.css";

export default function TodayNote({ date, note, emotion }) {
  return (
    <article>
      <div className="todayNoteCard">
        <h1 className="heading">TODAY'S NOTE</h1>
        {note && emotion ? (
          <>
            <h2 className="noteDate">{date}</h2>
            <p className="noteEmotion">Mood: {emotion}</p>
            <p className="noteText">{note}</p>
          </>
        ) : (
          <p className="noData">No mood saved yet!</p>
        )}
      </div>
    </article>
  );
}
