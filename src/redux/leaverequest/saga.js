// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LEAVEREQUEST_LIST, LEAVEREQUEST_ADD, LEAVEREQUEST_UPDATE, LEAVEREQUEST_DELETE, LEAVEREQUEST_TYPE_LIST } from './constants';

import {
    getLeaverequestListSuccess,
    getLeaverequestListFailed,
    getLeaverequestAddSuccess,
    getLeaverequestAddFailed,
    getLeaverequestUpdateSuccess,
    getLeaverequestUpdateFailed,
    getLeaverequestDeleteSuccess,
    getLeaverequestDeleteFailed,
    getLeaverequestTypeListSuccess,
    getLeaverequestTypeListFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const leaverequestAddedSucsess = () => toast.success('Leaverequest Added Successfully', { transition: Zoom });
const leaverequestDeletedSuccess = () => toast.success('Leaverequest Deleted Successfully', { transition: Zoom });
const leaverequestUpdated = () => toast.info('Leaverequest Updated Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* LeaverequestList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        url: endpoints.requestList + '/'+ user.id,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getLeaverequestListSuccess(response.data));
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
        yield put(getLeaverequestListFailed(message));
    }
}

//Leave Request List Type

function* LeaverequestListType() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        url: endpoints.requestListType + '/'+ user.id,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getLeaverequestTypeListSuccess(response.data));
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
        yield put(getLeaverequestTypeListFailed(message));
    }
}

// Leaverequest Add

function* LeaverequestAdd({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.requestSend,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        leaverequestAddedSucsess();
        yield put(getLeaverequestAddSuccess(response.data));
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
        yield put(getLeaverequestAddFailed(message));
    }
}

// Leaverequest Update

function* LeaverequestUpdate({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'PUT',
        url: endpoints.leaverequestUpdate + '/' + (data && data.dep_id),
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        leaverequestUpdated();
        yield put(getLeaverequestUpdateSuccess(response.data));
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
        yield put(getLeaverequestUpdateFailed(message));
    }
}

// Leaverequest Delete

function* LeaverequestDelete({ payload: id }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'DELETE',
        url: endpoints.leaverequestDelete + '/' + id,
    };

    try {
        const response = yield call(ApiCall, options);
        leaverequestDeletedSuccess();
        yield put(getLeaverequestDeleteSuccess(response.data));
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
        yield put(getLeaverequestDeleteFailed(message));
    }
}

export function* watchLeaverequestList(): any {
    yield takeEvery(LEAVEREQUEST_LIST, LeaverequestList);
}
export function* watchLeaverequestAdd(): any {
    yield takeEvery(LEAVEREQUEST_ADD, LeaverequestAdd);
}
export function* watchLeaverequestUpdate(): any {
    yield takeEvery(LEAVEREQUEST_UPDATE, LeaverequestUpdate);
}
export function* watchLeaverequestDelete(): any {
    yield takeEvery(LEAVEREQUEST_DELETE, LeaverequestDelete);
}
export function* watchLeaverequestTypeList(): any {
    yield takeEvery(LEAVEREQUEST_TYPE_LIST, LeaverequestListType);
}

function* authSaga(): any {
    yield all([
        fork(watchLeaverequestList),
        fork(watchLeaverequestAdd),
        fork(watchLeaverequestUpdate),
        fork(watchLeaverequestDelete),
        fork(watchLeaverequestTypeList),
    ]);
}

export default authSaga;
