import { ADD_STAFF_FAIL, ADD_STAFF_SUCCESS, DELETE_STAFF_FAIL, DELETE_STAFF_SUCCESS, GET_ALL_STAFF_FAIL, GET_BY_ID_STAFF_FAIL, GET_BY_ID_STAFF_SUCCESS, SEARCH_BY_ID_STAFF_FAIL, SEARCH_BY_PAGE_FAIL, SEARCH_BY_PAGE_SUCCESS, SET_IMAGE, SET_ITEM, UPDATE_STAFF_SUCCESS, } from "../actions/StaffAction";


const initialState = {
    dataList: [],
    item: {},
    totalElements: 0,
    file: {},
    image: "",
    updatePage: false
}

const StaffReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_BY_PAGE_SUCCESS:
            return {
                ...state,
                dataList: action.payload?.data,
                totalElements: action.payload?.totalElements,
                updatePage: false
            }
        case ADD_STAFF_SUCCESS:
            return {
                ...state,
                item: action.payload,
                updatePage: true
            }
        case UPDATE_STAFF_SUCCESS:
            return {
                ...state,
                item: action.payload,
                updatePage: true
            }
        case DELETE_STAFF_SUCCESS:
            const newDataRemove = state.dataList.filter((item) => item.id !== action.payload)
            return {
                ...state,
                dataList: newDataRemove,
                updatePage: true
            }
        case SET_IMAGE:
            return {
                ...state,
                image: action?.payload?.url,
                file: action?.payload?.file,
            }
        case SET_ITEM:
            return {
                ...state,
                item: action.payload
            }
        case GET_BY_ID_STAFF_SUCCESS:
            return {
                ...state,
                item: action.payload
            }
        case SEARCH_BY_PAGE_FAIL:
        case GET_BY_ID_STAFF_FAIL:
        case SEARCH_BY_ID_STAFF_FAIL:
        case GET_ALL_STAFF_FAIL:
        case ADD_STAFF_FAIL:
        case DELETE_STAFF_FAIL:
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

export default StaffReducer
