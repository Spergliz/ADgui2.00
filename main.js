// My Tasks Basic

// HTML Elements
let goBtnEl = document.getElementById("go-btn");
let menuEl = document.getElementById("menu");
let tasksEl = document.getElementById("tasks");

//GVar
let tasks = loadtask();
displayall();
// Go Btn - Menu Listener
goBtnEl.addEventListener("click", goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === "add") {
    addTask();
  } else if (selection === "toggle") {
    toggleTask();
  } else if (selection === "remove") {
    removeTask();
  } else if (selection === "clear") {
    clearAll();
  }
}

// MENU FUNCTIONS
function addTask() {
  let description = prompt("enter task description ");
  tasks.push(newtask(description));
  tasksEl.innerHTML = `task added: ${description}`;
  saveTasks();
  displayall();
}

function toggleTask() {
  let index = +prompt("enter # of task:");
  let task = tasks[index];
  if (task.completed === "") {
    task.completed = "completed";
  } else {
    task.completed = "";
  }
  displayall();
}

function removeTask() {
  let index = +prompt("enter # of task");
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    saveTasks();
    displayall();
  } else {
    alert("invalid task");
  }
}

function clearAll() {
  localStorage.clear();
  tasks = [];
  displayall();
}

//help functions
function newtask(taskdesc) {
  return {
    description: taskdesc,
    compeleted: "",
  };
}
function displayall() {
  let outputstr = "";
  for (let i = 0; i < tasks.length; i++) {
    outputstr += gettaskhtmlstr(tasks[i], i);
  }
  tasksEl.innerHTML = outputstr;
}
function gettaskhtmlstr(task, i) {
  return `
  <Div class="${task.completed}">
    ${i}: ${task.description}
  </div>
  `;
}
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadtask() {
  let taskstr = localStorage.getItem("tasks");
  return JSON.parse(taskstr) ?? [];
}
