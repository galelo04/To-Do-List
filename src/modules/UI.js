import { format } from "date-fns";
import { applicationManager } from "./applicationManager";
import { listsManager } from "./listsManager";

const UI = (function(){
    let newTaskBtn;
    let tasksTab;
    let currentListTitle;
    let dialog;
    let form;
    let closeDialogBtn;
    const init = () =>{
        cacheDOM();
        bindEvents();
        render();
    }; 
    const cacheDOM = ()=>{
        currentListTitle = document.querySelector(".listTitle");
        newTaskBtn = document.querySelector("#newTaskBtn");
        tasksTab = document.querySelector(".tasks");
        dialog = document.querySelector("dialog");
        form = document.querySelector("form");
        closeDialogBtn = document.querySelector("#closeDialogBtn");
    };
    const bindEvents = ()=>{
        newTaskBtn.addEventListener("click",()=>{
            form.dialogType.value = "add";
            form.title.value = "";
            form.desc.value = "";
            form.date.value = "";
            form.priority.value = "";
            dialog.showModal();
        });
        closeDialogBtn.addEventListener('click',()=>{
            dialog.close();
        });
        form.addEventListener("submit",(event)=>{
            if(form.dialogType.value === "add")
                addTask(event);
            else if(form.dialogType.value === "edit")
                confirmEdit(event);
        });
        tasksTab.addEventListener('click' , editTask);
        // tasksTab.addEventListener('click' , removeTask);
    };
    const render = ()=>{
        currentListTitle.innerHTML = listsManager.getCurrentList().getTitle();
        renderTasks(listsManager.getCurrentList());
    };
    const renderTasks = (list)=>{
        tasksTab.innerHTML = "";
        list.getList().forEach(task => {
            if(task!==null){ 
                const taskEl = document.createElement("div");
                const title = document.createElement("p");
                const editBtn = document.createElement("button");
                const removeBtn = document.createElement("button");
                const checkTask = document.createElement("input");
                
                taskEl.setAttribute("task-id",task.getId());
                taskEl.setAttribute("list-id",list.getId());
                taskEl.classList.add("task");
                
                title.innerText = task.getTitle();
                editBtn.classList.add("editBtn");
                editBtn.innerText = "Edit";
                removeBtn.classList.add("removeBtn");
                removeBtn.innerText = "Remove";

                checkTask.type = "checkbox";
                checkTask.classList.add("checkTask");

                taskEl.appendChild(title);
                taskEl.appendChild(editBtn);
                taskEl.appendChild(removeBtn);
                taskEl.appendChild(checkTask);

                tasksTab.appendChild(taskEl);
            }
        });
    }
    const addTask = (event)=>{

        event.preventDefault();

        const title = form.title.value;
        const description = form.desc.value;
        const dueDate  =form.date.value;
        const priority = form.priority.value;
        applicationManager.newTask(title,description,dueDate,priority);
        render();
        dialog.close();
    };
    const editTask = (event)=>{
        if(event.target && event.target.classList.contains("editBtn")){
            const taskEl = event.target.closest(".task");
            if(taskEl){
                form.dialogType.value = "edit";
                const taskId = taskEl.getAttribute("task-id");
                const task = listsManager.getCurrentList().getTask(taskId);
                form.title.value = task.getTitle();
                form.desc.value = task.getDescription();
                form.date.value = task.getDueDate();
                form.priority.value = task.getPriority();
                form.taskId.value = taskId;
                dialog.showModal();
            }
        }
    };
    const confirmEdit = (event)=>{
        event.preventDefault();
        const taskId = form.taskId.value;
        const task = listsManager.getCurrentList().getTask(taskId);
        task.setTitle( form.title.value);
        task.setDescription(form.desc.value);
        task.setDueDate(form.date.value);
        task.setPriority(form.priority.value);

        dialog.close();
        render();
    }
    return {init}
})();

export {UI}