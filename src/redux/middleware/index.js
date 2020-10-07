import { all } from 'redux-saga/effects';
import {
        fetchProfileWatcher,
        
    } from './../middleware/profileSaga';

    import {
        fetchJobPostsWatcher,
    } from './../middleware/jobPostsSaga';
    
    import {
        fetchBidsWatcher,
    } from './../middleware/bidsSaga';

    import {
        fetchMyJobPostsWatcher,
    } from './../middleware/myJobPostsSaga';

    import {
        fetchMyJobWatcher,
    } from './../middleware/myJobSaga';

    import {
        fetchJobPostBidWatcher,
    } from './../middleware/jobPostBidSaga';

    import {
        fetchAdminUsersWatcher, fetchAdminCommentsWatcher
    } from './../middleware/adminSaga';

function* rootSaga() {
    yield all([
        fetchProfileWatcher(),
        fetchJobPostsWatcher(),
        fetchBidsWatcher(),
        fetchMyJobPostsWatcher(),
        fetchMyJobWatcher(),
        fetchJobPostBidWatcher(),
        fetchAdminUsersWatcher(),
        fetchAdminCommentsWatcher(),
    ]);
}

export default rootSaga;