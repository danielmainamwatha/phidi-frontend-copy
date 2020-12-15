import {
    FETCH_ADMIN_BIDS_SUCCESS,
} from './../constant/actionTypes';

const initialState = {
    bids: null,
}

const adminBidsStoreState = (state=initialState, action) => {
    switch (action.type){
        case  FETCH_ADMIN_BIDS_SUCCESS:
            const {bids} = action;
            return {...state, bids}

        default:
            return state;
    }
}

export default adminBidsStoreState;