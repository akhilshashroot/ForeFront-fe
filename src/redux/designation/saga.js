// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';

import { DESIGNATION_LIST, DESIGNATION_ADD, DESIGNATION_UPDATE, DESIGNATION_DELETE } from './constants';

import {
    getDesignationListSuccess,
    getDesignationListFailed,
    getDesignationAddSuccess,
    getDesignationAddFailed,
    getDesignationUpdateSuccess,
    getDesignationUpdateFailed,
    getDesignationDeleteSuccess,
    getDesignationDeleteFailed,
} from './actions';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLoggedInUser } from '../../helpers/authUtils';

const designationAddedSucsess = () => toast.success('Designation Added Successfully', { transition: Zoom });
const designationDeletedSuccess = () => toast.success('Designation Deleted Successfully', { transition: Zoom });
const designationUpdated = () => toast.info('Designation Updated Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* DesignationList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        url: endpoints.designationList,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getDesignationListSuccess(response.data));
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
        yield put(getDesignationListFailed(message));
    }
}

// Designation Add

function* DesignationAdd({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.designationAdd,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        designationAddedSucsess();
        yield put(getDesignationAddSuccess(response.data));
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
        yield put(getDesignationAddFailed(message));
    }
}

// Designation Update

function* DesignationUpdate({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'PUT',
        url: endpoints.designationUpdate + '/' + (data && data.desg_id),
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        designationUpdated();
        yield put(getDesignationUpdateSuccess(response.data));
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
        yield put(getDesignationUpdateFailed(message));
    }
}

// Designation Delete

function* DesignationDelete({ payload: id }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'DELETE',
        url: endpoints.designationDelete + '/' + id,
    };

    try {
        const response = yield call(ApiCall, options);
        designationDeletedSuccess();
        yield put(getDesignationDeleteSuccess(response.data));
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
        yield put(getDesignationDeleteFailed(message));
    }
}

export function* watchDesignationList(): any {
    yield takeEvery(DESIGNATION_LIST, DesignationList);
}
export function* watchDesignationAdd(): any {
    yield takeEvery(DESIGNATION_ADD, DesignationAdd);
}
export function* watchDesignationUpdate(): any {
    yield takeEvery(DESIGNATION_UPDATE, DesignationUpdate);
}
export function* watchDesignationDelete(): any {
    yield takeEvery(DESIGNATION_DELETE, DesignationDelete);
}

function* authSaga(): any {
    yield all([
        fork(watchDesignationList),
        fork(watchDesignationAdd),
        fork(watchDesignationUpdate),
        fork(watchDesignationDelete),
    ]);
}

export default authSaga;
