import trashcanImg from "../assets/trash-can-outline.svg";
import editImg from "../assets/circle-edit-outline.svg";
import { applicationManager } from "./applicationManager";

const Renderer = (function () {
  let currentListTitle = document.querySelector(".listTitle");
  let taskViewTab = document.querySelector(".taskView");
  let tasksTab = document.querySelector(".tasks");
  let listsTab = document.querySelector(".lists");

  const render = (currentList, selectedTask) => {
    renderSelectedTask(selectedTask);
    renderTasks(currentList);
    renderLists(currentList);
  };
  const renderSelectedTask = (selectedTask) => {
    taskViewTab.innerHTML = "";
    if (selectedTask) {
      const title = document.createElement("div");
      const description = document.createElement("div");
      const dueDate = document.createElement("div");
      const priority = document.createElement("div");

      title.innerText = "Title: " + selectedTask.getTitle();
      title.classList.add("taskTitle");
      description.innerText = "Description: " + selectedTask.getDescription();
      description.classList.add("taskDescription");
      dueDate.innerText = "Due Date: " + selectedTask.getDueDate();
      dueDate.classList.add("taskDueDate");
      priority.innerText = "Priority: " + selectedTask.getPriority();
      priority.classList.add("taskPriority");

      taskViewTab.appendChild(title);
      taskViewTab.appendChild(description);
      taskViewTab.appendChild(dueDate);
      taskViewTab.appendChild(priority);
    }
  };
  const renderTasks = (currentList) => {
    tasksTab.innerHTML = "";
    currentList.getList().forEach((task) => {
      if (task) {
        const taskEl = document.createElement("div");
        const title = document.createElement("p");
        const editBtn = document.createElement("button");
        const removeBtn = document.createElement("button");

        const editimg = new Image();
        editimg.src = editImg;

        const removeImg = new Image();
        removeImg.src = trashcanImg;

        taskEl.setAttribute("task-id", task.getId());
        taskEl.setAttribute("list-id", currentList.getId());
        taskEl.classList.add("task");

        title.innerText = task.getTitle();
        editBtn.classList.add("editBtn");
        editBtn.appendChild(editimg);
        removeBtn.classList.add("removeBtn");
        removeBtn.appendChild(removeImg);

        taskEl.innerHTML = `<div class="checkbox">
  		<input type="checkbox" value="1" id="checkboxInput" name="" />
	  	<label for="checkboxInput"></label>
  	</div>`;
        taskEl.appendChild(title);
        taskEl.appendChild(editBtn);
        taskEl.appendChild(removeBtn);

        tasksTab.appendChild(taskEl);
      }
    });
  };
  const renderLists = (currentList) => {
    listsTab.innerHTML = "";
    currentListTitle.innerHTML = currentList.getTitle();
    applicationManager.getLists().forEach((list) => {
      if (list) {
        const listEl = document.createElement("div");
        const title = document.createElement("p");

        listEl.setAttribute("list-id", list.getId());
        listEl.classList.add("list");

        title.innerText = list.getTitle();

        listEl.appendChild(title);
        listsTab.appendChild(listEl);
      }
    });
  };
  return { render };
})();

export { Renderer };
