import { saveNotes } from './noteStorage.js';

// Creates a new editable sticky note and appends it to the notes container
export function createStickyNote(title = "Title", body = "Content", color = "#fff9a6") {
    // Create the main note container
    const note = document.createElement("div");
    note.classList.add("note");
    note.style.backgroundColor = color;
    
    // Create note header to contain title and dropdown menu
    const noteHeader = document.createElement("div");
    noteHeader.classList.add("note-header");
    
    // Create dropdown menu container
    const dropdownContainer = document.createElement("div");
    dropdownContainer.classList.add("dropdown-container");
    
    // Create dropdown toggle button
    const dropdownToggle = document.createElement("button");
    dropdownToggle.classList.add("dropdown-toggle");
    dropdownToggle.innerHTML = "⋮"; // Three vertical dots menu icon
    dropdownToggle.setAttribute("aria-label", "Note options");
    
    // Create dropdown menu content
    const dropdownContent = document.createElement("div");
    dropdownContent.classList.add("dropdown-content");
    
    // Add color options to dropdown
    const colorOptions = [
        { name: "Yellow", value: "#fff9a6" },
        { name: "Blue", value: "#a6e7ff" },
        { name: "Green", value: "#b5f5c5" },
        { name: "Pink", value: "#ffd1dc" }
    ];
    
    // Create color option elements
    colorOptions.forEach(color => {
        const colorOption = document.createElement("div");
        colorOption.classList.add("dropdown-item", "color-option");
        
        const colorSwatch = document.createElement("span");
        colorSwatch.classList.add("color-swatch");
        colorSwatch.style.backgroundColor = color.value;
        
        const colorText = document.createElement("span");
        colorText.textContent = color.name;
        
        colorOption.appendChild(colorSwatch);
        colorOption.appendChild(colorText);
        
        // Add event listener to change note color
        colorOption.addEventListener('click', () => {
            note.style.backgroundColor = color.value;
            dropdownContent.classList.remove("show");
            saveNotes();
        });
        
        dropdownContent.appendChild(colorOption);
    });
    
    // Add divider
    const divider = document.createElement("div");
    divider.classList.add("dropdown-divider");
    dropdownContent.appendChild(divider);
    
    // Add delete option
    const deleteOption = document.createElement("div");
    deleteOption.classList.add("dropdown-item", "delete-option");
    deleteOption.textContent = "Delete note";
    deleteOption.addEventListener('click', () => {
        note.remove();
        saveNotes();
    });
    dropdownContent.appendChild(deleteOption);
    
    // Toggle dropdown visibility when clicked
    dropdownToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownContent.classList.toggle("show");
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        if (dropdownContent.classList.contains("show")) {
            dropdownContent.classList.remove("show");
        }
    });
    
    // Prevent dropdown from closing when clicking inside it
    dropdownContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Append dropdown elements
    dropdownContainer.appendChild(dropdownToggle);
    dropdownContainer.appendChild(dropdownContent);
    
    // Create title element
    const noteTitle = document.createElement("div");
    noteTitle.classList.add("note-title");
    noteTitle.contentEditable = true;
    noteTitle.innerHTML = title;
    
    // Append title and dropdown to header
    noteHeader.appendChild(noteTitle);
    noteHeader.appendChild(dropdownContainer);
    
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