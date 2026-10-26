const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const todoList = document.getElementById("incompleteTasks");
const completedList = document.getElementById("completed-tasks");

const createChild = function (parent, tag, { type, className, text, src }) {
  const element = document.createElement(tag);
  if (type !== undefined) element.type = type;
  if (className !== undefined) element.className = className;
  if (text !== undefined) element.innerText = text; //innerText encodes special characters, HTML does not.
  if (src !== undefined) element.src = src;
  parent.appendChild(element);
  return element;
};

const createNewTaskElement = function (taskText) {
  const listItem = document.createElement("li");

  createChild(listItem, "input", { type: "checkbox" });
  createChild(listItem, "label", { className: "task", text: taskText });
  createChild(listItem, "input", { type: "text", className: "task" });
  createChild(listItem, "button", { className: "edit", text: "Edit" });
  const deleteButton = createChild(listItem, "button", { className: "delete" });
  createChild(deleteButton, "img", { src: "./remove.svg" });

  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  todoList.appendChild(listItem);
  bindTaskEvents(listItem);

  taskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector(".edit");
  const isEditMode = listItem.classList.contains("editMode");
  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

//Move the task between the Todo and Completed lists, depending on the checkbox state.
const toggleTaskCompletion = function () {
  const listItem = this.parentNode;
  const targetList = this.checked ? completedList : todoList;
  targetList.appendChild(listItem);
  bindTaskEvents(listItem);
};

addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = toggleTaskCompletion;
};

//Bind events to every preloaded list item, in both lists.
const taskLists = [todoList, completedList];
for (const taskList of taskLists) {
  for (let i = 0; i < taskList.children.length; i++) {
    bindTaskEvents(taskList.children[i]);
  }
}
