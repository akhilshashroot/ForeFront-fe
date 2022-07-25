// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MONTHLYACTIVITY_LIST, MONTHLYACTIVITY_ADD,MONTHLYJOBDES_ADD, MONTHLYACTIVITY_UPDATE, MONTHLYACTIVITY_DELETE } from './constants';

import {
    getMonthlyactivityListSuccess,
    getMonthlyactivityListFailed,
    getMonthlyactivityAddSuccess,
    getMonthlyactivityAddFailed,
    getMonthlyjobdesAddSuccess,
    getMonthlyjobdesAddFailed,
    getMonthlyactivityUpdateSuccess,
    getMonthlyactivityUpdateFailed,
    getMonthlyactivityDeleteSuccess,
    getMonthlyactivityDeleteFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const monthlyactivityAddedSucsess = () => toast.success('Monthlyactivity Added Successfully', { transition: Zoom });
const monthlyjobdesAddedSucsess = () => toast.success('Job Description Updated Successfully', { transition: Zoom });
const monthlyactivityDeletedSuccess = () => toast.success('Monthlyactivity Deleted Successfully', { transition: Zoom });
const monthlyactivityUpdated = () => toast.info('Monthlyactivity Updated Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* MonthlyactivityList({payload:data}) {
   
    let dep = data.dep_id || ''
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        // url: endpoints.monthlyactivityList+`?dep_id=`+dep,
        url: endpoints.monthlyactivityList+`/`+dep,
        // data: sendData
    };
    

    try {
        const response = yield call(ApiCall, options);

        yield put(getMonthlyactivityListSuccess(response.data));
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
        yield put(getMonthlyactivityListFailed(message));
    }
}

// Monthlyactivity Add

function* MonthlyactivityAdd({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.monthlyactivityAdd,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        monthlyactivityAddedSucsess();
        yield put(getMonthlyactivityAddSuccess(response.data));
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
        yield put(getMonthlyactivityAddFailed(message));
    }
}
// Job des Add

function* MonthlyjobdesAdd({ payload: data }) {
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
        monthlyjobdesAddedSucsess();
        yield put(getMonthlyjobdesAddSuccess(response.data));
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
        yield put(getMonthlyjobdesAddFailed(message));
    }
}

// Monthlyactivity Update

function* MonthlyactivityUpdate({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'PUT',
        url: endpoints.monthlyactivityUpdate + '/' + (data && data.dep_id),
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        monthlyactivityUpdated();
        yield put(getMonthlyactivityUpdateSuccess(response.data));
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
        yield put(getMonthlyactivityUpdateFailed(message));
    }
}

// Monthlyactivity Delete

function* MonthlyactivityDelete({ payload: id }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'DELETE',
        url: endpoints.monthlyactivityDelete + '/' + id,
    };

    try {
        const response = yield call(ApiCall, options);
        monthlyactivityDeletedSuccess();
        yield put(getMonthlyactivityDeleteSuccess(response.data));
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
        yield put(getMonthlyactivityDeleteFailed(message));
    }
}

export function* watchMonthlyactivityList(): any {
    yield takeEvery(MONTHLYACTIVITY_LIST, MonthlyactivityList);
}
export function* watchMonthlyactivityAdd(): any {
    yield takeEvery(MONTHLYACTIVITY_ADD, MonthlyactivityAdd);
}
export function* watchMonthlyjobdesAdd(): any {
    yield takeEvery(MONTHLYJOBDES_ADD, MonthlyjobdesAdd);
}
export function* watchMonthlyactivityUpdate(): any {
    yield takeEvery(MONTHLYACTIVITY_UPDATE, MonthlyactivityUpdate);
}
export function* watchMonthlyactivityDelete(): any {
    yield takeEvery(MONTHLYACTIVITY_DELETE, MonthlyactivityDelete);
}

function* authSaga(): any {
    yield all([
        fork(watchMonthlyactivityList),
        fork(watchMonthlyactivityAdd),
        fork(watchMonthlyjobdesAdd),
        fork(watchMonthlyactivityUpdate),
        fork(watchMonthlyactivityDelete),
    ]);
}

export default authSaga;
