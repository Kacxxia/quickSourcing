import React from 'react';
import { connect } from 'react-redux'
import { go, push } from 'react-router-redux'
import PropTypes from 'prop-types'

import SingleBread from './single-bread'
import { breadGoEntity, breadGoBack } from '../../actions/detail'
const BreadCrumbs = ({breadsList, onBreadGoBack, onBreadGoEntity}) => {
    return (   
        <div  className='d-flex align-items-center black-text'>
            <SingleBread 
                entity={null} 
                onBreadClick={onBreadGoEntity} />
            {breadsList.map((bread, i) => {
                return <SingleBread 
                    entity={bread} 
                    key={i} 
                    onBreadClick={() => {
                        onBreadGoBack(
                            findTargetIndex(breadsList, bread), breadsList.length
                        )
                    }}
                    isLast={i === breadsList.length-1}
                            />
            })}
        </div>
    )
}
export default connect((state) => {
    return {
        breadsList: state.detail.breads
    }
}, dispatch => {
    return  {
        onBreadGoEntity: () => {
            dispatch(push('/entities'))
            dispatch(breadGoEntity())
        },
        onBreadGoBack: (index, length) => {
            dispatch(go(index-length))
            dispatch(breadGoBack())
        }
    }
})(BreadCrumbs);

function findTargetIndex(origin, target) {
    let flag
    origin.forEach((org, index) => {
        if (org.id === target.id) {
            flag = index
        }
    })
    return flag
}

BreadCrumbs.propTypes = {
    breadsList: PropTypes.array.isRequired,
    onBreadGoBack: PropTypes.func.isRequired,
    onBreadGoEntity: PropTypes.func.isRequired,
}