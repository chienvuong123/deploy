import axios from "axios"
import ConstantList from "../appConfig"
const API_STAFF = ConstantList.API_ENPOINT + '/certificate'

export const getByEmployeeService = async (object) => {
    console.log(object);
    const response = await axios.get(API_STAFF, { params: { employeeId: object?.employeeId } })
    return response?.data
}
export const addCertificateService = async (data) => {
    console.log(data);
    const response = await axios.post(API_STAFF, data?.certificate, { params: { employeeId: data?.employeeId } })
    return response?.data
}

export const updateCertificateService = async (data) => {
    const response = await axios.put(`${API_STAFF}/${data?.id}`, data)
    return response?.data
}

export const deleteCertificateService = async (id) => {
    const response = await axios.delete(`${API_STAFF}/${id}`)
    return response?.data
}   