/* eslint-disable require-yield */
import { takeLatest, put, call } from 'redux-saga/effects';
import MyJobPostsService from './../../services/myJobPostsService';
import { fetchMyJobSuccess } from './../action-creator';
import {errorMessage} from './../../helpers/toast';

import {
    FETCH_MY_JOB
} from './../constant/actionTypes';

export function* fetchMyJobWatcher() {
    yield takeLatest(FETCH_MY_JOB, fetchMyJobSaga);
}

export function* fetchMyJobSaga(action) {
    try {
        const response = yield call(() => MyJobPostsService.fetchMyJob(action.id));
        yield put(fetchMyJobSuccess(response.data.myJob));

        if ( response.status === 201 || response.status === 200) {
            return null;
        } else {
            errorMessage(response.data.message)
        }

    } catch (error) {
    }
}