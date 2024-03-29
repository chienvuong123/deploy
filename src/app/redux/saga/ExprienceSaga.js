import { call, put, takeEvery } from "redux-saga/effects"
import { ADD_EXPRIENCE, addExperienceFail, addExperienceSuccess, DELETE_EXPRIENCE, deleteExperienceFail, deleteExperienceSuccess, GET_BY_EMPLOYEE_ID_EXPRIENCE, GET_BY_ID_EXPRIENCE, getByEmployeeIdExperienceFail, getByEmployeeIdExperienceSuccess, getByIdExprienceFail, getByIdExprienceSuccess, UPDATE_EXPRIENCE, updateExperienceFail, updateExperienceSuccess } from "../actions/ExperienceActions"
import { toast } from "react-toastify"
import { addExperienceService, deleteExperienceService, getByEmployeeIdExperience, getByIdExperience, updateExperienceService } from "app/services/ExperienceService"
import { RESPONSE_STAUS_CODE } from "app/constants/ApiConstant"

function* getByEmployeeIdExperiencePage(action) {
    try {
        const res = yield call(getByEmployeeIdExperience, action.payload)
        if (res.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(getByEmployeeIdExperienceSuccess(res?.data))
        } else {
            yield put(getByEmployeeIdExperienceFail(res?.message))
            toast.error(res?.message)
        }
    } catch (error) {
        toast.error(error)
    }
}

function* getByIdExperiencePage(action) {
    try {
        const res = yield call(getByIdExperience, action.payload)
        if (res.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(getByIdExprienceSuccess(res?.data))
        } else {
            yield put(getByIdExprienceFail(res?.message))
            toast.error(res?.message)
        }
    } catch (error) {
        toast.error(error)
    }
}
function* addExperiencePage(action) {
    try {
        const res = yield call(addExperienceService, action.payload)
        if (res.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(addExperienceSuccess(res?.data))
            toast.success("Thêm thành công")
        } else {
            yield put(addExperienceFail(res?.message))
            toast.error("Thêm thất bại")
        }
    } catch (error) {
        toast.error(error)
    }
}
function* updateExperiencePage(action) {
    try {
        const res = yield call(updateExperienceService, action.payload)
        if (res.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(updateExperienceSuccess(res?.data))
            toast.success("Thay đổi thành công")
        } else {
            yield put(updateExperienceFail(res?.message))
            toast.error("Thay đổi thất bại")
        }
    } catch (error) {
        toast.error(error)
    }
}
function* deleteExperiencePage(action) {
    try {
        const res = yield call(deleteExperienceService, action.payload)
        if (res.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(deleteExperienceSuccess(res?.data))
            toast.success("Xóa thành công")
        } else {
            yield put(deleteExperienceFail(res?.message))
            toast.error("Xóa thất bại")
        }
    } catch (error) {
        toast.error(error)
    }
}
export default function* ExprienceSaga() {
    yield takeEvery(GET_BY_EMPLOYEE_ID_EXPRIENCE, getByEmployeeIdExperiencePage)
    yield takeEvery(GET_BY_ID_EXPRIENCE, getByIdExperiencePage)
    yield takeEvery(ADD_EXPRIENCE, addExperiencePage)
    yield takeEvery(UPDATE_EXPRIENCE, updateExperiencePage)
    yield takeEvery(DELETE_EXPRIENCE, deleteExperiencePage)
}