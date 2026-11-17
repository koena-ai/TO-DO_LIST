
// Get HTML elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearBtn = document.getElementById("clearBtn");
const emptyMessage = document.getElementById("emptyMessage");

// Load tasks from LocalStorage
let tasks = [];

try {
    tasks = JSON.parse(localStorage.getItem("myTasks")) || [];
    if (!Array.isArray(tasks)) {
        tasks = [];
    }
} catch (error) {
    tasks = [];
}

// Save tasks to LocalStorage
function saveTasks() {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

// Update task counter
function updateTaskCount() {
    const remaining = tasks.filter(task => !task.completed).length;

    taskCount.textContent =
        `${remaining} ${remaining === 1 ? "task" : "tasks"} remaining`;
}

// Display tasks on the webpage
function displayTasks() {

    taskList.innerHTML = "";

    // Show empty message when no tasks exist
    emptyMessage.style.display =
        tasks.length === 0 ? "block" : "none";

    tasks.forEach((task, index) => {

        // Create task item
        const li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        // Create left section
        const leftDiv = document.createElement("div");
        leftDiv.className = "task-left";

        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        // Create task text
        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;

        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        // Add elements to the webpage
        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(span);

        li.appendChild(leftDiv);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    updateTaskCount();
}

// Add a new task
function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskInput.focus();
}

// Add task using button click
addBtn.addEventListener("click", addTask);

// Add task using Enter key
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

// Clear all tasks
clearBtn.addEventListener("click", () => {

    if (tasks.length === 0) {
        return;
    }

    const confirmClear = confirm("Are you sure you want to delete all tasks?");

    if (confirmClear) {
        tasks = [];
        saveTasks();
        displayTasks();
    }
});

// Display saved tasks when page loads
displayTasks();
