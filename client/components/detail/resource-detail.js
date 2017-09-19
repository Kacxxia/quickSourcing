import React from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import ProTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import Update from 'material-ui/svg-icons/action/update'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { 
    upVote,
    outdatedVote,
    downVote,
    editResourceName,
    editResourceHref,
    editResourceCategory,
    editResourcePriority
} from '../../actions/detail'
const ResourceDetail = ({
    detail,
    voteStatus,
    onUpVote,
    onDownVote,
    onOutdatedVote,
    entityId,
    editStatus,
    onEditResourceName,
    onEditResourceHref,
    onEditResourceCategory,
    onEditResourcePriority
}) => {
    return (
        <div>
            {renderResourceName(editStatus, detail._id, detail.name, onEditResourceName)}
            <div>链接:</div>
            <div>{renderResourceHref(editStatus, detail._id, detail.href, onEditResourceHref)}</div>
            {renderResourceCategory(editStatus, detail._id, detail.category, onEditResourceCategory)}
            {renderResourcePriority(editStatus, detail._id, detail.priority,
            onEditResourcePriority)}
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
        entityId: state.detail.entity._id,
        editStatus: state.detail.editStatus
    }
}, dispatch => {
    return {
        onOutdatedVote: (id, status, entityId) => dispatch(outdatedVote(id, status, entityId)),
        onUpVote: (id, upSta, downSta, entityId) => dispatch(upVote(id, upSta, downSta, entityId)),
        onDownVote: (id, downSta, upSta, entityId) => dispatch(downVote(id, downSta, upSta, entityId)),
        onEditResourceName: (id, text) => dispatch(editResourceName(id, text)),
        onEditResourceHref: (id, text) => dispatch(editResourceHref(id, text)),
        onEditResourceCategory: (id, text) => dispatch(editResourceCategory(id, text)),
        onEditResourcePriority: (id, text) => dispatch(editResourcePriority(id, text)),
    }
})(ResourceDetail);

function isActive(status) {
    return status ? 'red' : 'black'
}

ResourceDetail.propTypes = {
    detail: ProTypes.object.isRequired,
    voteStatus: ProTypes.object.isRequired,
    onUpVote: ProTypes.func.isRequired,
    onDownVote: ProTypes.func.isRequired,
    onOutdatedVote: ProTypes.func.isRequired,
    entityId: ProTypes.string.isRequired,
    editStatus: ProTypes.number.isRequired,
    onEditResourceName: ProTypes.func.isRequired,
    onEditResourceHref: ProTypes.func.isRequired,
    onEditResourceCategory: ProTypes.func.isRequired,
    onEditResourcePriority: ProTypes.func.isRequired
}

function completeHref(href) {
    if(/^https?/.test(href)) {
        return href
    }
    else {
        return `http://${href}`
    }
}

function renderResourceName(editStatus, resourceId, content, onChangeResourceName) {
    let attributes = {
        id: `resource${resourceId}Name`,
        style: {
            marginBottom: '1rem',
            fontSize: '2rem',
            fontWeight: 'bold',
            cursor: editStatus ? 'text' : 'default',
            color: 'black',
            width: '98%'
        },
        inputStyle: {
            color: 'black',
            WebkitTextFillColor: 'black'         
        },
        disabled: !editStatus,
        value: content,
        underlineShow: editStatus != 0 ,
        onChange: editStatus ? (e, text) => { onChangeResourceName(resourceId,text) } : null,
        underlineStyle: {
            bottom: '0.25rem'
        }
    }
    return <TextField {...attributes} />
    
}

function renderResourceHref(editStatus, resourceId, content,onChangeResourceHref) {
    let attributes = {
        id: `resource${resourceId}Href`,
        style: {
            cursor: editStatus ? 'text' : 'default',
            color: 'black',
            width: '98%'
        },
        inputStyle: {
            color: 'black',
            WebkitTextFillColor: 'black'         
        },
        disabled: !editStatus,
        value: content,
        underlineShow: editStatus != 0 ,
        onChange: editStatus ? (e, text) => { onChangeResourceHref(resourceId, text) } : null
    }
    if (editStatus){
        return <TextField {...attributes} />
    }
        return <a href={completeHref(content)} target='_blank'>{content}</a>
}

function renderResourceCategory(editStatus, resourceId, content, onChangeResourceCategory) {
    if (!editStatus) {
        return null
    }
        return <SelectField onChange={(e, i, value) => {onChangeResourceCategory(resourceId, value)}}
                            floatingLabelText='资源类型'
                            value={content}
                            floatingLabelFixed={false}
                            floatingLabelShrinkStyle={{fontSize: `1rem`}}
                            fullWidth={true}
                >
                    <MenuItem key={1} value='website' primaryText='网站' />
                    <MenuItem key={2} value='community' primaryText='社区' />
                    <MenuItem key={3} value='article' primaryText='文章' />
                    <MenuItem key={4} value='book' primaryText='书籍' />
                    <MenuItem key={5} value='other' primaryText='其它' />
                </SelectField>
}

function renderResourcePriority(editStatus, resourceId, content, onChangeResourcePriority) {
    if (!editStatus) {
        return null
    }
        return <SelectField onChange={(e, i, value) => {onChangeResourcePriority(resourceId, value)}}
                            floatingLabelText='优先级'
                            value={content}
                            floatingLabelFixed={false}
                            floatingLabelShrinkStyle={{fontSize: `1rem`}}
                            fullWidth={true}
                >
                    <MenuItem key={1} value={0} primaryText='低' />
                    <MenuItem key={2} value={1} primaryText='较低' />
                    <MenuItem key={3} value={2} primaryText='中' />
                    <MenuItem key={4} value={3} primaryText='较高' />
                    <MenuItem key={5} value={4} primaryText='高' />
                </SelectField>
}
