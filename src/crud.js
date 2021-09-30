export const list = document.querySelector('.list');
export const tasks = JSON.parse(localStorage.getItem('tasksList')) || [];

export function sortTasksbyIndex(arrTasks) {
  arrTasks.sort((task1, task2) => task1.index - task2.index);
}

export function hidden() {
  while (list.lastElementChild) {
    list.removeChild(list.lastElementChild);
  }
}

export function createTask(index, description, taskState) {
  const list = document.querySelector('.list');
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

export function loadDomList() {
  sortTasksbyIndex(tasks);
  hidden();
  tasks.forEach((task) => {
    createTask(task.index, task.description, task.completed);
  });
}

export function AddTask(taskArr) {
  const task = {
    description: document.querySelector('.input-task').value,
    completed: false,
    index: taskArr.length,
  };

  taskArr.push(task);
  localStorage.setItem('tasksList', JSON.stringify(taskArr));
}

export function deleteTask(taskArr, num) {
  taskArr = taskArr.filter((task) => task.index !== num);
  localStorage.setItem('tasksList', JSON.stringify(taskArr));

  return taskArr;
}
/* eslint-disable */
export function deleteCompletedTask(taskArr) {
  const storeLength = JSON.parse(localStorage.getItem('tasksList')).length;
  taskArr = taskArr.filter((task) => task.completed === false);
  localStorage.setItem('tasksList', JSON.stringify(taskArr));



  taskArr.forEach((task, i) => task.index = Array.from(Array(storeLength).keys())[i]);

  localStorage.setItem('tasksList', JSON.stringify(taskArr));
  return taskArr;
}

/* eslint-enable */

function moveToTrash(taskArr) {
  const trashCan = [...document.querySelectorAll('.trash')];
  const storeLength = JSON.parse(localStorage.getItem('tasksList')).length;

  trashCan.forEach((can) => can.addEventListener('click', () => {
    taskArr = taskArr.filter((task) => task.index !== parseInt(can.id[6], 10));
    localStorage.setItem('tasksList', JSON.stringify(taskArr));
    window.location.reload();
    /* eslint-disable */
    taskArr.forEach((task, i) => task.index = Array.from(Array(storeLength).keys())[i]);
    /* eslint-enable */
    localStorage.setItem('tasksList', JSON.stringify(taskArr));
  }));
}

export function editTask(description, taskArr, event) {
  if (event.target && event.target.matches('li.li-task')) {
    if ([...description.attributes][1].value === 'false') {
      event.target.style.backgroundColor = '#fff176';
      [...description.attributes][1].value = true;

      [...[...[...event.target.children][2].children][0].children][1].classList.add('trash-active');
      [...[...[...event.target.children][2].children][0].children][0].style.display = 'none';
      moveToTrash(taskArr);
    } else if ([...description.attributes][1].value === 'true') {
      [...[...event.target.children][1].attributes][1].value = false;
      event.target.style.backgroundColor = 'white';
      const tmp = taskArr.findIndex((el) => el.index === parseInt([...description.id][5], 10));
      taskArr[tmp].description = description.textContent;

      [...[...[...event.target.children][2].children][0].children][1].classList.remove('trash-active');
      [...[...[...event.target.children][2].children][0].children][0].style.display = 'inline-block';
      localStorage.setItem('tasksList', JSON.stringify(taskArr));
    }
  }
}
