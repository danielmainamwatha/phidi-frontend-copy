import {
    SHOW_POPUP_BOOL
} from './../constant/actionTypes';

const initialState = {
    showPopup: false,
}

const showPopupState = ( state=initialState, action ) => {
    switch (action.type){
        case SHOW_POPUP_BOOL:
            const {showPopup} = action;
            return {...state, showPopup}

            
        default:
            return state;
    }
}

export default showPopupState;