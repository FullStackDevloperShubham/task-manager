// DOM elements
const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')

// Load tasks from /api/tasks
const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const response = await axios.get('/api/v1/task')
    console.log('API Response:', response)  // Debugging: Log the entire response

    const { data: { tasks } } = response
    console.log('Tasks:', tasks)  // Debugging: Log the tasks

    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }

    const allTasks = tasks.map((task) => {
      const { completed, _id: taskID, name } = task;
      // Check if taskID, name, and completed exist
      console.log('Task ID:', taskID, 'Task Name:', name, 'Completed:', completed);

      return `<div class="single-task ${completed ? 'task-completed' : ''}">
        <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
        <div class="task-links">
          <a href="task.html?id=${taskID}" class="edit-link">
            <i class="fas fa-edit"></i>
          </a>
          <button type="button" class="delete-btn" data-id="${taskID}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>`;
    }).join('');


    tasksDOM.innerHTML = allTasks
  } catch (error) {
    console.error('Error fetching tasks:', error)
    tasksDOM.innerHTML = '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

// Delete task /api/tasks/:id
tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {
      await axios.delete(`/api/v1/task/${id}`)
      showTasks()
    } catch (error) {
      console.error('Error deleting task:', error)
    }
    loadingDOM.style.visibility = 'hidden'
  }
})

// Form submission
formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = taskInputDOM.value

  try {
    await axios.post('/api/v1/task', { name })
    showTasks()
    taskInputDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `Success, task added`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error('Error adding task:', error)
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `Error, please try again`
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})

// Initial load of tasks
showTasks()