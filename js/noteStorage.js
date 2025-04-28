import { createStickyNote } from './noteCreation.js';

// Function to save notes to localStorage
export function saveNotes() {
    const notesContainer = document.getElementById("notes-container");
    const notes = [];
    // Collect all notes
    const noteElements = notesContainer.querySelectorAll('.note');
    noteElements.forEach(noteElement => {
        const title = noteElement.querySelector('.note-title').innerHTML;
        const body = noteElement.querySelector('.note-body').innerHTML;
        const color = noteElement.style.backgroundColor;
        notes.push({ title, body, color });
    });
    // Save to localStorage
    localStorage.setItem('stickyNotes', JSON.stringify(notes));
}

// Function to load notes from localStorage
export function loadNotes() {
    const savedNotes = localStorage.getItem('stickyNotes');
    if (savedNotes) {
        const notes = JSON.parse(savedNotes);
        // Create each saved note
        notes.forEach(note => {
            createStickyNote(note.title, note.body, note.color);
        });
    }
}