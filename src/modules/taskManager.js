import { Task } from './task';

const taskManager = (function () {
  const createTask = (title, description, dueDate, priority, done) => {
    return Task(title, description, dueDate, priority, done);
  };
  const modifyTask = (task, title, description, dueDate, priority, done) => {
    task.setTitle(title);
    task.setDescription(description);
    task.setDueDate(dueDate);
    task.setPriority(priority);
    task.toggleDone(done);
  };
  return { createTask, modifyTask };
})();

export { taskManager };
