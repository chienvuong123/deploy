import { call, put, takeEvery } from "redux-saga/effects"

import { RESPONSE_STAUS_CODE } from "app/constants/ApiConstant"
import { toast } from "react-toastify"
import { ADD_PROPOSAL, addProposalFail, addProposalSuccess, DELETE_PROPOSAL, deleteProposalFail, deleteProposalSuccess, GET_BY_EMPLOYEE_ID_PROPOSAL, getByEmployeeIdProposalFail, getByEmployeeIdProposalSuccess, getByIdProposalLSuccess, UPDATE_PROPOSAL, updateProposalFail, updateProposalSuccess } from "../actions/ProposalAction";
import { addProposalService, deleteProposalService, getByEmployeeIdProposalService, updateProposalService } from "app/services/proposalService";
import { ADD_PROCESS, addProcessFail, addProcessSuccess, DELETE_PROCESS, deleteProcessFail, deleteProcessSuccess, GET_BY_EMPLOYEE_ID_PROCESS, getByEmployeeIdProcessFail, getByEmployeeIdProcessSSuccess, UPDATE_PROCESS, updateProcessFail, updateProcessSuccess } from "../actions/ProcessActions";
import { addProcessService, deleteProcessService, getByEmployeeIdProcessService, updateProcessService } from "app/services/ProcessService";
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});


function* getByEmployeeIdProcessPage(actions) {
    try {
        const res = yield call(getByEmployeeIdProcessService, actions.payload)
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(getByEmployeeIdProcessSSuccess(res?.data))
        } else {
            yield put(getByEmployeeIdProcessFail(res?.message))
            toast.error(res?.message)
        }
    } catch (error) {
        toast.error(error)
    }
}
function* addProcessPage(actions) {
    try {
        const res = yield call(addProcessService, actions.payload)
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(addProcessSuccess(res?.data))
            toast.success("Thành công")
        } else {
            yield put(addProcessFail(res?.message))
            toast.error("Thất bại!")
        }
    } catch (error) {
        toast.error(error)
    }
}
function* updateProcessPage(actions) {
    console.log(actions.payload);
    try {
        const res = yield call(updateProcessService, actions.payload)
        console.log(res);
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(updateProcessSuccess(res?.data))
            toast.success("Thành công")
        } else {
            yield put(updateProcessFail(res?.message))
            toast.error("Thất bại!")
        }
    } catch (error) {
        toast.error(error)
    }
}
function* deleteProcessPage(actions) {
    try {
        const res = yield call(deleteProcessService, actions.payload)
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(deleteProcessSuccess(res?.data))
            toast.success("Thành công")
        } else {
            yield put(deleteProcessFail(res?.message))
            toast.error("Thất bại!")
        }
    } catch (error) {
        toast.error(error)
    }
}
export default function* ProcessSaga() {
    yield takeEvery(GET_BY_EMPLOYEE_ID_PROCESS, getByEmployeeIdProcessPage)
    yield takeEvery(ADD_PROCESS, addProcessPage)
    yield takeEvery(UPDATE_PROCESS, updateProcessPage)
    yield takeEvery(DELETE_PROCESS, deleteProcessPage)
}