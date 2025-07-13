import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'; 
import Header from './Header'; 
import MoodDiaryPage from './MoodDiaryPage'; 
import PastNotesPage from './PastNotesPage'; 
import PastHead from './PastHead';

function App() {
  // Shared state to store notes
  const [notes, setNotes] = useState([]);

  // Function to add a new note
  const addNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  return (
    <HashRouter>
      <Routes>
        {/* Front Page */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <MoodDiaryPage onSaveNote={addNote} />
            </>
          }
        />

        {/* Past Notes Page */}
        <Route
          path="/past-notes"
          element={
            <>
              <PastHead />
              <PastNotesPage notes={notes} />
            </>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;







