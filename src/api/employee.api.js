import axios from 'axios';
import { soapResponse } from '../utils';
import { apiUrl } from '../apiUrl';

export const getEmployees = async () => {
   const wcfMethod = 'GetEmployees';

   const xmlBodyStr = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <${wcfMethod} xmlns="http://tempuri.org/"/>
  </soap:Body>
</soap:Envelope>`;

   const response = await soapResponse(wcfMethod, xmlBodyStr, []);

   return response;
};

export const createEmployee = async newEmployee => {
   const wcfMethod = 'CreateEmployee';
   console.log('stringAssets', newEmployee.assets.toString());
   const xmlBodyStr = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <${wcfMethod} xmlns="http://tempuri.org/">
      <name>${newEmployee.name}</name>
      <lastName>${newEmployee.lastName}</lastName>
      <curp>${newEmployee.curp}</curp>
      <birthDate>${newEmployee.birthDate}</birthDate>
      <email>${newEmployee.email}</email>
      <assets>${JSON.stringify(newEmployee.assets)}</assets>
    </${wcfMethod}>
  </soap:Body>
</soap:Envelope>`;

   const response = soapResponse(wcfMethod, xmlBodyStr, null);
   return response;
};

export const updateEmployee = async employee => {
   console.log(employee);
   const wcfMethod = 'UpdateEmployee';

   const xmlBodyStr = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <${wcfMethod} xmlns="http://tempuri.org/">
      <employeeId>${employee.employeeId}</employeeId>
      <name>${employee.name}</name>
      <lastName>${employee.lastName}</lastName>
      <curp>${employee.curp}</curp>
      <birthDate>${employee.birthDate}</birthDate>
      <email>${employee.email}</email>
    </${wcfMethod}>
  </soap:Body>
</soap:Envelope>`;

   const response = await soapResponse(wcfMethod, xmlBodyStr, null);
   console.log(response);
   return response;
};

export const deleteEmployee = async employeeId => {
   const wcfMethod = 'DeleteEmployee';

   const xmlBodyStr = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <${wcfMethod} xmlns="http://tempuri.org/">
      <employeeId>${employeeId}</employeeId>
    </${wcfMethod}>
  </soap:Body>
</soap:Envelope>`;

   const response = await soapResponse(wcfMethod, xmlBodyStr, null);

   return response;
};
