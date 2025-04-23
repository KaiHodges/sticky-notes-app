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
    const note = document.createElement("div");
    note.classList.add("note");
    note.contentEditable = true;
    note.textContent = "New note";
    document.getElementById("notes-container").appendChild(note);
}