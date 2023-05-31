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

export const addAssetToEmployee = async (newAsset) => {
   try {
      const response = await axios.post(`${apiUrl}/Employees/Assets`, newAsset);
      return response.data;
   } catch (error) {
      console.log(error);
      return null;
   }
};

export const deleteAssetFromEmployee = async (employeeId, assetId) => {
   try {
      const response = await axios.delete(`${apiUrl}/Employees/${employeeId}/Assets/${assetId}`);
      return response.data;
   } catch (error) {
      console.log(error);
   }
};

export const deleteAsset = async (assetId) => {
   try {
      const response = await axios.delete(`${apiUrl}/Assets/${assetId}`);
      return response.data;
   } catch (error) {
      console.log(error);
   }
};

export const releaseAsset = async (assetId) => {
   try {
      const response = await axios.patch(`${apiUrl}/Assets/${assetId}/release`);
      return response.data;
   } catch (error) {
      console.log(error);
   }
};
