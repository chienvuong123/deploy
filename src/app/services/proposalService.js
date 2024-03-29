import axios from "axios"
import ConstantList from "../appConfig"
const API_PROPOSAL = ConstantList.API_ENPOINT + '/proposal'

export const getByEmployeeIdProposalService = async (data) => {
    const response = await axios.get(API_PROPOSAL, { params: { employeeId: data?.employeeId } })
    return response?.data
}

export const getByIdProposalService = async (data) => {
    const response = await axios.get(`${API_PROPOSAL}/${data?.id}`)
    return response?.data
}

export const addProposalService = async (data) => {
    const response = await axios.post(API_PROPOSAL, data?.proposal, { params: { employeeId: data?.employeeId } })
    return response?.data
}

export const updateProposalService = async (data) => {
    console.log(data);
    const response = await axios.put(`${API_PROPOSAL}/${data?.id}`, data)
    console.log('res', response);
    return response?.data
}
export const deleteProposalService = async (data) => {
    const response = await axios.delete(`${API_PROPOSAL}/${data?.id}`)
    return response?.data
}
