import { soapResponse } from '../utils';

export const ValidateEmployee = async user => {
   const wcfMethod = 'ValidateEmployeeLogin';

   const xmlBodyStr = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <${wcfMethod} xmlns="http://tempuri.org/">
        <email>${user.email}</email>
        <password>${user.password}</password>
    </${wcfMethod}>
  </soap:Body>
</soap:Envelope>`;

   const response = await soapResponse(wcfMethod, xmlBodyStr, null);
   return response;
};
