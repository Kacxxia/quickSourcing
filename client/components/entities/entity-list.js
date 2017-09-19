import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import BriefIntroCard from './brief-intro-card'
import AddEntityPaper from './add-entity-paper'
import { openCreateModal } from '../../actions/main'
const EntityList = ({
    filteredList,
    onOpenCreateModal,
    initialTags,
    maxDisplay
}) => {
    const list = renderCards(filteredList, onOpenCreateModal, initialTags,maxDisplay)
    return (
        <div className='container h-100 d-flex align-items-center justify-content-center' style={{flexWrap: 'wrap'}}>
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
    initialTags: PropTypes.array.isRequired,
    maxDisplay: PropTypes.number.isRequired
}

function renderCards (filteredList, onOpenCreateModal, initialTags, maxDisplay) {
    let rows = [],
        row ,
        length = filteredList.length
    if(length < maxDisplay){
        filteredList.push(<AddEntityPaper 
                    onOpenCreateModal={onOpenCreateModal}
                    initialTags={initialTags}
                    key="addEntity"
                />)
    }
    length++
    filteredList.forEach((entity, index) => {
        if(index % (maxDisplay / 2) === 0) {
            row = {
                children: []
            }
            rows.push(row)
        }
        row.children.push(entity)        
    })
    if (filteredList)
    return  rows.map((row, i) => {
        return (<div className='row w-100' key={`row${i}`}>
                    {row.children.map((entity, j) => {
                        if (maxDisplay / 2 * i + j === length-1)
                            return entity
                         return <BriefIntroCard entity={entity} key={`entity${j}`} 
                         />
                    })}
            </div>)
    })
}