class Note {
    constructor(id, content, category = '', created = new Date()) {
        this.id = id || crypto.randomUUID();
        this.content = content;
        this.category = category;
        this.created = created;
        this.updated = new Date();
    }
}

const state = {
    notes: [],
    darkMode: false,
    filter: ''
};

// DOM Elements
const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");
const searchInput = document.querySelector("#search");

// Event Listeners
addBtn.addEventListener("click", () => addNote());
searchInput?.addEventListener("input", debounce(filterNotes, 300));
document.addEventListener("keydown", handleShortcuts);

// Auto-save functionality
const autoSave = debounce(() => saveNotes(), 1000);

function addNote(text = "") {
    const note = new Note(null, text);
    state.notes.push(note);
    
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.dataset.id = note.id;
    
    noteElement.innerHTML = `
        <div class="tool">
            <select class="category">
                <option value="">No Category</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="ideas">Ideas</option>
            </select>
            <i class="save fas fa-save" title="Save (Ctrl+S)"></i>
            <i class="trash fas fa-trash" title="Delete"></i>
        </div>
        <textarea placeholder="Enter your note here...">${text}</textarea>
        <div class="note-info">
            <span class="date">${formatDate(note.created)}</span>
        </div>
    `;

    // Event listeners for note actions
    const textarea = noteElement.querySelector("textarea");
    textarea.addEventListener("input", () => {
        updateNote(note.id, textarea.value);
        autoSave();
    });

    const saveBtn = noteElement.querySelector(".save");
    saveBtn.addEventListener("click", () => saveNotes());

    const deleteBtn = noteElement.querySelector(".trash");
    deleteBtn.addEventListener("click", () => {
        deleteNote(note.id);
        noteElement.remove();
        saveNotes();
    });

    const categorySelect = noteElement.querySelector(".category");
    categorySelect.addEventListener("change", (e) => {
        note.category = e.target.value;
        saveNotes();
    });

    main.appendChild(noteElement);
    return noteElement;
}

function updateNote(id, content) {
    const note = state.notes.find(n => n.id === id);
    if (note) {
        note.content = content;
        note.updated = new Date();
    }
}

function deleteNote(id) {
    state.notes = state.notes.filter(note => note.id !== id);
}

function saveNotes() {
    try {
        localStorage.setItem("notes", JSON.stringify(state.notes));
        showNotification("Notes saved successfully!");
    } catch (error) {
        console.error("Error saving notes:", error);
        showNotification("Error saving notes!", "error");
    }
}

function loadNotes() {
    try {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        state.notes = savedNotes.map(note => new Note(
            note.id,
            note.content,
            note.category,
            new Date(note.created)
        ));
        state.notes.forEach(note => addNote(note.content));
    } catch (error) {
        console.error("Error loading notes:", error);
        showNotification("Error loading notes!", "error");
    }
}

function filterNotes(e) {
    const searchTerm = e.target.value.toLowerCase();
    state.filter = searchTerm;
    
    document.querySelectorAll(".note").forEach(noteEl => {
        const content = noteEl.querySelector("textarea").value.toLowerCase();
        const visible = content.includes(searchTerm);
        noteEl.style.display = visible ? "block" : "none";
    });
}

function handleShortcuts(e) {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveNotes();
    }
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
    }).format(new Date(date));
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function showNotification(message, type = 'success') {
    // Implement notification UI
}

// Initialize app
document.addEventListener('DOMContentLoaded', loadNotes);