import React from 'react';
import PropTypes from 'prop-types'

import FlatButton from 'material-ui/FlatButton'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
const SingleBread = ({
    onBreadClick,
    name,
    isLast
}) => {
    return (
        <div style={{display: 'flex'}} className="align-items-center">
            <FlatButton  
                onClick={onBreadClick} 
                label={name}
                disabled={isLast}/>
            {renderRight(isLast)}
        </div>
    );
};

export default SingleBread;

SingleBread.propTypes = {
    onBreadClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    isLast: PropTypes.bool
}

function renderRight(isLast) {
    if(!isLast) {
        return <ChevronRight />
    }
}