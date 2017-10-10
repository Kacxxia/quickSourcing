import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { 
    closeResetPassword,
    resetPasswordChangeEmail, 
    resetPasswordResendEmail, 
    resetPasswordSendEmail,
    resetPasswordEditTargetEmail,
    resetPasswordChangeCaptcha,
    resetPasswordChangePassword,
    resetPasswordChangeConfirmPassword,
    tryResetPassword,
    resetPasswordEmailBlur,
    resetPasswordEmailFocus,
    resetPasswordPasswordBlur,
    resetPasswordPasswordFocus,
    resetPasswordConfirmPasswordBlur,
    resetPasswordConfirmPasswordFocus,
    doResetPassword
 } from '../../actions/auth'

import { chooseAccountErrorText, choosePasswordErrorText, chooseConfirmPasswordErrorText } from '../../utils'

const ForgetPasswordBox = ({
    isOpen,
    emailFocusStatus,
    status, 
    email,
    captchaValue,
    remainSeconds,
    password,
    confirmPassword,
    passwordFocusStatus,
    confirmPasswordFocusStatus,
    onCloseResetPassword,
    onEditEmail,
    onEmailChange,
    onResendEmail,
    onSendEmail,
    onTryResetPassword,
    onChangeCaptcha,
    onResetPasswordEmailBlur,
    onResetPasswordEmailFocus,
    onChangePassword,
    onChangeConfirmPassword,
    onResetPasswordPasswordBlur,
    onResetPasswordPasswordFocus,
    onResetPasswordConfirmPasswordBlur,
    onResetPasswordConfirmPasswordFocus,
    onDoResetPassword
}) => {
    if (!isOpen) return null
    let actions = [<RaisedButton 
        label='取消'
        onClick={onCloseResetPassword} />
    ]
    if (status === 3) {
        actions = [<RaisedButton 
            label='确认'
            onClick={onCloseResetPassword} 
            primary={true}
            />]
    }
    return <Dialog
                open={true}
                modal={true}
                title='找回密码'
                actions={actions}
                style={{zIndex: 2000}}
            >
                <ForgetPassword 
                    emailFocusStatus={emailFocusStatus}
                    status={status}
                    email={email}
                    captchaValue={captchaValue}
                    remainSeconds={remainSeconds}
                    password={password}
                    confirmPassword={confirmPassword}
                    passwordFocusStatus={passwordFocusStatus}
                    confirmPasswordFocusStatus={confirmPasswordFocusStatus}
                    onEditEmail={onEditEmail}
                    onEmailChange={onEmailChange}
                    onResendEmail={onResendEmail}
                    onSendEmail={onSendEmail}
                    onTryResetPassword={onTryResetPassword}
                    onChangeCaptcha={onChangeCaptcha}
                    onResetPasswordEmailBlur={onResetPasswordEmailBlur}
                    onResetPasswordEmailFocus={onResetPasswordEmailFocus}
                    onChangePassword={onChangePassword}
                    onChangeConfirmPassword={onChangeConfirmPassword}
                    onResetPasswordPasswordBlur={onResetPasswordPasswordBlur}
                    onResetPasswordPasswordFocus={onResetPasswordPasswordFocus}
                    onResetPasswordConfirmPasswordBlur={onResetPasswordConfirmPasswordBlur}
                    onResetPasswordConfirmPasswordFocus={onResetPasswordConfirmPasswordFocus} 
                    onDoResetPassword={onDoResetPassword}
                />
            </Dialog>
}

