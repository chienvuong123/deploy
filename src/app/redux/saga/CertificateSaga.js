import { call, put, takeEvery } from "redux-saga/effects"
import { toast } from "react-toastify"
import { ADD_CERTIFICATE, addCertificateFail, addCertificateSuccess, DELETE_CERTIFICATE, deleteCertificateFail, deleteCertificateSuccess, GET_BY_EMPLOYEE, getByEmployeeFail, getByEmployeeSuccess, UPDATE_CERTIFICATE, updateCertificateFail, updateCertificateSuccess } from "../actions/CertificateActions"
import { addCertificateService, deleteCertificateService, getByEmployeeService, updateCertificateService } from "app/services/CertificateService"
import { RESPONSE_STAUS_CODE } from "app/constants/ApiConstant"

function* getByEmployeePage(actions) {
    try {
        const res = yield call(getByEmployeeService, actions.payload)
        console.log(res);
        if (res.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(getByEmployeeSuccess(res?.data))
        } else {
            yield put(getByEmployeeFail(res.message))
            toast.error(res.message)
        }
    } catch (error) {
        toast.error(error)
    }
}
function* addCertificatePage(action) {
    console.log(action.payload);
    try {
        const res = yield call(addCertificateService, action.payload)
        console.log(res);
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(addCertificateSuccess(res?.data))
            toast.success("Thêm văn bằng thành công")
        } else {
            yield put(addCertificateFail(res.message))
            toast.error("Thêm văn bằng thất bại!")
        }
    } catch (error) {
        toast.error(error)
    }
}
function* updateCertificatePage(action) {
    try {
        const res = yield call(updateCertificateService, action.payload)
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(updateCertificateSuccess(res?.data))
            toast.success("Thay đổi văn bằng thành công")
        } else {
            yield put(updateCertificateFail(res.message))
            toast.error("Thay đổi văn bằng thất bại!")
        }
    } catch (error) {
        toast.error(error)
    }
}

function* deleteCertificatePage(action) {
    try {
        const res = yield call(deleteCertificateService, action.payload)
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(deleteCertificateSuccess(res?.data))
            toast.success("Xóa văn bằng thành công")
        } else {
            yield put(deleteCertificateFail(res.message))
            toast.error("Xóa văn bằng thất bại!")
        }
    } catch (error) {
        toast.error(error)
    }
}

export default function* CertificateSaga() {
    yield takeEvery(GET_BY_EMPLOYEE, getByEmployeePage)
    yield takeEvery(ADD_CERTIFICATE, addCertificatePage)
    yield takeEvery(UPDATE_CERTIFICATE, updateCertificatePage)
    yield takeEvery(DELETE_CERTIFICATE, deleteCertificatePage)
}