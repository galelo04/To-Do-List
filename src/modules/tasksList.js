function createList(title){
    let _title = title;
    let _lastId = 0;
    let _id;
    const list = new Array(100).fill(null); 

    const getId =()=>_id;
    const setId =(id)=>_id=id;
    const getTitle = ()=>_title;
    const setTitle = title =>_title=title;

    const addTask = task=> {
        task.setId(_lastId);
        task.setListTitle(_title);
        list[_lastId++]=task;
    };
    const removeTask = taskId =>{
        const removedTask = list[taskId];
        list[taskId]=list[--_lastId];
        list[_lastId]=null;
        return removedTask;
    };
    const getList = ()=> list;
    
    return{getTitle,setTitle,addTask,removeTask,getId,setId,getList};
}

export{createList}