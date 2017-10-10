import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'

import BreadCrumbs from '../general/bread-crumbs'
import ToolBar from './tool-bar'

import { 
    editEntity, 
    editEntityCancel, 
    editEntitySubmit,
    editCancelConfirm,
    editCancelQuit
 } 
from '../../actions/detail'
const DetailHeader = ({editStatus, onCancelClick, onSubmitClick, onEditClick, onEditCancelQuit, onEditCancelConfirm}) => {
    const editCancelChooseActions = [
        <RaisedButton 
            label='取消'
            onTouchTap={onEditCancelQuit}
        />,
        <RaisedButton
            label='退出'
            onTouchTap={onEditCancelConfirm}
            primary={true}
            style={{marginLeft: '1rem'}}
        />
    ]
    return (
        <div className='row h-100' style={{marginBottom: 0}}>
            <div className='col-8 col-sm-8 h-100' style={{overflowX: 'auto'}}>
                <BreadCrumbs />
            </div>
            <div className='col-4 col-sm-4 h-100'>
                <ToolBar editStatus={editStatus}
                    onCancelClick={onCancelClick}
                    onEditClick={onEditClick}
                    onSubmitClick={onSubmitClick}
                    />
            </div>
            <Dialog 
                open={editStatus === 2}
                actions={editCancelChooseActions}
                onRequestClose={onEditCancelQuit}
            >
                确认退出？
            </Dialog>
        </div>
    );
};

export default connect(null, dispatch => {
    return {
        onEditClick: () => dispatch(editEntity()),
        onSubmitClick: () => dispatch(editEntitySubmit()),
        onCancelClick: () => dispatch(editEntityCancel()),
        onEditCancelQuit: () => dispatch(editCancelQuit()),
        onEditCancelConfirm: () => dispatch(editCancelConfirm())
    }
})(DetailHeader);

DetailHeader.propTypes = {
    editStatus: PropTypes.number.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    onSubmitClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onEditCancelQuit: PropTypes.func.isRequired,
    onEditCancelConfirm: PropTypes.func.isRequired
}