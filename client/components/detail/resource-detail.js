import React from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import ProTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import Update from 'material-ui/svg-icons/action/update'

import { upVote, outdatedVote, downVote } from '../../actions/detail'
const ResourceDetail = ({
    open,
    detail,
    voteStatus,
    onUpVote,
    onDownVote,
    onOutdatedVote,
    entityId
}) => {
    if(!open) return null
    return (
        <div>
            <h3>{detail.name}</h3>
            <div>链接:</div>
            <div><a href={detail.href}>{detail.href}</a></div>
            <div className='d-flex'>
                <div> 
                    <IconButton
                        onTouchTap={() => onUpVote(detail._id, voteStatus.upVoted, voteStatus.downVoted, entityId)}
                        title="赞"
                    >
                        <ThumbUp color={isActive(voteStatus.upVoted)}/>
                    </IconButton>
                    {detail.good}
                </div>
                <div>
                    <IconButton
                        onTouchTap={() => onDownVote(detail._id, voteStatus.downVoted,voteStatus.upVoted, entityId)}
                        title="踩"
                    >
                        <ThumbDown color={isActive(voteStatus.downVoted)}/>
                    </IconButton>
                    {detail.bad}
                </div>
                <div>
                    <IconButton
                        onTouchTap={() => onOutdatedVote(detail._id, voteStatus.outdatedVoted, entityId)}
                        title="过时"
                    >
                        <Update color={isActive(voteStatus.outdatedVoted)}/>
                    </IconButton>
                    {detail.outdated}
                </div>
            </div>
        </div>
    );
};
const detailIdSelector = state => state.detail.resourceDetail._id
const resourceMapSelector = state => state.detail.entity.resource
const visitedSelector = state => state.detail.resourceDetail.visited
const resourceDetailSelector = createSelector(
    detailIdSelector,
    resourceMapSelector,
    (id, map) => map[id]
)
const voteStatusSelector = createSelector(
    detailIdSelector,
    visitedSelector,
    (id, visited) => visited[id]
)

export default connect(state => {
    return {
        detail: resourceDetailSelector(state),
        voteStatus: voteStatusSelector(state),
        entityId: state.detail.entity._id
    }
}, dispatch => {
    return {
        onOutdatedVote: (id, status, entityId) => dispatch(outdatedVote(id, status, entityId)),
        onUpVote: (id, upSta, downSta, entityId) => dispatch(upVote(id, upSta, downSta, entityId)),
        onDownVote: (id, downSta, upSta, entityId) => dispatch(downVote(id, downSta, upSta, entityId))

    }
})(ResourceDetail);

function isActive(status) {
    return status ? 'red' : 'black'
}

ResourceDetail.propTypes = {
    open: ProTypes.bool.isRequired,
    detail: ProTypes.object.isRequired,
    voteStatus: ProTypes.object.isRequired,
    onUpVote: ProTypes.func.isRequired,
    onDownVote: ProTypes.func.isRequired,
    onOutdatedVote: ProTypes.func.isRequired,
    entityId: ProTypes.string.isRequired
}