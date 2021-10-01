/**
 * @jest-environment jsdom
 */

import { AddTask, createTask } from './crud';
import { checkedTasksEvent, deleteCompletedTask, editTask } from './methods';
import localStorageMock from './__mocks__/localstorage';

describe('edit / completed task state / deletion after completed', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    localStorage.setItem('tasksList', JSON.stringify([]));
  });

  test('completed task deleted from tasks/local Storage', () => {
    const tasks = JSON.parse(localStorage.getItem('tasksList')) || [];
    document.body.innerHTML = '<div>'

         + '<input type="text" class="input-task" placeholder="add task to your list ...">'
         + '</div>';
    document.querySelector('.input-task').value = 'do dishes';

    AddTask(tasks);
    tasks[0].completed = true;
    expect(deleteCompletedTask(tasks)).toHaveLength(0);
  });

  test('task changes state correctly when checkbox checked', () => {
    localStorage.setItem('tasksList', JSON.stringify([]));
    const tasks = JSON.parse(localStorage.getItem('tasksList')) || [];

    document.body.innerHTML = '<div>'
         + '<input type="text" class="input-task" placeholder="add task to your list ...">'
         + '  <ul class="list"></ul>'
         + '</div>';

    createTask(0, 'do push ups', false);

    document.querySelector('.input-task').value = 'do push ups';

    AddTask(tasks);

    const listel = document.querySelectorAll('.list li');
    const checkbox = [...[...listel][0].children][0];
    checkbox.checked = 'checked';

    checkedTasksEvent(tasks, checkbox);

    expect(tasks[0].completed).toBe(true);
  });

  test('task correctly edited in local storage and DOM', () => {
    const tasks = JSON.parse(localStorage.getItem('tasksList')) || [];
    document.body.innerHTML = '<div>'
    + '<input type="text" class="input-task" placeholder="add task to your list ...">'
    + '  <ul class="list"></ul>'
    + '</div>';

    createTask(0, 'do push ups', true);
    document.querySelector('.input-task').value = 'do push ups';
    AddTask(tasks);

    const listel = document.querySelectorAll('.list li');
    [...listel][0].classList.add('li-task');
    const description = [...[...listel][0].children][1];
    const contentEditable = [...description.attributes][1];

    contentEditable.value = true;
    description.textContent = 'do something';

    editTask(description, tasks, [...listel][0]);

    expect(tasks[0].description).toBe('do something');
  });
});