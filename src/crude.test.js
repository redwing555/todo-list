/**
 * @jest-environment jsdom
 */

 import {deleteTask, AddTask, createTask, deleteCompletedTask} from './crud';

 import localStorageMock from './__mocks__/localstorage';
 
 
 
 
 
 
 describe('tasks management', () => {
 
 
     beforeAll(() => {
 
         
         Object.defineProperty(window, 'localStorage', { value: localStorageMock });
         localStorage.setItem('tasksList', JSON.stringify([]));
         
 
     })
 
     test('task added to tasks Array/local Storage', () => {
 
         let tasks = JSON.parse(localStorage.getItem('tasksList')) || [];
         
         document.body.innerHTML =
         '<div>' +
         
         `<input type="text" class="input-task" placeholder="add task to your list ...">`+
         '</div>';
         document.querySelector('.input-task').value = 'do dishes';
 
         AddTask(tasks);
         expect(tasks).toHaveLength(1);
     });
 
     test('task deleted from  Tasks Array/Local storage', () =>{
 
         let tasks = JSON.parse(localStorage.getItem('tasksList')) || [];
         expect(deleteTask(tasks,0)).toHaveLength(0);
 
     })
 
    
   
 
     
 })
 
 
 