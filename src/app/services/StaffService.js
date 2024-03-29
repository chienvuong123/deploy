import axios from "axios"
import ConstantList from "../appConfig"
const API_STAFF = ConstantList.API_ENPOINT + '/employee'


export const searchByPageService = async (objectPage) => {
    const response = await axios.get(API_STAFF + '/search', { params: { ...objectPage } })
    return response?.data
}
export const getByIdStaffService = async (id) => {
    const response = await axios.get(`${API_STAFF}/${id}`)
    return response?.data
}
export const addStaffService = async (data) => {
    const response = await axios.post(API_STAFF, data)
    return response?.data
}

export const updateStaffService = async (data) => {
    console.log(data);
    const response = await axios.put(`${API_STAFF}/${data?.id}`, data)
    return response?.data
}

export const deleteStaffService = async (id) => {
    const response = await axios.delete(`${API_STAFF}/${id}`)
    return response?.data
}

export const uploadImage = async (data) => {
    const response = await axios.post(API_STAFF + "/upload-image", data)
    return response?.data
}
