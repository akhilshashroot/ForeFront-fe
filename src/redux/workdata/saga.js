// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';

import { WORKDATA_LIST, WORKDATA_ADD, WORKDATA_UPDATE, WORKDATA_DELETE } from './constants';

import {
    getWorkdataListSuccess,
    getWorkdataListFailed,
    getWorkdataAddSuccess,
    getWorkdataAddFailed,
    getWorkdataUpdateSuccess,
    getWorkdataUpdateFailed,
    getWorkdataDeleteSuccess,
    getWorkdataDeleteFailed,
} from './actions';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLoggedInUser } from '../../helpers/authUtils';

const workdataAddedSucsess = () => toast.success('Workdata Added Successfully', { transition: Zoom });
const workdataDeletedSuccess = () => toast.success('Workdata Deleted Successfully', { transition: Zoom });
const workdataUpdated = () => toast.info('Workdata Updated Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* WorkdataList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        url: endpoints.workdataList+'/'+user.id,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getWorkdataListSuccess(response.data));
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
        yield put(getWorkdataListFailed(message));
    }
}

// Workdata Add

function* WorkdataAdd({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.workdataAdd,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        workdataAddedSucsess();
        yield put(getWorkdataAddSuccess(response.data));
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
        yield put(getWorkdataAddFailed(message));
    }
}

// Workdata Update

function* WorkdataUpdate({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'PUT',
        url: endpoints.workdataUpdate + '/' + (data && data.desg_id),
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        workdataUpdated();
        yield put(getWorkdataUpdateSuccess(response.data));
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
        yield put(getWorkdataUpdateFailed(message));
    }
}

// Workdata Delete

function* WorkdataDelete({ payload: id }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'DELETE',
        url: endpoints.workdataDelete + '/' + id,
    };

    try {
        const response = yield call(ApiCall, options);
        workdataDeletedSuccess();
        yield put(getWorkdataDeleteSuccess(response.data));
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
        yield put(getWorkdataDeleteFailed(message));
    }
}

export function* watchWorkdataList(): any {
    yield takeEvery(WORKDATA_LIST, WorkdataList);
}
export function* watchWorkdataAdd(): any {
    yield takeEvery(WORKDATA_ADD, WorkdataAdd);
}
export function* watchWorkdataUpdate(): any {
    yield takeEvery(WORKDATA_UPDATE, WorkdataUpdate);
}
export function* watchWorkdataDelete(): any {
    yield takeEvery(WORKDATA_DELETE, WorkdataDelete);
}

function* authSaga(): any {
    yield all([
        fork(watchWorkdataList),
        fork(watchWorkdataAdd),
        fork(watchWorkdataUpdate),
        fork(watchWorkdataDelete),
    ]);
}

export default authSaga;
