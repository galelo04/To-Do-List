import trashcanImg from '../assets/trash-can-outline.svg';
import editImg from '../assets/circle-edit-outline.svg';
import { applicationManager } from './applicationManager';
import {
  format,
  parseISO,
  compareAsc,
  isToday,
  differenceInHours,
  isTomorrow,
  formatDistanceStrict,
  isPast,
} from 'date-fns';
import { is } from 'date-fns/locale';

const Renderer = (function () {
  let currentListTitle = document.querySelector('.listTitle');
  let taskViewTab = document.querySelector('.taskView');
  let tasksTab = document.querySelector('.tasks');
  let listsTab = document.querySelector('.lists');

  const render = (currentListId, selectedTaskId) => {
    renderSelectedTask(currentListId, selectedTaskId);
    renderTasks(currentListId);
    renderLists(currentListId);
  };
  const renderDate = (dueDate, dateEl) => {
    const now = new Date();
    if (isToday(dueDate)) {
      const hoursRemaining = differenceInHours(dueDate, now);
      dateEl.classList.add('today');
      return hoursRemaining + ' hours remaining';
    } else if (isTomorrow(dueDate)) {
      dateEl.classList.add('tomorrow');
      return 'Due tomorrow';
    } else {
      const distance = formatDistanceStrict(dueDate, now);
      if (isPast(dueDate)) {
        dateEl.classList.add('passed');
        return 'Overdue by ' + distance + '\u{1F480}';
      }
      dateEl.classList.add('normal');
      return distance + ' remaining';
    }
  };
  const renderSelectedTask = (currentListId, selectedTaskId) => {
    taskViewTab.innerHTML = '';
    if (selectedTaskId !== null) {
      const title = document.createElement('div');
      const description = document.createElement('div');
      const dueDate = document.createElement('div');
      const priority = document.createElement('div');
      const done = document.createElement('div');
      const task = applicationManager.getTask(currentListId, selectedTaskId);

      title.innerHTML = task.getTitle();
      title.classList.add('taskTitle');

      description.innerHTML = `
<div class="descriptionHeader">Description: </div>
<div class="descriptionContent"></div>`;
      description.querySelector('.descriptionContent').innerText =
        task.getDescription();

      dueDate.innerHTML = `<div class="dueDateHeader">DueDate: </div>
<div class="dueDateContent"></div>`;
      dueDate.querySelector('.dueDateContent').innerText = format(
        task.getDueDate(),
        'MMMM do, yyyy, h:mm a'
      );

      priority.innerHTML = `<div class="priorityHeader">Priority: </div>
        <div class="priorityContent"></div>`;
      priority.querySelector('.priorityContent').innerText = task.getPriority();

      done.innerHTML = `<div class="doneHeader">State: </div>
      <div class="doneContent"></div>`;
      done.querySelector('.doneContent').innerText = task.isDone()
        ? 'Done!'
        : 'Not Done Yet!';

      taskViewTab.appendChild(title);
      taskViewTab.appendChild(description);
      taskViewTab.appendChild(dueDate);
      taskViewTab.appendChild(priority);
      taskViewTab.appendChild(done);
    }
  };
  const renderTasks = (currentListId) => {
    tasksTab.innerHTML = '';
    const arrangedTasks = applicationManager
      .getList(currentListId)
      .getList()
      .slice()
      .sort((a, b) => {
        return compareAsc(a.getDueDate(), b.getDueDate());
      });
    arrangedTasks.forEach((task) => {
      if (task) {
        const taskEl = document.createElement('div');
        const title = document.createElement('p');
        const date = document.createElement('div');
        date.innerText = renderDate(task.getDueDate(), date);
        const editBtn = new Image();
        editBtn.src = editImg;

        const removeBtn = new Image();
        removeBtn.src = trashcanImg;

        taskEl.setAttribute('task-id', task.getId());
        taskEl.setAttribute('list-id', currentListId);
        taskEl.classList.add('task');

        title.innerText = task.getTitle();
        editBtn.classList.add('editBtn');
        removeBtn.classList.add('removeBtn');

        taskEl.innerHTML = `<div class="checkbox">
  		<input type="checkbox" value="1" class="checkboxInput" id="checkbox${task.getId()}${currentListId}" name="" />
	  	<label class="checkboxLabel" for="checkbox${task.getId()}${currentListId}"></label>
  	</div>`;
        taskEl.querySelector('.checkboxInput').checked = task.isDone();
        taskEl.appendChild(title);
        taskEl.appendChild(date);
        taskEl.appendChild(editBtn);
        taskEl.appendChild(removeBtn);

        if (task.isDone()) {
          if (!title.classList.contains('done')) title.classList.add('done');
        } else {
          if (title.classList.contains('done')) title.classList.remove('done');
        }
        tasksTab.appendChild(taskEl);
      }
    });
  };
  const renderLists = (currentListId) => {
    listsTab.innerHTML = '';
    currentListTitle.innerHTML = applicationManager
      .getList(currentListId)
      .getTitle();
    applicationManager.getLists().forEach((list) => {
      if (list) {
        const listEl = document.createElement('div');
        const title = document.createElement('p');

        listEl.setAttribute('list-id', list.getId());
        listEl.classList.add('list');

        title.innerText = list.getTitle();

        listEl.appendChild(title);
        listsTab.appendChild(listEl);
      }
    });
  };
  return { render };
})();

export { Renderer };
