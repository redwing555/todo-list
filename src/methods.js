export default function checkedTasksEvent(tasksArr, checkbox) {
  checkbox.forEach((box) => box.addEventListener('change', (e) => {
    const tmp = tasksArr.findIndex((el) => el.index === parseInt(e.target.id, 10));

    if (e.target.checked === true) {
      tasksArr[tmp].completed = true;
      // e.target.nextElementSibling.style.textDecoration = 'line-through';
      // e.target.nextElementSibling.style.color = 'gray';
    } else {
      tasksArr[tmp].completed = false;
      // e.target.nextElementSibling.style.textDecoration = 'none';
      // e.target.nextElementSibling.style.display = 'inline-block';
      // e.target.nextElementSibling.style.color = 'black';
    }

    localStorage.setItem('tasksList', JSON.stringify(tasksArr));
  }));
}
