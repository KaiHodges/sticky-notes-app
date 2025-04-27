import { saveNotes, loadNotes } from './noteStorage.js';
import { createStickyNote } from './noteCreation.js';

// Get reference to the "Add Note" and "Clear All" buttons
const addNewNote = document.getElementById("addNewnote");
const clearAll = document.getElementById("clearAll");

// Add event listener to create a new sticky note when button is clicked
addNewNote.addEventListener("click", () => createStickyNote());

// Add event listener to clear all notes from the container
clearAll.addEventListener("click", () => {
    document.getElementById("notes-container").innerHTML = "";
    // Clear localStorage
    localStorage.removeItem('stickyNotes');
});

// Load saved notes when the page loads
document.addEventListener('DOMContentLoaded', loadNotes);