import { saveNotes } from './noteStorage.js';

// Creates a new editable sticky note and appends it to the notes container
export function createStickyNote(title = "Title", body = "Content") {
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
