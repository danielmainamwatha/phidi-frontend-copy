import { combineReducers } from 'redux';
import profileStoreState from './profileReducer';

const rootReducer = combineReducers({
    profileStoreState,
});

export default rootReducer;