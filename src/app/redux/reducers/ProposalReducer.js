import { ADD_PROPOSAL_FAIL, ADD_PROPOSAL_SUCCESS, DELETE_PROPOSAL_FAIL, DELETE_PROPOSAL_SUCCESS, GET_BY_EMPLOYEE_ID_PROPOSAL_FAIL, GET_BY_EMPLOYEE_ID_PROPOSAL_SUCCESS, GET_BY_ID_PROPOSAL_FAIL, UPDATE_PROPOSAL_FAIL, UPDATE_PROPOSAL_SUCCESS } from "../actions/ProposalAction"

const initialState = {
    dataList: [],
    item: {},
    totalElements: 0,
    renderPage: false
}

const ProposalReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BY_EMPLOYEE_ID_PROPOSAL_SUCCESS:
            return {
                ...state,
                dataList: action.payload,
                totalElements: action.payload?.totalElements,
                renderPage: false

            }
        case ADD_PROPOSAL_SUCCESS:
            return {
                ...state,
                item: action.payload,
                renderPage: true
            }
        case UPDATE_PROPOSAL_SUCCESS:
            return {
                ...state,
                item: action.payload,
                renderPage: true
            }
        case DELETE_PROPOSAL_SUCCESS:
            return {
                ...state,
                dataList: action.payload,
                renderPage: true
            }
        case GET_BY_ID_PROPOSAL_FAIL:
        case GET_BY_EMPLOYEE_ID_PROPOSAL_FAIL:
        case ADD_PROPOSAL_FAIL:
        case UPDATE_PROPOSAL_FAIL:
        case DELETE_PROPOSAL_FAIL:
            return {
                ...state,
                renderPage: false
            }
        default:
            return state

    }
}

export default ProposalReducer
