"use strict";

const form = document.querySelector(".create-task-form");
const taskInput = document.querySelector(".task-input");
const filterInput = document.querySelector(".filter-input");
const clearTasksButton = document.querySelector(".clear-tasks");
const taskList = document.querySelector(".collection");
let tasks = [];

document.addEventListener("DOMContentLoaded", renderTasks);
form.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
clearTasksButton.addEventListener("click", removeAllTasks);
filterInput.addEventListener("input", filterTasks);

// створюємо таску
function addTask(event) {
  event.preventDefault();

  // отримуємо значення з інпута через форму
  // const value = taskInput.value;
  // event.target.task ===  taskInput.value
  const value = event.target.task.value;

  if (value.trim() === "") {
    return;
  }

  const li = document.createElement("li");
  const button = document.createElement("button");
  const editButton = document.createElement("button");
  const icon = document.createElement("i");
  const icon2 = document.createElement("i");

  icon.classList.add("fas", "fa-edit");
  icon2.classList.add("fas", "fa-trash");

  li.innerHTML = value;
  //button.innerHTML = " ";
  //editButton.innerHTML = "edit";
  button.appendChild(icon2);
  editButton.appendChild(icon);
  button.classList.add("delete-btn");
  editButton.classList.add("edit-btn");

  li.append(button);
  li.append(editButton);
  taskList.append(li);

  storeTaskInLocalStorage(value);
  console.log("value is", value);
  renderTasks();
  /*editButton.addEventListener("click", () => {
    editTask(value);
  });*/
  taskInput.value = "";
}

function renderTasks() {
  taskList.innerHTML = " ";

  if (localStorage.getItem("tasks")) {
     tasks = JSON.parse(localStorage.getItem("tasks"));

    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      const editButton = document.createElement("button");
      const icon = document.createElement("i");
      const icon2 = document.createElement("i");

      icon.classList.add("fas", "fa-edit");
      icon2.classList.add("fas", "fa-trash");

      li.innerHTML = task;
     // button.innerHTML = "";
      button.appendChild(icon2);
      editButton.appendChild(icon);
      button.classList.add("delete-btn");
      editButton.classList.add("edit-btn");
      li.classList.add("li-elem");

      editButton.addEventListener("click", () => {
        editTask(index);
      });
      li.append(button);
      li.append(editButton);

      taskList.append(li);
      
    });
  }
}



function storeTaskInLocalStorage(taskValue) {
   tasks = [];

  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(taskValue);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(event) {
  if (event.target.classList.contains("delete-btn")) {
    const listItem = event.target.parentElement;

    const taskIndex = Array.from(listItem.parentElement.children).indexOf(listItem);

     tasks = JSON.parse(localStorage.getItem("tasks"));

    if (taskIndex !== -1 && tasks && tasks.length > taskIndex) {
      tasks.splice(taskIndex, 1);

      localStorage.setItem("tasks", JSON.stringify(tasks));

      listItem.remove();
    }
  }
}

function editTask(index) {
  //const taskIndex = tasks.indexOf(task);
  //console.log("index of item",taskIndex);

  const updatedTask = prompt("Edit task:", tasks[index]);

  if (updatedTask !== null) {
    const trimmedTask = updatedTask.trim();
    if (trimmedTask !== "") {
      tasks[index] = trimmedTask;

      localStorage.setItem("tasks", JSON.stringify(tasks));

      renderTasks();
    }
    
  }
}


function removeAllTasks() {
  localStorage.removeItem("tasks");
  renderTasks();
}

function filterTasks(event) {
  const searchQuery = event.target.value;
  const liCollection = taskList.querySelectorAll("li");

  liCollection.forEach((task) => {
    const liValue = task.firstChild.textContent;

    if (liValue.includes(searchQuery)) {
      task.style.display = "list-item";
    } else {
      task.style.display = "none";
    }
  });
}
