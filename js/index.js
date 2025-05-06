import { saveNotes, loadNotes } from './noteStorage.js';
import { createStickyNote } from './noteCreation.js';
import { getCategories, addCategory } from './categoryManagement.js';

// Get reference to the "Add Note" and "Clear All" buttons
const addNewNote = document.getElementById("addNewnote");
const clearAll = document.getElementById("clearAll");
const addCategoryBtn = document.getElementById("addCategory");

// Add event listener to create a new sticky note when button is clicked
addNewNote.addEventListener("click", () => {
    showAddNoteDialog();
});

// Add event listener to clear all notes from the container
clearAll.addEventListener("click", () => {
    document.getElementById("notes-container").innerHTML = "";
    // Clear localStorage
    localStorage.removeItem('stickyNotes');
});

// Function to create a new note with category selection
function showAddNoteDialog() {
    // Create modal dialog
    const modal = document.createElement('div');
    modal.classList.add('modal');

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    // Create title
    const title = document.createElement('h3');
    title.textContent = 'Create New Note';
    modalContent.appendChild(title);

    // Create category selection
    const categoryLabel = document.createElement('label');
    categoryLabel.textContent = 'Select Category:';
    categoryLabel.setAttribute('for', 'category-select');
    modalContent.appendChild(categoryLabel);

    const categorySelect = document.createElement('select');
    categorySelect.id = 'category-select';

    // Add categories as options
    getCategories().forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });

    modalContent.appendChild(categorySelect);

    // Create buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('modal-buttons');

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    const createButton = document.createElement('button');
    createButton.textContent = 'Create';
    createButton.classList.add('primary-button');
    createButton.addEventListener('click', () => {
        const selectedCategory = categorySelect.value;
        createStickyNote("Title", "Content", "#fff9a6", selectedCategory);
        document.body.removeChild(modal);
    });

    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(createButton);
    modalContent.appendChild(buttonContainer);

    // Add modal content to modal
    modal.appendChild(modalContent);

    // Add modal to body
    document.body.appendChild(modal);

    // Close modal if clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Add event listener for the Add Category button
if (addCategoryBtn) {
    addCategoryBtn.addEventListener("click", () => {
        const categoryName = prompt("Enter a new category name:");
        if (categoryName && categoryName.trim()) {
            if (addCategory(categoryName.trim())) {
                createCategorySection(categoryName.trim());
            } else {
                alert("Category already exists!");
            }
        }
    });
}

// Function to create a new category section in the UI
function createCategorySection(categoryName) {
    const container = document.getElementById('notes-container');

    // Check if this category section already exists
    if (document.querySelector(`.category-section[data-category="${categoryName}"]`)) {
        return;
    }

    // Create category section
    const section = document.createElement('div');
    section.classList.add('category-section');
    section.dataset.category = categoryName;

    // Create category header
    const header = document.createElement('div');
    header.classList.add('category-header');

    // Create category title
    const title = document.createElement('h2');
    title.classList.add('category-title');
    title.textContent = categoryName;

    // Add category title to header
    header.appendChild(title);

    // Create container for notes in this category
    const categoryNotes = document.createElement('div');
    categoryNotes.classList.add('category-notes');

    // Assemble section
    section.appendChild(header);
    section.appendChild(categoryNotes);

    // Add to main container
    container.appendChild(section);
}

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

// Set up dark mode toggle and load notes
document.addEventListener('DOMContentLoaded', () => {
    // First ensure we have the category management JS
    if (typeof getCategories !== 'function') {
        console.error('Category management not loaded!');
        return;
    }

    // Create initial category sections
    const categories = getCategories();
    categories.forEach(category => {
        createCategorySection(category);
    });

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