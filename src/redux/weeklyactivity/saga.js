// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WEEKLYACTIVITY_LIST, WEEKLYACTIVITY_ADD,WEEKLYJOBDES_ADD, WEEKLYACTIVITY_UPDATE, WEEKLYACTIVITY_DELETE } from './constants';

import {
    getWeeklyactivityListSuccess,
    getWeeklyactivityListFailed,
    getWeeklyactivityAddSuccess,
    getWeeklyactivityAddFailed,
    getWeeklyjobdesAddSuccess,
    getWeeklyjobdesAddFailed,
    getWeeklyactivityUpdateSuccess,
    getWeeklyactivityUpdateFailed,
    getWeeklyactivityDeleteSuccess,
    getWeeklyactivityDeleteFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const weeklyactivityAddedSucsess = () => toast.success('Weeklyactivity Added Successfully', { transition: Zoom });
const weeklyjobdesAddedSucsess = () => toast.success('Job Description Updated Successfully', { transition: Zoom });
const weeklyactivityDeletedSuccess = () => toast.success('Weeklyactivity Deleted Successfully', { transition: Zoom });
const weeklyactivityUpdated = () => toast.info('Weeklyactivity Updated Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* WeeklyactivityList({payload:data}) {
   
    let dep = data.dep_id || ''
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        url: endpoints.weeklyactivityList+`/`+dep,
        // data: sendData
    };
    

    try {
        const response = yield call(ApiCall, options);

        yield put(getWeeklyactivityListSuccess(response.data));
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
        yield put(getWeeklyactivityListFailed(message));
    }
}

// Weeklyactivity Add

function* WeeklyactivityAdd({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.weeklyactivityAdd,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        weeklyactivityAddedSucsess();
        yield put(getWeeklyactivityAddSuccess(response.data));
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
        yield put(getWeeklyactivityAddFailed(message));
    }
}
// Job des Add

function* WeeklyjobdesAdd({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.jobdesAdd,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        weeklyjobdesAddedSucsess();
        yield put(getWeeklyjobdesAddSuccess(response.data));
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
        yield put(getWeeklyjobdesAddFailed(message));
    }
}

// Weeklyactivity Update

function* WeeklyactivityUpdate({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'PUT',
        url: endpoints.weeklyactivityUpdate + '/' + (data && data.dep_id),
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        weeklyactivityUpdated();
        yield put(getWeeklyactivityUpdateSuccess(response.data));
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
        yield put(getWeeklyactivityUpdateFailed(message));
    }
}

// Weeklyactivity Delete

function* WeeklyactivityDelete({ payload: id }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'DELETE',
        url: endpoints.weeklyactivityDelete + '/' + id,
    };

    try {
        const response = yield call(ApiCall, options);
        weeklyactivityDeletedSuccess();
        yield put(getWeeklyactivityDeleteSuccess(response.data));
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
        yield put(getWeeklyactivityDeleteFailed(message));
    }
}

export function* watchWeeklyactivityList(): any {
    yield takeEvery(WEEKLYACTIVITY_LIST, WeeklyactivityList);
}
export function* watchWeeklyactivityAdd(): any {
    yield takeEvery(WEEKLYACTIVITY_ADD, WeeklyactivityAdd);
}
export function* watchWeeklyjobdesAdd(): any {
    yield takeEvery(WEEKLYJOBDES_ADD, WeeklyjobdesAdd);
}
export function* watchWeeklyactivityUpdate(): any {
    yield takeEvery(WEEKLYACTIVITY_UPDATE, WeeklyactivityUpdate);
}
export function* watchWeeklyactivityDelete(): any {
    yield takeEvery(WEEKLYACTIVITY_DELETE, WeeklyactivityDelete);
}

function* authSaga(): any {
    yield all([
        fork(watchWeeklyactivityList),
        fork(watchWeeklyactivityAdd),
        fork(watchWeeklyjobdesAdd),
        fork(watchWeeklyactivityUpdate),
        fork(watchWeeklyactivityDelete),
    ]);
}

export default authSaga;
