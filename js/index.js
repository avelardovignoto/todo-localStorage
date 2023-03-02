const form = document.querySelector('form');
const taskList = document.querySelector('#task-list');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const renderTaskList = () => {
  taskList.innerHTML = '';

  tasks.map(task => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    const desc = document.createElement('p');
    desc.textContent = task.description;
    desc.classList.add('desc');
    if (task.done) {
      desc.style.textDecoration = "line-through";
    }

    const done = document.createElement('span');
    done.textContent = 'Concluir';
    done.classList.add('done');
    done.addEventListener('click', e => {
      task.done = true;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTaskList();
    })

    const remover = document.createElement('span');
    remover.textContent = 'Deletar';
    remover.classList.add('delete');
    remover.addEventListener('click', e => {
      const taskIndex = tasks.findIndex(item => item.id === task.id);
      tasks.splice(taskIndex, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTaskList();
    })

    taskItem.append(desc, done, remover);
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

window.addEventListener('load', loadTasks);