import React from 'react';
import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import { 
    chooseAccountErrorText, 
    chooseConfirmPasswordErrorText, 
    choosePasswordErrorText} 
from '../../../utils'
const SignInComponent = ({
    email,
    password,
    confirmPassword,
    onChangeAccount,
    onChangePassword,
    onChangeConfirmPassword,
    onSignUp,
    onChangeToSignIn,
    onAccountFocus,
    onAccountBlur,
    onPasswordFocus,
    onPasswordBlur,
    onConfirmPasswordBlur,
    onConfirmPasswordFocus,
    onOpenResetPassword,
    emailFocusStatus,
    passwordFocusStatus,
    confirmPasswordFocusStatus
}) => {

    return (
        <div>
            <h1>注册</h1>
            <div style={{height: '4rem'}}>
                <TextField
                    fullWidth={true}
                    id='SignUp-email-TextField'
                    errorText={chooseAccountErrorText(emailFocusStatus, email)}
                    onFocus={onAccountFocus}
                    onBlur={onAccountBlur}
                    onChange={(e, text) => { onChangeAccount(text)}}
                    value={email}
                    hintText='邮箱'
                />
            </div>
            <div style={{height: '4rem'}}>
                <TextField
                    fullWidth={true}
                    id='SignUp-password-TextField'
                    errorText={choosePasswordErrorText(passwordFocusStatus, password)}
                    onFocus={onPasswordFocus}
                    onBlur={onPasswordBlur}
                    onChange={(e, text) => { onChangePassword(text)}}
                    value={password}
                    hintText='密码'
                    type='password'
                />
            </div>
            <div style={{height: '4rem'}}>
                <TextField
                    fullWidth={true}
                    id='SignUp-confirmPassword-TextField'
                    errorText={chooseConfirmPasswordErrorText(confirmPasswordFocusStatus, confirmPassword, password)}
                    onFocus={onConfirmPasswordFocus}
                    onBlur={onConfirmPasswordBlur}
                    onChange={(e, text) => { onChangeConfirmPassword(text)}}
                    value={confirmPassword}
                    hintText='确认密码'
                    type='password'
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            if(typeof(chooseAccountErrorText(emailFocusStatus, email)) === 'boolean'&&typeof(choosePasswordErrorText(passwordFocusStatus, password)) === 'boolean'&&typeof(chooseConfirmPasswordErrorText(confirmPasswordFocusStatus, confirmPassword, password)) === 'boolean'&& email && password && confirmPassword) {
                                onSignUp()
                            }
                        }
                    }}
                />
            </div>
            <div className='d-flex' style={{flexWrap: 'wrap'}}>
                <RaisedButton
                    label='注册'
                    labelColor='#FFFFFF'
                    onTouchTap={onSignUp}
                    backgroundColor='#2eb82e'
                    disabled={typeof(chooseAccountErrorText(emailFocusStatus, email)) !== 'boolean'||typeof(choosePasswordErrorText(passwordFocusStatus, password)) !== 'boolean'||typeof(chooseConfirmPasswordErrorText(confirmPasswordFocusStatus, confirmPassword, password)) !== 'boolean'|| !email || !password || !confirmPassword}
                />
                <RaisedButton
                    label='去登录'
                    onTouchTap={onChangeToSignIn}
                    style={{marginLeft: '1rem'}}
                />
                <FlatButton
                    label='忘记密码？'
                    onClick={onOpenResetPassword}
                    style={{marginLeft: 'auto'}}
                />
            </div>
        </div>
    );
};

export default SignInComponent;

SignInComponent.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    onChangeAccount: PropTypes.func.isRequired,
    onChangePassword: PropTypes.func.isRequired,
    onChangeConfirmPassword: PropTypes.func.isRequired,
    onSignUp: PropTypes.func.isRequired,
    onChangeToSignIn: PropTypes.func.isRequired,
    onAccountFocus: PropTypes.func.isRequired,
    onAccountBlur: PropTypes.func.isRequired,
    onPasswordFocus: PropTypes.func.isRequired,
    onPasswordBlur: PropTypes.func.isRequired,
    onConfirmPasswordBlur: PropTypes.func.isRequired,
    onConfirmPasswordFocus: PropTypes.func.isRequired,
    onOpenResetPassword: PropTypes.func.isRequired,
    emailFocusStatus: PropTypes.number.isRequired,
    passwordFocusStatus: PropTypes.number.isRequired,
    confirmPasswordFocusStatus: PropTypes.number.isRequired
}