const ForgetPassword = ({
    emailFocusStatus,
    status, 
    email,
    captchaValue,
    remainSeconds,
    password,
    confirmPassword,
    passwordFocusStatus,
    confirmPasswordFocusStatus,
    onEditEmail,
    onEmailChange,
    onResendEmail,
    onSendEmail,
    onTryResetPassword,
    onChangeCaptcha,
    onResetPasswordEmailBlur,
    onResetPasswordEmailFocus,
    onChangePassword,
    onChangeConfirmPassword,
    onResetPasswordPasswordBlur,
    onResetPasswordPasswordFocus,
    onResetPasswordConfirmPasswordBlur,
    onResetPasswordConfirmPasswordFocus,
    onDoResetPassword
}) => {
    if (status === 0 || status === 1){
        return (
            <div className='container'>
                <div>
                    <div>{status === 0 ? '验证码将会发送至你的注册邮箱' : '验证码已发送至你的注册邮箱'}</div>
                </div>
                <div style={{height: '4rem', margin: '1rem 0 0 0', padding: 0}} className='d-flex col-12 col-sm-6'>
                    <TextField
                        value={email}
                        onChange={onEmailChange}
                        errorText={chooseAccountErrorText(emailFocusStatus, email)}
                        disabled={status === 1}
                        onFocus={onResetPasswordEmailFocus}
                        onBlur={onResetPasswordEmailBlur}
                        hintText='邮箱'
                        fullWidth={true}
                        onKeyPress={(e) => {
                            if(e.key === 'Enter') {
                                onSendEmail()
                            }
                        }}
                    />
                    <EditEmailButton status={status} onEditEmail={onEditEmail} />
                </div>
                <CaptchaBox 
                    status={status} 
                    remainSeconds={remainSeconds}
                    onResendEmail={onResendEmail}
                    captchaValue={captchaValue}
                    onChangeCaptcha={onChangeCaptcha}
                    onTryResetPassword={onTryResetPassword}
                />
                <RaisedButton
                    label='下一步'
                    primary={true}
                    onClick={chooseClickFunction(status, captchaValue,onSendEmail, onTryResetPassword)}
                    disabled={chooseButtonState(status, chooseAccountErrorText(emailFocusStatus, email),captchaValue)}
                />
            </div>
        );
    } else if (status === 2) {
        return (
            <div className='container'>
                <div>新密码应不少于 6 位，且不可与之前设置过的密码重复。</div>
                <div style={{margin: '1rem 0 0 0', padding: 0}} className='col-12 col-sm-8'>
                    <div style={{height: '4rem'}}>
                        <TextField
                            type='password'
                            hintText='新密码'
                            value={password}
                            onChange={onChangePassword}
                            errorText={choosePasswordErrorText(passwordFocusStatus, password)}
                            onFocus={onResetPasswordPasswordFocus}
                            onBlur={onResetPasswordPasswordBlur}
                            fullWidth={true}
                            style={{height: '4rem'}}
                        />
                    </div>
                    <div style={{height: '4rem'}}>
                        <TextField
                            type='password'
                            hintText='确认密码'
                            value={confirmPassword}
                            onChange={onChangeConfirmPassword}
                            errorText={chooseConfirmPasswordErrorText(confirmPasswordFocusStatus, confirmPassword, password)}
                            onFocus={onResetPasswordConfirmPasswordFocus}
                            onBlur={onResetPasswordConfirmPasswordBlur}
                            fullWidth={true}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    
                                }
                            }}
                        />
                    </div>
                </div>
                <RaisedButton
                    label='重置密码'
                    onClick={onDoResetPassword}
                    primary={true}
                    disabled={Boolean(choosePasswordErrorText(passwordFocusStatus, password)) || Boolean(chooseConfirmPasswordErrorText(passwordFocusStatus, confirmPassword, password))}
                    style={{marginTop: '1rem'}}
                />
            </div>
        )
    } else {
        return (
            <div>重置成功！</div>
        )
    }
};

