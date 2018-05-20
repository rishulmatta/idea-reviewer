import axios from 'axios';

const baseUrl = 'https://small-project-api.herokuapp.com/';

const getAccessToken = () => localStorage.getItem('accessTokens') ? JSON.parse(localStorage.getItem('accessTokens')).jwt: "";

export const post = (body, success, failure, dispatch, url, extraData) => {
    axios({
        method: 'post',
        headers: {
          'X-Access-Token': getAccessToken()
        },
        url: `${baseUrl}${url}`,
        data: body
    }).then((res) => dispatch({type: success, payload: res.data, ...extraData}))
        .catch((err) => dispatch({type: failure, payload: err.response.data.reason}));
}

export const put = (body, success, failure, dispatch, url, extraData) => {
    axios({
        method: 'put',
        headers: {
          'X-Access-Token': getAccessToken()
        },
        url: `${baseUrl}${url}/${extraData.id}`,
        data: body
    }).then((res) => dispatch({type: success, payload: res.data, ...extraData}))
        .catch((err) => dispatch({type: failure, payload: err.response.data.reason}));
}

export const deleteIdea = (body, success, failure, dispatch, url, extraData) => {
    axios({
        method: 'delete',
        headers: {
          'X-Access-Token': getAccessToken()
        },
        url: `${baseUrl}${url}/${extraData.id}`
    }).then((res) => dispatch({type: success, payload: res.data, ...extraData}))
        .catch((err) => dispatch({type: failure, payload: err.response.data.reason}));
}


export const get = (success, failure, dispatch, url) => {
    axios({
        method: 'get',
        headers: {
          'X-Access-Token': getAccessToken()
        },
        url: `${baseUrl}${url}`,
    }).then((res) => dispatch({type: success, payload: res.data}))
        .catch((err) => dispatch({type: failure, payload: err.response.data.reason}));
}