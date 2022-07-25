// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SHIFTRECORD_LIST,SHIFTRECORD_VIEW } from './constants';

import {
    getShiftrecordListSuccess,
    getShiftrecordListFailed,
    getShiftrecordViewSuccess,
    getShiftrecordViewFailed,

} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const shiftrecordAddedSucsess = () => toast.success('Shiftrecord Added Successfully', { transition: Zoom });
const shiftrecordDeletedSuccess = () => toast.success('Shiftrecord Deleted Successfully', { transition: Zoom });
const shiftrecordUpdated = () => toast.info('Shiftrecord Updated Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* ShiftrecordList({payload:data}) {
   
  let team_id = data.team_id;
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        url: endpoints.shiftrecordList+`/`+team_id,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getShiftrecordListSuccess(response.data));
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
        yield put(getShiftrecordListFailed(message));
    }
}
function* ShiftrecordView({payload:data}) {

  let week_id = data.week_id;
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        url: endpoints.shiftrecordView+`/`+week_id,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getShiftrecordViewSuccess(response.data));
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
        yield put(getShiftrecordViewFailed(message));
    }
}



export function* watchShiftrecordList(): any {
    yield takeEvery(SHIFTRECORD_LIST, ShiftrecordList);
}
export function* watchShiftrecordView(): any {
    yield takeEvery(SHIFTRECORD_VIEW, ShiftrecordView);
}


function* authSaga(): any {
    yield all([
        fork(watchShiftrecordList),
        fork(watchShiftrecordView),
   
    ]);
}

export default authSaga;
