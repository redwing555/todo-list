export default function checkedTasksEvent(tasksArr, checkbox) {
  checkbox.forEach((box) => box.addEventListener('change', (e) => {
    const tmp = tasksArr.findIndex((el) => el.index === parseInt(e.target.id, 10));

    if (e.target.checked === true) {
      tasksArr[tmp].completed = true;
      e.target.nextElementSibling.classList.add('completed');
    } else {
      tasksArr[tmp].completed = false;
      e.target.nextElementSibling.classList.remove('completed');
    }

    JSON.parse(localStorage.getItem('tasksList'));
    localStorage.setItem('tasksList', JSON.stringify(tasksArr));
  }));
}
