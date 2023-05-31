import axios from 'axios';
import { apiUrl } from '../apiUrl';

export const getEmployees = async () => {
   try {
      const response = await axios.get(`${apiUrl}/Employees`);
      return response.data;
   } catch (error) {
      console.log(error);
      return [];
   }
};

export const createdEmployees = async (newEmployee) => {
   try {
      const response = await axios.post(`${apiUrl}/Employees`, newEmployee, );
      return response.data;
   } catch (error) {
      console.log(error);
      return null;
   }
};

export const editEmployeesField = async (employeeId, editEmployee) => {
   try {
      const response = await axios.patch(`${apiUrl}/Employees/${employeeId}`, editEmployee);
      return response.data;
   } catch (error) {
      console.log(error);
      return null;
   }
};

export const deleteEmployee = async employeeId => {
   try {
      const response = await axios.delete(`${apiUrl}/Employees/${employeeId}`);
      return response.data;
   } catch (error) {
      console.log(error);
   }
};
