export const GET_BY_ID_PROPOSAL = "GET_BY_ID_PROPOSAL"
export const GET_BY_ID_PROPOSAL_SUCCESS = "GET_BY_ID_PROPOSAL_SUCCESS"
export const GET_BY_ID_PROPOSAL_FAIL = "GET_BY_ID_PROPOSAL_FAIL"

export const GET_BY_EMPLOYEE_ID_PROPOSAL = "GET_BY_EMPLOYEE_ID_PROPOSAL"
export const GET_BY_EMPLOYEE_ID_PROPOSAL_SUCCESS = "GET_BY_EMPLOYEE_ID_PROPOSAL_SUCCESS"
export const GET_BY_EMPLOYEE_ID_PROPOSAL_FAIL = "GET_BY_EMPLOYEE_ID_PROPOSAL_FAIL"

export const ADD_PROPOSAL = "ADD_PROPOSAL"
export const ADD_PROPOSAL_SUCCESS = "ADD_PROPOSAL_SUCCESS"
export const ADD_PROPOSAL_FAIL = "ADD_PROPOSAL_FAIL"

export const UPDATE_PROPOSAL = "UPDATE_PROPOSAL"
export const UPDATE_PROPOSAL_SUCCESS = "UPDATE_PROPOSAL_SUCCESS"
export const UPDATE_PROPOSAL_FAIL = "UPDATE_PROPOSAL_FAIL"

export const DELETE_PROPOSAL = "DELETE_PROPOSAL"
export const DELETE_PROPOSAL_SUCCESS = "DELETE_PROPOSAL_SUCCESS"
export const DELETE_PROPOSAL_FAIL = "DELETE_PROPOSAL_FAIL"

export const getByEmployeeIdProposal = (payload) => {
    return {
        type: GET_BY_EMPLOYEE_ID_PROPOSAL,
        payload
    }
}
export const getByEmployeeIdProposalSuccess = (payload) => {
    return {
        type: GET_BY_EMPLOYEE_ID_PROPOSAL_SUCCESS,
        payload
    }
}
export const getByEmployeeIdProposalFail = (payload) => {
    return {
        type: GET_BY_EMPLOYEE_ID_PROPOSAL_FAIL,
        payload
    }
}

export const getByIdProposal = (payload) => {
    return {
        type: GET_BY_ID_PROPOSAL,
        payload
    }
}
export const getByIdProposalLSuccess = (payload) => {
    return {
        type: GET_BY_ID_PROPOSAL_SUCCESS,
        payload
    }
}
export const getByIdProposalFail = (payload) => {
    return {
        type: GET_BY_ID_PROPOSAL_FAIL,
        payload
    }
}

export const addProposal = (payload) => {
    return {
        type: ADD_PROPOSAL,
        payload: {
            proposal: [payload?.proposal],
            employeeId: payload?.employeeId
        }
    }
}
export const addProposalSuccess = (payload) => {
    return {
        type: ADD_PROPOSAL_SUCCESS,
        payload
    }
}
export const addProposalFail = (payload) => {
    return {
        type: ADD_PROPOSAL_FAIL,
        payload
    }
}

export const updateProposal = (payload) => {
    return {
        type: UPDATE_PROPOSAL,
        payload
    }
}
export const updateProposalSuccess = (payload) => {
    return {
        type: UPDATE_PROPOSAL_SUCCESS,
        payload
    }
}
export const updateProposalFail = (payload) => {
    return {
        type: UPDATE_PROPOSAL_FAIL,
        payload
    }
}

export const deleteProposal = (payload) => {
    return {
        type: DELETE_PROPOSAL,
        payload
    }
}
export const deleteProposalSuccess = (payload) => {
    return {
        type: DELETE_PROPOSAL_SUCCESS,
        payload
    }
}
export const deleteProposalFail = (payload) => {
    return {
        type: DELETE_PROPOSAL_FAIL,
        payload
    }
}
