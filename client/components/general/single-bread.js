import React from 'react';
import PropTypes from 'prop-types'

import FlatButton from 'material-ui/FlatButton'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
const SingleBread = ({
    onBreadClick,
    entity,
    isLast
}) => {
    return (
        <div style={{display: 'flex'}} className="align-items-center">
            <FlatButton  
                onTouchTap={onBreadClick} 
                label={showContent(entity)}
                disabled={isLast}/>
            {renderRight(isLast)}
        </div>
    );
};

export default SingleBread;

SingleBread.propTypes = {
    onBreadClick: PropTypes.func.isRequired,
    entity: PropTypes.object,
    isLast: PropTypes.bool
}

function showContent(entity) {
    if (entity) {
        return entity.names[0].content
    }
    return '实体集'
}

function renderRight(isLast) {
    if(!isLast) {
        return <ChevronRight />
    }
}