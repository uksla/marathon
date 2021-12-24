'use strict'


// import { UI_ElEMENTS } from './view.js';

const UI_ElEMENTS = {
  form: document.querySelectorAll('.to-do__form'),
}

UI_ElEMENTS.form.forEach(function (item) {
  item.addEventListener('submit', addTask)
});

function addDelBtnEventLis() {
  UI_ElEMENTS.deleteTaskBtn = document.querySelectorAll('.to-do__task-button');

  UI_ElEMENTS.deleteTaskBtn.forEach(function (item) {
    item.addEventListener('click', deleteTask);
  });
}

function addCheckboxLis() {
  UI_ElEMENTS.inputCheckBox = document.querySelectorAll('.to-do__task-checkbox');

  UI_ElEMENTS.inputCheckBox.forEach(function (item) {
    item.addEventListener('change', isCheckboxMarked);
  });
}

function isCheckboxMarked() {
  this.parentNode.parentNode.classList.toggle('to-do__task--done');
}

let globalValueInput = undefined;

function buildTask(value) {
  const task = document.createElement('div');
  const label = document.createElement('label');
  const inputCheckBox = document.createElement('input');
  const deleteTaskBtn = document.createElement('button');

  task.classList.add('to-do__task');
  label.classList.add('to-do__task-content');
  inputCheckBox.classList.add('to-do__task-checkbox');
  deleteTaskBtn.classList.add('to-do__task-button');

  inputCheckBox.type = 'checkbox';

  label.append(inputCheckBox);
  task.append(label, deleteTaskBtn);

  if (value) {
    task.firstElementChild.append(value);
    let currentInput = document.querySelector('.to-do__form').nextElementSibling.append(task);
  }

  return task;
}

const STATUSES = {
  toDo: "TODO",
  inProgress: "In Progress",
  done: "Done",
}

const PRIORITY = {
  high: "high",
  low: "low",
}

const list = []

function newTaskFn(name) {
  const newTask = {
    id: list.length + 1,
    name: name,
    status: STATUSES.toDo,
    priority: undefined,
  }

  return list.push(newTask);
  
}

function listTOJSON() {
  let listToJson = JSON.stringify(list);
  localStorage.setItem('task', listToJson);
}


function clearInput() {
  UI_ElEMENTS.newTaskInput.value = '';
}

function addTask() {
  const NEW_TASK_NODE = buildTask();

  UI_ElEMENTS.newTaskInput = this.querySelector('.to-do__form-input');
  let valueInput = UI_ElEMENTS.newTaskInput.value;
  valueInput.trim();
  console.log(valueInput);

  try {
    if (valueInput === '') {
      throw new SyntaxError("Empty task");
    }

    NEW_TASK_NODE.firstElementChild.append(valueInput);
    let currentInput = this.nextElementSibling.append(NEW_TASK_NODE);
    clearInput();
    addDelBtnEventLis();
    addCheckboxLis();
    console.log(this);

    newTaskFn(valueInput)
    globalValueInput = valueInput;
    listTOJSON();

  } catch (error) {
    console.log("Error: " + error.message);
  }
}

function loadPresentTasks() {
  let listValue = localStorage.getItem('task');
  let newList = JSON.parse(listValue);
  console.log(newList);

  newList.forEach(function (item, i, newList) {
    let object = newList[i].name;
    buildTask(object);
    console.log(object);

    newTaskFn(object)
  });
}

function deleteTask() {
  let targetUI = this.parentElement;
  targetUI.remove();

  for (let i = 0; i < list.length; i++) {
    if (list[i].name === targetUI.textContent) {
      list.splice(i, 1);

      localStorage.removeItem('task');
      listTOJSON();
    }
  }
}

window.onload = function () {
  loadPresentTasks()
  addDelBtnEventLis();
  addCheckboxLis();
}