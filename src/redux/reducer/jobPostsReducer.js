import {
    FETCH_JOB_POSTS_SUCCESS,
} from './../constant/actionTypes';

const initialState = {
    jobPosts: null,
}

const jobPostsStoreState = (state=initialState, action ) => {
    switch (action.type){
        case  FETCH_JOB_POSTS_SUCCESS:
            const {jobPosts} = action;
            return {...state, jobPosts}

            
        default:
            return state;
    }
}

export default jobPostsStoreState;