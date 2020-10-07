/* eslint-disable require-yield */
import { takeLatest, put, call } from 'redux-saga/effects';
import JobPostsService from './../../services/jobPostsService';
import { fetchJobPostBidSuccess } from './../action-creator';
import {errorMessage} from './../../helpers/toast';

import {
    FETCH_JOB_POST_BID
} from './../constant/actionTypes';

export function* fetchJobPostBidWatcher() {
    yield takeLatest(FETCH_JOB_POST_BID, fetchJobPostBidSaga);
}

export function* fetchJobPostBidSaga(action) {
    try {
        if (action) {
            const {id} = action;
            const response = yield call(() => JobPostsService.fetchJobPostBid(id));
            yield put(fetchJobPostBidSuccess(response.data.jobPostBid));

            if ( response.status === 201 || response.status === 200) {
                return null;
            } else {
                errorMessage(response.data.message)
            }
            
        } else {
            return null;
        }

    } catch (error) {
    }
}