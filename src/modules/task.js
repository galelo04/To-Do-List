function createTask (title,description="",dueDate="No Due Date",priority = "none"){
    let _title = title;
    let _description= description;
    let _dueDate = dueDate;
    let _priority = priority;
    let _done = false;
    let _myListTitle ;
    let _id;

    const getTitle = () =>_title;
    const getDescription = () =>_description;
    const getDueDate = () => _dueDate;
    const getPriority = () =>_priority;
    const getListTitle = ()=> _myListTitle;
    const getId = ()=>_id;
    const isDone = ()=>_done;

    const setTitle = title => _title=title;
    const setDescription = description =>_description =description;
    const setDueDate = dueDate => _dueDate =dueDate;
    const setPriority = priority =>_priority =priority;
    const setListTitle = listTitle => _myListTitle = listTitle;
    const setId = listId => _id = listId;
    const toggleDone = ()=> _done =!_done; 

    return{getDescription,getDueDate,getPriority,getTitle,getId,isDone,getListTitle,
        setDescription,setDueDate,setPriority,setTitle,setId,toggleDone,setListTitle};

}

export{createTask}