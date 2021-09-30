/**
 * @jest-environment jsdom
 */

import {
  deleteTask, AddTask, createTask,
} from './crud';

import localStorageMock from './__mocks__/localstorage';

describe('tasks management', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    localStorage.setItem('tasksList', JSON.stringify([]));
  });

  test('task added to tasks Array/local Storage', () => {
    const tasks = JSON.parse(localStorage.getItem('tasksList')) || [];

    document.body.innerHTML = '<div>'

         + '<input type="text" class="input-task" placeholder="add task to your list ...">'
         + '</div>';
    document.querySelector('.input-task').value = 'do dishes';

    AddTask(tasks);
    expect(tasks).toHaveLength(1);
  });

  test('task deleted from  Tasks Array/Local storage', () => {
    const tasks = JSON.parse(localStorage.getItem('tasksList')) || [];
    expect(deleteTask(tasks, 0)).toHaveLength(0);
  });

  test('task added to DOM', () => {
    document.body.innerHTML = '<div>'
    + '  <ul class="list"></ul>'
    + '</div>';

    createTask(0, 'do push ups', true);
    const listel = document.querySelectorAll('.list li');
    expect(listel).toHaveLength(1);
  });
});
