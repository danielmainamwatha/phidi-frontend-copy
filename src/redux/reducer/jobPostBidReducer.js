import {
    FETCH_JOB_POST_BID_SUCCESS,
} from './../constant/actionTypes';

const initialState = {
    jobPostBid: null,
}

const jobPostBidStoreState = (state=initialState, action ) => {
    switch (action.type){
        case  FETCH_JOB_POST_BID_SUCCESS:
            const {jobPostBid} = action;
            return {...state, jobPostBid}

            
        default:
            return state;
    }
}

export default jobPostBidStoreState;