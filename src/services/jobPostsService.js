import axios from 'axios';
import baseUrl from './baseURL';
import accessTokenConfig from './accessToken';

export default class JobPostsService {

    static async fetchJobPosts(categories=null, jobPostTitle=null) {
        try {
            const localStorage = window.localStorage;
            const accessToken = localStorage.getItem('token');
            const url = `${baseUrl()}/all-job-posts`; 
            
            if ((categories != null && jobPostTitle == null) || (categories == null && jobPostTitle != null) ||  (categories != null && jobPostTitle != null)) { 
              const response = await axios({
                url,
                method: 'get',
                params: {
                      categories: categories,
                      jobPostTitle: jobPostTitle
                  },
                    headers: { Authorization: `Bearer ${accessToken}` }, 
                });
                return response;

            } else {
                const response = await axios.get(url, accessTokenConfig());
                return response;
            }
            
        } catch (error) {
            return error.response;
        }
    }

    static async fetchJobPostBid(id) {
        try {
            const localStorage = window.localStorage;
            const accessToken = localStorage.getItem('token');
            const url = `${baseUrl()}/job-post-bid`;
            const response = await axios({
                url,
                method: 'get',
                params: {id},
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return response;

        } catch (error) {
            return error.response;
        }
    }

    static async createJobPost(formData) {
        try {
            const localStorage = window.localStorage;
            const accessToken = localStorage.getItem('token');
            const url = `${baseUrl()}/job-post`; 
            const response = axios.post(url,
            formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`
              }
            }
          ).then((response) => {
              return response
            })
          .catch((response) => {
              return response
            });
            return response;
            
        } catch (error) {
            return error.response;
        }
    }
    static async savePartiallyCreatedJobPost(formData) {
        try {
            const localStorage = window.localStorage;
            const accessToken = localStorage.getItem('token');
            const url = `${baseUrl()}/job-post-partially`; 
            const response = axios.put(url,
            formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`
              }
            }
          ).then((response) => {
              return response
            })
          .catch((response) => {
              return response
            });
            return response;
            
        } catch (error) {
            return error.response;
        }
    }

    static async editJobPost(formData) {
      try {
          const localStorage = window.localStorage;
          const accessToken = localStorage.getItem('token');
          const url = `${baseUrl()}/job-post-edit`; 
          const response = axios.put(url,
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${accessToken}`
            }
          }
        ).then((response) => {
            return response
          })
        .catch((response) => {
            return response
          });
          return response;
          
      } catch (error) {
          return error.response;
      }
  }

    static async publishSavedPartiallyJobPost(formData) {
      try {
          const localStorage = window.localStorage;
          const accessToken = localStorage.getItem('token');
          const url = `${baseUrl()}/publish-job-post-partially`; 
          const response = axios.put(url,
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${accessToken}`
            }
          }
        ).then((response) => { 
            return response
          })
        .catch((response) => { 
            return response
          });
          return response;
          
      } catch (error) {
          return error.response;
      }
  }

    static async publishJobPost(jobPostId) {
        try {
            const url = `${baseUrl()}/job-post`; 
            const response = await axios.put(url, { data: {
                jobPostId }
            }, accessTokenConfig());

            return response;
            
        } catch (error) {
            return error.response;
        }
    }

}