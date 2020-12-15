/* eslint-disable require-yield */
import { takeLatest, put, call } from 'redux-saga/effects';
import JobPostsService from './../../services/jobPostsService';
import { fetchJobPostsSuccess } from './../action-creator';
import {errorMessage} from './../../helpers/toast';

import {
    FETCH_JOB_POSTS
} from './../constant/actionTypes';

export function* fetchJobPostsWatcher() {
    yield takeLatest(FETCH_JOB_POSTS, fetchJobPostsSaga);
}

export function* fetchJobPostsSaga(action) {
    try {
        if ((action.categories != null && action.jobPostTitle == null) || (action.categories == null && action.jobPostTitle != null) ||  (action.categories !== null && action.jobPostTitle !== null)) { 
            const response = yield call(() => JobPostsService.fetchJobPosts(action.categories, action.jobPostTitle));
            yield put(fetchJobPostsSuccess(response.data.jobPosts));

            if ( response.status === 201 || response.status === 200) {
                return null;
            } else {
                errorMessage(response.data.message)
            }

        } else {
            const response = yield call(JobPostsService.fetchJobPosts);
            yield put(fetchJobPostsSuccess(response.data.jobPosts));

            if ( response.status === 201 || response.status === 200) {
                return null;
            } else {
                errorMessage(response.data.message)
            }
        }

    } catch (error) {
    }
}