import {
    FETCH_ADMIN_COMMENTS_SUCCESS,
} from '../constant/actionTypes';

const initialState = {
    comments: null,
}

const adminCommentsStoreState = (state=initialState, action ) => {
    switch (action.type){
        case  FETCH_ADMIN_COMMENTS_SUCCESS:
            const {comments} = action;
            return {...state, comments}

            
        default:
            return state;
    }
}

export default adminCommentsStoreState;