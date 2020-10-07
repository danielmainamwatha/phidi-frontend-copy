import axios from 'axios';
import baseUrl from './baseURL';
// import accessTokenConfig from './accessToken';

export default class CategoriesService {

    static async fetchCategories() {
        try {
            const url = `${baseUrl()}/categories`; 
            const response = await axios.get(url);
            return response;
            
        } catch (error) {
            return error.response;
        }
    }
}