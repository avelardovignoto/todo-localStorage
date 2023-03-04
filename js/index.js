const form = document.querySelector('#form');
const taskList = document.querySelector('#task-list');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const renderTaskList = () => {
  taskList.innerHTML = '';

  tasks.map(task => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    
    const description = document.createElement('p');
    description.textContent = task.description;
    description.classList.add('description');
    if (task.done) {
      description.style.textDecoration = "line-through";
    }

    const check = document.createElement('span');
    check.textContent = 'check_circle';
    check.classList.add('material-symbols-outlined', 'green-check');
    check.addEventListener('click', e => {
      task.done = true;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTaskList();
    })

    const remove = document.createElement('span');
    remove.textContent = 'delete';
    remove.classList.add('material-symbols-outlined', 'red-remove');
    remove.addEventListener('click', e => {
      const taskIndex = tasks.findIndex(item => item.id === task.id);
      tasks.splice(taskIndex, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTaskList();
    })

    taskItem.append(description, check, remove);
    taskList.append(taskItem);
  })

}

const loadTasks = () => {
  tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  renderTaskList();
};

form.addEventListener('submit', e => {
  e.preventDefault();

  
  const task = Object.create(null);
  task.id = Date.now(); 
  task.description = e.target.description.value.trim();
  task.done = false;

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  form.reset();

  renderTaskList();
})

loadTasks();