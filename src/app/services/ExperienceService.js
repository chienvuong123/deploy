import axios from "axios"
import ConstantList from "../appConfig"
const API_STAFF = ConstantList.API_ENPOINT + '/experience'


export const getByEmployeeIdExperience = async (data) => {
    const response = await axios.get(API_STAFF, { params: { employeeId: data?.id } })
    return response?.data
}

export const getByIdExperience = async (data) => {
    const response = await axios.get(API_STAFF, { params: data?.id })
    return response
}

export const addExperienceService = async (data) => {
    const response = await axios.post(API_STAFF, data?.experience, { params: { employeeId: data?.employeeId } })
    return response?.data
}

export const updateExperienceService = async (data) => {
    console.log(data);
    const response = await axios.put(`${API_STAFF}/${data?.id}`, data)
    return response?.data
}

export const deleteExperienceService = async (id) => {
    const response = await axios.delete(`${API_STAFF}/${id}`)
    return response?.data
}