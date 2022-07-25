// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NOTIFICATION_LIST } from './constants';

import {
    getNotificationListSuccess,
    getNotificationListFailed,

} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const notificationAddedSucsess = () => toast.success('Notification Added Successfully', { transition: Zoom });
const notificationDeletedSuccess = () => toast.success('Notification Deleted Successfully', { transition: Zoom });
const notificationUpdated = () => toast.info('Notification Updated Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* NotificationList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        url: endpoints.notificationList,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getNotificationListSuccess(response.data));
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
        yield put(getNotificationListFailed(message));
    }
}


export function* watchNotificationList(): any {
    yield takeEvery(NOTIFICATION_LIST, NotificationList);
}


function* authSaga(): any {
    yield all([
        fork(watchNotificationList),
   
    ]);
}

export default authSaga;
