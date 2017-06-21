import React from 'react';
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import LikeBar from '../general/like-bar'
import { translateCategory } from '../../utils'
import { showDetailResource } from '../../actions/detail'
const ResourceList = ({color, list, category, onShowDetailResource}) => {
    return (
        <div className='h-100 row resource-list' style={{marginBottom: `0.5rem`}}>
            <div className='col-12 col-sm-2'>
                <Paper
                    style={{backgroundColor: color, color: 'white'}}
                    className='h-100 d-flex align-items-center justify-content-center'
                >
                    {translateCategory(category)}
                </Paper>
            </div>
            {list.map((resource, i) => {
                return <Paper 
                        className='col-12 col-sm-3 d-flex align-items-center justify-content-center paper' 
                        key={i} 
                        onClick={() => onShowDetailResource(resource._id)}
                    >
                {resource.name}
                </Paper>
            })}
        </div>
    );
};

export default connect(null, dispatch => {
    return {
        onShowDetailResource: (_id) => 
        dispatch(showDetailResource(_id))
    }
})(ResourceList);
