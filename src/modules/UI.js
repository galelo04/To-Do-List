import { format } from "date-fns";
import { applicationManager } from "./applicationManager";
import { listsManager } from "./listsManager";

const UI = (function(){
    let newTaskBtn;
    let tasksTab;
    let currentListTitle;
    let newTaskDialog;
    let newTaskForm;
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
        newTaskDialog = document.querySelector(".newTaskDialog");
        newTaskForm = document.querySelector("form");
        closeDialogBtn = document.querySelector("#closeDialogBtn");
    };
    const bindEvents = ()=>{
        newTaskBtn.addEventListener("click",()=>{
            newTaskDialog.showModal();
        });
        closeDialogBtn.addEventListener('click',()=>{
            newTaskDialog.close();
        });
        newTaskForm.addEventListener("submit",addTask)
    };
    const render = ()=>{
        currentListTitle.innerHTML = listsManager.getCurrentList().getTitle();
        renderTasks(listsManager.getCurrentList());
    };
    const renderTasks = (list)=>{
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

        const title = newTaskForm.title.value;
        const description = newTaskForm.title.value;
        const dueDate  =newTaskForm.title.value;
        const priority = newTaskForm.title.value;
        applicationManager.newTask(title,description,dueDate,priority);
        render();
        newTaskDialog.close();
    };
    const loadDOM = ()=>{
        listsManager.getCurrentList()
    };
    return {init}
})();

export {UI}