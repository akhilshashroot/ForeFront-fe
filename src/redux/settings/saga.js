// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, ToastContainer, Zoom } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {  SETTINGS_UPDATE } from './constants';

import {
    getSettingsUpdate,
    getSettingsUpdateSuccess,
    getSettingsUpdateFailed,
  
} from './actions';

import {getLoggedInUser} from '../../helpers/authUtils'
/**
 * Login the user
 * @param {*} payload - username and password
 */

 const settingsAddedSucsess = () => toast.success("Settings Added Successfully", { transition: Zoom })
 const settingsDeletedSuccess = () => toast.success("Settings Deleted Successfully", { transition: Zoom })
 const settingsUpdated = () => toast.info("Settings Updated Successfully", { transition: Zoom })
 const emptyAllFields = () => toast.warning("Please Fill All Fields", { transition: Zoom })
 const WarnFields = (msg) => toast.error(msg, { transition: Zoom })



// Settings Update

function* SettingsUpdate({ payload: data }) {
  
    const user = getLoggedInUser()

    let options = {
        headers: {
            'Content-Type': 'application/json',
              Authorization: "Bearer "+user.token,
        },
        method: 'PUT',
        url: endpoints.settingsUpdate +"/"+ user.id,
        data: data
    };


    try {
        const response = yield call(ApiCall, options);
        settingsUpdated();
        yield put(getSettingsUpdateSuccess(response.data));
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
                WarnFields(message);
        }
        yield put(getSettingsUpdateFailed(message));
    }
}

// Settings Delete





export function* watchSettingsUpdate(): any {
    yield takeEvery(SETTINGS_UPDATE, SettingsUpdate);
}



function* authSaga(): any {
    yield all([ fork(watchSettingsUpdate)]);
}

export default authSaga;