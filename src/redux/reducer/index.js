import { combineReducers } from 'redux';
import profileStoreState from './profileReducer';
import jobPostsReducer from './jobPostsReducer';
import bidsStoreState from './bidsReducer';
import myJobPostsStoreState from './myJobPostsReducer';
import myJobStoreState from './myJobReducer';
import jobPostBidStoreState from './jobPostBidReducer';
import adminUsersStoreState from './adminUsers';
import adminCommentsStoreState from './adminComments';

const rootReducer = combineReducers({
    profileStoreState,
    jobPostsReducer,
    bidsStoreState,
    myJobPostsStoreState,
    myJobStoreState,
    jobPostBidStoreState,
    adminUsersStoreState,
    adminCommentsStoreState,
});

export default rootReducer;