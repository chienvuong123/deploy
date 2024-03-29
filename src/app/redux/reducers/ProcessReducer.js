import { ADD_PROCESS_FAIL, ADD_PROCESS_SUCCESS, DELETE_PROCESS_FAIL, DELETE_PROCESS_SUCCESS, GET_BY_EMPLOYEE_ID_PROCESS_FAIL, GET_BY_EMPLOYEE_ID_PROCESS_SUCCESS, GET_BY_ID_PROCESS_FAIL, UPDATE_PROCESS_FAIL, UPDATE_PROCESS_SUCCESS } from "../actions/ProcessActions"

const initialState = {
    dataList: [],
    item: {},
    totalElements: 0,
    renderPage: false
}

const ProcessReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BY_EMPLOYEE_ID_PROCESS_SUCCESS:
            return {
                ...state,
                dataList: action.payload,
                totalElements: action.payload?.totalElements,
                renderPage: false
            }
        case ADD_PROCESS_SUCCESS:
            return {
                ...state,
                item: action.payload,
                renderPage: true
            }
        case UPDATE_PROCESS_SUCCESS:
            return {
                ...state,
                item: action.payload,
                renderPage: true
            }
        case DELETE_PROCESS_SUCCESS:
            return {
                ...state,
                dataList: action.payload,
                renderPage: true
            }
        case GET_BY_ID_PROCESS_FAIL:
        case GET_BY_EMPLOYEE_ID_PROCESS_FAIL:
        case ADD_PROCESS_FAIL:
        case UPDATE_PROCESS_FAIL:
        case DELETE_PROCESS_FAIL:
            return {
                ...state,
                renderPage: false
            }
        default:
            return state

    }
}

export default ProcessReducer
