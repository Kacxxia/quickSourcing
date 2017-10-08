import React from 'react';
import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { 
    chooseAccountErrorText, 
    chooseConfirmPasswordErrorText, 
    choosePasswordErrorText} 
from './index'

const LogInComponent = ({
    email,
    password,
    onChangeAccount,
    onChangePassword,
    onSignIn,
    onChangeToSignUp,
    onAccountFocus,
    onAccountBlur,
    onPasswordFocus,
    onPasswordBlur,
    emailFocusStatus,
    passwordFocusStatus
}) => {
    return (
        <div>
            <h1>登录</h1>
            <div style={{height: '4rem'}}>
                <TextField
                    fullWidth={true}
                    id='SignIn-email-TextField'
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
                    id='SignIn-password-TextField'
                    errorText={choosePasswordErrorText(passwordFocusStatus, password)}
                    onFocus={onPasswordFocus}
                    onBlur={onPasswordBlur}
                    onChange={(e, text) => { onChangePassword(text)}}
                    value={password}
                    hintText='密码'
                    type='password'
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            if(typeof(chooseAccountErrorText(emailFocusStatus, email)) === 'boolean'&& typeof(choosePasswordErrorText(passwordFocusStatus, password)) === 'boolean'&& email && password) {
                                onSignIn()
                            }
                        }
                    }}
                />
            </div>
            <RaisedButton
                label='登录'
                labelColor='#FFFFFF'
                onClick={onSignIn}
                backgroundColor='#2eb82e'
                disabled={typeof(chooseAccountErrorText(emailFocusStatus, email)) !== 'boolean'||typeof(choosePasswordErrorText(passwordFocusStatus, password)) !== 'boolean'|| !email || !password }
            />
            <RaisedButton
                label='去注册'
                onClick={onChangeToSignUp}
                style={{marginLeft: '1rem'}}
            />
        </div>
    );
};

export default LogInComponent;

LogInComponent.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onChangeAccount: PropTypes.func.isRequired,
    onChangePassword: PropTypes.func.isRequired,
    onSignIn: PropTypes.func.isRequired,
    onChangeToSignUp: PropTypes.func.isRequired,
    onAccountFocus: PropTypes.func.isRequired,
    onAccountBlur: PropTypes.func.isRequired,
    onPasswordFocus: PropTypes.func.isRequired,
    onPasswordBlur: PropTypes.func.isRequired,
    emailFocusStatus: PropTypes.number.isRequired,
    passwordFocusStatus: PropTypes.number.isRequired
}

