import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import Header from './Header'; 
import MoodDiaryPage from './MoodDiaryPage'; 
import PastNotesPage from './PastNotesPage';
import DarkModeToggle from './DarkModeToggle';

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

  // Dark mode state - load from localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
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

  // Function to delete a note
  const deleteNote = (index) => {
    console.log('🗑️ Deleting note at index:', index);
    setNotes((prevNotes) => {
      const updated = prevNotes.filter((_, i) => i !== index);
      console.log('📝 Updated notes array after deletion:', updated);
      return updated;
    });
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Apply dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  console.log('🎨 Rendering App with notes:', notes);

  return (
    <HashRouter>
      <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
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
          element={<PastNotesPage notes={notes} onDeleteNote={deleteNote} />}
        />
      </Routes>
    </HashRouter>
  );
}

export default App;