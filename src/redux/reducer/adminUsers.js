import {
    FETCH_ADMIN_USERS_SUCCESS,
} from './../constant/actionTypes';

const initialState = {
    users: null,
}

const adminUsersStoreState = (state=initialState, action ) => {
    switch (action.type){
        case  FETCH_ADMIN_USERS_SUCCESS:
            const {users} = action;
            return {...state, users}

        default:
            return state;
    }
}

export default adminUsersStoreState;