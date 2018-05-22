export const RESET_ERRORMSG = 'RESET_ERRORMSG';
export const SET_ERRORMSG = 'SET_ERRORMSG';

export const notifyError = (payload) => {
    return (dispatch) => dispatch({type: SET_ERRORMSG, payload})
}