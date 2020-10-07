import {
    FETCH_PROFILE_SUCCESS,
} from './../constant/actionTypes';

const initialState = {
    profile: null,
}

const profileStoreState = ( state=initialState, action ) => {
    switch (action.type){
        case FETCH_PROFILE_SUCCESS:
            const {profile} = action;
            return {...state, profile}

            
        default:
            return state;
    }
}

export default profileStoreState;