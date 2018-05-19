import axios from 'axios';

const baseUrl = 'https://small-project-api.herokuapp.com/';

const getAccessToken = () => JSON.parse(localStorage.getItem('accessTokens')).jwt;

export const post = (body, success, failure, dispatch, url) => {
    axios({
        method: 'post',
        url: `${baseUrl}${url}`,
        data: body
    }).then((res) => dispatch({type: success, payload: res.data}))
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