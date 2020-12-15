import { combineReducers } from 'redux';
import profileStoreState from './profileReducer';
import jobPostsReducer from './jobPostsReducer';
import bidsStoreState from './bidsReducer';
import myJobPostsStoreState from './myJobPostsReducer';
import myJobStoreState from './myJobReducer';
import jobPostBidStoreState from './jobPostBidReducer';
import adminUsersStoreState from './adminUsers';
import adminCommentsStoreState from './adminComments';
import adminBidsStoreState from './adminBids';
import showPopupState from './showPopup';

const rootReducer = combineReducers({
    profileStoreState,
    jobPostsReducer,
    bidsStoreState,
    myJobPostsStoreState,
    myJobStoreState,
    jobPostBidStoreState,
    adminUsersStoreState,
    adminCommentsStoreState,
    showPopupState,
    adminBidsStoreState
});

export default rootReducer;