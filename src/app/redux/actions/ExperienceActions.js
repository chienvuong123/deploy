export const GET_BY_EMPLOYEE_ID_EXPRIENCE = "GET_BY_EMPLOYEE_ID_EXPRIENCE"
export const GET_BY_EMPLOYEE_ID_EXPRIENCE_SUCCESS = "GET_BY_EMPLOYEE_ID_EXPRIENCE_SUCCESS"
export const GET_BY_EMPLOYEE_ID_EXPRIENCE_FAIL = "GET_BY_EMPLOYEE_ID_EXPRIENCE_FAIL"

export const GET_BY_ID_EXPRIENCE = "GET_BY_ID_EXPRIENCE"
export const GET_BY_ID_EXPRIENCE_SUCCESS = "GET_BY_ID_EXPRIENCE_SUCCESS"
export const GET_BY_ID_EXPRIENCE_FAIL = "GET_BY_ID_EXPRIENCE_FAIL"

export const ADD_EXPRIENCE = "ADD_EXPRIENCE"
export const ADD_EXPRIENCE_SUCCESS = "ADD_EXPRIENCE_SUCCESS"
export const ADD_EXPRIENCE_FAIL = "ADD_EXPRIENCE_FAIL"

export const UPDATE_EXPRIENCE = "UPDATE_EXPRIENCE"
export const UPDATE_EXPRIENCE_SUCCESS = "UPDATE_EXPRIENCE_SUCCESS"
export const UPDATE_EXPRIENCE_FAIL = "UPDATE_EXPRIENCE_FAIL"

export const DELETE_EXPRIENCE = "DELETE_EXPRIENCE"
export const DELETE_EXPRIENCE_SUCCESS = "DELETE_EXPRIENCE_SUCCESS"
export const DELETE_EXPRIENCE_FAIL = "DELETE_EXPRIENCE_FAIL"

export const getByEmployeeIdExperience = (payload) => {
    return {
        type: GET_BY_EMPLOYEE_ID_EXPRIENCE,
        payload
    }
}
export const getByEmployeeIdExperienceSuccess = (payload) => {
    return {
        type: GET_BY_EMPLOYEE_ID_EXPRIENCE_SUCCESS,
        payload
    }
}
export const getByEmployeeIdExperienceFail = (payload) => {
    return {
        type: GET_BY_EMPLOYEE_ID_EXPRIENCE_FAIL,
        payload
    }
}

export const getByIdExprience = (payload) => {
    return {
        type: GET_BY_EMPLOYEE_ID_EXPRIENCE,
        payload
    }
}
export const getByIdExprienceSuccess = (payload) => {
    return {
        type: GET_BY_EMPLOYEE_ID_EXPRIENCE_SUCCESS,
        payload
    }
}
export const getByIdExprienceFail = (payload) => {
    return {
        type: GET_BY_EMPLOYEE_ID_EXPRIENCE_FAIL,
        payload
    }
}

export const addExperience = (payload) => {
    return {
        type: ADD_EXPRIENCE,
        payload: {
            experience: [payload.experience],
            employeeId: payload.employeeId
        }
    }
}
export const addExperienceSuccess = (payload) => {
    return {
        type: ADD_EXPRIENCE_SUCCESS,
        payload
    }
}
export const addExperienceFail = (payload) => {
    return {
        type: ADD_EXPRIENCE_FAIL,
        payload
    }
}

export const updateExperience = (payload) => {
    return {
        type: UPDATE_EXPRIENCE,
        payload
    }
}
export const updateExperienceSuccess = (payload) => {
    return {
        type: UPDATE_EXPRIENCE_SUCCESS,
        payload
    }
}
export const updateExperienceFail = (payload) => {
    return {
        type: UPDATE_EXPRIENCE_FAIL,
        payload
    }
}

export const deleteExperience = (payload) => {
    return {
        type: DELETE_EXPRIENCE,
        payload
    }
}
export const deleteExperienceSuccess = (payload) => {
    return {
        type: DELETE_EXPRIENCE_SUCCESS,
        payload
    }
}
export const deleteExperienceFail = (payload) => {
    return {
        type: DELETE_EXPRIENCE_FAIL,
        payload
    }
}