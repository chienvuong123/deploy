export const GET_BY_ID_SALARY = "GET_BY_ID_SALARY"
export const GET_BY_ID_SALARY_SUCCESS = "GET_BY_ID_SALARY_SUCCESS"
export const GET_BY_ID_SALARY_FAIL = "GET_BY_ID_SALARY_FAIL"

export const GET_BY_EMPLOYEE_ID = "GET_BY_EMPLOYEE_ID"
export const GET_BY_EMPLOYEE_ID_SUCCESS = "GET_BY_EMPLOYEE_ID_SUCCESS"
export const GET_BY_EMPLOYEE_ID_FAIL = "GET_BY_EMPLOYEE_ID_FAIL"

export const ADD_SALARY = "ADD_SALARY"
export const ADD_SALARY_SUCCESS = "ADD_SALARY_SUCCESS"
export const ADD_SALARY_FAIL = "ADD_SALARY_FAIL"

export const UPDATE_SALARY = "UPDATE_SALARY"
export const UPDATE_SALARY_SUCCESS = "UPDATE_SALARY_SUCCESS"
export const UPDATE_SALARY_FAIL = "UPDATE_SALARY_FAIL"

export const DELETE_SALARY = "DELETE_SALARY"
export const DELETE_SALARY_SUCCESS = "DELETE_SALARY_SUCCESS"
export const DELETE_SALARY_FAIL = "DELETE_SALARY_FAIL"

export const SET_ITEM = "SET_ITEM"
export const GET_BY_CURREN_LEADER_SALARY = "GET_BY_CURREN_LEADER_SALARY"
export const GET_BY_CURREN_LEADER_SALARY_SUCCESS = "GET_BY_CURREN_LEADER_SALARY_SUCCESS"
export const GET_BY_CURREN_LEADER_SALARY_FAIL = "GET_BY_CURREN_LEADER_SALARY_FAIL"

export const getByEmployeeId = (payload) => {
    return {
        type: GET_BY_EMPLOYEE_ID,
        payload
    }
}
export const getByEmployeeIdSuccess = (payload) => {
    return {
        type: GET_BY_EMPLOYEE_ID_SUCCESS,
        payload
    }
}
export const getByEmployeeIdFail = (payload) => {
    return {
        type: GET_BY_EMPLOYEE_ID_FAIL,
        payload
    }
}

export const getByIdSalary = (payload) => {
    return {
        type: GET_BY_ID_SALARY,
        payload
    }
}
export const getByIdSalarySuccess = (payload) => {
    return {
        type: GET_BY_ID_SALARY_SUCCESS,
        payload
    }
}
export const getByIdSalaryFail = (payload) => {
    return {
        type: GET_BY_ID_SALARY_FAIL,
        payload
    }
}

export const addSalary = (payload) => {
    return {
        type: ADD_SALARY,
        payload: {
            salaryIncrease: [payload?.salaryIncrease],
            employeeId: payload?.employeeId
        }
    }
}
export const addSalarySuccess = (payload) => {
    return {
        type: ADD_SALARY_SUCCESS,
        payload
    }
}
export const addSalaryFail = (payload) => {
    return {
        type: ADD_SALARY_FAIL,
        payload
    }
}

export const updateSalary = (payload) => {
    return {
        type: UPDATE_SALARY,
        payload
    }
}
export const updateSalarySuccess = (payload) => {
    return {
        type: UPDATE_SALARY_SUCCESS,
        payload
    }
}
export const updateSalaryFail = (payload) => {
    return {
        type: UPDATE_SALARY_FAIL,
        payload
    }
}

export const deleteSalary = (payload) => {
    return {
        type: DELETE_SALARY,
        payload
    }
}
export const deleteSalarySuccess = (payload) => {
    return {
        type: DELETE_SALARY_SUCCESS,
        payload
    }
}
export const deleteSalaryFail = (payload) => {
    return {
        type: DELETE_SALARY_FAIL,
        payload
    }
}

export const setItemSalry = (payload) => {
    return {
        type: SET_ITEM,
        payload
    }
}

export const getByCurrentLeaderSalaryAction = (payload) => {
    return {
        type: GET_BY_CURREN_LEADER_SALARY,
        payload
    }
}
export const getByCurrentLeaderSalarySuccess = (payload) => {
    return {
        type: GET_BY_CURREN_LEADER_SALARY_SUCCESS,
        payload
    }
}
export const getByCurrentLeaderSalaryFail = (payload) => {
    return {
        type: GET_BY_CURREN_LEADER_SALARY_FAIL,
        payload
    }
}