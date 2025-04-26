// Get reference to the "Add Note" and "Clear All" buttons
const addNewNote = document.getElementById("addNewnote");
const clearAll = document.getElementById("clearAll");

// Add event listener to create a new sticky note when button is clicked
addNewNote.addEventListener("click", createStickyNote);

// Add event listener to clear all notes from the container
clearAll.addEventListener("click", () => {
    document.getElementById("notes-container").innerHTML = "";
});

// Creates a new editable sticky note and appends it to the notes container
function createStickyNote() {
    // Create the main note container
    const note = document.createElement("div");
    note.classList.add("note");

    // Create title element
    const noteTitle = document.createElement("div");
    noteTitle.classList.add("note-title");
    noteTitle.contentEditable = true;
    noteTitle.textContent = "Note Title";

    // Create body element
    const noteBody = document.createElement("div");
    noteBody.classList.add("note-body");
    noteBody.contentEditable = true;
    noteBody.textContent = "Type your note here...";

    // Append title and body to the note
    note.appendChild(noteTitle);
    note.appendChild(noteBody);

    // Append the note to the container
    document.getElementById("notes-container").appendChild(note);
}