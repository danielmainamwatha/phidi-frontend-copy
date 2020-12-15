import axios from 'axios';
import baseUrl from './baseURL';
import accessTokenConfig from './accessToken';

export default class CommentsService {

    static async postComment(formData) {

        try {
            const localStorage = window.localStorage;
            const accessToken = localStorage.getItem('token');
            const url = `${baseUrl()}/comments`; 
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

    static async postCommentReply(reply, commentId) {
        try {
            const url = `${baseUrl()}/comments`; 
            const response = await axios.post(url, {data: {
                comment: reply,
                commentId,
            }}, accessTokenConfig());
            
            return response;
            
        } catch (error) {
            return error.response;
        }
    }

    static async deleteCommentReply(replyId) { 
        try {
            const localStorage = window.localStorage;
            const accessToken = localStorage.getItem('token');
            const url = `${baseUrl()}/comments`; 
            const response = await axios({
                url,
                method: 'delete',
                data: {replyId},
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            
            return response;

        } catch (error) {
            return error.response;
        }
    }

    static async editCommentReply(commentId, editedComment) { 
        try {
            const url = `${baseUrl()}/comments`; 
            const response = await axios.put(url, {data: {
                editedComment,
                commentId
            }}, accessTokenConfig());
            
            return response;

        } catch (error) {
            return error.response;
        }
    }

}