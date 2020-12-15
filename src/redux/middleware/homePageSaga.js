import { takeLatest, put, call } from 'redux-saga/effects';
import {errorMessage} from './../../helpers/toast';

import {
    SHOW_POPUP_BOOL,
    CHANGE_POPUP_BOOL
} from './../constant/actionTypes';

export function* showPopupWatcher() {
    yield takeLatest(SHOW_POPUP_BOOL, showPopupSaga);
}

export function* showPopupSaga(action) {
    try {
        const {showPopup} = action;
        yield put({type: CHANGE_POPUP_BOOL, showPopup})
    } catch (error) {
        errorMessage(error)
        
    }
}