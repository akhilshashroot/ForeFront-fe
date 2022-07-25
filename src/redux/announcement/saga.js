// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ANNOUNCEMENT_LIST, ANNOUNCEMENT_ADD, ANNOUNCEMENT_UPDATE, ANNOUNCEMENT_DELETE } from './constants';

import {
    getAnnouncementListSuccess,
    getAnnouncementListFailed,
    getAnnouncementAddSuccess,
    getAnnouncementAddFailed,
    getAnnouncementUpdateSuccess,
    getAnnouncementUpdateFailed,
    getAnnouncementDeleteSuccess,
    getAnnouncementDeleteFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const announcementAddedSucsess = () => toast.success('Announcement Added Successfully', { transition: Zoom });
const announcementDeletedSuccess = () => toast.success('Announcement Deleted Successfully', { transition: Zoom });
const announcementUpdated = () => toast.info('Announcement Updated Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* AnnouncementList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        url: endpoints.announcementList,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getAnnouncementListSuccess(response.data));
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
        yield put(getAnnouncementListFailed(message));
    }
}

// Announcement Add

function* AnnouncementAdd({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.announcementAdd,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        announcementAddedSucsess();
        yield put(getAnnouncementAddSuccess(response.data));
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
        yield put(getAnnouncementAddFailed(message));
    }
}

// Announcement Update

function* AnnouncementUpdate({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'PUT',
        url: endpoints.announcementUpdate + '/' + (data && data.id),
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        announcementUpdated();
        yield put(getAnnouncementUpdateSuccess(response.data));
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
        yield put(getAnnouncementUpdateFailed(message));
    }
}

// Announcement Delete

function* AnnouncementDelete({ payload: id }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'DELETE',
        url: endpoints.announcementDelete + '/' + id,
    };

    try {
        const response = yield call(ApiCall, options);
        announcementDeletedSuccess();
        yield put(getAnnouncementDeleteSuccess(response.data));
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
        yield put(getAnnouncementDeleteFailed(message));
    }
}

export function* watchAnnouncementList(): any {
    yield takeEvery(ANNOUNCEMENT_LIST, AnnouncementList);
}
export function* watchAnnouncementAdd(): any {
    yield takeEvery(ANNOUNCEMENT_ADD, AnnouncementAdd);
}
export function* watchAnnouncementUpdate(): any {
    yield takeEvery(ANNOUNCEMENT_UPDATE, AnnouncementUpdate);
}
export function* watchAnnouncementDelete(): any {
    yield takeEvery(ANNOUNCEMENT_DELETE, AnnouncementDelete);
}

function* authSaga(): any {
    yield all([
        fork(watchAnnouncementList),
        fork(watchAnnouncementAdd),
        fork(watchAnnouncementUpdate),
        fork(watchAnnouncementDelete),
    ]);
}

export default authSaga;
