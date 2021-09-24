export const tasks = JSON.parse(localStorage.getItem('tasksList')) || [];

function addTaskToStorage() {
  const tasksInfo = JSON.stringify(tasks);
  localStorage.setItem('tasksList', tasksInfo);
}

export function AddTask() {
  const task = {
    description: document.querySelector('.input-task').value,
    completed: false,
    index: tasks.length,
  };

  tasks.push(task);
  addTaskToStorage();
}

export function deleteCompletedTask(taskArr) {
  const storeLength = JSON.parse(localStorage.getItem('tasksList')).length;

  taskArr = taskArr.filter((task) => task.completed === false);

  localStorage.setItem('tasksList', JSON.stringify(taskArr));

  window.location.reload();
  /* eslint-disable */
  taskArr.forEach((task, i) => task.index = Array.from(Array(storeLength).keys())[i]);
  /* eslint-enable */
  localStorage.setItem('tasksList', JSON.stringify(taskArr));
}

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
      addTaskToStorage();
    }
  }
}
