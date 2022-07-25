// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { REQUEST_LIST, REQUEST_APPROVE, REQUEST_REJECT, REQUEST_DELETE } from './constants';

import {
    getRequestListSuccess,
    getRequestListFailed,
    getRequestApproveSuccess,
    getRequestApproveFailed,
    getRequestRejectSuccess,
    getRequestRejectFailed,
    getRequestDeleteSuccess,
    getRequestDeleteFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const requestApprovedSuccess = () => toast.info('Request Approved Successfully', { transition: Zoom });
const requestRejectedSuccess = () => toast.info('Request Rejected Successfully', { transition: Zoom });
const requestDeletedSuccess = () => toast.success('Request Deleted Successfully', { transition: Zoom });

const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* RequestList() {
    const user = getLoggedInUser();
    let userrole = {
        role:user.role_number
    }
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
            body:JSON.stringify(userrole),
        },
     
        method: 'GET',
        url: endpoints.requestListAdmin,
       
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getRequestListSuccess(response.data));
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
        yield put(getRequestListFailed(message));
    }
}

// Request Approve

function* RequestApprove({ payload: id }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'PUT',
        url: endpoints.requestApproveAdmin + '/' + id,
    };

    try {
        const response = yield call(ApiCall, options);
        requestApprovedSuccess();
        yield put(getRequestApproveSuccess(response.data));
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
        yield put(getRequestApproveFailed(message));
    }
}

// Request Reject

function* RequestReject({ payload: id }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'PUT',
        url: endpoints.requestRejectAdmin + '/' + id,
    };

    try {
        const response = yield call(ApiCall, options);
        requestRejectedSuccess();
        yield put(getRequestRejectSuccess(response.data));
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
        yield put(getRequestRejectFailed(message));
    }
}


// Request Delete

function* RequestDelete({ payload: id }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'DELETE',
        url: endpoints.requestDeleteAdmin + '/' + id,
    };

    try {
        const response = yield call(ApiCall, options);
        yield put(getRequestDeleteSuccess(response.data));
        requestDeletedSuccess();
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
        yield put(getRequestDeleteFailed(message));
    }
}

export function* watchRequestList(): any {
    yield takeEvery(REQUEST_LIST, RequestList);
}

export function* watchRequestApprove(): any {
    yield takeEvery(REQUEST_APPROVE, RequestApprove);
}
export function* watchRequestReject(): any {
    yield takeEvery(REQUEST_REJECT, RequestReject);
}
export function* watchRequestDelete(): any {
    yield takeEvery(REQUEST_DELETE, RequestDelete);
}

function* authSaga(): any {
    yield all([
        fork(watchRequestList),
        fork(watchRequestApprove),
        fork(watchRequestReject),
        fork(watchRequestDelete),
    ]);
}

export default authSaga;
