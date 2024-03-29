export const SEARCH_BY_PAGE = "SEARCH_BY_PAGE"
export const SEARCH_BY_PAGE_SUCCESS = "SEARCH_BY_PAGE_SUCCESS"
export const SEARCH_BY_PAGE_FAIL = "SEARCH_BY_PAGE_FAIL"

export const SEARCH_BY_ID_STAFF = "SEARCH_BY_ID_STAFF"
export const SEARCH_BY_ID_STAFF_SUCCESS = "SEARCH_BY_ID_STAFF_SUCCESS"
export const SEARCH_BY_ID_STAFF_FAIL = "SEARCH_BY_ID_STAFF_FAIL"

export const GET_ALL_STAFF = "GET_ALL_STAFF"
export const GET_ALL_STAFF_SUCCESS = "GET_ALL_STAFF_SUCCESS"
export const GET_ALL_STAFF_FAIL = "GET_ALL_STAFF_FAIL"

export const ADD_STAFF = "ADD_STAFF"
export const ADD_STAFF_SUCCESS = "ADD_STAFF_SUCCESS"
export const ADD_STAFF_FAIL = "ADD_STAFF_FAIL"

export const UPDATE_STAFF = "UPDATE_STAFF"
export const UPDATE_STAFF_SUCCESS = "UPDATE_STAFF_SUCCESS"
export const UPDATE_STAFF_FAIL = "UPDATE_STAFF_FAIL"

export const DELETE_STAFF = "DELETE_STAFF"
export const DELETE_STAFF_SUCCESS = "DELETE_STAFF_SUCCESS"
export const DELETE_STAFF_FAIL = "DELETE_STAFF_FAIL"

export const SET_IMAGE = "SET_IMAGE"
export const SET_ITEM = "SET_ITEM"

export const GET_BY_ID_STAFF = "GET_BY_ID_STAFF"
export const GET_BY_ID_STAFF_SUCCESS = "GET_BY_ID_STAFF_SUCCESS"
export const GET_BY_ID_STAFF_FAIL = "GET_BY_ID_STAFF_FAIL"

export const searchByPageAction = (objectPage) => {
    return {
        type: SEARCH_BY_PAGE,
        payload: objectPage
    }
}
export const searchByPageActionSuccess = (objectPage) => {
    return {
        type: SEARCH_BY_PAGE_SUCCESS,
        payload: objectPage
    }
}

export const searchByPageActionFail = (objectPage) => {
    return {
        type: SEARCH_BY_PAGE_SUCCESS,
        payload: objectPage
    }
}

export const addStaffAction = (data, file) => {
    if (file) {
        const formData = new FormData()
        formData.append('file', file)
        return {
            type: ADD_STAFF,
            payload: { data: data, file: formData }
        }
    } else {
        return {
            type: ADD_STAFF,
            payload: { data: data }
        }
    }

}
export const addStaffActionSuccess = (data) => {
    return {
        type: ADD_STAFF_SUCCESS,
        payload: data
    }
}
export const addStaffActionFail = (data) => {
    return {
        type: ADD_STAFF_FAIL,
        payload: data
    }
}

export const updateStaffAction = (data, file) => {
    if (file) {
        const formData = new FormData()
        formData.append('file', file)
        return {
            type: UPDATE_STAFF,
            payload: { data: data, file: formData }
        }
    } else {
        return {
            type: UPDATE_STAFF,
            payload: { data: data }
        }
    }
}
export const updateStaffActionSuccess = (data) => {
    return {
        type: UPDATE_STAFF_SUCCESS,
        payload: data
    }
}
export const updateStaffActionFail = (data) => {
    return {
        type: UPDATE_STAFF_FAIL,
        payload: data
    }
}

export const deleteStaffAction = (payload) => {
    return {
        type: DELETE_STAFF,
        payload: payload
    }
}
export const deleteStaffActionSuccess = (payload) => {
    return {
        type: DELETE_STAFF_SUCCESS,
        payload: payload
    }
}
export const deleteStaffActionFail = (payload) => {
    return {
        type: DELETE_STAFF_FAIL,
        payload: payload
    }
}

export const setStaffImage = (url, file) => {
    return {
        type: SET_IMAGE,
        payload: { url: url, file: file },
    }
}

export const setItemPage = (payload) => {
    return {
        type: SET_ITEM,
        payload
    }
}

export const getByIdStaffAction = (payload) => {
    return {
        type: GET_BY_ID_STAFF,
        payload
    }
}
export const getByIdStaffActionSuccess = (payload) => {
    return {
        type: GET_BY_ID_STAFF_SUCCESS,
        payload
    }
}
export const getByIdStaffActionFail = (payload) => {
    return {
        type: GET_BY_ID_STAFF_FAIL,
        payload
    }
}