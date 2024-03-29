import { call, put, takeEvery } from "redux-saga/effects"
import { ADD_SALARY, addSalaryFail, addSalarySuccess, DELETE_SALARY, deleteSalaryFail, deleteSalarySuccess, GET_BY_CURREN_LEADER_SALARY, GET_BY_EMPLOYEE_ID, getByCurrentLeaderSalaryFail, getByCurrentLeaderSalarySuccess, getByEmployeeIdFail, getByEmployeeIdSuccess, UPDATE_SALARY, updateSalaryFail, updateSalarySuccess } from "../actions/SalaryIncreaseActions"
import { addSalaryService, deleteSalaryService, getByCurrentLeaderSalaryService, getByEmployeeIdSalaryService, updateSalaryService } from "app/services/SalaryService"
import { RESPONSE_STAUS_CODE } from "app/constants/ApiConstant"
import { toast } from "react-toastify"
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});


function* getByEmployeeIdSalaryPage(actions) {
    try {
        const res = yield call(getByEmployeeIdSalaryService, actions.payload)
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(getByEmployeeIdSuccess(res?.data))
        } else {
            yield put(getByEmployeeIdFail(res?.message))
            toast.error(res?.message)
        }
    } catch (error) {
        toast.error(error)
    }
}
function* getByCurrentLeaderSalaryPage(action) {
    try {
        const res = yield call(getByCurrentLeaderSalaryService)
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(getByCurrentLeaderSalarySuccess(res?.data))
        } else {
            yield put(getByCurrentLeaderSalaryFail(res?.message))
            toast.error(res?.message)
        }
    } catch (error) {
        toast.error(error)
    }
}
function* addSalaryPage(actions) {
    try {
        const res = yield call(addSalaryService, actions.payload)
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(addSalarySuccess(res?.data))
            toast.success("Thành công")
        } else {
            yield put(addSalaryFail(res?.message))
            toast.error("Thất bại!")
        }
    } catch (error) {
        toast.error(error)
    }
}
function* updateSalaryPage(actions) {
    try {
        const res = yield call(updateSalaryService, actions.payload)
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(updateSalarySuccess(res?.data))
            toast.success("Thành công")
        } else {
            yield put(updateSalaryFail(res?.message))
            toast.error("Thất bại!")
        }
    } catch (error) {
        toast.error(error)
    }
}
function* deleteSalaryPage(actions) {
    try {
        const res = yield call(deleteSalaryService, actions.payload)
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(deleteSalarySuccess(res?.data))
            toast.success("Thành công")
        } else {
            yield put(deleteSalaryFail(res?.message))
            toast.error("Thất bại!")
        }
    } catch (error) {
        toast.error(error)
    }
}
export default function* SalaryIncreaseSaga() {
    yield takeEvery(GET_BY_EMPLOYEE_ID, getByEmployeeIdSalaryPage)
    yield takeEvery(ADD_SALARY, addSalaryPage)
    yield takeEvery(DELETE_SALARY, deleteSalaryPage)
    yield takeEvery(UPDATE_SALARY, updateSalaryPage)
    yield takeEvery(GET_BY_CURREN_LEADER_SALARY, getByCurrentLeaderSalaryPage)
}