import axios from "axios"
import ConstantList from "../appConfig"
const API_SALARY = ConstantList.API_ENPOINT + '/salary-increase'

export const getByEmployeeIdSalaryService = async (data) => {
    const response = await axios.get(API_SALARY, { params: { employeeId: data?.employeeId } })
    return response?.data
}

export const getByCurrentLeaderSalaryService = async () => {
    const response = await axios.get(API_SALARY + "/current-leader")
    return response?.data
}

export const getByIdSalaryService = async (data) => {
    const response = await axios.get(`${API_SALARY}/${data?.id}`)
    return response?.data
}

export const addSalaryService = async (data) => {
    const response = await axios.post(API_SALARY, data?.salaryIncrease, { params: { employeeId: data?.employeeId } })
    return response?.data
}

export const updateSalaryService = async (data) => {
    const response = await axios.put(`${API_SALARY}/${data?.id}`, data)
    return response?.data
}
export const deleteSalaryService = async (data) => {
    const response = await axios.delete(`${API_SALARY}/${data?.id}`)
    return response?.data
}
