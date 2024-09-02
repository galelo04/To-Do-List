import { createTask } from "./task";
import { createList } from "./tasksList";
import { listsManager } from "./listsManager";

const applicationManager = (function(){
    const init = ()=>{
        listsManager.addList(createList("Home"));
        console.log("app",listsManager.getCurrentList().getTitle());
    }
    const newTask = (title,description,dueDate,priority)=>{
        const task = createTask(title,description,dueDate,priority);
        listsManager.addTaskCurrent(task);
        console.log(task);
        return task;
    }
    const removeTask = (listId , taskId) =>{
        return listsManager.removeTask(listId,taskId);
    };
    const newList = (title) =>{
        const list = createList(title);
        listsManager.addList(list);
        
    }
    const setCurrentList = listId => listsManager.setCurrentList(listId);
    const getCurrentList = ()=> listsManager.getCurrentList();
    const changeListOfTask= (taskId , srcId , destId)=>{
        listsManager.changeListOfTask(taskId , srcId , destId);
    } 
    const getLists = ()=> listsManager.getLists();
    init();
    return{newTask,newList,setCurrentList,getCurrentList,changeListOfTask,removeTask,getLists};
})();

export {applicationManager}