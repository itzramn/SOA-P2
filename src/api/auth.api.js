import axios from 'axios';
import { wcfUrl } from '../apiUrl';

export const ValidateEmployee = async user => {
   console.log(user);
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

   const config = {
      headers: {
         'Content-Type': 'text/xml; charset=utf-8',
         SOAPAction: `http://tempuri.org/IService/${wcfMethod}`,
      },
   };

   try {
      const response = await axios.post(wcfUrl, xmlBodyStr, config);

      const parser = new DOMParser();
      const xmlDOM = parser.parseFromString(response.data, 'application/xml');

      const status = xmlDOM.getElementsByTagName(`${wcfMethod}Result`)[0]
         .childNodes[0].nodeValue;

      console.log(status);

      if (status !== 'OK') return false;

      return true;
   } catch (error) {
      console.log(error);
      return true;
   }
};
