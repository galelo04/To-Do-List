import { createTask } from "./task";
import { createList } from "./tasksList";
import { listsManager } from "./listsManager";

const applicationManager = (function(){
    const init = ()=>{
        listsManager.addList(createList("Home"));
        listsManager.setCurrentList("Home");
        console.log("app",listsManager.getCurrentList().getTitle());
    }
    const newTask = (title,description,dueDate,priority,notes)=>{
        const task = createTask(title,description,dueDate,priority,notes);
        listsManager.addTaskCurrent(task);
        console.log(task);
    }
    const newList = (title) =>{
        const list = createList(title);
        listsManager.addList(list);
        listsManager.setCurrentList(title);
    }
    const changeCurrentList = title => listsManager.setCurrentList(title);
    const changeListOfTask= (taskTitle , listTitle)=>{
        listsManager.changeListOfTask(taskTitle,listTitle);
    } 

    init();
    return{newTask,newList,changeCurrentList};
})();

export {applicationManager}