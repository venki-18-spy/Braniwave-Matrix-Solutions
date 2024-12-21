document.getElementById('add-btn').addEventListener('click', addTodo);
document.getElementById('clear-btn').addEventListener('click', clearAll);

document.addEventListener('DOMContentLoaded', loadTasks);

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoDate = document.getElementById('todo-date');
    const todoText = todoInput.value.trim();
    const taskDate = todoDate.value; // Get selected date

    if (todoText === "") {
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement('li');
    li.textContent = todoText;

    if (taskDate) {
        const dateText = document.createElement('span');
        dateText.textContent = ` (Due: ${taskDate})`;
        dateText.style.fontSize = '12px';
        dateText.style.color = '#7a4b87'; // Optional: Customize color
        li.appendChild(dateText);
    }

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        removeTask(li);
    });

    // Toggle task completion
    li.addEventListener('click', function () {
        li.classList.toggle('completed');
        saveTasks();
    });

    li.appendChild(deleteButton);
    document.getElementById('todo-list').appendChild(li);

    // Add smooth appearance animation
    setTimeout(() => {
        li.classList.add('show');
    }, 10); // Delay to trigger the animation

    // Save tasks to localStorage
    saveTasks();

    // Clear input fields
    todoInput.value = "";
    todoDate.value = "";
}

function removeTask(taskElement) {
    taskElement.style.animation = 'fadeOut 0.3s forwards'; // Apply fade-out animation
    taskElement.addEventListener('animationend', function () {
        taskElement.remove(); // Remove the task after the animation ends
        saveTasks();
    });
}

function saveTasks() {
    const tasks = [];
    const listItems = document.querySelectorAll('li');
    listItems.forEach(item => {
        const taskText = item.textContent.replace('Delete', '').trim();
        const taskDate = item.querySelector('span') ? item.querySelector('span').textContent.replace(' (Due: ', '').replace(')', '') : null;
        tasks.push({
            text: taskText,
            completed: item.classList.contains('completed'),
            date: taskDate
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;

            if (task.completed) {
                li.classList.add('completed');
            }

            if (task.date) {
                const dateText = document.createElement('span');
                dateText.textContent = ` (Due: ${task.date})`;
                dateText.style.fontSize = '12px';
                dateText.style.color = '#7a4b87';
                li.appendChild(dateText);
            }

            // Create a delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function () {
                removeTask(li);
            });

            // Toggle task completion
            li.addEventListener('click', function () {
                li.classList.toggle('completed');
                saveTasks();
            });

            li.appendChild(deleteButton);
            document.getElementById('todo-list').appendChild(li);

            // Add smooth appearance animation
            setTimeout(() => {
                li.classList.add('show');
            }, 10); // Delay to trigger the animation
        });
    }
}

function clearAll() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    localStorage.removeItem('tasks');
}