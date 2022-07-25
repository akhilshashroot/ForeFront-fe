// @flow
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    ADMIN_LOGIN_USER,
    ADMIN_LOGIN_USER_SUCCESS,
    ADMIN_LOGIN_USER_FAILED,
    LOGOUT_USER,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAILED,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
} from './constants';

type AuthAction = { type: string, payload: {} | string };

export const loginUser = (username: string, password: string): AuthAction => ({
    type: LOGIN_USER,
    payload: { username, password },
});

export const loginUserSuccess = (user: string): AuthAction => ({
    type: LOGIN_USER_SUCCESS,
    payload: user,
});

export const loginUserFailed = (error: string): AuthAction => ({
    type: LOGIN_USER_FAILED,
    payload: error,
});

export const AdminloginUser = (username: string, password: string): AuthAction => ({
    type: ADMIN_LOGIN_USER,
    payload: { username, password },
});

export const AdminloginUserSuccess = (user: string): AuthAction => ({
    type: ADMIN_LOGIN_USER_SUCCESS,
    payload: user,
});

export const AdminloginUserFailed = (error: string): AuthAction => ({
    type: ADMIN_LOGIN_USER_FAILED,
    payload: error,
});

export const registerUser = (fullname: string, email: string, password: string): AuthAction => ({
    type: REGISTER_USER,
    payload: { fullname, email, password },
});

export const registerUserSuccess = (user: {}): AuthAction => ({
    type: REGISTER_USER_SUCCESS,
    payload: user,
});

export const registerUserFailed = (error: string): AuthAction => ({
    type: REGISTER_USER_FAILED,
    payload: error,
});

export const logoutUser = (history: any): AuthAction => ({
    type: LOGOUT_USER,
    payload: { history },
});

export const forgetPassword = (data): AuthAction => ({
    type: FORGET_PASSWORD,
    payload: data,
});

export const forgetPasswordSuccess = (passwordResetStatus: string): AuthAction => ({
    type: FORGET_PASSWORD_SUCCESS,
    payload: passwordResetStatus,
});

export const forgetPasswordFailed = (error: string): AuthAction => ({
    type: FORGET_PASSWORD_FAILED,
    payload: error,
});
export const resetPassword = (data): AuthAction => ({
    type: RESET_PASSWORD,
    payload: data,
});

export const resetPasswordSuccess = (ResetStatus: string): AuthAction => ({
    type: RESET_PASSWORD_SUCCESS,
    payload: ResetStatus,
});

export const resetPasswordFailed = (error: string): AuthAction => ({
    type: RESET_PASSWORD_FAILED,
    payload: error,
});
