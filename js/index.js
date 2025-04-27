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

// Function to save notes to localStorage
function saveNotes() {
    const notesContainer = document.getElementById("notes-container");
    const notes = [];

    // Collect all notes
    const noteElements = notesContainer.querySelectorAll('.note');
    noteElements.forEach(noteElement => {
        const title = noteElement.querySelector('.note-title').innerHTML;
        const body = noteElement.querySelector('.note-body').innerHTML;
        notes.push({ title, body });
    });

    // Save to localStorage
    localStorage.setItem('stickyNotes', JSON.stringify(notes));
}

// Function to load notes from localStorage
function loadNotes() {
    const savedNotes = localStorage.getItem('stickyNotes');

    if (savedNotes) {
        const notes = JSON.parse(savedNotes);

        // Create each saved note
        notes.forEach(note => {
            createStickyNote(note.title, note.body);
        });
    }
}

// Creates a new editable sticky note and appends it to the notes container
function createStickyNote(title = "Note Title", body = "Type your note here...") {
    // Create the main note container
    const note = document.createElement("div");
    note.classList.add("note");

    // Create note header to contain title and delete button
    const noteHeader = document.createElement("div");
    noteHeader.classList.add("note-header");

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-note");
    deleteButton.innerHTML = "×";
    deleteButton.setAttribute("aria-label", "Delete note");
    deleteButton.addEventListener('click', () => {
        note.remove();
        saveNotes();
    });

    // Create title element
    const noteTitle = document.createElement("div");
    noteTitle.classList.add("note-title");
    noteTitle.contentEditable = true;
    noteTitle.innerHTML = title;

    // Append title and delete button to header
    noteHeader.appendChild(noteTitle);
    noteHeader.appendChild(deleteButton);

    // Create body element
    const noteBody = document.createElement("div");
    noteBody.classList.add("note-body");
    noteBody.contentEditable = true;
    noteBody.innerHTML = body;

    // Add event listeners to save on content changes
    noteTitle.addEventListener('blur', saveNotes);
    noteBody.addEventListener('blur', saveNotes);

    // Append header and body to the note
    note.appendChild(noteHeader);
    note.appendChild(noteBody);

    // Append the note to the container
    document.getElementById("notes-container").appendChild(note);

    // Save to localStorage
    saveNotes();
}