import axios from "axios"
import ConstantList from "../appConfig"
const API_STAFF = ConstantList.API_ENPOINT + '/employee-family'

export const getByEmployeeServiceFamily = async (object) => {
    const response = await axios.get(API_STAFF, { params: { employeeId: object?.employeeId } })
    return response?.data
}
export const addFamilyService = async (data) => {
    const response = await axios.post(API_STAFF, data?.family, { params: { employeeId: data?.employeeId } })
    return response?.data
}

export const updateFamilyService = async (data) => {
    const response = await axios.put(`${API_STAFF}/${data?.id}`, data)
    return response?.data
}

export const deleteFamilyService = async (id) => {
    const response = await axios.delete(`${API_STAFF}/${id}`)
    return response?.data
}   