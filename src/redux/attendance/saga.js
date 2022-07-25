// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ATTENDANCE_LIST } from './constants';

import {
    getAttendanceListSuccess,
    getAttendanceListFailed,

} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const attendanceAddedSucsess = () => toast.success('Attendance Added Successfully', { transition: Zoom });
const attendanceDeletedSuccess = () => toast.success('Attendance Deleted Successfully', { transition: Zoom });
const attendanceUpdated = () => toast.info('Attendance Updated Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* AttendanceList({payload:data}) {

    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        // url: endpoints.attendanceList+`?user_id=`+emp+`&month_pick_attendancedat=`+date,
        url: endpoints.attendanceList,
        data: data
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getAttendanceListSuccess(response.data));
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
        yield put(getAttendanceListFailed(message));
    }
}


export function* watchAttendanceList(): any {
    yield takeEvery(ATTENDANCE_LIST, AttendanceList);
}


function* authSaga(): any {
    yield all([
        fork(watchAttendanceList),
   
    ]);
}

export default authSaga;
