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

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // Save preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Function to check if dark mode is enabled in localStorage
function checkDarkModePreference() {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
}

// Set up dark mode toggle
document.addEventListener('DOMContentLoaded', () => {
    // Load saved notes
    loadNotes();

    // Check if dark mode was previously enabled
    checkDarkModePreference();

    // Set up event listener for dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
});