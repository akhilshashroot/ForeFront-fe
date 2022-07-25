// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';

import { LOGIN_USER, ADMIN_LOGIN_USER, LOGOUT_USER, REGISTER_USER, FORGET_PASSWORD, RESET_PASSWORD } from './constants';

import {
    loginUserSuccess,
    loginUserFailed,
    AdminloginUserSuccess,
    AdminloginUserFailed,
    registerUserSuccess,
    registerUserFailed,
    forgetPasswordSuccess,
    forgetPasswordFailed,
} from './actions';
import { getLoggedInUser } from '../../helpers/authUtils';

/**
 * Sets the session
 * @param {*} user
 */
const setSession = (user) => {
    if (user) {
        let cookies = new Cookies();
        cookies.set('user', JSON.stringify(user), { path: '/' });
        cookies.set('employee', JSON.stringify(user), { path: '/' });
    } else {
        console.log(user, 'user not available');
        let cookies = new Cookies();
        cookies.remove('user', { path: '/' });
        cookies.remove('employee', { path: '/' });
    }
};
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({ payload: { username, password } }) {
    // const options = {
    //     body: JSON.stringify({ username, password }),
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    // };

    let sendData = {};
    sendData.email = username;
    sendData.password = password;

    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        url: endpoints.loginUrl,
        data: sendData,
    };

    try {
        const response = yield call(ApiCall, options);

        if (response.data && response.data.Status === 200) {
            setSession(response.data);
            yield put(loginUserSuccess(response.data));
        } else {
            yield put(loginUserFailed('Invalid Credentials.'));
        }
    } catch (error) {
        let message;
        console.log(error, 'error.....');
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(loginUserFailed(message));
        setSession(null);
    }
}

/**
 * forget password
 */
function* forgetPassword({ payload: data }) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        url: endpoints.forgetPassword,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        if (response.data.error) {
            yield put(loginUserFailed('Invalid Credentials.'));
        } else {
            yield put(forgetPasswordSuccess(response.data.message));
        }
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(forgetPasswordFailed(message));
    }
}
/**
 * reset password
 */
function* resetPassword({ payload: { password, confirm_password, id } }) {
    let data = {
        password,
        confirm_password,
    };
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        url: endpoints.resetPassword + '/' + id,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        console.log(response);
        if (response.data.error) {
            yield put(loginUserFailed('Invalid Credentials.'));
        } else {
            yield put(forgetPasswordSuccess(response.data.message));
        }
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(forgetPasswordFailed(message));
    }
}

function* Adminlogin({ payload: { username, password } }) {
    // const options = {
    //     body: JSON.stringify({ username, password }),
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    // };

    let sendData = {};
    sendData.email = username;
    sendData.password = password;

    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        url: endpoints.AdminloginUrl,
        data: sendData,
    };

    try {
        const response = yield call(ApiCall, options);

        if (response.data && response.data.Status === 200) {
            setSession(response.data);
            yield put(AdminloginUserSuccess(response.data));
        } else {
            yield put(AdminloginUserFailed('Invalid Credentials.'));
        }
    } catch (error) {
        let message;
        console.log(error, 'error.....');
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(AdminloginUserFailed(message));
        setSession(null);
    }
}

/**
 * Logout the user
 * @param {*} param0
 */
function* logout({ payload: { history } }) {
    let getrolepath = getLoggedInUser().role;

    try {
        setSession(null);

        yield call(() => {
            history.push(getrolepath == 'Admin' ? '/admin' : '/login');
        });
    } catch (error) {}
}

/**
 * Register the user
 */
function* register({ payload: { fullname, email, password } }) {
    const options = {
        body: JSON.stringify({ fullname, email, password }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const response = yield call(fetchJSON, '/users/register', options);
        yield put(registerUserSuccess(response));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(registerUserFailed(message));
    }
}

export function* watchLoginUser(): any {
    yield takeEvery(LOGIN_USER, login);
}
export function* watchAdminLoginUser(): any {
    yield takeEvery(ADMIN_LOGIN_USER, Adminlogin);
}

export function* watchLogoutUser(): any {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser(): any {
    yield takeEvery(REGISTER_USER, register);
}

export function* watchForgetPassword(): any {
    yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

export function* watchResetPassword(): any {
    yield takeEvery(RESET_PASSWORD, resetPassword);
}

function* authSaga(): any {
    yield all([
        fork(watchLoginUser),
        fork(watchAdminLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchForgetPassword),
        fork(watchResetPassword),
    ]);
}

export default authSaga;
