import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {login} from '../actions/auth';

const Login = (props) => {
    return <React.Fragment>
        <h3>Log In</h3>
        <form onSubmit={(evt) => {
            evt.preventDefault();
            props.login(evt);
        }}>
            <TextField placeholder="Email" name="email"/>
            <TextField placeholder="Password" type="password" name="password"/>
            <div className="container__content__login__register__action">
                <Button variant="raised" color="primary" type="submit"> Login</Button>
                <div> Don't have an account? <a href='#'>Create an account</a></div>
            </div>
        </form>
    </React.Fragment>

};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (event) => {
            let values = {};
            const data = Array.from(event.target.getElementsByTagName("input"))
                .forEach(ele => values[ele.name] = ele.value);
            dispatch(login(values));
        }
    };
};


const LoginContainer = connect(
    state => state,
    mapDispatchToProps
)(Login);


export default LoginContainer;