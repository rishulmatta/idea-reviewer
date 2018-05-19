import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {connect} from 'react-redux';
import {
    RESET_ERRORMSG,
} from '../actions/global';

class Toast extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false
        };
        this.handleClose = this.handleClose.bind(this);
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.message) {
            return {
                isOpen: true
            };
        }
        return null;
    }

    handleClose() {
        this.setState({isOpen: false});
        this.props.resetMsg();
    }

    render() {

        return <Snackbar open={this.state.isOpen}
                         autoHideDuration={4000}
                         onClose={this.handleClose} message={this.props.message}/>;
    }
}

const mapStateToProps = (state) => {
  return {
      message: state.global.errorMsg
  }
};

const mapDispatchToProps = dispatch => {
    return {
        resetMsg: () => dispatch({type: RESET_ERRORMSG})
    };
}

const ToastContainer = connect(mapStateToProps, mapDispatchToProps)(Toast);

export default ToastContainer;