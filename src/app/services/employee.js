import axios from "axios";

const employeeServices = {
    getAllEmployee: async () => {
        try {
            const response = await axios.get('http://training-api.oceantech.com.vn/cms/api/employees/all')
            return response.data
        } catch (error) {
            throw error;
        }
    },
    createEmployee: async (employeeData) => {
        try {
            const response = await axios.post(`http://training-api.oceantech.com.vn/cms/api/employees`, employeeData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateEmployee: async (employeeId, updatedEmployeeData) => {
        try {
            const response = await axios.put(`http://training-api.oceantech.com.vn/cms/api/employees/${employeeId}`, updatedEmployeeData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}

export default employeeServices