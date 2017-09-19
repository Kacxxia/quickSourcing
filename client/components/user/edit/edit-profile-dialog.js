import React from 'react';
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Toys from 'material-ui/svg-icons/hardware/toys'
const EditProfileDialog = ({
    onEditProfileCancel,
    onEditProfilePost,
    onEditProfileAvatar,
    onEditProfileIntroduction,
    onEditProfileUsername,
    editStatus,
    avatarEdit,
    usernameEdit,
    introductionEdit
}) => {
    const actions = [
        <RaisedButton 
            label='取消'
            onClick={onEditProfileCancel}
            style={{marginRight: '1rem'}}
        />,
        <RaisedButton
            primary={true}
            label='保存'
            labelPosition='before'
            onClick={() => {
                const payload = {
                    avatar: avatarEdit,
                    username: usernameEdit,
                    introduction: introductionEdit
                }
                onEditProfilePost(payload)}}
            icon={<Toys className={editStatus === 2 ? 'rotating' : ''}/>}
        />
    ]
    return (
        <Dialog 
            open={editStatus !== 0}
            onRequestClose={onEditProfileCancel}
            actions={actions}
            title={'修改个人资料'}
        >
            <div className='d-flex flex-column justify-content-center'>
                <div style={{position: 'relative', height: '60px', width: '60px', borderRadius: '50%', backgroundImage: `url(${avatarEdit})`, backgroundSize: 'contain'}}>
                    <input 
                    type='file' 
                    onChange={onEditProfileAvatar} 
                    style={{opacity: 0, width: '100%', height: '100%', cursor: 'pointer'}} />
                </div>
                <TextField
                    value={usernameEdit}
                    onChange={onEditProfileUsername}
                    floatingLabelFixed={true}
                    floatingLabelText='用户名'
                />
                <TextField
                    value={introductionEdit}
                    onChange={onEditProfileIntroduction}
                    floatingLabelFixed={true}
                    floatingLabelText='简介'
                />

            </div>
        </Dialog>

    );
};

export default EditProfileDialog;

EditProfileDialog.propTypes = {
    onEditProfileCancel: PropTypes.func.isRequired,
    onEditProfilePost: PropTypes.func.isRequired,
    onEditProfileAvatar: PropTypes.func.isRequired,
    onEditProfileIntroduction: PropTypes.func.isRequired,
    onEditProfileUsername: PropTypes.func.isRequired,
    editStatus: PropTypes.number.isRequired,
    avatarEdit: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    usernameEdit: PropTypes.string.isRequired,
    introductionEdit: PropTypes.string.isRequired
}