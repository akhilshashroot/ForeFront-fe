// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DAILYREPORT_LIST } from './constants';

import {
    getDailyreportListSuccess,
    getDailyreportListFailed,
  

} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const dailyreportAddedSucsess = () => toast.success('Dailyreport Added Successfully', { transition: Zoom });
const dailyreportDeletedSuccess = () => toast.success('Dailyreport Deleted Successfully', { transition: Zoom });
const dailyreportUpdated = () => toast.info('Dailyreport Updated Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* DailyreportList({payload:data}) {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        // url: endpoints.dailyreportList+`?user_id=`+emp+`&date_daily=`+date,
        url: endpoints.dailyreportList+`/${data.user_id}/${data.date_daily}`,
        // url: endpoints.dailyreportList,
        // data: data
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getDailyreportListSuccess(response.data));
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
        yield put(getDailyreportListFailed(message));
    }
}


export function* watchDailyreportList(): any {
    yield takeEvery(DAILYREPORT_LIST, DailyreportList);
}


function* authSaga(): any {
    yield all([
        fork(watchDailyreportList),
   
    ]);
}

export default authSaga;
