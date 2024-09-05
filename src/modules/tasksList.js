function List(title) {
  let _title = title;
  let _lastId = 0;
  let _id;
  const list = [];

  const getId = () => _id;
  const setId = (id) => {
    _id = id;
  };
  const getTitle = () => _title;
  const setTitle = (title) => (_title = title);
  const getLastId = () => _lastId;
  const setLastId = (id) => {
    _lastId = id;
  };

  const addTask = (task) => {
    list.push(task);
    task.setId(_lastId);
    return _lastId++;
  };
  const removeTask = (taskId) => {
    list[taskId] = list[--_lastId];
    list[taskId].setId(taskId);
    list.pop();
  };
  const getList = () => list;
  const getTask = (taskId) => list[taskId];

  return {
    getTitle,
    setTitle,
    addTask,
    removeTask,
    getId,
    setId,
    getLastId,
    setLastId,
    getList,
    getTask,
  };
}

export { List };
