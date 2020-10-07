import { 
    FETCH_PROFILE,
    FETCH_PROFILE_SUCCESS,
    FETCH_JOB_POSTS,
    FETCH_JOB_POSTS_SUCCESS,
    FETCH_BIDS_SUCCESS,
    FETCH_BIDS,
    FETCH_MY_JOB_POSTS,
    FETCH_MY_JOB_POSTS_SUCCESS,
    FETCH_MY_JOB,
    FETCH_MY_JOB_SUCCESS,
    FETCH_JOB_POST_BID,
    FETCH_JOB_POST_BID_SUCCESS,
    FETCH_ADMIN_USERS,
    FETCH_ADMIN_COMMENTS,
    FETCH_ADMIN_USERS_SUCCESS,
    FETCH_ADMIN_COMMENTS_SUCCESS,
    
} from './../constant/actionTypes';

export const fetchProfile = () => ({
    type: FETCH_PROFILE,
});

export const fetchProfileSuccess = (profile) => {
    return {
    type: FETCH_PROFILE_SUCCESS,
    profile,
}};

export const fetchJobPosts = (categories=null, jobPostTitle=null) => ({
    type: FETCH_JOB_POSTS,
    categories,
    jobPostTitle
});

export const fetchJobPostsSuccess = (jobPosts) => ({
    type: FETCH_JOB_POSTS_SUCCESS,
    jobPosts,
});

export const fetchBids = () => ({
    type: FETCH_BIDS,
});

export const fetchBidsSuccess = (bids) => ({
    type: FETCH_BIDS_SUCCESS,
    bids,
});

export const fetchMyJobPosts = () => ({
    type: FETCH_MY_JOB_POSTS,
});

export const fetchMyJobPostsSuccess = (myJobPosts) => ({
    type: FETCH_MY_JOB_POSTS_SUCCESS,
    myJobPosts,
});

export const fetchMyJob = (id) => ({
    type: FETCH_MY_JOB,
    id
});

export const fetchMyJobSuccess = (myJob) => ({
    type: FETCH_MY_JOB_SUCCESS,
    myJob,
});

export const fetchJobPostBid = (id) => ({
    type: FETCH_JOB_POST_BID,
    id
});

export const fetchJobPostBidSuccess = (jobPostBid) => ({
    type: FETCH_JOB_POST_BID_SUCCESS,
    jobPostBid,
});

export const fetchAdminComments = (userId = null, userName = null, jobPostId = null, jobPost = null, commentId = null, comment = null, ) => ({
    type: FETCH_ADMIN_COMMENTS,
    userId,
    userName,
    jobPostId,
    jobPost,
    commentId,
    comment,
});

export const fetchAdminCommentsSuccess = (comments) => ({
    type: FETCH_ADMIN_COMMENTS_SUCCESS,
    comments,
});

export const fetchAdminUsers = (id=null, firstName=null, lastName=null) => ({
    type: FETCH_ADMIN_USERS,
    id,
    firstName,
    lastName
});

export const fetchAdminUsersSuccess = (users) => ({
    type: FETCH_ADMIN_USERS_SUCCESS,
    users,
});