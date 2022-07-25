// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TIMESHEET_LIST, TIMESHEET_PUNCHIN, TIMESHEET_BREAK, TIMESHEET_PUNCHOUT, DESKSHOT_ADD } from './constants';

import {
    getTimesheetListSuccess,
    getTimesheetListFailed,
    getTimesheetPunchinSuccess,
    getTimesheetPunchinFailed,
    getTimesheetPunchoutSuccess,
    getTimesheetPunchoutFailed,
    getTimesheetBreakSuccess,
    getTimesheetBreakFailed,
    getDeskshotAddSuccess,
    getDeskshotAddFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const setIntialState = (data) => {
    var today = new Date().getDate();

    if (data.data.log) {
        let newdata = data.data.log.at(-1);
        
        if (newdata.punchout_time === "Haven't Punched Out") {
            localStorage.setItem('ispunchedin', true);
        } else {
            localStorage.setItem('ispunchedin', false);
        }

        if (today === parseInt(newdata.date)) {

            if (newdata.break_status === 'off') {
                localStorage.setItem('breakstatus', false);
            } else {
                localStorage.setItem('breakstatus', true);
            }
           
        } else {
            localStorage.setItem('breakstatus', false);
        }
    }
};

const timesheetPunchinsucsess = () => toast.success(' Punched In Successfully', { transition: Zoom });
const timesheetBreakSuccess = () => toast.success('Break Applied Successfully', { transition: Zoom });
const deskshotAddSuccess = () => toast.success('Screeshot Uploaded Successfully', { transition: Zoom });
const timesheetPunchoutsucsess = () => toast.info('Punched Out Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* TimesheetList() {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        url: endpoints.timesheetList + '/' + user.id,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);
        yield put(getTimesheetListSuccess(response.data));
        localStorage.setItem('attendance', JSON.stringify(response.data));
        setIntialState(response.data);
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
        yield put(getTimesheetListFailed(message));
    }
}

// Timesheet Punchin

function* TimesheetPunchin({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.timesheetPunchin,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        if (response.data.status == false) {
            WarnFields(response.data.message);
        } else {
            timesheetPunchinsucsess();
            localStorage.setItem('punchin', JSON.stringify(response.data));
            localStorage.setItem('ispunchedin', true);
            yield put(getTimesheetPunchinSuccess(response.data));
        }
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
        yield put(getTimesheetPunchinFailed(message));
    }
}
// Timesheet Punchout

function* TimesheetPunchout({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.timesheetPunchout + '?user_id=' + user.id,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        if (response.data.status == false) {
            WarnFields(response.data.message);
        } else {
            localStorage.setItem('punchout', JSON.stringify(response.data));
            localStorage.setItem('ispunchedin', false);
            timesheetPunchoutsucsess();
            yield put(getTimesheetPunchoutSuccess(response.data));
        }
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
        yield put(getTimesheetPunchoutFailed(message));
    }
}
// Timesheet Break

function* TimesheetBreak({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.timesheetBreak,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        timesheetBreakSuccess();
        yield put(getTimesheetBreakSuccess(response.data));
        console.log(response.data);
        if (response.data.time) {
            localStorage.setItem('breakstatus', false);
        } else {
            localStorage.setItem('breakstatus', true);
        }
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
        yield put(getTimesheetBreakFailed(message));
    }
}
//Deskshot Add
function* DeskshotAdd({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.deskshotAdd,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        if (response.data.status == false) {
            WarnFields(response.data.message);
        } else {
            deskshotAddSuccess();
            yield put(getDeskshotAddSuccess(response.data));
        }
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
        yield put(getDeskshotAddFailed(message));
    }
}

export function* watchTimesheetList(): any {
    yield takeEvery(TIMESHEET_LIST, TimesheetList);
}
export function* watchTimesheetPunchin(): any {
    yield takeEvery(TIMESHEET_PUNCHIN, TimesheetPunchin);
}
export function* watchTimesheetBreak(): any {
    yield takeEvery(TIMESHEET_BREAK, TimesheetBreak);
}
export function* watchTimesheetPunchout(): any {
    yield takeEvery(TIMESHEET_PUNCHOUT, TimesheetPunchout);
}
export function* watchDeskshotAdd(): any {
    yield takeEvery(DESKSHOT_ADD, DeskshotAdd);
}

function* timesheetSaga(): any {
    yield all([
        fork(watchTimesheetList),
        fork(watchTimesheetPunchin),
        fork(watchTimesheetBreak),
        fork(watchTimesheetPunchout),
        fork(watchDeskshotAdd),
    ]);
}

export default timesheetSaga;
