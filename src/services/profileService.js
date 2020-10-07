import axios from 'axios';
import baseUrl from './baseURL';
import accessTokenConfig from './accessToken';

export default class ProfileService {
    static async fetchProfile() {
        try {
            const url = `${baseUrl()}/profile`; 
            const response = await axios.get(url, accessTokenConfig());
            return response;

        } catch (error) {
            return error.response;
        }
    }

    static async editProfile(userDetails) {
        try {
            const url = `${baseUrl()}/profile`; 
            const response = await axios.put(url, userDetails, accessTokenConfig());
            return response;
            
        } catch (error) {
            return error.response;
        }
    }

}