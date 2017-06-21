import React from 'react';
import { connect } from 'react-redux'

import { hideDetailResource } from '../../actions/detail'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import ResourceList from './resource-list'
import ResourceDetail from './resource-detail'
const DetailResource = ({entity, isDetailOpen, onHideDetailResource}) => {
    const websiteResource = filterCategoryResource(entity, 'website')
    const communityResource = filterCategoryResource(entity, 'community')
    const articleResource = filterCategoryResource(entity, 'article')
    const bookResource = filterCategoryResource(entity, 'book')
    const otherResource = filterCategoryResource(entity, 'other')
    return (
        <div className="h-100">
            <div style={{height: `20%`}} className='container-fluid'>
                <ResourceList category='website' list={websiteResource} color='#B71C1C'/>
            </div>
            <div style={{height: `20%`}} className='container-fluid'>
                <ResourceList category='community' list={communityResource} color='#E65100'/>
            </div>
            <div style={{height: `20%`}} className='container-fluid'>
                <ResourceList category='article' list={articleResource} color='#827717'/>
            </div>
            <div style={{height: `20%`}} className='container-fluid'>
                <ResourceList category='book' list={bookResource} color='#004D40'/>
            </div>
            <div style={{height: `20%`}} className='container-fluid'>
                <ResourceList category='other' list={otherResource} color='#1A237E'/>
            </div>
            <Dialog 
                open={isDetailOpen}
                onRequestClose={onHideDetailResource}
                actions={<FlatButton 
                            label='关闭'
                            onTouchTap={onHideDetailResource}
                        />}
            > 
                <ResourceDetail open={isDetailOpen} />
            </Dialog>
        </div>
    );
};

export default connect(state => {
    return {
        isDetailOpen: state.detail.resourceDetail.isOpen
    }
}, dispatch => {
    return {
        onHideDetailResource: () => dispatch(hideDetailResource())
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