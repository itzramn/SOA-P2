import axios from 'axios';
import { getSoapResponse } from '../utils';
import { apiUrl } from '../apiUrl';

export const getEmployees = async () => {
   const xmlBodyStr = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetAllEmployees xmlns="http://tempuri.org/"/>
  </soap:Body>
</soap:Envelope>`;

   const employees = await getSoapResponse(
      'GetAllEmployees',
      xmlBodyStr,
      'GetAllEmployeesResult'
   );

   return employees;
};

export const createEmployee = async newEmployee => {
   try {
      const response = await axios.post(`${apiUrl}/Employees`, newEmployee);
      return response.data;
   } catch (error) {
      console.log(error);
      return null;
   }
};

export const updateEmployee = async (employeeId, employee) => {
   try {
      const response = await axios.patch(
         `${apiUrl}/Employees/${employeeId}`,
         employee
      );
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
