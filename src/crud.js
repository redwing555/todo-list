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
