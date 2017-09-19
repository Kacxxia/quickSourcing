import React from 'react';
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
const AddEntityPaper = ({
    onOpenCreateModal,
    initialTags
}) => {
    const padding = window.innerWidth < 576 ? '1rem 0' : '0 1rem'
    return (
        <Paper className='d-flex align-items-center justify-content-center col-12 col-sm-3' key="addentitypaper" style={{padding    }}>
            <RaisedButton 
                    label="创建" 
                    primary={true} 
                    style={{
                        margin: 12
                    }} 
                    onTouchTap={() => {onOpenCreateModal(initialTags)}}
                />
        </Paper>
    );
};

export default AddEntityPaper;


AddEntityPaper.propTypes = {
    onOpenCreateModal: PropTypes.func.isRequired,
    initialTags: PropTypes.array.isRequired
}