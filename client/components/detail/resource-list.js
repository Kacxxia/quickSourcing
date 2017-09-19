import React from 'react';
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Add from 'material-ui/svg-icons/content/add'
import { translateCategory } from '../../utils'
import MoreResource from './more-resource'
import { showDetailResource, addResource, showMoreResource, hideMoreResource } from '../../actions/detail'
const ResourceList = ({
    color, 
    list, 
    category, 
    onShowDetailResource, 
    onAddResource,
    onShowMoreResource,
    onHideMoreResource,
    showMoreResourceOpenStatus
}) => {
    const height = window.innerWidth < 576 ? '3rem' : '100%'
    return (
        <div className='h-100 row resource-list' style={{marginBottom: `0.5rem`}}>
            <div className='col-12 col-sm-2'>
                <Paper
                    style={{backgroundColor: color, color: '#FFFFFF', cursor: 'pointer', height}}
                    className='h-100 d-flex align-items-center justify-content-center resource-list-plate'
                    zDepth={2}
                    onTouchTap={() => onShowMoreResource(category)}
                >
                    {translateCategory(category)}
                </Paper>
            </div>
            {renderResource(list, onShowDetailResource, onAddResource)}
            <Dialog
                open={showMoreResourceOpenStatus === category}
                onRequestClose={onHideMoreResource}
                actions={
                    <FlatButton 
                        label='关闭'
                        onTouchTap={onHideMoreResource}
                        />  
                }
                contentStyle={{maxWidth: '80%'}}
            >
                <MoreResource list={list}/>
            </Dialog>
        </div>
    );
};

export default connect(state => {
    return {
        showMoreResourceOpenStatus: state.detail.moreResource.status
        }
    }
, dispatch => {
    return {
        onShowDetailResource: (_id) => 
        dispatch(showDetailResource(_id)),
        onAddResource: () => {
            dispatch(addResource())
        },
        onShowMoreResource: (category) => {
            dispatch(showMoreResource(category))
        },
        onHideMoreResource: ( ) => {
            dispatch(hideMoreResource())
        }
    }
})(ResourceList);

function renderResource(list, onShowDetailResource, onAddResource) {
    const height = window.innerWidth < 576 ? '3rem' : '100%'    
    let resourceList = list.slice(0, 3).map((resource, i) => {
                return <Paper 
                        className='col-12 col-sm-3 d-flex align-items-center justify-content-center paper' 
                        key={i} 
                        onClick={() => onShowDetailResource(resource._id)}
                        style={{height}}
                    >
                {resource.name}
                </Paper>
            })
    if (resourceList.length < 3){
        resourceList.push(<FlatButton 
                        className='col-12 col-sm-3 d-flex align-items-center justify-content-center' 
                        key='addResource'
                        onClick={() => onAddResource()}
                        icon={<Add color='green'/>}
                        style={{height}}
                    />)
    }
    return resourceList
}
