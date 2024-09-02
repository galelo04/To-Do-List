const listsManager = (function(){
    const lists = new Array(100).fill(null);
    let _currentList ;
    let _lastId =0;

    const getCurrentList = ()=> _currentList;
    const setCurrentList = listId =>{
        _currentList = lists[listId]
        console.log("lists",_currentList.getTitle());
    };

    const addTaskCurrent = task => _currentList.addTask(task);
    const addList = list =>{
        list.setId(_lastId);
        lists[_lastId++]=list;
        _currentList = list;
    };
    const removeTask = (listId , taskId)=>{
        return lists[listId].removeTask(taskId);
    };
    const removeList = listId =>{
        lists[listId]=lists[--_lastId];
        lists[_lastId]=null;
    };
    const changeListOfTask = (taskId,srcId,destId) =>{
        lists[destId].addTask(lists[srcId].removeTask(taskId));
    }
    const getLists = ()=>lists;

    return{getCurrentList,setCurrentList,addList,removeList,addTaskCurrent,changeListOfTask,getLists,removeTask};
})();

export {listsManager};