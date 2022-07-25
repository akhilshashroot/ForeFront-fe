// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';

import { TEAM_LIST, TEAM_ADD, TEAM_UPDATE, TEAM_DELETE } from './constants';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    getTeamListSuccess,
    getTeamListFailed,
    getTeamAddSuccess,
    getTeamAddFailed,
    getTeamUpdateSuccess,
    getTeamUpdateFailed,
    getTeamDeleteSuccess,
    getTeamDeleteFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const teamAddedSucsess = () => toast.success('Team Added Successfully', { transition: Zoom });
const teamDeletedSuccess = () => toast.success('Team Deleted Successfully', { transition: Zoom });
const teamUpdated = () => toast.info('Team Updated Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* TeamList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        url: endpoints.teamList,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getTeamListSuccess(response.data));
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
        yield put(getTeamListFailed(message));
    }
}

// Team Add

function* TeamAdd({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.teamAdd,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        teamAddedSucsess();
        yield put(getTeamAddSuccess(response.data));
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
        yield put(getTeamAddFailed(message));
    }
}

// Team Update

function* TeamUpdate({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'PUT',
        url: endpoints.teamUpdate + '/' + (data && data.team_id),
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        teamUpdated();
        yield put(getTeamUpdateSuccess(response.data));
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
        yield put(getTeamUpdateFailed(message));
    }
}

// Team Delete

function* TeamDelete({ payload: id }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'DELETE',
        url: endpoints.teamDelete + '/' + id,
    };

    try {
        const response = yield call(ApiCall, options);
        teamDeletedSuccess();
        yield put(getTeamDeleteSuccess(response.data));
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
        yield put(getTeamDeleteFailed(message));
    }
}

export function* watchTeamList(): any {
    yield takeEvery(TEAM_LIST, TeamList);
}
export function* watchTeamAdd(): any {
    yield takeEvery(TEAM_ADD, TeamAdd);
}
export function* watchTeamUpdate(): any {
    yield takeEvery(TEAM_UPDATE, TeamUpdate);
}
export function* watchTeamDelete(): any {
    yield takeEvery(TEAM_DELETE, TeamDelete);
}

function* authSaga(): any {
    yield all([fork(watchTeamList), fork(watchTeamAdd), fork(watchTeamUpdate), fork(watchTeamDelete)]);
}

export default authSaga;
