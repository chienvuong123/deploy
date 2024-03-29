import { call, put, takeEvery } from "redux-saga/effects"
import { toast } from "react-toastify"
import { RESPONSE_STAUS_CODE } from "app/constants/ApiConstant"
import { addFamilyService, deleteFamilyService, getByEmployeeServiceFamily, updateFamilyService } from "app/services/FamilySevice"
import { ADD_FAMILY, addFamilyFail, addFamilySuccess, DELETE_FAMILY, deleteFamilyFail, deleteFamilySuccess, GET_BY_EMPLOYEE_FAMILY, getByEmployeeFamilyFail, getByEmployeeFamilySuccess, UPDATE_FAMILY, updateFamilyFail, updateFamilySuccess } from "../actions/FamilyActions"

function* getByEmployeePage(actions) {
    try {
        const res = yield call(getByEmployeeServiceFamily, actions.payload)
        if (res.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(getByEmployeeFamilySuccess(res?.data))
        } else {
            yield put(getByEmployeeFamilyFail(res.message))
            toast.error(res.message)
        }
    } catch (error) {
        toast.error(error)
    }
}
function* addFamilyPage(action) {
    console.log(action.payload);
    try {
        const res = yield call(addFamilyService, action.payload)
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(addFamilySuccess(res?.data))
            toast.success("Thêm thành công")
        } else {
            yield put(addFamilyFail(res.message))
            toast.error("Thêm thất bại!")
        }
    } catch (error) {
        toast.error(error)
    }
}
function* updateFamilyPage(action) {
    try {
        const res = yield call(updateFamilyService, action.payload)
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(updateFamilySuccess(res?.data))
            toast.success("Thay đổi thành công")
        } else {
            yield put(updateFamilyFail(res.message))
            toast.error("Thay đổi thất bại!")
        }
    } catch (error) {
        toast.error(error)
    }
}

function* deleteFamilyPage(action) {
    try {
        const res = yield call(deleteFamilyService, action.payload)
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(deleteFamilySuccess(res?.data))
            toast.success("Xóa thành công")
        } else {
            yield put(deleteFamilyFail(res.message))
            toast.error("Xóa thất bại!")
        }
    } catch (error) {
        toast.error(error)
    }
}

export default function* FamilySaga() {
    yield takeEvery(GET_BY_EMPLOYEE_FAMILY, getByEmployeePage)
    yield takeEvery(ADD_FAMILY, addFamilyPage)
    yield takeEvery(UPDATE_FAMILY, updateFamilyPage)
    yield takeEvery(DELETE_FAMILY, deleteFamilyPage)
}