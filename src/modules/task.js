function createTask (title,description,dueDate,priority,notes){
    let _title = title;
    let _description= description;
    let _dueDate = dueDate;
    let _priority = priority;
    let _notes = notes;
    let _done = false;
    let _myListTitle ;
    let _myListId;

    const getTitle = () =>_title;
    const getDescription = () =>_description;
    const getDueDate = () => _dueDate;
    const getPriority = () =>_priority;
    const getNotes = ()=>_notes;
    const getListTitle = ()=> _myListTitle;
    const getListId = ()=>_myListId;
    const isDone = ()=>_done;

    const setTitle = title => _title=title;
    const setDescription = description =>_description =description;
    const setDueDate = dueDate => _dueDate =dueDate;
    const setPriority = priority =>_priority =priority;
    const setNotes = notes=>_notes =notes;
    const setListTitle = listTitle => _myListTitle = listTitle;
    const setListId = listId => _myListId = listId;
    const toggleDone = ()=> _done =!_done; 

    return{getDescription,getDueDate,getNotes,getPriority,getTitle,getListId,isDone,getListTitle,
        setDescription,setDueDate,setNotes,setPriority,setTitle,setListId,toggleDone,setListTitle};

}

export{createTask}