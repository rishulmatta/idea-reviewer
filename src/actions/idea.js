import {get, post, put, deleteIdea} from './index'

export const ADD_IDEA = 'ADD_IDEA';
export const INPUT_CHANGE_IDEA = 'INPUT_CHANGE_IDEA';
export const SAVE_IDEA_STARTING = 'SAVE_IDEA_STARTING';
export const SAVE_IDEA_SUCCESS = 'SAVE_IDEA_SUCCESS';
export const SAVE_IDEA_FAILURE = 'SAVE_IDEA_FAILURE';
export const DELETE_IDEA_FAILURE = 'DELETE_IDEA_FAILURE';
export const DELETE_IDEA_SUCCESS = 'DELETE_IDEA_SUCCESS';
export const FETCH_IDEA_SUCCESS = 'FETCH_IDEA_SUCCESS';
export const FETCH_IDEA_FAILURE = 'FETCH_IDEA_FAILURE';


export const fetchIdeas = () => {
    return (dispatch) => get(FETCH_IDEA_SUCCESS, FETCH_IDEA_FAILURE, dispatch, 'ideas');
};

export const saveIdea = (data, id) => {
    return (dispatch) => post(data, SAVE_IDEA_SUCCESS, SAVE_IDEA_FAILURE, dispatch, 'ideas', {id});
};

export const updateIdea = (data, id) => {
    return (dispatch) => put(data, SAVE_IDEA_SUCCESS, SAVE_IDEA_FAILURE, dispatch, 'ideas', {id});
};

export const delIdea = (data, id) => {
    return (dispatch) => {
        if (data.isSave === false) {
            return dispatch({type: DELETE_IDEA_SUCCESS, id});
        }
        deleteIdea(data, DELETE_IDEA_SUCCESS, DELETE_IDEA_FAILURE, dispatch, 'ideas', {id})
    };
};

export const addIdea = () => {
    return (dispatch) => dispatch({type: ADD_IDEA});
};

export const inputChange = (payload) => {
    return (dispatch) => dispatch({type: INPUT_CHANGE_IDEA, payload});
};
