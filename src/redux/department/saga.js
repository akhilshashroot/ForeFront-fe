// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DEPARTMENT_LIST, DEPARTMENT_ADD, DEPARTMENT_UPDATE, DEPARTMENT_DELETE } from './constants';

import {
    getDepartmentListSuccess,
    getDepartmentListFailed,
    getDepartmentAddSuccess,
    getDepartmentAddFailed,
    getDepartmentUpdateSuccess,
    getDepartmentUpdateFailed,
    getDepartmentDeleteSuccess,
    getDepartmentDeleteFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const departmentAddedSucsess = () => toast.success('Department Added Successfully', { transition: Zoom });
const departmentDeletedSuccess = () => toast.success('Department Deleted Successfully', { transition: Zoom });
const departmentUpdated = () => toast.info('Department Updated Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* DepartmentList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        url: endpoints.departmentList,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getDepartmentListSuccess(response.data));
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
        yield put(getDepartmentListFailed(message));
    }
}

// Department Add

function* DepartmentAdd({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.departmentAdd,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        departmentAddedSucsess();
        yield put(getDepartmentAddSuccess(response.data));
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
        yield put(getDepartmentAddFailed(message));
    }
}

// Department Update

function* DepartmentUpdate({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'PUT',
        url: endpoints.departmentUpdate + '/' + (data && data.dep_id),
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        departmentUpdated();
        yield put(getDepartmentUpdateSuccess(response.data));
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
        yield put(getDepartmentUpdateFailed(message));
    }
}

// Department Delete

function* DepartmentDelete({ payload: id }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'DELETE',
        url: endpoints.departmentDelete + '/' + id,
    };

    try {
        const response = yield call(ApiCall, options);
        departmentDeletedSuccess();
        yield put(getDepartmentDeleteSuccess(response.data));
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
        yield put(getDepartmentDeleteFailed(message));
    }
}

export function* watchDepartmentList(): any {
    yield takeEvery(DEPARTMENT_LIST, DepartmentList);
}
export function* watchDepartmentAdd(): any {
    yield takeEvery(DEPARTMENT_ADD, DepartmentAdd);
}
export function* watchDepartmentUpdate(): any {
    yield takeEvery(DEPARTMENT_UPDATE, DepartmentUpdate);
}
export function* watchDepartmentDelete(): any {
    yield takeEvery(DEPARTMENT_DELETE, DepartmentDelete);
}

function* authSaga(): any {
    yield all([
        fork(watchDepartmentList),
        fork(watchDepartmentAdd),
        fork(watchDepartmentUpdate),
        fork(watchDepartmentDelete),
    ]);
}

export default authSaga;
