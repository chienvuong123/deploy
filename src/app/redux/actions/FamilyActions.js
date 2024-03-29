export const GET_BY_EMPLOYEE_FAMILY = "GET_BY_EMPLOYEE_FAMILY"
export const GET_BY_EMPLOYEE_FAMILY_SUCCESS = "GET_BY_EMPLOYEE_FAMILY_SUCCESS"
export const GET_BY_EMPLOYEE_FAMILY_FAIL = "GET_BY_EMPLOYEE_FAMILY_FAIL"

export const GET_BY_ID = "GET_BY_ID"
export const GET_BY_ID_SUCCESS = "GET_BY_ID_SUCCESS"
export const GET_BY_ID_FAIL = "GET_BY_ID_FAIL"

export const ADD_FAMILY = "ADD_FAMILY"
export const ADD_FAMILY_SUCCESS = "ADD_FAMILY_SUCCESS"
export const ADD_FAMILY_FAIL = "ADD_FAMILY_FAIL"

export const UPDATE_FAMILY = "UPDATE_FAMILY"
export const UPDATE_FAMILY_SUCCESS = "UPDATE_FAMILY_SUCCESS"
export const UPDATE_FAMILY_FAIL = "UPDATE_FAMILY_FAIL"

export const DELETE_FAMILY = "DELETE_FAMILY"
export const DELETE_FAMILY_SUCCESS = "DELETE_FAMILY_SUCCESS"
export const DELETE_FAMILY_FAIL = "DELETE_CERTIFICATE_FAIL"


export const getByEmployeeFamily = (payload) => {
    return {
        type: GET_BY_EMPLOYEE_FAMILY,
        payload
    }
}
export const getByEmployeeFamilySuccess = (payload) => {
    return {
        type: GET_BY_EMPLOYEE_FAMILY_SUCCESS,
        payload
    }
}
export const getByEmployeeFamilyFail = (payload) => {
    return {
        type: GET_BY_EMPLOYEE_FAMILY_FAIL,
        payload
    }
}

export const getById = (payload) => {
    return {
        type: GET_BY_ID,
        payload
    }
}
export const getByIdSuccess = (payload) => {
    return {
        type: GET_BY_ID_SUCCESS,
        payload
    }
}
export const getByIdFail = (payload) => {
    return {
        type: GET_BY_ID_FAIL,
        payload
    }
}

export const addFamily = (payload) => {
    return {
        type: ADD_FAMILY,
        payload: {
            family: [payload.family],
            employeeId: payload.employeeId
        }
    }
}
export const addFamilySuccess = (payload) => {
    return {
        type: ADD_FAMILY_SUCCESS,
        payload
    }
}
export const addFamilyFail = (payload) => {
    return {
        type: ADD_FAMILY_FAIL,
        payload
    }
}

export const updateFamilyAction = (payload) => {
    return {
        type: UPDATE_FAMILY,
        payload
    }
}
export const updateFamilySuccess = (payload) => {
    return {
        type: UPDATE_FAMILY_SUCCESS,
        payload
    }
}
export const updateFamilyFail = (payload) => {
    return {
        type: UPDATE_FAMILY_FAIL,
        payload
    }
}

export const deleteFamilyAction = (payload) => {
    return {
        type: DELETE_FAMILY,
        payload
    }
}
export const deleteFamilySuccess = (payload) => {
    return {
        type: DELETE_FAMILY_SUCCESS,
        payload
    }
}
export const deleteFamilyFail = (payload) => {
    return {
        type: DELETE_FAMILY_FAIL,
        payload
    }
}

