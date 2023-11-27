document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasksList = document.querySelector("#tasks");
    const form = document.querySelector("form");
    const taskInput = document.querySelector("#task");
    const submitButton = document.querySelector("#submitBtn");
    const resetButton = document.querySelector("#resetBtn");
    const alertDiv = document.querySelector("#alert");

    function renderTasks() {
        tasksList.innerHTML = "";
        savedTasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = task;
            tasksList.appendChild(li);
        });
    }

    renderTasks();

    form.onsubmit = (event) => {
        event.preventDefault();
        let task = taskInput.value;

        if (!task.trim() || task.length < 1) {
            alertDiv.innerHTML = "Please enter a valid task!";
            alertDiv.classList.add("alert", "mb-2", "alert-warning");

            setTimeout(() => {
                alertDiv.innerHTML = "";
                alertDiv.classList.remove("alert", "mb-2", "alert-warning");
            }, 2500);

            return;
        }

        savedTasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        renderTasks();
        taskInput.value = "";
        alertDiv.innerHTML = "";
    }

    taskInput.addEventListener('input', () => {
        submitButton.disabled = !taskInput.value.trim() || taskInput.value.length < 1;
    });

    resetButton.addEventListener('click', () => {
        savedTasks.length = 0;
        localStorage.removeItem('tasks');
        renderTasks();
        alertDiv.innerHTML = "";
    });
});