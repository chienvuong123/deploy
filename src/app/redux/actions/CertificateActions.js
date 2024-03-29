export const GET_BY_EMPLOYEE = "GET_BY_EMPLOYEE"
export const GET_BY_EMPLOYEE_SUCCESS = "GET_BY_EMPLOYEE_SUCCESS"
export const GET_BY_EMPLOYEE_FAIL = "GET_BY_EMPLOYEE_FAIL"

export const GET_BY_ID = "GET_BY_ID"
export const GET_BY_ID_SUCCESS = "GET_BY_ID_SUCCESS"
export const GET_BY_ID_FAIL = "GET_BY_ID_FAIL"

export const ADD_CERTIFICATE = "ADD_CERTIFICATE"
export const ADD_CERTIFICATE_SUCCESS = "ADD_CERTIFICATE_SUCCESS"
export const ADD_CERTIFICATE_FAIL = "ADD_CERTIFICATE_FAIL"

export const UPDATE_CERTIFICATE = "UPDATE_CERTIFICATE"
export const UPDATE_CERTIFICATE_SUCCESS = "UPDATE_CERTIFICATE_SUCCESS"
export const UPDATE_CERTIFICATE_FAIL = "UPDATE_CERTIFICATE_FAIL"

export const DELETE_CERTIFICATE = "DELETE_CERTIFICATE"
export const DELETE_CERTIFICATE_SUCCESS = "DELETE_CERTIFICATE_SUCCESS"
export const DELETE_CERTIFICATE_FAIL = "DELETE_CERTIFICATE_FAIL"




export const getByEmployee = (payload) => {
    return {
        type: GET_BY_EMPLOYEE,
        payload
    }
}
export const getByEmployeeSuccess = (payload) => {
    return {
        type: GET_BY_EMPLOYEE_SUCCESS,
        payload
    }
}
export const getByEmployeeFail = (payload) => {
    return {
        type: GET_BY_EMPLOYEE_FAIL,
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

export const addCertificate = (payload) => {
    return {
        type: ADD_CERTIFICATE,
        payload: {
            certificate: [payload.certificate],
            employeeId: payload.employeeId
        }
    }
}
export const addCertificateSuccess = (payload) => {
    return {
        type: ADD_CERTIFICATE_SUCCESS,
        payload
    }
}
export const addCertificateFail = (payload) => {
    return {
        type: ADD_CERTIFICATE_FAIL,
        payload
    }
}

export const updateCertificateAction = (payload) => {
    return {
        type: UPDATE_CERTIFICATE,
        payload
    }
}
export const updateCertificateSuccess = (payload) => {
    return {
        type: UPDATE_CERTIFICATE_SUCCESS,
        payload
    }
}
export const updateCertificateFail = (payload) => {
    return {
        type: UPDATE_CERTIFICATE_FAIL,
        payload
    }
}

export const deleteCertificateAction = (payload) => {
    return {
        type: DELETE_CERTIFICATE,
        payload
    }
}
export const deleteCertificateSuccess = (payload) => {
    return {
        type: DELETE_CERTIFICATE_SUCCESS,
        payload
    }
}
export const deleteCertificateFail = (payload) => {
    return {
        type: DELETE_CERTIFICATE_FAIL,
        payload
    }
}

