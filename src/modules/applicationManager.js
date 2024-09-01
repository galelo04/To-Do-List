import { createTask } from "./task";
import { createList } from "./tasksList";
import { listsManager } from "./listsManager";

const applicationManager = (function(){
    const init = ()=>{
        listsManager.addList(createList("Home"));
        // listsManager.setCurrentList(0);
        console.log("app",listsManager.getCurrentList().getTitle());
    }
    const newTask = (title,description,dueDate,priority)=>{
        const task = createTask(title,description,dueDate,priority);
        listsManager.addTaskCurrent(task);
        console.log(task);
    }
    const newList = (title) =>{
        const list = createList(title);
        listsManager.addList(list);
        // listsManager.setCurrentList(title);
    }
    const changeCurrentList = title => listsManager.setCurrentList(title);
    const changeListOfTask= (taskId , srcId , destId)=>{
        listsManager.changeListOfTask(taskId , srcId , destId);
    } 

    init();
    return{newTask,newList,changeCurrentList};
})();

export {applicationManager}