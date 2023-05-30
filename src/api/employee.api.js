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

export const deleteEmployee = async employeeId => {
   try {
      const response = await axios.delete(`${apiUrl}/Employees/${employeeId}`);
      return response.data;
   } catch (error) {
      console.log(error);
   }
};
