/* eslint-disable require-yield */
import { takeLatest, put, call } from 'redux-saga/effects';
import BidsService from './../../services/bidsService';
import { fetchBidsSuccess } from './../action-creator';
import {errorMessage} from './../../helpers/toast';

import {
    FETCH_BIDS
} from './../constant/actionTypes';

export function* fetchBidsWatcher() {
    yield takeLatest(FETCH_BIDS, fetchBidsSaga);
}

export function* fetchBidsSaga(action) {
    try {
        const response = yield call(BidsService.fetchBids);
        yield put(fetchBidsSuccess(response.data.bids));
        

        if ( response.status === 201 || response.status === 200) {
            return null;
        } else {
            errorMessage(response.data.message)
        }

    } catch (error) {
    }
}