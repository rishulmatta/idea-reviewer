import {
    STARTING_REGISTRATION,
    REGISTRATION_SUCCESS,
    LOGIN_SUCCESS,
    USER_FETCH_SUCCESS,
    USER_FETCH_FAILURE,
    REFRESH_TOKEN_SUCCESS,
    LOGOUT_SUCCESS
} from '../actions/auth'

const defaultState = {
    accessTokens: null,
    isAuth: false,
    errorMsg: '',
    userDetails: ''
};

const auth = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case REGISTRATION_SUCCESS:
            localStorage.setItem('accessTokens', JSON.stringify(action.payload));
            return {...state, accessTokens: action.payload, isAuth: true};

        case USER_FETCH_SUCCESS:
            return {
                ...state,
                isAuth: true,
                userDetails: action.payload,
                accessTokens: localStorage.getItem('accessTokens')
            }

        case REFRESH_TOKEN_SUCCESS:
            const refresh_token = JSON.parse(state.accessTokens).refresh_token;
            const refTokensNew = JSON.stringify({
                    jwt: action.payload.jwt,
                    refresh_token
                });
            localStorage.setItem('accessTokens', refTokensNew);
            return {
                ...state,
                accessTokens: refTokensNew
            }

        case LOGOUT_SUCCESS:
        case USER_FETCH_FAILURE:
            localStorage.removeItem('accessTokens');
            return {...defaultState};
        default:
            return state;
    }
}

export default auth;