export default connect(state => {
    return {
        isOpen: state.auth.resetPassword.isOpen,
        status: state.auth.resetPassword.status,   
        email: state.auth.resetPassword.email,
        emailFocusStatus: state.auth.resetPassword.emailFocusStatus,
        captchaValue: state.auth.resetPassword.captcha,
        remainSeconds: state.auth.resetPassword.remainSeconds,
        password: state.auth.resetPassword.password,
        confirmPassword: state.auth.resetPassword.confirmPassword,
        passwordFocusStatus: state.auth.resetPassword.passwordFocusStatus,
        confirmPasswordFocusStatus: state.auth.resetPassword.confirmPasswordFocusStatus
    }
}, dispatch => {
    return {
        onCloseResetPassword: () => dispatch(closeResetPassword()),
        onEmailChange: (e, value) => dispatch(resetPasswordChangeEmail(value)),
        onResendEmail: () => dispatch(resetPasswordResendEmail()),
        onSendEmail: () => dispatch(resetPasswordSendEmail()),
        onEditEmail: () => dispatch(resetPasswordEditTargetEmail()),
        onResetPasswordEmailBlur: () => dispatch(resetPasswordEmailBlur()),
        onResetPasswordEmailFocus: () => dispatch(resetPasswordEmailFocus()),
        onTryResetPassword: (captchaValue) => dispatch(tryResetPassword(captchaValue)),
        onChangeCaptcha: (e, value) => dispatch(resetPasswordChangeCaptcha(value)),
        onChangePassword: (e, value) => dispatch(resetPasswordChangePassword(value)),
        onChangeConfirmPassword: (e, value) => dispatch(resetPasswordChangeConfirmPassword(value)),
        onResetPasswordConfirmPasswordBlur: () => dispatch(resetPasswordConfirmPasswordBlur()),
        onResetPasswordConfirmPasswordFocus: () => dispatch(resetPasswordConfirmPasswordFocus()),
        onResetPasswordPasswordFocus: () => dispatch(resetPasswordPasswordFocus()),
        onResetPasswordPasswordBlur: () => dispatch(resetPasswordPasswordBlur()),
        onDoResetPassword: () => dispatch(doResetPassword())

    }
})(ForgetPasswordBox);



const EditEmailButton = ({status, onEditEmail}) => {
    if (status === 1){
        return (
            <FlatButton 
                onClick={onEditEmail} 
                labelStyle={{color: 'blue'}}
                label='修改' 
                style={{marginLeft: '-88px'}}
                />
        )
    }
        return null
}

ForgetPasswordBox.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    emailFocusStatus: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired, 
    email: PropTypes.string.isRequired,
    captchaValue: PropTypes.string.isRequired,
    remainSeconds: PropTypes.number.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    passwordFocusStatus: PropTypes.number.isRequired,
    confirmPasswordFocusStatus: PropTypes.number.isRequired,
    onEditEmail: PropTypes.func.isRequired,
    onEmailChange: PropTypes.func.isRequired,
    onResendEmail: PropTypes.func.isRequired,
    onSendEmail: PropTypes.func.isRequired,
    onTryResetPassword: PropTypes.func.isRequired,
    onChangeCaptcha: PropTypes.func.isRequired,
    onResetPasswordEmailBlur: PropTypes.func.isRequired,
    onResetPasswordEmailFocus: PropTypes.func.isRequired,
    onChangePassword: PropTypes.func.isRequired,
    onChangeConfirmPassword: PropTypes.func.isRequired,
    onResetPasswordPasswordBlur: PropTypes.func.isRequired,
    onResetPasswordPasswordFocus: PropTypes.func.isRequired,
    onResetPasswordConfirmPasswordBlur: PropTypes.func.isRequired,
    onResetPasswordConfirmPasswordFocus: PropTypes.func.isRequired,
    onDoResetPassword: PropTypes.func.isRequired,
    onCloseResetPassword: PropTypes.func.isRequired
}

const CaptchaBox = ({status, captchaValue, remainSeconds, onResendEmail, onChangeCaptcha, onTryResetPassword}) => {
    if (status === 1) {
        return <div className='d-flex align-items-center col-12 col-sm-6' style={{padding: 0}}>
                    <TextField 
                        hintText='输入6位验证码'
                        value={captchaValue}
                        onChange={onChangeCaptcha}
                        fullWidth={true}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                onTryResetPassword(captchaValue)
                            }
                        }}
                    />
                    <RaisedButton
                        label={!remainSeconds ? '重新获取验证码' : `${remainSeconds}秒后可重发`}
                        onClick={onResendEmail}
                        disabled={Boolean(remainSeconds)}
                        style={{marginLeft: '-130px'}}
                    />
                </div>
    }
        return null
}


function chooseClickFunction(status, captchaValue, onSendEmail, onTryResetPassword) {
    if (!status) return onSendEmail
        return () => onTryResetPassword(captchaValue)
}

function chooseButtonState(status, emailValidator, captcha) {
    if (status) return captcha.length !== 6
        return Boolean(emailValidator)
}