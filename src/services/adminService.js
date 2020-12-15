import axios from 'axios';
import baseUrl from './baseURL';
import accessTokenConfig from './accessToken';

export default class AdminService {
    static async loginAdmin(user) {
        try {
            const url = `${baseUrl()}/admin-login`; 
            const response = await axios.post(url, user);
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async fetchAdminUsers(id, firstName, lastName) {
        try {
            const localStorage = window.localStorage;
            const accessToken = localStorage.getItem('token');
            const url = `${baseUrl()}/admin-users`; 

            if (id == null && firstName == null && lastName == null) {
                    const response = await axios.get(url, accessTokenConfig());
                    return response;

            } else {
                const response = await axios({
                url,
                method: 'get',
                params: {
                        id,
                        firstName,
                        lastName
                    },
                    headers: { Authorization: `Bearer ${accessToken}` }, 
                });
                return response;

            }
            
        } catch (error) {
            return error.response;
        }
    }
    

    static async fetchAdminComments(userId, userName, jobPostId, jobPost, commentId, comment) {
        try {
            const localStorage = window.localStorage;
            const accessToken = localStorage.getItem('token');
            const url = `${baseUrl()}/admin-comments`; 

            if (userId == null && userName == null && jobPostId == null && jobPost == null && commentId == null && comment == null) {
                const response = await axios.get(url, accessTokenConfig());
                return response;

            } else {
                const trimUserName = userName ? userName.trim() : null;
                const verifiedUserId = isNaN(userId) ?  null : userId;
                const verifiedJobPostId = isNaN(jobPostId) ? null : jobPostId;
                const verifiedCommentId = isNaN(commentId) ? null : commentId;

                const response = await axios({
                url,
                method: 'get',
                params: {
                    userId: verifiedUserId, 
                    firstName: trimUserName ? trimUserName.split(" ")[0] : null,
                    lastName:  trimUserName ? trimUserName.split(" ")[1] : null,
                    jobPostId: verifiedJobPostId, 
                    jobPost, 
                    id: verifiedCommentId, 
                    comment
                    },
                    headers: { Authorization: `Bearer ${accessToken}` }, 
                });
                return response;

            }

        } catch (error) {
            return error.response;
        }
    }

    static async fetchAdminBids(bidId, jobPostId, clientName, bidderName, biddingStatus, workStatus) {
        try {
            const localStorage = window.localStorage;
            const accessToken = localStorage.getItem('token');
            const url = `${baseUrl()}/admin-bids`; 

            if (bidId == null && jobPostId == null && clientName == null && bidderName == null && biddingStatus == null && workStatus == null) {
                const response = await axios.get(url, accessTokenConfig());
                return response;

            } else {
                const trimClientName = clientName ? clientName.trim() : null;
                const trimBidderName = bidderName ? bidderName.trim() : null;
                const verifiedJobPostId = isNaN(jobPostId) ? null : jobPostId;
                const verifiedBidId= isNaN(bidId) ? null : bidId;

                const response = await axios({
                url,
                method: 'get',
                params: {
                    clientFirstName: trimClientName ? trimClientName.split(" ")[0] : null,
                    clientLastName:  trimClientName ? trimClientName.split(" ")[1] : null,
                    bidderFirstName: trimBidderName ? trimBidderName.split(" ")[0] : null,
                    bidderLastName:  trimBidderName ? trimBidderName.split(" ")[1] : null,
                    jobPostId: verifiedJobPostId,
                    id: verifiedBidId,
                    status: biddingStatus,
                    workstatus: workStatus
                    },
                    headers: { Authorization: `Bearer ${accessToken}` }, 
                });
                return response;

            }

        } catch (error) {
            return error.response;
        }
    }

    static async changeWorkStatus (workStatusUpdatedBidId, workStatus) {
        try {
            const url = `${baseUrl()}/admin-bid-update`; 
            const response = await axios.post(url, 
                {workStatusUpdatedBidId, workStatus}, 
                accessTokenConfig());
            return response;
            
        } catch (error) {
            return error.response;
        }
    }

    static async showComment(id) {
        try {
            const localStorage = window.localStorage;
            const accessToken = localStorage.getItem('token');
            const url = `${baseUrl()}/admin-show-comment`; 

            const response = await axios({
                url,
                method: 'put',
                data: { id },
                    headers: { Authorization: `Bearer ${accessToken}` }, 
                });
                return response;
            
        } catch (error) {
            return error.response;
            
        }
    }

    static async hideComment(id) {
        try {
            const localStorage = window.localStorage;
            const accessToken = localStorage.getItem('token');
            const url = `${baseUrl()}/admin-hide-comment`; 

            const response = await axios({
                url,
                method: 'put',
                data: { id },
                    headers: { Authorization: `Bearer ${accessToken}` }, 
                });
                return response; 
            
        } catch (error) {
            return error.response;
            
        }
    }

    static async activateUser(id) {
        try {
            const localStorage = window.localStorage;
            const accessToken = localStorage.getItem('token');
            const url = `${baseUrl()}/admin-activate-user`; 

            const response = await axios({
                url,
                method: 'put',
                data: { id },
                    headers: { Authorization: `Bearer ${accessToken}` }, 
                });
                return response; 
            
        } catch (error) {
            return error.response;
            
        }
    }

    static async deactivateUser(id) {
        try {
            const localStorage = window.localStorage;
            const accessToken = localStorage.getItem('token');
            const url = `${baseUrl()}/admin-deactivate-user`; 

            const response = await axios({
                url,
                method: 'put',
                data: { id },
                    headers: { Authorization: `Bearer ${accessToken}` }, 
                });
                return response; 
            
        } catch (error) {
            return error.response;
            
        }
    }
}