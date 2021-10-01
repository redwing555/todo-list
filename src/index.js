import './style.css';

/* eslint-disable */
import _ from 'lodash';
import  {checkedTasksEvent,editTask, deleteCompletedTask, moveToTrash } from './methods.js';
import {tasks,list,loadDomList, AddTask} from './crud.js';

/* eslint-enable */

const refresh = document.getElementById('delete-to-do');
const addButton = document.getElementById('add');
const clearAll = document.getElementById('clearall');

document.addEventListener('DOMContentLoaded', () => {
  JSON.parse(localStorage.getItem('tasksList'));
  loadDomList();
});

addButton.addEventListener('click', () => {
  AddTask(tasks);
  loadDomList();
  window.location.reload();
});

list.addEventListener('click', (e) => {
  const desc = [...e.target.children][1];
  editTask(desc, tasks, e.target);
});

list.addEventListener('click', (e) => {
  if (e.target && e.target.matches('input.task-box')) {
    JSON.parse(localStorage.getItem('tasksList'));
    checkedTasksEvent(tasks, e.target);
  }
});

list.addEventListener('click', (ev) => {
  if (ev.target && ev.target.matches('i.trash')) {
    const trashId = parseInt(ev.target.id[6], 10);
    moveToTrash(tasks, trashId);
    window.location.reload();
  }
});

refresh.addEventListener('click', () => {
  localStorage.setItem('tasksList', JSON.stringify([]));
  window.location.reload();
});

clearAll.addEventListener('click', () => {
  deleteCompletedTask(tasks);
  window.location.reload();
});
