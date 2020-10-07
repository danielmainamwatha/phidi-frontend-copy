/* eslint-disable require-yield */
import { takeLatest, put, call } from 'redux-saga/effects';
import ProfileService from './../../services/profileService';
import { fetchProfileSuccess } from './../action-creator';
import {errorMessage} from './../../helpers/toast';

import {
        FETCH_PROFILE,
    } from './../constant/actionTypes';

export function* fetchProfileWatcher() {
    yield takeLatest (FETCH_PROFILE, fetchProfileSaga);
}

export function* fetchProfileSaga() {
    try {
        const response = yield call(ProfileService.fetchProfile);
        yield put(fetchProfileSuccess(response.data.user));

        if ( response.status === 201 || response.status === 200) {
            return null;
        } else {
            errorMessage(response.data.message)
        }

    } catch (error) {
    }
}
