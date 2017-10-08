import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { hideDetailResource, addResourcePost, addResourceCancel } from '../../actions/detail'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import ResourceList from './resource-list'
import ResourceDetail from './resource-detail'
import ResourceAdd from './resource-add'
const DetailResource = ({
    entity, 
    isDetailOpen, 
    onHideDetailResource,
    isAddResourceOpen,
    onAddResourceCancel,
    onAddResourcePost,
    match
}) => {
    const websiteResource = filterCategoryResource(entity, 'website')
    const communityResource = filterCategoryResource(entity, 'community')
    const articleResource = filterCategoryResource(entity, 'article')
    const bookResource = filterCategoryResource(entity, 'book')
    const otherResource = filterCategoryResource(entity, 'other')
    const addResourceActions = [
        <RaisedButton 
            label='取消'
            onClick={onAddResourceCancel}
            style={{marginRight: '1rem'}}
        />,
        <RaisedButton
            primary={true}
            label='提交'
            onClick={() => onAddResourcePost(match.params.id)}
        />
    ]

    const height = window.innerWidth < 576 ? 'auto' : '20%'
    const overflowY = window.innerWidth < 576 ? 'auto' : 'visible'
    return (
        <div className="h-100" style={{overflowY}}>
            <div style={{height}} className='container-fluid'>
                <ResourceList category='website' list={websiteResource} color='#B71C1C'/>
            </div>
            <div style={{height}} className='container-fluid'>
                <ResourceList category='community' list={communityResource} color='#E65100'/>
            </div>
            <div style={{height}} className='container-fluid'>
                <ResourceList category='article' list={articleResource} color='#827717'/>
            </div>
            <div style={{height}} className='container-fluid'>
                <ResourceList category='book' list={bookResource} color='#004D40'/>
            </div>
            <div style={{height}} className='container-fluid'>
                <ResourceList category='other' list={otherResource} color='#1A237E'/>
            </div>
            <Dialog 
                open={isDetailOpen || isAddResourceOpen}
                onRequestClose={
                    isDetailOpen ? onHideDetailResource : onAddResourceCancel
                }
                actions={
                    isDetailOpen ? <FlatButton 
                            label='关闭'
                            onClick={onHideDetailResource}
                        /> : addResourceActions }
            > 
            {isDetailOpen ? <ResourceDetail /> : <ResourceAdd />}
            </Dialog>
        </div>
    );
};

export default connect(state => {
    return {
        isDetailOpen: state.detail.resourceDetail.isOpen,
        isAddResourceOpen: state.detail.add.isOpen
    }
}, dispatch => {
    return {
        onHideDetailResource: () => {
            dispatch(hideDetailResource())
        },
        onAddResourceCancel: () => dispatch(addResourceCancel()),
        onAddResourcePost: (id) => dispatch(addResourcePost(id))
    }
})(DetailResource);

function filterCategoryResource(entity, category) {
    let t = []
    const { resource } = entity
    for (let i in resource) {
        if (resource[i].category === category){
            t.push(resource[i])
        }
    }
    return t
}

DetailResource.propTypes = {
    entity: PropTypes.object.isRequired,
    isDetailOpen: PropTypes.bool.isRequired,
    onHideDetailResource: PropTypes.func.isRequired,
    isAddResourceOpen: PropTypes.bool.isRequired,
    onAddResourceCancel: PropTypes.func.isRequired,
    onAddResourcePost: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
}
