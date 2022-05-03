export const dashboardActions = {
    addTask,
    updateTask
}

function addTask(payload) {
    return dispatch => {
        dispatch(setTaskDetails(payload))
    }

}

export function setTaskDetails(data) {
    return {
        type:'ADD_TASK',
        payload:data
    }
}

function updateTask(payload) {
    return dispatch => {
        dispatch(updateTaskDetails(payload))
    }
}

export function updateTaskDetails(data) {
    return {
        type:'EDIT_TASK',
        payload:data
    }
}