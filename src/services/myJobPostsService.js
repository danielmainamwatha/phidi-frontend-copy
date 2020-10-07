import axios from 'axios';
import baseUrl from './baseURL';
import accessTokenConfig from './accessToken';

export default class MyJobPostsService {
    static async fetchMyJobPosts() {
        try {
            const url = `${baseUrl()}/my-job-posts`; 
            const response = await axios.get(url, accessTokenConfig());
            return response;

        } catch (error) {
            return error.response;
        }
    }

    static async fetchMyJob(id) {
        try {
            const localStorage = window.localStorage;
            const accessToken = localStorage.getItem('token');
            const url = `${baseUrl()}/my-job`; 
            const response = await axios({
                url,
                method: 'get',
                params: {
                    id
                },
                headers: { Authorization: `Bearer ${accessToken}` }, 
            });

            return response;

        } catch (error) {
            return error.response;
        }
    }

}