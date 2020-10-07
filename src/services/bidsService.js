import axios from 'axios';
import baseUrl from './baseURL';
import accessTokenConfig from './accessToken';
import processToFormData from './../helpers/toFormData';

export default class BidsService {
    static async fetchBids() {
        try {
            const url = `${baseUrl()}/bids`; 
            const response = await axios.get(url, accessTokenConfig());
            return response;
            
        } catch (error) {
            return error.response;
        }
    }

    static async fetchSingleBid(id) {
        try { 
            const localStorage = window.localStorage;
            const accessToken = localStorage.getItem('token');
            const url = `${baseUrl()}/bid`; 
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

    static async acceptViewRequest(bidId) {
        try {
            const url = `${baseUrl()}/accept-request-bid`; 
            const response = await axios.post(url, { data: {
                bidId }
            }, accessTokenConfig());
            return response;

        } catch (error) {
            return error.response;
        }
    }

    static async rejectViewRequest(bidId) {
        try {
            const url = `${baseUrl()}/reject-request-bid`; 
            const response = await axios.post(url, { data: {
                bidId }
            }, accessTokenConfig());
            return response;

        } catch (error) {
            return error.response;
        }
    }

    static async acceptBid (bidId) {
        try {
            const url = `${baseUrl()}/bid`; 
            const response = await axios.put(url, { data: {
                bidId }
            }, accessTokenConfig());
            return response;

        } catch (error) {
            return error.response;
        }
    }

    static async createJobPostBid(jobPostId, bidNote, bidSketches, bidAmount) {
        try {
            const localStorage = window.localStorage;
            const accessToken = localStorage.getItem('token');
            const url = `${baseUrl()}/bid`; 
            let formData = await processToFormData({jobPostId, bidNote, bidSketches, amount: bidAmount});
            const response = await axios.post(url, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${accessToken}`
                }
              });
            
            return response;
            
        } catch (error) {
            return error.response;
        }
    }
}