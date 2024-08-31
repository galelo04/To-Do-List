const listsManager = (function(){
    const lists = [];
    let _currentList ;

    const getCurrentList = ()=> _currentList;
    const setCurrentList = listTitle =>{
        _currentList = lists.find(list =>list.getTitle()===listTitle);
        console.log("lists",_currentList.getTitle());
    };

    const addTaskCurrent = task => _currentList.addTask(task);
    const addList = list =>lists.push(list);
    const removeList = list =>{
        lists.splice(lists.indexOf(list),1);
    };
    const changeListOfTask = (taskTitle , listTitle) =>{
        lists.forEach(list => {
            list.forEach(task => {
                if(taskTitle===task.getTitle()){
                    lists.forEach(list => {
                        if(task.getListTitle()===list.getTitle()){
                            list.removeTask(task);
                        }
                    });
                    lists.forEach(list =>{
                        if(listTitle===list.getTitle()){
                            list.addTask(task);
                        }
                    } );
                }
            });
        });
    }

    return{getCurrentList,setCurrentList,addList,removeList,addTaskCurrent,changeListOfTask};
})();

export {listsManager};