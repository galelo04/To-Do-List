import { listsManager } from './listsManager';
import { taskManager } from './taskManager';
import { Storage } from './localStorage';

const applicationManager = (function () {
  const init = () => {
    const savedListsString = Storage.load();
    if (savedListsString === null) listsManager.createList('Home');
    else {
      const savedLists = JSON.parse(savedListsString);
      savedLists.forEach((list) => {
        const savedList = JSON.parse(list);
        const savedarr = JSON.parse(savedList.arr);
        listsManager.createList(savedList.title);
        savedarr.forEach((task) => {
          const savedTask = JSON.parse(task);
          const _task = taskManager.createTask(
            savedTask.title,
            savedTask.description,
            savedTask.dueDate,
            savedTask.priority,
            savedTask.done
          );
          listsManager.addTask(_task, savedList.id);
        });
      });
    }
  };
  const newTask = (listId, title, description, dueDate, priority, done) => {
    const task = taskManager.createTask(
      title,
      description,
      dueDate,
      priority,
      done
    );
    const taskId = listsManager.addTask(task, listId);
    Storage.save(listsManager.getLists());
    return taskId;
  };
  const removeTask = (listId, taskId) => {
    listsManager.removeTask(listId, taskId);
    Storage.save(listsManager.getLists());
  };
  const newList = (title) => {
    const newListId = listsManager.createList(title);
    Storage.save(listsManager.getLists());
    return newListId;
  };
  const removeList = (listId) => {
    listsManager.removeList(listId);
    Storage.save(listsManager.getLists());
  };
  const getTask = (listId, taskId) => {
    const list = listsManager.getList(listId);
    return list.getTask(taskId);
  };
  const editTask = (listId, taskId, title, description, dueDate, priority) => {
    const list = listsManager.getList(listId);
    const task = list.getTask(taskId);
    taskManager.modifyTask(task, title, description, dueDate, priority);
    Storage.save(listsManager.getLists());
  };
  const getList = (listId) => {
    return listsManager.getList(listId);
  };
  const getLists = () => listsManager.getLists();
  init();
  return {
    newTask,
    removeTask,
    newList,
    removeList,
    getTask,
    editTask,
    getList,
    getLists,
  };
})();

export { applicationManager };
