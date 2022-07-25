// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PROJECT_LIST, PROJECT_ADD, PROJECT_UPDATE, PROJECT_DELETE } from './constants';

import {
    getProjectListSuccess,
    getProjectListFailed,
    getProjectAddSuccess,
    getProjectAddFailed,
    getProjectUpdateSuccess,
    getProjectUpdateFailed,
    getProjectDeleteSuccess,
    getProjectDeleteFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const projectAddedSucsess = () => toast.success('Project Added Successfully', { transition: Zoom });
const projectDeletedSuccess = () => toast.success('Project Deleted Successfully', { transition: Zoom });
const projectUpdated = () => toast.info('Project Updated Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* ProjectList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        url: endpoints.projectList,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getProjectListSuccess(response.data));
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
        yield put(getProjectListFailed(message));
    }
}

// Project Add

function* ProjectAdd({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.projectAdd,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        projectAddedSucsess();
        yield put(getProjectAddSuccess(response.data));
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
        yield put(getProjectAddFailed(message));
    }
}

// Project Update

function* ProjectUpdate({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'PUT',
        url: endpoints.projectUpdate + '/' + (data && data.pr_id),
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        projectUpdated();
        yield put(getProjectUpdateSuccess(response.data));
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
        yield put(getProjectUpdateFailed(message));
    }
}

// Project Delete

function* ProjectDelete({ payload: id }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'DELETE',
        url: endpoints.projectDelete + '/' + id,
    };

    try {
        const response = yield call(ApiCall, options);
        projectDeletedSuccess();
        yield put(getProjectDeleteSuccess(response.data));
       
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
        yield put(getProjectDeleteFailed(message));
    }
}

export function* watchProjectList(): any {
    yield takeEvery(PROJECT_LIST, ProjectList);
}
export function* watchProjectAdd(): any {
    yield takeEvery(PROJECT_ADD, ProjectAdd);
}
export function* watchProjectUpdate(): any {
    yield takeEvery(PROJECT_UPDATE, ProjectUpdate);
}
export function* watchProjectDelete(): any {
    yield takeEvery(PROJECT_DELETE, ProjectDelete);
}

function* authSaga(): any {
    yield all([
        fork(watchProjectList),
        fork(watchProjectAdd),
        fork(watchProjectUpdate),
        fork(watchProjectDelete),
    ]);
}

export default authSaga;
