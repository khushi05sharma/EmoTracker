import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import Header from './Header'; 
import MoodDiaryPage from './MoodDiaryPage'; 
import PastNotesPage from './PastNotesPage'; 
import PastHead from './PastHead';

function App() {
  // Load notes from localStorage on initial render
  const [notes, setNotes] = useState(() => {
    console.log('🔍 App component initializing...');
    try {
      const savedNotes = localStorage.getItem('moodTrackerNotes');
      console.log('📦 Raw data from localStorage:', savedNotes);
      
      if (savedNotes) {
        const parsed = JSON.parse(savedNotes);
        console.log('✅ Loaded notes from localStorage:', parsed);
        return parsed;
      } else {
        console.log('⚠️ No saved notes found in localStorage');
        return [];
      }
    } catch (error) {
      console.error('❌ Error loading notes from localStorage:', error);
      return [];
    }
  });

  // Save notes to localStorage whenever they change
  useEffect(() => {
    console.log('💾 Saving notes to localStorage:', notes);
    try {
      localStorage.setItem('moodTrackerNotes', JSON.stringify(notes));
      console.log('✅ Notes saved successfully!');
      
      // Verify it was saved
      const verification = localStorage.getItem('moodTrackerNotes');
      console.log('🔍 Verification - what is actually in localStorage:', verification);
    } catch (error) {
      console.error('❌ Error saving notes to localStorage:', error);
    }
  }, [notes]);

  // Function to add a new note
  const addNote = (newNote) => {
    console.log('➕ Adding new note:', newNote);
    setNotes((prevNotes) => {
      const updated = [...prevNotes, newNote];
      console.log('📝 Updated notes array:', updated);
      return updated;
    });
  };

  console.log('🎨 Rendering App with notes:', notes);

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