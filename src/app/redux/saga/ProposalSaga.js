import { call, put, takeEvery } from "redux-saga/effects"

import { RESPONSE_STAUS_CODE } from "app/constants/ApiConstant"
import { toast } from "react-toastify"
import { ADD_PROPOSAL, addProposalFail, addProposalSuccess, DELETE_PROPOSAL, deleteProposalFail, deleteProposalSuccess, GET_BY_EMPLOYEE_ID_PROPOSAL, getByEmployeeIdProposalFail, getByEmployeeIdProposalSuccess, getByIdProposalLSuccess, UPDATE_PROPOSAL, updateProposalFail, updateProposalSuccess } from "../actions/ProposalAction";
import { addProposalService, deleteProposalService, getByEmployeeIdProposalService, updateProposalService } from "app/services/proposalService";
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});


function* getByEmployeeIdProposalPage(actions) {
    try {
        const res = yield call(getByEmployeeIdProposalService, actions.payload)
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(getByEmployeeIdProposalSuccess(res?.data))
        } else {
            yield put(getByEmployeeIdProposalFail(res?.message))
            toast.error(res?.message)
        }
    } catch (error) {
        toast.error(error)
    }
}
function* addProposalPage(actions) {
    try {
        const res = yield call(addProposalService, actions.payload)
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(addProposalSuccess(res?.data))
            toast.success("Thành công")
        } else {
            yield put(addProposalFail(res?.message))
            toast.error("Thất bại!")
        }
    } catch (error) {
        toast.error(error)
    }
}
function* updateProposalPage(actions) {
    console.log(actions.payload);
    try {
        const res = yield call(updateProposalService, actions.payload)
        console.log(res);
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(updateProposalSuccess(res?.data))
            toast.success("Thành công")
        } else {
            yield put(updateProposalFail(res?.message))
            toast.error("Thất bại!")
        }
    } catch (error) {
        toast.error(error)
    }
}
function* deleteProposalPage(actions) {
    try {
        const res = yield call(deleteProposalService, actions.payload)
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(deleteProposalSuccess(res?.data))
            toast.success("Thành công")
        } else {
            yield put(deleteProposalFail(res?.message))
            toast.error("Thất bại!")
        }
    } catch (error) {
        toast.error(error)
    }
}
export default function* ProposalSaga() {
    yield takeEvery(GET_BY_EMPLOYEE_ID_PROPOSAL, getByEmployeeIdProposalPage)
    yield takeEvery(ADD_PROPOSAL, addProposalPage)
    yield takeEvery(UPDATE_PROPOSAL, updateProposalPage)
    yield takeEvery(DELETE_PROPOSAL, deleteProposalPage)
}