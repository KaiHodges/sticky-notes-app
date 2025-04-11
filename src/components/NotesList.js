import React from 'react';
import Note from './Note';
import CreateNoteForm from './CreateNoteForm';
import { useNotes } from '../context/NotesContext';

const NotesList = () => {
    const { notes } = useNotes();

    return (
        <div className="notes-container">
            <CreateNoteForm />
            <div className="notes-grid">
                {notes.map(note => (
                    <Note key={note.id} note={note} />
                ))}
            </div>
        </div>
    );
};

export default NotesList;
