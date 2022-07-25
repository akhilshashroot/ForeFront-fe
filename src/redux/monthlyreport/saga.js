// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MONTHLYREPORT_LIST } from './constants';

import {
    getMonthlyreportListSuccess,
    getMonthlyreportListFailed,
  

} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const monthlyreportAddedSucsess = () => toast.success('Monthlyreport Added Successfully', { transition: Zoom });
const monthlyreportDeletedSuccess = () => toast.success('Monthlyreport Deleted Successfully', { transition: Zoom });
const monthlyreportUpdated = () => toast.info('Monthlyreport Updated Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* MonthlyreportList({payload:data}) {
//   let emp = data.user_id;
//   let date = data.month_pick;
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        // url: endpoints.monthlyreportList+`?user_id=`+emp+`&month_pick=`+date,
        url: endpoints.monthlyreportList+`/${data.user_id}/${data.month_pick}`,
        // url: endpoints.monthlyreportList,
        // data: data
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getMonthlyreportListSuccess(response.data));
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
        yield put(getMonthlyreportListFailed(message));
    }
}


export function* watchMonthlyreportList(): any {
    yield takeEvery(MONTHLYREPORT_LIST, MonthlyreportList);
}


function* authSaga(): any {
    yield all([
        fork(watchMonthlyreportList),
   
    ]);
}

export default authSaga;
