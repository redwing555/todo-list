import './style.css';

/* eslint-disable */
import _ from 'lodash';
import  checkedTasksEvent from './methods.js';

/* eslint-enable */

const list = document.querySelector('.list');

let tasks = [
  {
    description: 'do squats',
    completed: false,
    index: 1,

  },
  {
    description: 'do pull ups',
    completed: false,
    index: 2,

  },
  {
    description: 'do push ups',
    completed: false,
    index: 3,

  },

];

function sortTasksbyIndex(arrTasks) {
  arrTasks.sort((task1, task2) => task1.index - task2.index);
}

function geTasksFromStorage() {
  const storageData = JSON.parse(localStorage.getItem('tasksList'));
  if (storageData) {
    tasks = storageData;
  }
}

function createTask(index, description, taskState) {
  sortTasksbyIndex(tasks);
  if (taskState === true) {
    const taskInfo = document.createElement('li');
    const update = document.createElement('a');

    update.innerHTML = '<button  class="remove" > <i class="fa fa-ellipsis-v" aria-hidden="true"></i> </button>';
    taskInfo.innerHTML = `<input type="checkbox" id="${index}" class="task-box" checked> 
                            <span class = "task-description"> ${description} </span>`;

    taskInfo.classList.add('li');
    taskInfo.appendChild(update);
    list.appendChild(taskInfo);
  } else {
    const taskInfo = document.createElement('li');
    const update = document.createElement('a');

    update.innerHTML = '<button  class="remove" > <i class="fa fa-ellipsis-v" aria-hidden="true"></i> </button>';
    taskInfo.innerHTML = `<input type="checkbox" id="${index}" class="task-box"> 
                            <span class = "task-description"> ${description} </span>`;

    taskInfo.classList.add('li');
    taskInfo.appendChild(update);
    list.appendChild(taskInfo);
  }
}

function loadDomList() {
  tasks.forEach((task) => {
    createTask(task.index, task.description, task.completed);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  geTasksFromStorage();
  loadDomList();
  const checkbox = [...document.querySelectorAll('.task-box')];
  checkedTasksEvent(tasks, checkbox);
});
