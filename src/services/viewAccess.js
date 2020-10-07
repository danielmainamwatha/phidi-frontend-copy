import axios from 'axios';
import baseUrl from './baseURL';
import accessTokenConfig from './accessToken';

export default class ViewAccessService {

    static async getViewAccess(jobPostId) {
        
        try {
            const url = `${baseUrl()}/view-access-bid`; 
            const response = await axios.post(url, { data: {
                jobPostId,
            }}, accessTokenConfig());
            
            return response;
            
        } catch (error) {
            return error.response;
        }
    }
}