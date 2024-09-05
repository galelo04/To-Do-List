import { List } from './tasksList';

const listsManager = (function () {
  const lists = [];
  let _lastId = 0;
  const addTask = (task, listId) => {
    return lists[listId].addTask(task);
  };
  const removeTask = (listId, taskId) => {
    lists[listId].removeTask(taskId);
  };
  const createList = (title) => {
    const list = List(title);
    lists.push(list);
    list.setId(_lastId);
    return _lastId++;
  };
  const removeList = (listId) => {
    lists[listId] = lists[--_lastId];
    lists[listId].setId(listId);
    lists.pop();
  };
  const getList = (listId) => lists[listId];
  const getLists = () => lists;

  return {
    createList,
    removeList,
    addTask,
    removeTask,
    getLists,
    getList,
  };
})();

export { listsManager };
