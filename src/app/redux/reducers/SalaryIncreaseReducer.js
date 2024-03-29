import { ADD_SALARY_FAIL, ADD_SALARY_SUCCESS, DELETE_SALARY_FAIL, DELETE_SALARY_SUCCESS, GET_BY_CURREN_LEADER_SALARY_SUCCESS, GET_BY_EMPLOYEE_ID_FAIL, GET_BY_EMPLOYEE_ID_SUCCESS, GET_BY_ID_SALARY_FAIL, SET_ITEM, UPDATE_SALARY_FAIL, UPDATE_SALARY_SUCCESS } from "../actions/SalaryIncreaseActions"

const initialState = {
    dataList: [],
    item: {},
    totalElements: 0,
    renderPage: false
}

const SalaryIncreaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BY_EMPLOYEE_ID_SUCCESS:
            return {
                ...state,
                dataList: action.payload,
                totalElements: action.payload?.totalElements,
                renderPage: false

            }
        case GET_BY_CURREN_LEADER_SALARY_SUCCESS:
            return {
                ...state,
                dataList: action.payload,
                renderPage: false

            }
        case ADD_SALARY_SUCCESS:
            return {
                ...state,
                item: action.payload,
                renderPage: true
            }
        case UPDATE_SALARY_SUCCESS:
            return {
                ...state,
                item: action.payload,
                renderPage: true
            }
        case DELETE_SALARY_SUCCESS:
            return {
                ...state,
                dataList: action.payload,
                renderPage: true
            }
        // case SET_ITEM:
        //     return {
        //         ...state,
        //         item: action.payload,
        //         renderPage: false
        //     }
        case GET_BY_ID_SALARY_FAIL:
        case GET_BY_EMPLOYEE_ID_FAIL:
        case ADD_SALARY_FAIL:
        case UPDATE_SALARY_FAIL:
        case DELETE_SALARY_FAIL:
            return {
                ...state,
                renderPage: false
            }
        default:
            return state

    }
}

export default SalaryIncreaseReducer
