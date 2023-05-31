import axios from 'axios';
import { apiUrl } from '../apiUrl';

export const getAssets = async status => {
   try {
      let url = `${apiUrl}/Assets`;
      if (status !== undefined) {
         url += `?status=${status ? 'true' : 'false'}`;
      }
      const response = await axios.get(url);
      return response.data;
   } catch (error) {
      console.log(error);
      return [];
   }
};

export const createAsset = async (newAsset) => {
   try {
      const response = await axios.post(`${apiUrl}/Assets`, newAsset);
      return response.data;
   } catch (error) {
      console.log(error);
      return null;
   }
};

export const addAssetEmployee = async (newAsset) => {
   try {
      const response = await axios.post(`${apiUrl}/Employees/Assets`, newAsset);
      return response.data;
   } catch (error) {
      console.log(error);
      return null;
   }
};

export const deleteAssetEmployee = async (employeeId, assetId) => {
   try {
      const response = await axios.delete(`${apiUrl}/Employees/${employeeId}/Assets/${assetId}`);
      return response.data;
   } catch (error) {
      console.log(error);
   }
};
