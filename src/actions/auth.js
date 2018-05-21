import {get, post, deleteSession} from './index'

export const STARTING_REGISTRATION = 'STARTING_REGISTRATION';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_FAILURE = 'USER_FETCH_FAILURE';

export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';

export const register = (body) => {
    return (dispatch) => post(body, REGISTRATION_SUCCESS, REGISTRATION_FAILURE, dispatch, 'users');
};

export const login = (body) => {
    return (dispatch) => post(body, LOGIN_SUCCESS, LOGIN_FAILURE, dispatch, 'access-tokens');
};

export const logout = (body) => {
    return (dispatch) => deleteSession(body, LOGOUT_SUCCESS, LOGOUT_FAILURE, dispatch);
};

export const refreshToken = () => {
    return (dispatch) => post({refresh_token: JSON.parse(localStorage.getItem('accessTokens')).refresh_token},
        REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILURE, dispatch, 'access-tokens/refresh');
};

export const fetchUserDetails = () => {
    return (dispatch) => get(USER_FETCH_SUCCESS, USER_FETCH_FAILURE, dispatch, 'me');
};