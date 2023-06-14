import axios from 'axios';
import { apiUrl } from '../apiUrl';

export const ValidateEmployee = async (user) => {
    try {
       const response = await axios.post(`${apiUrl}/Auth`, user);
       return response.data;
    } catch (error) {
       console.log(error);
       return null;
    }
 };