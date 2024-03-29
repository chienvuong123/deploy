export const GET_BY_ID_PROCESS = "GET_BY_ID_PROCESS"
export const GET_BY_ID_PROCESS_SUCCESS = "GET_BY_ID_PROCESS_SUCCESS"
export const GET_BY_ID_PROCESS_FAIL = "GET_BY_ID_PROCESS_FAIL"

export const GET_BY_EMPLOYEE_ID_PROCESS = "GET_BY_EMPLOYEE_ID_PROCESS"
export const GET_BY_EMPLOYEE_ID_PROCESS_SUCCESS = "GET_BY_EMPLOYEE_ID_PROCESS_SUCCESS"
export const GET_BY_EMPLOYEE_ID_PROCESS_FAIL = "GET_BY_EMPLOYEE_ID_PROCESS_FAIL"

export const ADD_PROCESS = "ADD_PROCESS"
export const ADD_PROCESS_SUCCESS = "ADD_PROCESS_SUCCESS"
export const ADD_PROCESS_FAIL = "ADD_PROCESS_FAIL"

export const UPDATE_PROCESS = "UPDATE_PROCESS"
export const UPDATE_PROCESS_SUCCESS = "UPDATE_PROCESS_SUCCESS"
export const UPDATE_PROCESS_FAIL = "UPDATE_PROCESS_FAIL"

export const DELETE_PROCESS = "DELETE_PROCESS"
export const DELETE_PROCESS_SUCCESS = "DELETE_PROCESS_SUCCESS"
export const DELETE_PROCESS_FAIL = "DELETE_PROCESS_FAIL"

export const getByEmployeeIdProcess = (payload) => {
    return {
        type: GET_BY_EMPLOYEE_ID_PROCESS,
        payload
    }
}
export const getByEmployeeIdProcessSSuccess = (payload) => {
    return {
        type: GET_BY_EMPLOYEE_ID_PROCESS_SUCCESS,
        payload
    }
}
export const getByEmployeeIdProcessFail = (payload) => {
    return {
        type: GET_BY_EMPLOYEE_ID_PROCESS_FAIL,
        payload
    }
}

export const getByIdProcess = (payload) => {
    return {
        type: GET_BY_ID_PROCESS,
        payload
    }
}
export const getByIdProcessSuccess = (payload) => {
    return {
        type: GET_BY_ID_PROCESS_SUCCESS,
        payload
    }
}
export const getByIdProcessFail = (payload) => {
    return {
        type: GET_BY_ID_PROCESS_FAIL,
        payload
    }
}

export const addProcess = (payload) => {
    return {
        type: ADD_PROCESS,
        payload: {
            process: [payload?.process],
            employeeId: payload?.employeeId
        }
    }
}
export const addProcessSuccess = (payload) => {
    return {
        type: ADD_PROCESS_SUCCESS,
        payload
    }
}
export const addProcessFail = (payload) => {
    return {
        type: ADD_PROCESS_FAIL,
        payload
    }
}

export const updateProcess = (payload) => {
    return {
        type: UPDATE_PROCESS,
        payload
    }
}
export const updateProcessSuccess = (payload) => {
    return {
        type: UPDATE_PROCESS_SUCCESS,
        payload
    }
}
export const updateProcessFail = (payload) => {
    return {
        type: UPDATE_PROCESS_FAIL,
        payload
    }
}

export const deleteProcess = (payload) => {
    return {
        type: DELETE_PROCESS,
        payload
    }
}
export const deleteProcessSuccess = (payload) => {
    return {
        type: DELETE_PROCESS_SUCCESS,
        payload
    }
}
export const deleteProcessFail = (payload) => {
    return {
        type: DELETE_PROCESS_FAIL,
        payload
    }
}
