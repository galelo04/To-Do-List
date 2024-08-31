import { applicationManager } from "./applicationManager";

const UI = (function(){
    let btn;
    const init = () =>{
        casheDom();
        bindEvents();
    }; 
    const casheDom = ()=>{
        btn = document.querySelector("button");
    };
    const bindEvents = ()=>{
        btn.addEventListener("click",()=>{
            const title = prompt("title");
            const description = prompt("ds");
            const dueDate  = prompt("du");
            const priority = prompt("pr");
            const notes = prompt("nj");
            applicationManager.newTask(title,description,dueDate,priority,notes);    
        });
    };
    return {init}
})();

export {UI}