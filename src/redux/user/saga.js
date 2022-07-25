// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { USER_LIST, USER_ADD, USER_UPDATE, USER_DELETE } from './constants';

import {
    getUserListSuccess,
    getUserListFailed,
    getUserAddSuccess,
    getUserAddFailed,
    getUserUpdateSuccess,
    getUserUpdateFailed,
    getUserDeleteSuccess,
    getUserDeleteFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const userAddedSucsess = () => toast.success('User Added Successfully', { transition: Zoom });
const userDeletedSuccess = () => toast.success('User Deleted Successfully', { transition: Zoom });
const userUpdated = () => toast.info('User Updated Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* UserList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        url: endpoints.userList+'/'+user.id,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getUserListSuccess(response.data));
    } catch (error) {
        let message;
        switch (error.response.status) {
            case 500:
                message = 'Internal Server Error';
                WarnFields(message);
                break;
            case 401:
                message = 'Invalid credentials';
                WarnFields(message);
                break;
            case 400:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            default:
                message = error;
        }
        yield put(getUserListFailed(message));
    }
}

// User Add

function* UserAdd({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.userAdd,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        userAddedSucsess();
        yield put(getUserAddSuccess(response.data));
    } catch (error) {
        let message;
        switch (error.response.status) {
            case 500:
                message = 'Internal Server Error';
                WarnFields(message);
                break;
            case 401:
                message = 'Invalid credentials';
                WarnFields(message);
                break;
            case 400:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            default:
                message = error;
        }
        yield put(getUserAddFailed(message));
    }
}

// User Update

function* UserUpdate({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'PUT',
        url: endpoints.userList + '/' + user.id,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        userUpdated();
        yield put(getUserUpdateSuccess(response.data));
    } catch (error) {
        let message;
        switch (error.response.status) {
            case 500:
                message = 'Internal Server Error';
                WarnFields(message);
                break;
            case 401:
                message = 'Invalid credentials';
                WarnFields(message);
                break;
            case 400:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            default:
                message = error;
        }
        yield put(getUserUpdateFailed(message));
    }
}

// User Delete

function* UserDelete({ payload: id }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'DELETE',
        url: endpoints.userDelete + '/' + id,
    };

    try {
        const response = yield call(ApiCall, options);
        userDeletedSuccess();
        yield put(getUserDeleteSuccess(response.data));
    } catch (error) {
        let message;
        switch (error.response.status) {
            case 500:
                message = 'Internal Server Error';
                WarnFields(message);
                break;
            case 401:
                message = 'Invalid credentials';
                WarnFields(message);
                break;
            case 400:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            default:
                message = error;
        }
        yield put(getUserDeleteFailed(message));
    }
}

export function* watchUserList(): any {
    yield takeEvery(USER_LIST, UserList);
}
export function* watchUserAdd(): any {
    yield takeEvery(USER_ADD, UserAdd);
}
export function* watchUserUpdate(): any {
    yield takeEvery(USER_UPDATE, UserUpdate);
}
export function* watchUserDelete(): any {
    yield takeEvery(USER_DELETE, UserDelete);
}

function* authSaga(): any {
    yield all([
        fork(watchUserList),
        fork(watchUserAdd),
        fork(watchUserUpdate),
        fork(watchUserDelete),
    ]);
}

export default authSaga;
