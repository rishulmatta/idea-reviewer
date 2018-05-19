import React from 'react';
import {connect} from 'react-redux';
import {refreshToken} from '../actions/auth';


export const Idea = (props) => {
    // props.fetchDetails();
    setInterval(props.refToken, 540000);

    return 'I am idea';
};

const mapStateToProps = (state) => {
    return {
        userDetails: state.auth.userDetails
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        refToken: () => dispatch(refreshToken())
    };
};

const IdeaContainer = connect(mapStateToProps, mapDispatchToProps)(Idea);

export default IdeaContainer;