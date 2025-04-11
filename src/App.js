import React from 'react';
import Header from './components/Header';
import NotesList from './components/NotesList';
import { NotesProvider } from './context/NotesContext';

function App() {
    return (
        <NotesProvider>
            <div className="App">
                <Header />
                <main>
                    <NotesList />
                </main>
            </div>
        </NotesProvider>
    );
}

export default App;
