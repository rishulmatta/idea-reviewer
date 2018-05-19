import {
    REGISTRATION_FAILURE,
} from '../actions/auth';
import {
    RESET_ERRORMSG,
} from '../actions/global';
// we want only one error msg to be in state at any time.

const global = (state = {errorMsg:''}, action) => {
    switch (action.type) {
        case REGISTRATION_FAILURE:
            return {...state, errorMsg: action.payload};
        case RESET_ERRORMSG:
            return {...state, errorMsg:''};
        default:
            return state;
    }
}

export default global;