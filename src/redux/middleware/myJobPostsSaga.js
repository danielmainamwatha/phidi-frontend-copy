/* eslint-disable require-yield */
import { takeLatest, put, call } from 'redux-saga/effects';
import MyJobPostsService from '../../services/myJobPostsService';
import { fetchMyJobPostsSuccess } from '../action-creator';
import {errorMessage} from './../../helpers/toast';

import {
    FETCH_MY_JOB_POSTS,
} from '../constant/actionTypes';

export function* fetchMyJobPostsWatcher() {
    yield takeLatest(FETCH_MY_JOB_POSTS, fetchMyJobPostsSaga);
}

export function* fetchMyJobPostsSaga() {
    try {
        const response = yield call(MyJobPostsService.fetchMyJobPosts);
        yield put(fetchMyJobPostsSuccess(response.data.myJobPosts));

        if ( response.status === 201 || response.status === 200) {
            return null;
        } else {
            errorMessage(response.data.message)
        }

    } catch (error) {
    }
}