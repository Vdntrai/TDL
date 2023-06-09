let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.getElementById("taskList");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.title;
    li.classList.toggle("completed", task.completed);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "&#10006;"; /* Cross symbol */
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => deleteTask(index));

    li.appendChild(deleteButton);
    li.addEventListener("click", () => toggleCompleteTask(li, index));

    taskList.appendChild(li);
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleCompleteTask(li, index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  li.classList.toggle("completed");
}

document.getElementById("addButton").addEventListener("click", () => {
  const taskInput = document.getElementById("taskInput");
  const taskTitle = taskInput.value.trim();

  if (taskTitle !== "") {
    const task = { title: taskTitle, completed: false };
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
});

renderTasks();