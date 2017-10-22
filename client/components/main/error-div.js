import React from 'react';
import { connect } from  'react-redux'
import SnackBar from 'material-ui/Snackbar'

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
            message={message || stack || ''}
            onRequestClose={onCloseError}
            autoHideDuration={4000}
            style={{
                top: 0,
                bottom: 'auto',
                left: (window.innerWidth - 288) / 2,
                transform: message || stack ?
                    'translate3d(0, 0, 0)' :
                    `translate3d(0, -50px, 0)`
            }}
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