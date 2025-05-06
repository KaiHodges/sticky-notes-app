// Default categories
const DEFAULT_CATEGORIES = ['Work', 'Personal', 'Ideas', 'Tasks'];

// Get all categories (existing ones from storage or defaults)
export function getCategories() {
    const savedCategories = localStorage.getItem('noteCategories');
    if (savedCategories) {
        return JSON.parse(savedCategories);
    }
    // If no categories exist yet, save and return defaults
    saveCategories(DEFAULT_CATEGORIES);
    return DEFAULT_CATEGORIES;
}

// Save categories to localStorage
export function saveCategories(categories) {
    localStorage.setItem('noteCategories', JSON.stringify(categories));
}

// Add a new category
export function addCategory(categoryName) {
    if (!categoryName.trim()) return false;

    const categories = getCategories();
    if (categories.includes(categoryName)) return false;

    categories.push(categoryName);
    saveCategories(categories);
    return true;
}

// Remove a category and reassign its notes
export function removeCategory(categoryToRemove, newCategory) {
    const categories = getCategories();
    const index = categories.indexOf(categoryToRemove);

    if (index === -1) return false;

    // Remove the category
    categories.splice(index, 1);
    saveCategories(categories);

    // Reassign notes from the removed category to the new category
    const savedNotes = localStorage.getItem('stickyNotes');
    if (savedNotes) {
        const notes = JSON.parse(savedNotes);
        notes.forEach(note => {
            if (note.category === categoryToRemove) {
                note.category = newCategory;
            }
        });
        localStorage.setItem('stickyNotes', JSON.stringify(notes));
    }

    return true;
}
