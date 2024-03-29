import axios from "axios"
import ConstantList from "../appConfig"
const API_PROCESS = ConstantList.API_ENPOINT + '/process'

export const getByEmployeeIdProcessService = async (data) => {
    const response = await axios.get(API_PROCESS, { params: { employeeId: data?.employeeId } })
    return response?.data
}

export const getByIdProcessService = async (data) => {
    const response = await axios.get(`${API_PROCESS}/${data?.id}`)
    return response?.data
}

export const addProcessService = async (data) => {
    const response = await axios.post(API_PROCESS, data?.process, { params: { employeeId: data?.employeeId } })
    return response?.data
}

export const updateProcessService = async (data) => {
    console.log(data);
    const response = await axios.put(`${API_PROCESS}/${data?.id}`, data)
    console.log('res', response);
    return response?.data
}
export const deleteProcessService = async (data) => {
    const response = await axios.delete(`${API_PROCESS}/${data?.id}`)
    return response?.data
}
