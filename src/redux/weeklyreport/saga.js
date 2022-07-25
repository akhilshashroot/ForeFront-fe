// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WEEKLYREPORT_LIST } from './constants';

import {
    getWeeklyreportListSuccess,
    getWeeklyreportListFailed,
  

} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const weeklyreportAddedSucsess = () => toast.success('Weeklyreport Added Successfully', { transition: Zoom });
const weeklyreportDeletedSuccess = () => toast.success('Weeklyreport Deleted Successfully', { transition: Zoom });
const weeklyreportUpdated = () => toast.info('Weeklyreport Updated Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* WeeklyreportList({payload:data}) {

    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        // url: endpoints.weeklyreportList+`?user_id=`+emp+`&month_pick=`+date,
        url: endpoints.weeklyreportList+`/${data.user_id}/${data.month_pick}`,
        // url: endpoints.weeklyreportList,
        // data: data
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getWeeklyreportListSuccess(response.data));
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
        yield put(getWeeklyreportListFailed(message));
    }
}


export function* watchWeeklyreportList(): any {
    yield takeEvery(WEEKLYREPORT_LIST, WeeklyreportList);
}


function* authSaga(): any {
    yield all([
        fork(watchWeeklyreportList),
   
    ]);
}

export default authSaga;
