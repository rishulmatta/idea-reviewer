import React from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {register} from '../actions/auth';

const Register = (props) => {
    return <React.Fragment>
        <h3> Sign Up</h3>
        <form onSubmit={(evt) => {
            evt.preventDefault();
            props.register(evt);
        }}>
            <TextField placeholder="Name" name="name" />
            <TextField placeholder="Email" name="email" />
            <TextField placeholder="Password" type="password" name="password" />
            <div className="container__content__login__register__action">
                <Button variant="raised" color="primary" type="submit"> Sign Up </Button>
                <div> Already have an account? <a href='#login'>Log in</a></div>
            </div>
        </form>
    </React.Fragment>
};

const mapDispatchToProps = dispatch => {
    return {
        register: (event) => {
            let values = {};
            Array.from(event.target.getElementsByTagName("input")).forEach(ele => values[ele.name] = ele.value);
            dispatch(register(values));
        }
    }
}

const RegisterContainer = connect(
    state => state,
    mapDispatchToProps
)(Register);


export default RegisterContainer;