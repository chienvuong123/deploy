import { ADD_FAMILY_FAIL, ADD_FAMILY_SUCCESS, DELETE_FAMILY_FAIL, DELETE_FAMILY_SUCCESS, GET_BY_EMPLOYEE_FAMILY_FAIL, GET_BY_EMPLOYEE_FAMILY_SUCCESS, GET_BY_ID_FAIL, UPDATE_FAMILY_FAIL, UPDATE_FAMILY_SUCCESS } from "../actions/FamilyActions"

const initialState = {
    dataFamily: [],
    totalElements: 0,
    item: {},
    renderPage: false
}

const FamilyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BY_EMPLOYEE_FAMILY_SUCCESS:
            return {
                ...state,
                dataFamily: action.payload,
                totalElements: action.payload?.totalElements,
                renderPage: false
            }
        case ADD_FAMILY_SUCCESS:
            return {
                ...state,
                item: action.payload,
                renderPage: true
            }
        case UPDATE_FAMILY_SUCCESS:
            return {
                ...state,
                dataFamily: action.payload,
                renderPage: true
            }
        case DELETE_FAMILY_SUCCESS:
            return {
                ...state,
                item: action.payload,
                renderPage: true
            }
        case GET_BY_EMPLOYEE_FAMILY_FAIL:
        case GET_BY_ID_FAIL:
        case ADD_FAMILY_FAIL:
        case UPDATE_FAMILY_FAIL:
        case DELETE_FAMILY_FAIL:
            return {
                ...state,
                renderPage: false
            }
        default:
            return {
                ...state
            }
    }
}

export default FamilyReducer
