import axios from 'axios';
import parseXml from './../utils.ts';
import { apiUrl, wcfUrl } from '../apiUrl';

const getSoapResponse = async (soapAction, xmlBody, resultNode) => {
   const config = {
      headers: {
         'Content-Type': 'text/xml; charset=utf-8',
         SOAPAction: `http://tempuri.org/IService/${soapAction}`,
      },
   };

   try {
      const response = await axios.post(wcfUrl, xmlBody, config);

      const result = parseXml(response.data, resultNode);

      return result;
   } catch (error) {
      console.log(error);
      return [];
   }
};

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

export const createdEmployees = async newEmployee => {
   try {
      const response = await axios.post(`${apiUrl}/Employees`, newEmployee);
      return response.data;
   } catch (error) {
      console.log(error);
      return null;
   }
};

export const editEmployeesField = async (employeeId, editEmployee) => {
   try {
      const response = await axios.patch(
         `${apiUrl}/Employees/${employeeId}`,
         editEmployee
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
