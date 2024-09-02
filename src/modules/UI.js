import { format } from "date-fns"
import { applicationManager } from "./applicationManager"
import trashcanImg from "../assets/trash-can-outline.svg"
import editImg from "../assets/circle-edit-outline.svg"

const UI = (function(){
    let newTaskBtn;
    let newListBtn;
    let tasksTab;
    let listsTab;
    let currentListTitle;
    let taskDialog;
    let listDialog;
    let taskForm;
    let listForm;
    let closeTaskDialogBtn;
    let closeListDialogBtn;
    let currentList;
    let selectedTask;
    let taskViewTab;
    const init = () =>{
        currentList = applicationManager.getCurrentList();
        selectedTask = null;
        cacheDOM();
        bindEvents();
        render();
    }; 
    const cacheDOM = ()=>{
        currentListTitle = document.querySelector(".listTitle");
        newTaskBtn = document.querySelector("#newTaskBtn");
        newListBtn = document.querySelector("#newListBtn");
        tasksTab = document.querySelector(".tasks");
        listsTab = document.querySelector(".lists");
        taskViewTab = document.querySelector(".taskView");
        taskDialog = document.querySelector(".taskDialog");
        listDialog = document.querySelector(".listDialog");
        taskForm = document.querySelector(".taskForm");
        listForm = document.querySelector(".listForm");
        closeTaskDialogBtn = document.querySelector("#closeTaskDialogBtn");
        closeListDialogBtn = document.querySelector("#closeListDialogBtn");
    };
    const bindEvents = ()=>{
        newTaskBtn.addEventListener("click",()=>{
            taskForm.dialogType.value = "add";
            taskForm.title.value = "";
            taskForm.desc.value = "";
            taskForm.date.value = "";
            taskForm.priority.value = "";
            taskDialog.showModal();
        });
        newListBtn.addEventListener("click",()=>{
            listDialog.showModal();
        });
        closeTaskDialogBtn.addEventListener('click',()=>{
            taskDialog.close();
        });
        closeListDialogBtn.addEventListener("click",()=>{
            listDialog.close();
        });
        taskForm.addEventListener("submit",(event)=>{
            if(taskForm.dialogType.value === "add")
                addTask(event);
            else if(taskForm.dialogType.value === "edit")
                confirmEdit(event);
        });
        listForm.addEventListener("submit",addList);
        tasksTab.addEventListener('click' , editTask);
        tasksTab.addEventListener('click' , removeTask);
        tasksTab.addEventListener('click',changeSelectedTask);
        listsTab.addEventListener("click",changeCurrentList);
    };
    const render = ()=>{
        renderTasks();
        renderSelectedTask();
        renderLists();
    };
    const renderSelectedTask= () =>{
        taskViewTab.innerHTML = "";
        if(selectedTask){
            const title = document.createElement("div");
            const description =document.createElement("div"); 
            const dueDate =document.createElement("div"); 
            const priority =document.createElement("div");

            title.innerText= "Title: " +selectedTask.getTitle();
            title.classList.add("taskTitle");
            description.innerText ="Description: "+ selectedTask.getDescription();
            description.classList.add("taskDescription");
            dueDate.innerText = "Due Date: "+selectedTask.getDueDate();
            dueDate.classList.add("taskDueDate");
            priority.innerText = "Priority: "+ selectedTask.getPriority();
            priority.classList.add("taskPriority");

            taskViewTab.appendChild(title);
            taskViewTab.appendChild(description);
            taskViewTab.appendChild(dueDate);
            taskViewTab.appendChild(priority);
        }
    };
    const renderTasks = ()=>{
        tasksTab.innerHTML = "";
        currentList.getList().forEach(task => {
            if(task){ 
                const taskEl = document.createElement("div");
                const title = document.createElement("p");
                const editBtn = document.createElement("button");
                const removeBtn = document.createElement("button");

                const editimg = new Image();
                editimg.src = editImg;

                const removeImg = new Image();
                removeImg.src = trashcanImg;


                taskEl.setAttribute("task-id",task.getId());
                taskEl.setAttribute("list-id",currentList.getId());
                taskEl.classList.add("task");
                
                title.innerText = task.getTitle();
                editBtn.classList.add("editBtn");
                editBtn.appendChild(editimg);
                removeBtn.classList.add("removeBtn");
                removeBtn.appendChild(removeImg);


                taskEl.innerHTML = `<div class="checkbox">
  		<input type="checkbox" value="1" id="checkboxInput" name="" />
	  	<label for="checkboxInput"></label>
  	</div>`
                taskEl.appendChild(title);
                taskEl.appendChild(editBtn);
                taskEl.appendChild(removeBtn);

                tasksTab.appendChild(taskEl);
            }
        });
    };
    const renderLists = ()=>{
        listsTab.innerHTML = "";
        currentListTitle.innerHTML = currentList.getTitle();
        applicationManager.getLists().forEach(list =>{
            if(list){
                const listEl = document.createElement("div");
                const title = document.createElement("p");

                listEl.setAttribute("list-id",list.getId());
                listEl.classList.add("list");

                title.innerText = list.getTitle();

                listEl.appendChild(title);
                listsTab.appendChild(listEl);
            }
        });
    }
    const addTask = (event)=>{

        event.preventDefault();

        const title = taskForm.title.value;
        const description = taskForm.desc.value;
        const dueDate  =taskForm.date.value;
        const priority = taskForm.priority.value;
        selectedTask =applicationManager.newTask(title,description,dueDate,priority);
        render();
        taskDialog.close();
    };
    const editTask = (event)=>{
        if(event.target && event.target.classList.contains("editBtn")){
            const taskEl = event.target.closest(".task");
            if(taskEl){
                taskForm.dialogType.value = "edit";
                const taskId = taskEl.getAttribute("task-id");
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
    const removeTask = (event)=>{
        if(event.target && event.target.classList.contains("removeBtn")){
            const taskEl = event.target.closest(".task");
            if(taskEl){
                const listId = taskEl.getAttribute("list-id");
                const taskId = taskEl.getAttribute("task-id");
                if(applicationManager.removeTask(listId,taskId)===selectedTask){
                    selectedTask=null;
                }
                render();
            }
        }
    };
    const confirmEdit = (event)=>{
        event.preventDefault();
        const taskId = taskForm.taskId.value;
        const task =currentList.getTask(taskId);
        task.setTitle( taskForm.title.value);
        task.setDescription(taskForm.desc.value);
        task.setDueDate(taskForm.date.value);
        task.setPriority(taskForm.priority.value);

        taskDialog.close();
        render();
    }
    const addList = (event)=>{
        event.preventDefault();

        const title = listForm.title.value;
        applicationManager.newList(title);
        currentList = applicationManager.getCurrentList();
        selectedTask = null;
        render();
        listDialog.close();
    };
    const changeSelectedTask = (event)=>{
        if(event.target && event.target.classList.contains("task")){
            selectedTask = currentList.getTask(event.target.getAttribute("task-id"));
            renderSelectedTask();
        }
    };
    const changeCurrentList = (event) =>{
        if(event.target && event.target.classList.contains("list")){
            applicationManager.setCurrentList(event.target.getAttribute("list-id"));
            currentList = applicationManager.getCurrentList();
            selectedTask = currentList.getTask(0);
            render();
        }
    };
    return {init}
})();

export {UI}