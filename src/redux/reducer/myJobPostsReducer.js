import {
    FETCH_MY_JOB_POSTS_SUCCESS,
} from './../constant/actionTypes';

const initialState = {
    myJobPosts: null,
}

const myJobPostsStoreState = (state=initialState, action ) => {
    switch (action.type){
        case  FETCH_MY_JOB_POSTS_SUCCESS:
            const {myJobPosts} = action;
            return {...state, myJobPosts}

            
        default:
            return state;
    }
}

export default myJobPostsStoreState;