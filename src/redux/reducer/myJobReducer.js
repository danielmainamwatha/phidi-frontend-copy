import {
    FETCH_MY_JOB_SUCCESS,
} from '../constant/actionTypes';

const initialState = {
    myJob: null,
}

const myJobStoreState = (state=initialState, action ) => {
    switch (action.type){
        case  FETCH_MY_JOB_SUCCESS:
            const {myJob} = action;
            return {...state, myJob}

            
        default:
            return state;
    }
}

export default myJobStoreState;