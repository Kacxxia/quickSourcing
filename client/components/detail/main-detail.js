import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import DetailIntro from './detail-intro'
import DetailResource from './detail-resource'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import LibraryBooks from 'material-ui/svg-icons/av/library-books'
import Description from 'material-ui/svg-icons/action/description'
import { changeShowResource } from '../../actions/detail'
const MainDetail = ({
    showResource,
    entity,
    onChangeShowResource
}) => {
    const show = showResource ? <DetailResource entity={entity}/> : <DetailIntro entity={entity}/>
    return (
        <div style={{position: "relative"}} className='h-100'>
            {show}
            <FloatingActionButton 
                secondary={!showResource}
                onTouchTap={onChangeShowResource}
                style={{position: 'absolute', bottom: `1rem`, right: `1rem`}}
            >
                {renderIcon(showResource)}
            </FloatingActionButton>
        </div>
    )
};

export default connect((state) => {
    return {
        showResource: state.detail.showResource
    }
}, dispatch => {
    return {
        onChangeShowResource: () => dispatch(changeShowResource())
    }
})(MainDetail);

MainDetail.propTypes = {
    showResource: PropTypes.bool.isRequired,
    onChangeShowResource: PropTypes.func.isRequired,
    entity: PropTypes.object.isRequired
}

function renderIcon(showResource) {
    if (showResource) {
        return <Description />
    }
    return <LibraryBooks />
}