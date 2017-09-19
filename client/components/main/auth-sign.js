import React from 'react';
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'

import { 
    changeAuthAccount, 
    changeAuthConfirmPassword, 
    changeAuthPassword,
    signUp,
    signIn,
    changeToSignUp,
    changeToSignIn,
    authSignCancel,
    emailFocus,
    emailBlur,
    passwordFocus,
    passwordBlur,
    confirmPasswordFocus,
    confirmPasswordBlur
} from '../../actions/auth'

import SignInComponent from './auth/sign-in'
import SignUpComponent from './auth/sign-up'
const AuthSignComponent = ({
    isSigning,
    isSignIn,
    password,
    email,
    confirmPassword,
    onChangeAccount,
    onChangeConfirmPassword,
    onChangePassword,
    onSignUp,
    onSignIn,
    onChangeToSignUp,
    onChangeToSignIn,
    onAuthSignCancel,
    onAccountFocus,
    onAccountBlur,
    onPasswordFocus,
    onPasswordBlur,
    onConfirmPasswordBlur,
    onConfirmPasswordFocus,
    emailFocusStatus,
    passwordFocusStatus,
    confirmPasswordFocusStatus
}) => {
    const attributes = { email, password, confirmPassword, onChangeAccount, onChangeConfirmPassword, onChangePassword, onSignUp, onSignIn, onChangeToSignUp, onChangeToSignIn,onAccountFocus, onAccountBlur,
    onPasswordFocus, onPasswordBlur, onConfirmPasswordBlur, onConfirmPasswordFocus, emailFocusStatus, passwordFocusStatus, confirmPasswordFocusStatus}
    return (
        <Dialog
            open={isSigning}
            onRequestClose={onAuthSignCancel}
            repositionOnUpdate={false}
        >
            {renderComponent(isSignIn, attributes, SignUpComponent, SignInComponent)}
        </Dialog>
    );
};

export default connect(state => {
    return {
        isSigning: state.auth.isSigning,        
        email: state.auth.sign.email,
        password: state.auth.sign.password,
        confirmPassword: state.auth.sign.confirmPassword,
        isSignIn: state.auth.sign.isSignIn,
        emailFocusStatus: state.auth.sign.emailFocusStatus,
        passwordFocusStatus: state.auth.sign.passwordFocusStatus,
        confirmPasswordFocusStatus: state.auth.sign.confirmPasswordFocusStatus
    }
}, dispatch => {
    return {
        onChangeAccount: (text) => dispatch(changeAuthAccount(text)),
        onChangePassword: (text) => dispatch(changeAuthPassword(text)),
        onChangeConfirmPassword: (text) => dispatch(changeAuthConfirmPassword((text))),
        onSignUp: () => dispatch(signUp()),
        onSignIn: () => dispatch(signIn()),
        onChangeToSignUp: () => dispatch(changeToSignUp()),
        onChangeToSignIn: () => dispatch(changeToSignIn()),
        onAuthSignCancel: () => dispatch(authSignCancel()),
        onAccountFocus: () => dispatch(emailFocus()),
        onAccountBlur: () => dispatch(emailBlur()),
        onPasswordFocus: () => dispatch(passwordFocus()),
        onPasswordBlur: () => dispatch(passwordBlur()),
        onConfirmPasswordFocus: () => dispatch(confirmPasswordFocus()),
        onConfirmPasswordBlur: () => dispatch(confirmPasswordBlur())
    }
})(AuthSignComponent);



function renderComponent(isSignIn, attributes, SignUpComponent, SignInComponent){
    return isSignIn 
            ? <SignInComponent {...attributes} />
            : <SignUpComponent {...attributes} />
}
