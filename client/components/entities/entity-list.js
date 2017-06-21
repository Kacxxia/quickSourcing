import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import BriefIntroCard from './brief-intro-card'
import { openCreateModal } from '../../actions/main'
const EntityList = ({
    filteredList,
    onOpenCreateModal,
    initialTags
}) => {
    const list = renderCards(filteredList, onOpenCreateModal, initialTags)
    return (
        <div className='container'>
            {list}
        </div>
    );
};

export default connect(null, (dispatch) => {
    return {
        onOpenCreateModal: (initialTags) => dispatch(openCreateModal(initialTags))
    }
})(EntityList);

EntityList.propTypes = {
    filteredList: PropTypes.array.isRequired,
    onOpenCreateModal: PropTypes.func.isRequired,
    initialTags: PropTypes.array.isRequired
}

function renderCards (filteredList, onOpenCreateModal, initialTags) {
    if (filteredList.length === 0 ) {
        return <RaisedButton 
                    label="创建" 
                    primary={true} 
                    style={{
                        margin: 12
                    }} 
                    onTouchTap={() => {onOpenCreateModal(initialTags)}}
                />
    }
    let rows = [],
        row 
    filteredList.forEach((entity, index) => {
        if(index % 4 === 0) {
            row = {
                children: []
            }
            rows.push(row)
        }
        row.children.push(entity)        
    })
    return  rows.map((row, i) => {
        return (<div className='row' key={`row${i}`}>
                    {row.children.map((entity, i) => {
                         return <BriefIntroCard entity={entity} key={`entity${i}`} />
                    })}
            </div>)
    })
}