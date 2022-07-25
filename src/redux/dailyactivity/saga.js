// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DAILYACTIVITY_LIST, DAILYACTIVITY_ADD,DAILYJOBDES_ADD, DAILYACTIVITY_UPDATE, DAILYACTIVITY_DELETE } from './constants';

import {
    getDailyactivityListSuccess,
    getDailyactivityListFailed,
    getDailyactivityAddSuccess,
    getDailyactivityAddFailed,
    getDailyjobdesAddSuccess,
    getDailyjobdesAddFailed,
    getDailyactivityUpdateSuccess,
    getDailyactivityUpdateFailed,
    getDailyactivityDeleteSuccess,
    getDailyactivityDeleteFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const dailyactivityAddedSucsess = () => toast.success('Dailyactivity Added Successfully', { transition: Zoom });
const dailyjobdesAddedSucsess = () => toast.success('Job Description Updated Successfully', { transition: Zoom });
const dailyactivityDeletedSuccess = () => toast.success('Dailyactivity Deleted Successfully', { transition: Zoom });
const dailyactivityUpdated = () => toast.info('Dailyactivity Updated Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* DailyactivityList({payload:data}) {
   
    let dep = data.dep_id || ''
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        url: endpoints.dailyactivityList+`/`+dep,
        // data: sendData
    };
    

    try {
        const response = yield call(ApiCall, options);

        yield put(getDailyactivityListSuccess(response.data));
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
        yield put(getDailyactivityListFailed(message));
    }
}

// Dailyactivity Add

function* DailyactivityAdd({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.dailyactivityAdd,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        dailyactivityAddedSucsess();
        yield put(getDailyactivityAddSuccess(response.data));
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
        yield put(getDailyactivityAddFailed(message));
    }
}
// Job des Add

function* DailyjobdesAdd({ payload: data }) {
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
        dailyjobdesAddedSucsess();
        yield put(getDailyjobdesAddSuccess(response.data));
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
        yield put(getDailyjobdesAddFailed(message));
    }
}

// Dailyactivity Update

function* DailyactivityUpdate({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'PUT',
        url: endpoints.dailyactivityUpdate + '/' + (data && data.dep_id),
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        dailyactivityUpdated();
        yield put(getDailyactivityUpdateSuccess(response.data));
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
        yield put(getDailyactivityUpdateFailed(message));
    }
}

// Dailyactivity Delete

function* DailyactivityDelete({ payload: id }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'DELETE',
        url: endpoints.dailyactivityDelete + '/' + id,
    };

    try {
        const response = yield call(ApiCall, options);
        dailyactivityDeletedSuccess();
        yield put(getDailyactivityDeleteSuccess(response.data));
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
        yield put(getDailyactivityDeleteFailed(message));
    }
}

export function* watchDailyactivityList(): any {
    yield takeEvery(DAILYACTIVITY_LIST, DailyactivityList);
}
export function* watchDailyactivityAdd(): any {
    yield takeEvery(DAILYACTIVITY_ADD, DailyactivityAdd);
}
export function* watchDailyjobdesAdd(): any {
    yield takeEvery(DAILYJOBDES_ADD, DailyjobdesAdd);
}
export function* watchDailyactivityUpdate(): any {
    yield takeEvery(DAILYACTIVITY_UPDATE, DailyactivityUpdate);
}
export function* watchDailyactivityDelete(): any {
    yield takeEvery(DAILYACTIVITY_DELETE, DailyactivityDelete);
}

function* authSaga(): any {
    yield all([
        fork(watchDailyactivityList),
        fork(watchDailyactivityAdd),
        fork(watchDailyjobdesAdd),
        fork(watchDailyactivityUpdate),
        fork(watchDailyactivityDelete),
    ]);
}

export default authSaga;
