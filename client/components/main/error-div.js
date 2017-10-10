import React from 'react';
import { connect } from  'react-redux'
import SnackBar from 'material-ui/SnackBar'

import { closeError } from '../../actions/error'
const ErrorDiv = ({
    status,
    message,
    stack,
    onCloseError
}) => {

    return (
        <SnackBar 
            open={status}
            message={message || stack || '未知错误'}
            onRequestClose={onCloseError}
            autoHideDuration={4000}
        />
    );
};

export default connect(state => {
    return {
        status: state.error.status,
        message: state.error.message,
        stack: state.error.stack
    }
}, dispatch => {
    return {
        onCloseError: () => dispatch(closeError())
    }
})(ErrorDiv);