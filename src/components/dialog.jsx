import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Icon from '@material-ui/core/Icon';


class ConfirmationDialog extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    handleCancel = () => {
        this.props.onClose();
    };

    handleOk = () => {
        this.props.onOk();
    };


    render() {

        return (
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                aria-labelledby="confirmation-dialog-title"
                {...this.props}
            >
                <DialogTitle id="confirmation-dialog-title">Are you sure?</DialogTitle>
                <DialogContent>
                    The idea will be permanently deleted.
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleOk} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}


class ConfirmationDialogDemo extends React.Component {
    state = {
        open: false,
    };


    handleClickListItem = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleOk = () => {
        this.props.onDelete(this.props.values, this.props.values.id);
    }

    render() {
        return (
            <React.Fragment>
                <Icon color="primary" onClick={this.handleClickListItem}>
                    delete
                </Icon>

                <ConfirmationDialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    onOk={this.handleOk}
                />
            </React.Fragment>
        );
    }
}

export default ConfirmationDialogDemo;