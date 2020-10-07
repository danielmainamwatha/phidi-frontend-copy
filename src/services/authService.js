import axios from 'axios';
import baseUrl from './baseURL';

export default class AuthService {
    static async registerUser(user) {
        try {
            const url = `${baseUrl()}/register`; 
            const response = await axios.post(url, user);
            return response;
            
        } catch (error) {
            return error.response;
        }
    }

    static async loginUser(user) {
        try {
            const url = `${baseUrl()}/login`; 
            const response = await axios.post(url, user);
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async confirmEmail(userDetails) {
        try {
            const url = `${baseUrl()}/confirm-email`;
            const response = await axios.post(url, userDetails);
            return response;
            
        } catch (error) {
            return error.response;
        }
    }

    static async forgotPassword(userDetails) {
        try {
            const url = `${baseUrl()}/forgot-password`;
            const response = await axios.post(url, userDetails);
            return response;
            
        } catch (error) {
            return error.response;
        }
    }

    static async resetPassword(userDetails) {
        try {
            const url = `${baseUrl()}/reset-password`;
            const response = await axios.put(url, userDetails);
            return response;
        } catch (error) {
            return error.response;
        }
    }
}