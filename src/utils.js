import axios from 'axios';
import { wcfUrl } from './apiUrl';

const parseXml = (xml, tagName) => {
   const parser = new DOMParser();
   const xmlDOM = parser.parseFromString(xml, 'application/xml');

   const data = xmlDOM.getElementsByTagName(tagName)[0].childNodes[0].nodeValue;

   return JSON.parse(data || '');
};

export const getSoapResponse = async (soapAction, xmlBody, resultNode) => {
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
