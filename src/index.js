import './style.css';

/* eslint-disable */
import _ from 'lodash';
import  checkedTasksEvent from './methods.js';
import {tasks,list,loadDomList,  editTask, deleteCompletedTask, AddTask} from './crud.js';

/* eslint-enable */

const refresh = document.getElementById('delete-to-do');
const addButton = document.getElementById('add');
const clearAll = document.getElementById('clearall');

document.addEventListener('DOMContentLoaded', () => {
  JSON.parse(localStorage.getItem('tasksList'));
  loadDomList();
  const checkbox = [...document.querySelectorAll('.task-box')];
  checkedTasksEvent(tasks, checkbox);
});

addButton.addEventListener('click', () => {
  AddTask(tasks);
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
