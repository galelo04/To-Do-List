function createList(title){
    let _title = title;
    const list = []; 

    const getTitle = ()=>_title;
    const setTitle = title =>_title=title;

    const addTask = task=> {
        task.setListId(list.length);
        task.setListTitle(_title);
        list.push(task);
    };
    const removeTask = task =>{
        list.splice(task.getListId(),1);
    };
    
    return{getTitle,setTitle,addTask,removeTask};
}

export{createList}