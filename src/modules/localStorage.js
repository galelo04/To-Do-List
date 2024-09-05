import { applicationManager } from './applicationManager';

const Storage = (function () {
  const save = (lists) => {
    const savedLists = [];
    lists.forEach((list) => {
      const savedList = {};
      const savedarr = [];
      const arr = list.getList();
      arr.forEach((task) => {
        const savedTask = {};
        savedTask.title = task.getTitle();
        savedTask.description = task.getDescription();
        savedTask.dueDate = task.getDueDate();
        savedTask.priority = task.getPriority();
        savedTask.done = task.isDone();
        const savedTaskString = JSON.stringify(savedTask);
        savedarr.push(savedTaskString);
      });
      const savedarrString = JSON.stringify(savedarr);
      savedList.arr = savedarrString;
      savedList.title = list.getTitle();
      savedList.id = list.getId();
      const savedListString = JSON.stringify(savedList);
      savedLists.push(savedListString);
    });
    const savedListsString = JSON.stringify(savedLists);
    localStorage.setItem('savedLists', savedListsString);
  };
  const load = () => {
    const dkfj = localStorage.getItem('savedLists');
    return dkfj;
    // if (savedListsString !== null) {
    //   const savedLists = JSON.parse(savedListsString);
    //   savedLists.forEach((list) => {
    //     const savedList = JSON.parse(list);
    //     const savedarr = JSON.parse(savedList.arr);
    //     applicationManager.newList(savedList.title);
    //     savedarr.forEach((task) => {
    //       const savedTask = JSON.parse(task);
    //       applicationManager.newTask(
    //         savedTask.title,
    //         savedTask.description,
    //         savedTask.dueDate,
    //         savedTask.priority,
    //         savedTask.done
    //       );
    //     });
    //   });
    //   return true;
    // } else return false;
  };
  return { save, load };
})();

export { Storage };
