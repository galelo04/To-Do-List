import { format } from 'date-fns';
import { applicationManager } from './applicationManager';
import { Renderer } from './renderer';

const UI = (function () {
  let newTaskBtn;
  let newListBtn;
  let tasksTab;
  let listsTab;
  let taskDialog;
  let listDialog;
  let taskForm;
  let listForm;
  let closeTaskDialogBtn;
  let closeListDialogBtn;
  let currentList;
  let selectedTask;

  const init = () => {
    currentList = applicationManager.getCurrentList();
    selectedTask = null;
    cacheDOM();
    bindEvents();
    Renderer.render(currentList, selectedTask);
  };
  const cacheDOM = () => {
    newTaskBtn = document.querySelector('#newTaskBtn');
    newListBtn = document.querySelector('#newListBtn');
    tasksTab = document.querySelector('.tasks');
    listsTab = document.querySelector('.lists');
    taskDialog = document.querySelector('.taskDialog');
    listDialog = document.querySelector('.listDialog');
    taskForm = document.querySelector('.taskForm');
    listForm = document.querySelector('.listForm');
    closeTaskDialogBtn = document.querySelector('#closeTaskDialogBtn');
    closeListDialogBtn = document.querySelector('#closeListDialogBtn');
  };
  const bindEvents = () => {
    newTaskBtn.addEventListener('click', () => {
      taskForm.dialogType.value = 'add';
      taskForm.title.value = '';
      taskForm.desc.value = '';
      taskForm.date.value = '';
      taskForm.priority.value = '';
      taskDialog.showModal();
    });
    newListBtn.addEventListener('click', () => {
      listForm.title.value = '';
      listDialog.showModal();
    });
    closeTaskDialogBtn.addEventListener('click', () => {
      taskDialog.close();
    });
    closeListDialogBtn.addEventListener('click', () => {
      listDialog.close();
    });
    taskForm.addEventListener('submit', (event) => {
      if (taskForm.dialogType.value === 'add') addTask(event);
      else if (taskForm.dialogType.value === 'edit') confirmEdit(event);
    });
    listForm.addEventListener('submit', addList);
    tasksTab.addEventListener('click', editTask);
    tasksTab.addEventListener('click', removeTask);
    tasksTab.addEventListener('click', changeSelectedTask);
    listsTab.addEventListener('click', changeCurrentList);
  };
  const render = () => {
    renderTasks();
    renderSelectedTask();
    renderLists();
  };

  const addTask = (event) => {
    event.preventDefault();

    const title = taskForm.title.value;
    const description = taskForm.desc.value;
    const dueDate = taskForm.date.value;
    const priority = taskForm.priority.value;
    selectedTask = applicationManager.newTask(
      title,
      description,
      dueDate,
      priority
    );
    Renderer.render(currentList, selectedTask);
    taskDialog.close();
  };
  const editTask = (event) => {
    const editButton = event.target.closest('.editBtn');
    if (editButton) {
      const taskEl = editButton.closest('.task');
      if (taskEl) {
        taskForm.dialogType.value = 'edit';
        const taskId = taskEl.getAttribute('task-id');
        const task = currentList.getTask(taskId);
        taskForm.title.value = task.getTitle();
        taskForm.desc.value = task.getDescription();
        taskForm.date.value = task.getDueDate();
        taskForm.priority.value = task.getPriority();
        taskForm.taskId.value = taskId;
        taskDialog.showModal();
      }
    }
  };
  const removeTask = (event) => {
    const removeButton = event.target.closest('.removeBtn');
    if (removeButton) {
      const taskEl = removeButton.closest('.task');
      if (taskEl) {
        const listId = taskEl.getAttribute('list-id');
        const taskId = taskEl.getAttribute('task-id');
        if (applicationManager.removeTask(listId, taskId) === selectedTask) {
          selectedTask = null;
        }
        Renderer.render(currentList, selectedTask);
      }
    }
  };
  const confirmEdit = (event) => {
    event.preventDefault();
    const taskId = taskForm.taskId.value;
    const task = currentList.getTask(taskId);
    task.setTitle(taskForm.title.value);
    task.setDescription(taskForm.desc.value);
    task.setDueDate(taskForm.date.value);
    task.setPriority(taskForm.priority.value);

    taskDialog.close();
    Renderer.render(currentList, selectedTask);
  };
  const addList = (event) => {
    event.preventDefault();

    const title = listForm.title.value;
    applicationManager.newList(title);
    currentList = applicationManager.getCurrentList();
    selectedTask = null;
    Renderer.render(currentList, selectedTask);
    listDialog.close();
  };
  const changeSelectedTask = (event) => {
    if (event.target && event.target.classList.contains('task')) {
      selectedTask = currentList.getTask(event.target.getAttribute('task-id'));
      renderSelectedTask();
    }
  };
  const changeCurrentList = (event) => {
    const list = event.target.closest('.list');
    if (list) {
      applicationManager.setCurrentList(list.getAttribute('list-id'));
      currentList = applicationManager.getCurrentList();
      selectedTask = currentList.getTask(0);
      Renderer.render(currentList, selectedTask);
    }
  };
  return { init };
})();

export { UI };
