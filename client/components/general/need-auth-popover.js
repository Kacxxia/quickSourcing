import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Popover from 'material-ui/Popover'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'

import { needAuthPopoverClose, authSign } from '../../actions/auth'

const NeedAuthPopover = ({
    isOpen,
    target,
    header,
    onClosePopover,
    onAuthSign
}) => {
    if (isOpen){
        return (
            <div>
                <Popover className='col-8 col-sm-3'
                    open={isOpen}
                    anchorEl={target}
                    onRequestClose={onClosePopover}
                >
                        <div style={{fontWeight: 600, margin: '1.5rem 0.75rem'}}>{header}</div>
                        <div style={{margin: '0.1rem 2rem 0.75rem 0.75rem', fontSize: '1rem'}}>需先登录，才能发表你的看法</div>
                        <Divider />
                        <div style={{margin: '1rem 0.75rem'}}>
                            <RaisedButton 
                                onClick={onAuthSign} 
                                label='登录'
                                labelColor='red'
                            />
                        </div>
                </Popover>
            </div>
        );
    }
    return null
};

export default connect(state => {
    return {
        isOpen: state.auth.needAuthPopover.status,
        target: state.auth.needAuthPopover.target,
        header: state.auth.needAuthPopover.header
    }
}, dispatch => {
    return {
        onAuthSign: () => { 
            dispatch(needAuthPopoverClose())
            dispatch(authSign())
        },
        onClosePopover: () => dispatch(needAuthPopoverClose())
    }
})(NeedAuthPopover);