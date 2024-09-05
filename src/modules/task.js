function Task(
  title,
  description = '',
  dueDate,
  priority = 'normal',
  done = false
) {
  let _title = title;
  let _description = description;
  let _dueDate = dueDate;
  let _priority = priority;
  let _done = done;
  let _id;

  const getTitle = () => _title;
  const getDescription = () => _description;
  const getDueDate = () => _dueDate;
  const getPriority = () => _priority;
  const getId = () => _id;
  const isDone = () => _done;

  const setTitle = (title) => (_title = title);
  const setDescription = (description) => (_description = description);
  const setDueDate = (dueDate) => (_dueDate = dueDate);
  const setPriority = (priority) => (_priority = priority);
  const setId = (listId) => (_id = listId);
  const toggleDone = (state) => (_done = state);

  return {
    getDescription,
    getDueDate,
    getPriority,
    getTitle,
    getId,
    isDone,
    setDescription,
    setDueDate,
    setPriority,
    setTitle,
    setId,
    toggleDone,
  };
}

export { Task };
