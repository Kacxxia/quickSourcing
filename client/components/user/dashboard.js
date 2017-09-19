import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

import EditProfileDialog from './edit/edit-profile-dialog'
import { 
    editProfileStart, 
    editProfilePost, 
    editProfileCancel,
    editProfileAvatar,
    editProfileIntroduction,
    editProfileUsername
} from '../../actions/user'
import Waiting from '../general/waiting'
import NotFound from '../main/not-found'
const Dashboard = ({
    isFetching, 
    email, 
    username, 
    avatar,
    exist,
    introduction,
    activities,
    urlId,
    authId,
    editStatus,
    avatarEdit,
    usernameEdit,
    introductionEdit,
    onEditProfileStart,
    onEditProfileCancel,
    onEditProfilePost,
    onEditProfileAvatar,
    onEditProfileIntroduction,
    onEditProfileUsername,
    
}) => {
    if (isFetching) {
        return <Waiting />
    } else if (exist === false) {
        return <NotFound />
    } else {
        const editProfileButton = urlId === authId 
                ? <RaisedButton
                    label='修改个人资料'
                    style={{
                        marginTop: viewWidth > 414 ? 0 : '0.5rem'
                    }}
                    onClick={onEditProfileStart}
                    />
                : null
        const headerHeight = viewWidth > 414 ? '40%' : '60%'
        const bodyHeight = viewWidth > 414 ? '60%' : '40%'
        const viewWidth = window.innerWidth
        const profileDirection = viewWidth > 414 ? 'row' : 'column'
        const avatarSets = {
            src: avatar,
            size: 60,
            style: {
                marginTop: viewWidth > 414 ? 0 : '-30px'
            }
        }
        return (
            <div style={{height: '100%'}}>
                <div className='d-flex' style={{height: 
                    '40%', flexDirection: 'column'}}>
                    <div 
                    style={{
                        zIndex: -10,
                        flexGrow: viewWidth > 414 ? 8 : 2,
                        backgroundSize: 'cover',
                        backgroundImage: 'url(http://res.cloudinary.com/kacxxia/image/upload/v1505824765/8_le1i9n.jpg)'}}
                    >
                    &nbsp;
                    </div>
                    <div className='d-flex  align-items-center ' 
                        style={{
                            flexDirection: profileDirection,
                            flexGrow: viewWidth > 414 ? 0 : 1,
                            backgroundImage: viewWidth > 414 ?  'linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.46))'
                            : '',                            
                            marginTop: viewWidth > 414 ? '-6rem' : 0,
                            height: '6rem',
                            padding: '0 1rem'
                        }}  
                    >
                        <Avatar {...avatarSets} />
                        <div className='d-flex flex-column' style={{
                            flexGrow: 5
                        }}>
                            <div style={{
                                color: viewWidth > 414 ? 'white' : 'black', 
                                fontSize: '2rem', 
                                fontWeight: 500,
                                marginLeft: viewWidth > 414 ? '1rem' : 0
                            }}>{username}</div>
                            <div style={{
                                flexGrow: 1,
                                color: viewWidth > 414 ? 'white' : 'black', 
                                fontSize: '0.75rem', 
                                marginLeft: viewWidth > 414 ? '1rem' : 0,
                                verticalAlign: 'baseline',
                                marginTop: '0.5rem',
                                textAlign: viewWidth > 414 ? 'initial' : 'center'
                            }}
                                >{introduction}</div>
                        </div>
                        {editProfileButton}
                    </div>
                </div>
                <div style={{height: '60%', overflow: 'auto'}}>
                    <div style={{marginTop: '2rem', fontSize: '2rem'}}>
                        近期活动
                    </div>
                    <Table
                        >
                        <TableHeader displaySelectAll={false}>
                            <TableRow style={{overflow: 'auto'}}>
                                <TableHeaderColumn>类型</TableHeaderColumn>
                                <TableHeaderColumn>对象</TableHeaderColumn>
                                <TableHeaderColumn style={{overflow: 'auto'}}>时间</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {renderActivities(activities)}
                        </TableBody>
                    </Table>
                </div>
                <EditProfileDialog 
                    onEditProfileCancel={onEditProfileCancel}
                    onEditProfilePost={(payload) => onEditProfilePost(payload, authId)}
                    editStatus={editStatus}
                    avatarEdit={avatarEdit}
                    email={email}
                    introductionEdit={introductionEdit}
                    usernameEdit={usernameEdit}
                    onEditProfileAvatar={onEditProfileAvatar}
                    onEditProfileIntroduction={onEditProfileIntroduction}
                    onEditProfileUsername={onEditProfileUsername}
                />
            </div>
        );
    }
};

export default connect(state => {
    return {
        isFetching: state.user.isFetching,
        email: state.user.email,
        username: state.user.username,
        createTime: state.user.createTime,
        role: state.user.role,
        avatar: state.user.avatar,
        introduction: state.user.introduction,
        exist: state.user.exist,
        activities: state.user.activities,
        authId: state.user._id,
        editStatus: state.user.editStatus,
        avatarEdit: state.user.edit.avatar,
        introductionEdit: state.user.edit.introduction,
        usernameEdit: state.user.edit.username
    }
}, dispatch => {
    return {
        onEditProfileStart: () => dispatch(editProfileStart()),
        onEditProfileCancel: () => dispatch(editProfileCancel()),
        onEditProfilePost: (payload, id) => dispatch(editProfilePost(payload, id)),
        onEditProfileAvatar: (event) => {
            const reader = new FileReader()
            const file = event.target.files[0]
            reader.onload = (e) => {
                dispatch(editProfileAvatar(e.target.result))
            }
            reader.readAsDataURL(file)
        },
        onEditProfileIntroduction: (e, value) => dispatch(editProfileIntroduction(value)),
        onEditProfileUsername: (e, value) => dispatch(editProfileUsername(value)),
    }
})(Dashboard);

Dashboard.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    createTime: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
    exist: PropTypes.bool.isRequired,
    activities: PropTypes.array.isRequired,
    urlId: PropTypes.string.isRequired,
    authId: PropTypes.string.isRequired,
    onEditProfileStart: PropTypes.func.isRequired,
    editStatus: PropTypes.number.isRequired,
    avatarEdit: PropTypes.string.isRequired,
    usernameEdit: PropTypes.string.isRequired,
    introductionEdit: PropTypes.string.isRequired,
    onEditProfileCancel: PropTypes.func.isRequired,
    onEditProfilePost: PropTypes.func.isRequired,
    onEditProfileAvatar: PropTypes.func.isRequired,
    onEditProfileIntroduction: PropTypes.func.isRequired,
    onEditProfileUsername: PropTypes.func.isRequired,
}

function renderActivities(activities) {
    return activities.map((activity, i) => {
        return (<TableRow key={i}>
                    <TableRowColumn>{translateActivityType(activity.type)
                    }</TableRowColumn>
                    <TableRowColumn title={activity.targetName}>{activity.targetName}</TableRowColumn>
                    <TableRowColumn style={{overflow: 'visible'}}
                    >{activity.date}</TableRowColumn>
                </TableRow>)
    })
}

function translateActivityType(type) {
    const obj = {
        updateEntity: '更新实体',
        createEntity: '创建实体',
        addResource: '添加资源',
        updateResource: '更新资源'
    }
    return obj[type]
}
