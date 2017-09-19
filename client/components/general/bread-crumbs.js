import React from 'react';
import { connect } from 'react-redux'
import { go, push } from 'react-router-redux'
import PropTypes from 'prop-types'

import SingleBread from './single-bread'
import { breadGoEntity, breadGoBack, recoverBackStatus } from '../../actions/detail'
const BreadCrumbs = ({breadsList, onBreadGoBack, onBreadGoEntity}) => {
    return (   
        <div  className='d-flex align-items-center black-text'>
            <SingleBread 
                name='实体集' 
                onBreadClick={() => onBreadGoEntity(breadsList.length)} />
            {breadsList.map((bread, i) => {
                return <SingleBread 
                    name={bread} 
                    key={i} 
                    onBreadClick={() => onBreadGoBack(i, breadsList.length)}
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
            dispatch(go(-(length-1-index)))
            dispatch(breadGoBack(index)).then(() => dispatch(recoverBackStatus()))
        }
    }
})(BreadCrumbs);


BreadCrumbs.propTypes = {
    breadsList: PropTypes.array.isRequired,
    onBreadGoBack: PropTypes.func.isRequired,
    onBreadGoEntity: PropTypes.func.isRequired,
}