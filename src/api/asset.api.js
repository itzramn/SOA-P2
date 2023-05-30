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

export const createAsset = async (name, description) => {
   try {
      const response = await axios.post(`${apiUrl}/Assets`, {
         name,
         description,
      });
      return response.data;
   } catch (error) {
      console.log(error);
      return null;
   }
};
