import { ADD_CERTIFICATE_FAIL, ADD_CERTIFICATE_SUCCESS, DELETE_CERTIFICATE_FAIL, DELETE_CERTIFICATE_SUCCESS, GET_BY_EMPLOYEE_FAIL, GET_BY_EMPLOYEE_SUCCESS, GET_BY_ID_FAIL, UPDATE_CERTIFICATE_FAIL, UPDATE_CERTIFICATE_SUCCESS } from "../actions/CertificateActions"

const initialState = {
    dataCertificate: [],
    totalElements: 0,
    item: {},
    renderPage: false
}

const CertificateReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BY_EMPLOYEE_SUCCESS:
            return {
                ...state,
                dataCertificate: action.payload,
                totalElements: action.payload?.totalElements,
                renderPage: false
            }
        case ADD_CERTIFICATE_SUCCESS:
            return {
                ...state,
                item: action.payload,
                renderPage: true
            }
        case UPDATE_CERTIFICATE_SUCCESS:
            return {
                ...state,
                dataCertificate: action.payload,
                renderPage: true
            }
        case DELETE_CERTIFICATE_SUCCESS:
            return {
                ...state,
                item: action.payload,
                renderPage: true
            }
        case GET_BY_EMPLOYEE_FAIL:
        case GET_BY_ID_FAIL:
        case ADD_CERTIFICATE_FAIL:
        case UPDATE_CERTIFICATE_FAIL:
        case DELETE_CERTIFICATE_FAIL:
            return {
                ...state,
            }
        default:
            return {
                ...state
            }
    }
}

export default CertificateReducer

