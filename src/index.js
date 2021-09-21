import './style.css';
/* eslint-disable */
import _ from 'lodash';
/* eslint-enable */

const list = document.querySelector('.list');

const tasks = [
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

function loadDomList() {
  tasks.forEach((task) => {
    const taskInfo = document.createElement('li');
    const update = document.createElement('a');

    update.innerHTML = `<button id="${task.index}" class="remove" > <i class="fa fa-ellipsis-v" aria-hidden="true"></i> </button>`;
    taskInfo.innerHTML = `<input type="checkbox" class="task-box"> 
                          <span> ${task.description} </span>`;

    taskInfo.classList.add('li');
    taskInfo.appendChild(update);
    list.appendChild(taskInfo);
  });
}

window.addEventListener('load', loadDomList);
