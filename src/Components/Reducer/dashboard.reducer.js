
const initialState = {
    taskList:[]
};

function updateTask(taskList,payload) {
    let index = taskList.findIndex(task => task.id === payload.id);
    let taskListData = [...taskList];
    taskListData[index] = payload;

    return taskListData;
     

}

export function dashboard(state = initialState, action) {
    // 
    switch (action.type) {
        case 'ADD_TASK':
            return {
               ...state,
               taskList:[...state.taskList, action.payload]
            };
      
        case 'EDIT_TASK':
            return {
                ...state,
               taskList: updateTask(state.taskList ,action.payload)
              
            };
        default:
            return state
    }
}