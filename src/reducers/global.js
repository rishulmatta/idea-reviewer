import {
    REGISTRATION_FAILURE,
} from '../actions/auth';
import {
    SAVE_IDEA_FAILURE
} from '../actions/idea';
import {
    RESET_ERRORMSG,
} from '../actions/global';
// we want only one error msg to be in state at any time.

const global = (state = {errorMsg:''}, action) => {
    switch (action.type) {
        case SAVE_IDEA_FAILURE:
        case REGISTRATION_FAILURE:
            return {...state, errorMsg: action.payload};
        case RESET_ERRORMSG:
            return {...state, errorMsg:''};
        default:
            return state;
    }
}

export default global;