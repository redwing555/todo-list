import './style.css';

/* eslint-disable */
import _ from 'lodash';
import  checkedTasksEvent from './methods.js';
import {editTask, deleteCompletedTask, tasks, AddTask} from './crud.js';

/* eslint-enable */

const list = document.querySelector('.list');
const refresh = document.getElementById('delete-to-do');
const addButton = document.getElementById('add');
const clearAll = document.getElementById('clearall');

function sortTasksbyIndex(arrTasks) {
  arrTasks.sort((task1, task2) => task1.index - task2.index);
}

function hidden() {
  while (list.lastElementChild) {
    list.removeChild(list.lastElementChild);
  }
}

function createTask(index, description, taskState) {
  const taskInfo = document.createElement('li');
  const update = document.createElement('a');

  if (taskState === true) {
    update.innerHTML = '<button  class="remove" > <i class="ellipse fa fa-ellipsis-v" aria-hidden="true"></i> <i class="trash fa fa-trash" aria-hidden="true"></i> </button>';
    taskInfo.innerHTML = `<input type="checkbox" id="${index}" class="task-box" checked> 
                            <span id ="task-${index}" contenteditable='false' class= "task-description completed"> ${description} </span>`;

    taskInfo.classList.add('li-task');
    taskInfo.appendChild(update);
    list.appendChild(taskInfo);
  } else {
    update.innerHTML = `<button   class="remove"> <i class="fa fa-ellipsis-v" aria-hidden="true"></i><i id ="trash-${index}"  class="trash fa fa-trash" aria-hidden="true"></i> </button>`;
    taskInfo.innerHTML = `<input type="checkbox" id="${index}" class="task-box"> 
                            <span id ="task-${index}" contenteditable='false' class= "task-description"> ${description} </span>`;

    taskInfo.classList.add('li-task');
    taskInfo.appendChild(update);
    list.appendChild(taskInfo);
  }
}

function loadDomList() {
  sortTasksbyIndex(tasks);
  hidden();
  tasks.forEach((task) => {
    createTask(task.index, task.description, task.completed);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  JSON.parse(localStorage.getItem('tasksList'));
  loadDomList();
  const checkbox = [...document.querySelectorAll('.task-box')];
  checkedTasksEvent(tasks, checkbox);
});

addButton.addEventListener('click', () => {
  AddTask();
  loadDomList();
  window.location.reload();
});

list.addEventListener('click', (e) => {
  const desc = [...e.target.children][1];
  editTask(desc, tasks, e);
});

refresh.addEventListener('click', () => {
  localStorage.setItem('tasksList', JSON.stringify([]));
  window.location.reload();
});

clearAll.addEventListener('click', () => {
  deleteCompletedTask(tasks);
});
