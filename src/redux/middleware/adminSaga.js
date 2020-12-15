import { takeLatest, put, call } from 'redux-saga/effects';
import AdminService from './../../services/adminService';
import { fetchAdminUsersSuccess, fetchAdminCommentsSuccess, fetchAdminBidsSuccess} from './../action-creator';
import {errorMessage} from './../../helpers/toast';

import {
    FETCH_ADMIN_USERS,
    FETCH_ADMIN_COMMENTS,
    FETCH_ADMIN_BIDS
} from './../constant/actionTypes';

export function* fetchAdminUsersWatcher() {
    yield takeLatest(FETCH_ADMIN_USERS, fetchAdminUsersSaga);
}

export function* fetchAdminUsersSaga(action) {
    try {
        let response;
        const {id, firstName, lastName} = action;

        if (id == null && firstName == null && lastName == null) {
            response = yield call(AdminService.fetchAdminUsers);
            yield put(fetchAdminUsersSuccess(response.data.users));

        } else {    
            response = yield call(() => AdminService.fetchAdminUsers(id, firstName, lastName));
            yield put(fetchAdminUsersSuccess(response.data.users));

        }

        if ( response.status === 201 || response.status === 200) {
            return null;
        } else {
            errorMessage(response.data.message)
        }

    } catch (error) {
    }
}

export function* fetchAdminCommentsWatcher() {
    yield takeLatest(FETCH_ADMIN_COMMENTS, fetchAdminCommentsSaga);
}

export function* fetchAdminCommentsSaga(action) {
    try {
        let response;
        const {userId, userName, jobPostId, jobPost, commentId, comment} = action;

        if (userId == null && userName == null && jobPostId == null && jobPost == null && commentId == null && comment == null) {
            response = yield call(AdminService.fetchAdminComments)
            yield put(fetchAdminCommentsSuccess(response.data.comments));

        } else {
            response = yield call(() => AdminService.fetchAdminComments(userId, userName, jobPostId, jobPost, commentId, comment));
            yield put(fetchAdminCommentsSuccess(response.data.comments));
        }

        if ( response.status === 201 || response.status === 200) {
            return null;
        } else {
            errorMessage(response.data.message)
        }

    } catch (error) {
    }
}

export function* fetchAdminBidsWatcher() {
    yield takeLatest(FETCH_ADMIN_BIDS, fetchAdminBidsSaga);
}

export function* fetchAdminBidsSaga(action) {
    try {
        let response;
        const {bidId, jobPostId, clientName, bidderName,  biddingStatus, workStatus} = action;

        if (bidId == null && jobPostId == null && clientName == null && bidderName == null && biddingStatus == null && workStatus == null ) {
            response = yield call(AdminService.fetchAdminBids)
            yield put(fetchAdminBidsSuccess(response.data.bids));

        } else {
            response = yield call(() => AdminService.fetchAdminBids(bidId, jobPostId, clientName, bidderName,  biddingStatus, workStatus));
            yield put(fetchAdminBidsSuccess(response.data.bids));
        }

        if ( response.status === 201 || response.status === 200) {
            return null;
        } else {
            errorMessage(response.data.message)
        }

    } catch (error) {
    }
}
