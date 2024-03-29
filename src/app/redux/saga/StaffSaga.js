import { takeEvery, put, call } from "redux-saga/effects"
import { toast } from "react-toastify"
import { ADD_STAFF, DELETE_STAFF, GET_BY_ID_STAFF, SEARCH_BY_PAGE, UPDATE_STAFF, addStaffActionFail, addStaffActionSuccess, deleteStaffActionFail, deleteStaffActionSuccess, getByIdStaffAction, getByIdStaffActionFail, getByIdStaffActionSuccess, searchByPageActionFail, searchByPageActionSuccess, updateStaffActionFail, updateStaffActionSuccess } from "../actions/StaffAction"
import { addStaffService, deleteStaffService, getByIdStaffService, searchByPageService, updateStaffService, uploadImage } from "app/services/StaffService"
import { RESPONSE_STAUS_CODE } from "app/constants/ApiConstant"
import ConstantList from "../../appConfig"
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});

function* searchByPage(actions) {
    try {
        const res = yield call(searchByPageService, actions.payload)
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(searchByPageActionSuccess(res))
        } else {
            yield put(searchByPageActionFail(res?.message))
            toast.error(res?.message)
        }
    } catch (error) {
        toast(error(error.message))
    }
}
function* getByIdStaffPage(action) {
    try {
        const res = yield call(getByIdStaffService, action.payload)
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(getByIdStaffActionSuccess(res?.data))
        } else {
            yield put(getByIdStaffActionFail(res?.message))
            toast.error(res?.message)
        }
    } catch (error) {
        toast.error(error)
    }
}
function* addStaffPage(actions) {
    try {
        let image = ""
        if (actions.payload.file) {
            const data = yield call(uploadImage, actions.payload?.file)
            if (data.id) {
                image = data?.name ? ConstantList.API_ENPOINT + `/public/image/${data?.name}` : ""
            } else {
                toast.error("Thêm ảnh thất bại")
            }
        }
        const res = yield call(addStaffService,
            {
                ...actions.payload?.data,
                image: image,
                certificatesDto: [],
                employeeFamilyDtos: [],
            }
        )
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(addStaffActionSuccess(res?.data))
            toast.success("Thêm thành công")
        } else {
            yield put(addStaffActionFail(res?.message))
            toast.error("Thêm thất bại")
        }
    } catch (error) {
        toast.error(error.message)
    }
}

function* updateStaffPage(actions) {
    console.log(actions.payload);
    try {
        let image = ""
        if (actions.payload.file) {
            const data = yield call(uploadImage, actions.payload?.file)
            if (data.id) {
                image = data?.name ? ConstantList.API_ENPOINT + `/public/image/${data?.name}` : ""
            } else {
                toast.error("Thêm ảnh thất bại")
            }
        } else {
            image = actions?.payload?.image
        }
        const res = yield call(updateStaffService,
            {
                ...actions.payload?.data,
                image: image,
            }
        )
        console.log(res);
        if (res?.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(updateStaffActionSuccess(res?.data))
            toast.success("Thay đổi thành công")
        } else {
            yield put(updateStaffActionFail(res?.message))
            toast.error("Thay đổi thất bại")
        }
    } catch (error) {
        toast.error(error.message)
    }
}
function* deleteStaffPage(action) {
    try {
        const res = yield call(deleteStaffService, action.payload)
        if (res.code === RESPONSE_STAUS_CODE.SUCCESS) {
            yield put(deleteStaffActionSuccess(action.payload))
            toast.success("Xóa thành công")
        } else {
            yield put(deleteStaffActionFail(res.message))
            toast.error("Xóa thất bại")
        }
    } catch (error) {
        toast(error(error.message))
    }
}

export default function* StaffSaga() {
    yield takeEvery(SEARCH_BY_PAGE, searchByPage)
    yield takeEvery(ADD_STAFF, addStaffPage)
    yield takeEvery(DELETE_STAFF, deleteStaffPage)
    yield takeEvery(UPDATE_STAFF, updateStaffPage)
    yield takeEvery(GET_BY_ID_STAFF, getByIdStaffPage)
}