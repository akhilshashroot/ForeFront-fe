// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { INTERVIEW_LIST, INTERVIEW_ADD, INTERVIEW_UPDATE, INTERVIEW_DELETE, COMMENT_ADD } from './constants';

import {
    getInterviewListSuccess,
    getInterviewListFailed,
    getInterviewAddSuccess,
    getInterviewAddFailed,
    getInterviewUpdateSuccess,
    getInterviewUpdateFailed,
    getInterviewDeleteSuccess,
    getInterviewDeleteFailed,
    getCommentAddSuccess,
    getCommentAddFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const interviewAddedSucsess = () => toast.success('Interview Added Successfully', { transition: Zoom });
const commentAddedSucsess = () => toast.success('Comment Added Successfully', { transition: Zoom });
const interviewDeletedSuccess = () => toast.success('Interview Deleted Successfully', { transition: Zoom });
const interviewUpdated = () => toast.info('Interview Updated Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* InterviewList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        url: endpoints.interviewList,
        // data: sendData
    };

    try {

        const response = yield call(ApiCall, options);

        yield put(getInterviewListSuccess(response.data));
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
        yield put(getInterviewListFailed(message));
    }
}

// Interview Add

function* InterviewAdd({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.interviewAdd,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        if(response.data.status===false){
            let message = response.data.message;
             WarnFields(message);
        }else{
            interviewAddedSucsess();
            yield put(getInterviewAddSuccess(response.data));
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
        yield put(getInterviewAddFailed(message));
    }
}

// Interview Update

function* InterviewUpdate({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.interviewUpdate + '/' + data.id,
        data: data.data,
    };

    try {
        const response = yield call(ApiCall, options);
        interviewUpdated();
        yield put(getInterviewUpdateSuccess(response.data));
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
        yield put(getInterviewUpdateFailed(message));
    }
}

// Interview Delete

function* InterviewDelete({ payload: id }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'DELETE',
        url: endpoints.interviewDelete + '/' + id,
    };

    try {
        const response = yield call(ApiCall, options);
        interviewDeletedSuccess();
        yield put(getInterviewDeleteSuccess(response.data));
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
        yield put(getInterviewDeleteFailed(message));
    }
}


// Comment Add

function* CommentAdd({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.taskerComment,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        if(response.data.status===false){
            let message = response.data.message;
             WarnFields(message);
        }else{
            commentAddedSucsess();
            yield put(getCommentAddSuccess(response.data));
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
        yield put(getCommentAddFailed(message));
    }
}

export function* watchInterviewList(): any {
    yield takeEvery(INTERVIEW_LIST, InterviewList);
}
export function* watchInterviewAdd(): any {
    yield takeEvery(INTERVIEW_ADD, InterviewAdd);
}
export function* watchInterviewUpdate(): any {
    yield takeEvery(INTERVIEW_UPDATE, InterviewUpdate);
}
export function* watchInterviewDelete(): any {
    yield takeEvery(INTERVIEW_DELETE, InterviewDelete);
}
export function* watchCommentAdd(): any {
    yield takeEvery(COMMENT_ADD, CommentAdd);
}

function* authSaga(): any {
    yield all([
        fork(watchInterviewList),
        fork(watchInterviewAdd),
        fork(watchInterviewUpdate),
        fork(watchInterviewDelete),
        fork(watchCommentAdd),
    ]);
}

export default authSaga;
