import { ADD_EXPRIENCE_FAIL, ADD_EXPRIENCE_SUCCESS, DELETE_EXPRIENCE_FAIL, DELETE_EXPRIENCE_SUCCESS, GET_BY_EMPLOYEE_ID_EXPRIENCE_FAIL, GET_BY_EMPLOYEE_ID_EXPRIENCE_SUCCESS, GET_BY_ID_EXPRIENCE_FAIL, GET_BY_ID_EXPRIENCE_SUCCESS, UPDATE_EXPRIENCE_FAIL, UPDATE_EXPRIENCE_SUCCESS } from "../actions/ExperienceActions";
import { ADD_STAFF_FAIL, ADD_STAFF_SUCCESS, DELETE_STAFF_FAIL, DELETE_STAFF_SUCCESS, GET_ALL_STAFF_FAIL, SEARCH_BY_ID_STAFF_FAIL, SEARCH_BY_PAGE_FAIL, SEARCH_BY_PAGE_SUCCESS, SET_IMAGE, SET_ITEM, UPDATE_STAFF_SUCCESS, } from "../actions/StaffAction";


const initialState = {
    listExprience: [],
    item: {},
    totalElements: 0,
    updatePage: false
}

const ExperienceReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BY_EMPLOYEE_ID_EXPRIENCE_SUCCESS:
            return {
                ...state,
                listExprience: action.payload,
                totalElements: action.payload?.totalElements,
                updatePage: false
            }
        case GET_BY_ID_EXPRIENCE_SUCCESS:
            return {
                ...state,
                item: action.payload?.data,
            }
        case ADD_EXPRIENCE_SUCCESS:
            return {
                ...state,
                item: action.payload,
                updatePage: true
            }
        case UPDATE_EXPRIENCE_SUCCESS:
            return {
                ...state,
                item: action.payload,
                updatePage: true
            }
        case DELETE_EXPRIENCE_SUCCESS:
            const newDataRemove = state.listExprience.filter((item) => item.id !== action.payload)
            return {
                ...state,
                listExprience: newDataRemove,
                updatePage: true
            }
        case GET_BY_EMPLOYEE_ID_EXPRIENCE_FAIL:
        case GET_BY_ID_EXPRIENCE_FAIL:
        case ADD_EXPRIENCE_FAIL:
        case UPDATE_EXPRIENCE_FAIL:
        case DELETE_EXPRIENCE_FAIL:
            return {
                ...state,
                updatePage: false
            }
        default:
            {
                return state;
            }
    }
}

export default ExperienceReducer
