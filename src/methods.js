export function checkedTasksEvent(tasksArr, EventTarget) {
  const tmp = tasksArr.findIndex((el) => el.index === parseInt(EventTarget.id, 10));

  if (EventTarget.checked === true) {
    tasksArr[tmp].completed = true;
    EventTarget.nextElementSibling.classList.add('completed');
  } else {
    tasksArr[tmp].completed = false;
    EventTarget.nextElementSibling.classList.remove('completed');
  }

  JSON.parse(localStorage.getItem('tasksList'));
  localStorage.setItem('tasksList', JSON.stringify(tasksArr));
}

export function deleteCompletedTask(taskArr) {
  const storeLength = JSON.parse(localStorage.getItem('tasksList')).length;
  taskArr = taskArr.filter((task) => task.completed === false);
  localStorage.setItem('tasksList', JSON.stringify(taskArr));
/* eslint-disable */
  taskArr.forEach((task, i) => task.index = Array.from(Array(storeLength).keys())[i]);

  localStorage.setItem('tasksList', JSON.stringify(taskArr));
  return taskArr;
}

export function moveToTrash(taskArr, trashId) {
  const storeLength = JSON.parse(localStorage.getItem('tasksList')).length;

  localStorage.setItem('tasksList', JSON.stringify(taskArr));
  taskArr = taskArr.filter((task) => task.index !== trashId);

  taskArr.forEach((task, i) => task.index = Array.from(Array(storeLength).keys())[i]);
  /* eslint-enable */
  localStorage.setItem('tasksList', JSON.stringify(taskArr));
}

export function editTask(description, taskArr, eventTarget) {
  if (eventTarget && eventTarget.matches('li.li-task')) {
    if ([...description.attributes][1].value === 'false') {
      eventTarget.style.backgroundColor = '#fff176';
      [...description.attributes][1].value = true;

      [...[...[...eventTarget.children][2].children][0].children][1].classList.add('trash-active');
      [...[...[...eventTarget.children][2].children][0].children][0].style.display = 'none';
    } else if ([...description.attributes][1].value === 'true') {
      eventTarget.style.backgroundColor = 'white';
      const tmp = taskArr.findIndex((el) => el.index === parseInt([...description.id][5], 10));
      taskArr[tmp].description = description.textContent;
      [...[...eventTarget.children][1].attributes][1].value = false;

      [...[...[...eventTarget.children][2].children][0].children][1].classList.remove('trash-active');
      [...[...[...eventTarget.children][2].children][0].children][0].style.display = 'inline-block';

      localStorage.setItem('tasksList', JSON.stringify(taskArr));
    }
  }
}
