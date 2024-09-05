import { format, parseISO } from 'date-fns';
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
  let currentListId;
  let selectedTaskId;
  let resetBtn;

  const init = () => {
    currentListId = 0;
    selectedTaskId = null;
    cacheDOM();
    bindEvents();
    Renderer.render(currentListId, selectedTaskId);
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
    resetBtn = document.querySelector('#resetBtn');
  };
  const bindEvents = () => {
    newTaskBtn.addEventListener('click', () => {
      taskForm.dialogType.value = 'add';
      taskForm.title.value = '';
      taskForm.desc.value = '';
      taskForm.date.value = '';
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
    tasksTab.addEventListener('click', completeTask);
    listsTab.addEventListener('click', changeCurrentList);
    resetBtn.addEventListener('click', resetStorage);
  };

  const addTask = (event) => {
    event.preventDefault();

    const title = taskForm.title.value;
    const description = taskForm.desc.value;
    const dueDate = parseISO(taskForm.date.value);
    const priority = taskForm.priority.value;
    selectedTaskId = applicationManager.newTask(
      currentListId,
      title,
      description,
      dueDate,
      priority
    );
    Renderer.render(currentListId, selectedTaskId);
    taskDialog.close();
  };
  const editTask = (event) => {
    if (event.target && event.target.classList.contains('editBtn')) {
      const taskEl = event.target.closest('.task');
      if (taskEl) {
        taskForm.dialogType.value = 'edit';
        const taskId = taskEl.getAttribute('task-id');
        const listId = taskEl.getAttribute('list-id');
        const task = applicationManager.getTask(listId, taskId);
        taskForm.title.value = task.getTitle();
        taskForm.desc.value = task.getDescription();
        taskForm.date.value = format(task.getDueDate(), "yyyy-MM-dd'T'HH:mm");
        taskForm.priority.value = task.getPriority();
        taskForm.taskId.value = taskId;
        taskForm.listId.value = listId;
        taskDialog.showModal();
      }
    }
  };
  const removeTask = (event) => {
    if (event.target && event.target.classList.contains('removeBtn')) {
      const taskEl = event.target.closest('.task');
      if (taskEl) {
        const listId = taskEl.getAttribute('list-id');
        const taskId = taskEl.getAttribute('task-id');
        applicationManager.removeTask(listId, taskId);

        selectedTaskId = null;

        Renderer.render(currentListId, selectedTaskId);
      }
    }
  };
  const confirmEdit = (event) => {
    event.preventDefault();
    const taskId = taskForm.taskId.value;
    const listId = taskForm.listId.value;
    applicationManager.editTask(
      listId,
      taskId,
      taskForm.title.value,
      taskForm.desc.value,
      parseISO(taskForm.date.value),
      taskForm.priority.value
    );

    taskDialog.close();
    Renderer.render(currentListId, selectedTaskId);
  };
  const addList = (event) => {
    event.preventDefault();
    const title = listForm.title.value;
    currentListId = applicationManager.newList(title);
    selectedTaskId = null;
    Renderer.render(currentListId, selectedTaskId);
    listDialog.close();
  };
  const changeSelectedTask = (event) => {
    if (event.target && event.target.classList.contains('task')) {
      selectedTaskId = event.target.getAttribute('task-id');
      Renderer.render(currentListId, selectedTaskId);
    }
  };
  const changeCurrentList = (event) => {
    const list = event.target.closest('.list');
    if (list) {
      currentListId = list.getAttribute('list-id');
      selectedTaskId = null;
      Renderer.render(currentListId, selectedTaskId);
    }
  };
  const completeTask = (event) => {
    if (event.target && event.target.classList.contains('checkboxLabel')) {
      const taskEl = event.target.closest('.task');
      const input = event.target.previousElementSibling;
      if (taskEl && input) {
        const listId = taskEl.getAttribute('list-id');
        const taskId = taskEl.getAttribute('task-id');
        const task = applicationManager.getTask(listId, taskId);
        task.toggleDone(!input.checked);
        Renderer.render(currentListId, selectedTaskId);
      }
    }
  };
  const resetStorage = () => {
    localStorage.clear();
    location.reload();
  };
  return { init };
})();

export { UI };
