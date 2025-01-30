class TodoApp {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.item = document.querySelector("#item");
        this.toDoBox = document.querySelector("#to-do-box");
        this.filters = {
            all: () => true,
            active: task => !task.completed,
            completed: task => task.completed
        };
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.item.addEventListener("keyup", (event) => {
            if (event.key === "Enter" && this.item.value.trim()) {
                this.addToDo(this.item.value);
                this.item.value = "";
            }
        });

        this.loadTasks();
        this.setupDragAndDrop();
    }

    addToDo(text, priority = 'medium', dueDate = null) {
        const task = {
            id: Date.now(),
            text: text.trim(),
            completed: false,
            priority,
            dueDate,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.tasks.push(task);
        this.saveTasks();
        this.renderTask(task);
    }

    renderTask(task) {
        const listItem = document.createElement("li");
        listItem.dataset.id = task.id;
        listItem.classList.add('task-item', task.priority);
        if (task.completed) listItem.classList.add('done');

        listItem.innerHTML = `
            <div class="task-content">
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${this.escapeHtml(task.text)}</span>
                ${task.dueDate ? `<span class="due-date">${new Date(task.dueDate).toLocaleDateString()}</span>` : ''}
            </div>
            <div class="task-actions">
                <select class="priority-select">
                    <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
                    <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Medium</option>
                    <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High</option>
                </select>
                <i class="fas fa-edit"></i>
                <i class="fas fa-times"></i>
            </div>
        `;

        this.setupTaskListeners(listItem, task);
        this.toDoBox.appendChild(listItem);
    }

    setupTaskListeners(listItem, task) {
        const checkbox = listItem.querySelector('input[type="checkbox"]');
        const editBtn = listItem.querySelector('.fa-edit');
        const deleteBtn = listItem.querySelector('.fa-times');
        const prioritySelect = listItem.querySelector('.priority-select');

        checkbox.addEventListener('change', () => this.toggleTask(task.id));
        editBtn.addEventListener('click', () => this.editTask(task.id));
        deleteBtn.addEventListener('click', () => this.deleteTask(task.id));
        prioritySelect.addEventListener('change', (e) => this.updatePriority(task.id, e.target.value));

        listItem.draggable = true;
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            task.updatedAt = new Date();
            this.saveTasks();
            this.renderTasks();
        }
    }

    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            const newText = prompt('Edit task:', task.text);
            if (newText && newText.trim()) {
                task.text = newText.trim();
                task.updatedAt = new Date();
                this.saveTasks();
                this.renderTasks();
            }
        }
    }

    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
            this.renderTasks();
        }
    }

    updatePriority(id, priority) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.priority = priority;
            task.updatedAt = new Date();
            this.saveTasks();
            this.renderTasks();
        }
    }

    setupDragAndDrop() {
        this.toDoBox.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.dataset.id);
            e.target.classList.add('dragging');
        });

        this.toDoBox.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
        });

        this.toDoBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            const afterElement = this.getDragAfterElement(this.toDoBox, e.clientY);
            
            if (afterElement) {
                this.toDoBox.insertBefore(draggable, afterElement);
            } else {
                this.toDoBox.appendChild(draggable);
            }
        });
    }

    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.task-item:not(.dragging)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        this.renderTasks();
    }

    renderTasks() {
        this.toDoBox.innerHTML = '';
        this.tasks
            .filter(this.filters[this.currentFilter])
            .sort((a, b) => b.createdAt - a.createdAt)
            .forEach(task => this.renderTask(task));
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// Initialize the app
const todoApp = new TodoApp();