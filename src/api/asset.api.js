import axios from 'axios';
import { apiUrl } from '../apiUrl';
import { soapResponse } from '../utils';

export const getAssets = async status => {
   const wcfMethod = 'GetAssets';

   const statusExists = () => {
      return typeof status === 'boolean' ? true : null;
   };

   const buildXmlBody = () => {
      if (statusExists()) {
         return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <${wcfMethod} xmlns="http://tempuri.org/">
        <status>${status}</status>
    </${wcfMethod}>
  </soap:Body>
</soap:Envelope>
`;
      } else {
         return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <${wcfMethod} xmlns="http://tempuri.org/"/>
  </soap:Body>
</soap:Envelope>
`;
      }
   };

   const xmlBodyStr = buildXmlBody();

   const response = await soapResponse(wcfMethod, xmlBodyStr, []);

   return response;
};

export const createAsset = async newAsset => {
   const wcfMethod = 'CreateAsset';

   const xmlBodyStr = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <${wcfMethod} xmlns="http://tempuri.org/">
      <name>${newAsset.name}</name>
      <description>${newAsset.description}</description>
    </${wcfMethod}>
  </soap:Body>
</soap:Envelope>`;

   const response = await soapResponse(wcfMethod, xmlBodyStr, null);

   return response;
};

export const addAssetToEmployee = async newAsset => {
   const wcfMethod = 'AddAssetToEmployee';
   console.log('Adding Asset', newAsset);

   const xmlBodyStr = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <${wcfMethod} xmlns="http://tempuri.org/">
      <asset>${JSON.stringify(newAsset)}</asset>
    </${wcfMethod}>
  </soap:Body>
</soap:Envelope>
`;

   const response = await soapResponse(wcfMethod, xmlBodyStr, null);

   return response;
};

export const deleteAssetFromEmployee = async (employeeId, assetId) => {
   const wcfMethod = 'RemoveAssetFromEmployee';

   const xmlBodyStr = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <${wcfMethod} xmlns="http://tempuri.org/">
      <employeeId>${employeeId}</employeeId>
      <assetId>${assetId}</assetId>
    </${wcfMethod}>
  </soap:Body>
</soap:Envelope>`;

   const response = await soapResponse(wcfMethod, xmlBodyStr, null);

   return response;
};

export const deleteAsset = async assetId => {
   const wcfMethod = 'DeleteAsset';

   const xmlBodyStr = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <${wcfMethod} xmlns="http://tempuri.org/">
      <assetId>${assetId}</assetId>
    </${wcfMethod}>
  </soap:Body>
</soap:Envelope>`;

   const response = await soapResponse(wcfMethod, xmlBodyStr, null);

   return response;
};

export const releaseAsset = async assetId => {
   const wcfMethod = 'ReleaseAsset';

   const xmlBodyStr = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <${wcfMethod} xmlns="http://tempuri.org/">
      <assetId>${assetId}</assetId>
    </${wcfMethod}>
  </soap:Body>
</soap:Envelope>
`;

   const response = await soapResponse(wcfMethod, xmlBodyStr, null);

   return response;
};
