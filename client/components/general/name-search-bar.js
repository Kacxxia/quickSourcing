import React from 'react';
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'

const NameSearchBar = ({onUpdateNameFilter, nameFilterValue}) => {
    return (
        <div className='d-flex justify-content-center' >
            <Paper style={{padding: `0 1rem`}}>
                <TextField 
                    hintText='输入名称以过滤'
                    onChange={(e, text) => {onUpdateNameFilter(text)}}
                    value={nameFilterValue}
                    underlineShow={false}
                />
            </Paper>
        </div>
    );
};

export default NameSearchBar;


NameSearchBar.propTypes = {
    nameFilterValue: PropTypes.string.isRequired,
    onUpdateNameFilter: PropTypes.func.isRequired
}
