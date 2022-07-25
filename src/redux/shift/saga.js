// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SHIFT_LIST, SHIFT_ADD, SHIFT_UPDATE, SHIFT_DELETE, TEAM_MEMBERS_LIST, SHIFT_CREATE, GET_WEEKS_LIST, GET_PREVIOUS_SHIFT, SHIFT_EDIT, SHIFT_SWAP, SWAP_DELETE, SHIFT_COMMENT_EDIT, SHIFT_PREVIEW, FIRST_SHIFT_SWAP, FIRST_SHIFT_EDIT } from './constants';

import {
    getShiftListSuccess,
    getShiftListFailed,
    getShiftAddSuccess,
    getShiftAddFailed,
    getShiftUpdateSuccess,
    getShiftUpdateFailed,
    getShiftDeleteSuccess,
    getShiftDeleteFailed,
    getTeamMembersListSuccess,
    getTeamMembersListFailed,
    getShiftCreateSuccess,
    getShiftCreateFailed,
    getWeeksListSuccess,
    getWeeksListFailed,
    getPreviousShiftSuccess,
    getPreviousShiftFailed,
    getShiftEditSuccess,
    getShiftEditFailed,
    getShiftSwapSuccess,
    getShiftSwapFailed,
    getSwapDeleteSuccess,
    getSwapDeleteFailed,
    getShiftCommentSuccess,
    getShiftCommentFailed,
    getPreviewShiftSuccess,
    getPreviewShiftFailed,
    getFirstShiftSwapSuccess,
    getFirstShiftSwapFailed,
    getFirstShiftEditSuccess,
    getFirstShiftEditFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const departmentAddedSucsess = () => toast.success('Shift Added Successfully', { transition: Zoom });
const shiftCreateSucsess = () => toast.success('Shift Created Successfully', { transition: Zoom });
const shiftEditSucsess = () => toast.success('Shift Edited Successfully', { transition: Zoom });
const shiftSwapSucsess = () => toast.success('Shift Swapped Successfully', { transition: Zoom });
const shiftCommentUpdate = () => toast.success('Comment Updated Successfully', { transition: Zoom });
const SwapDeleteSucsess = () => toast.success('Swap Deleted Successfully', { transition: Zoom });
const departmentDeletedSuccess = () => toast.success('Shift Deleted Successfully', { transition: Zoom });
const departmentUpdated = () => toast.info('Shift Updated Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });


//Get Team Members List
function* TeamMembersList({payload:data}) {
    
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        url: endpoints.teamMembers + '/' + data.teamid,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getTeamMembersListSuccess(response.data));
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
        yield put(getTeamMembersListFailed(message));
    }
}


// Shift Create
function* ShiftCreate({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.createShift,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        if(response.data.status){
            shiftCreateSucsess();
            yield put(getShiftCreateSuccess(response.data));
        }
        else{
            WarnFields(response.data.message);
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
        yield put(getShiftCreateFailed(message));
    }
}

//Get Weeks List
function* getWeeksList(id) {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        url: endpoints.getWeeks + '/' + id.payload,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getWeeksListSuccess(response.data));
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
        yield put(getWeeksListFailed(message));
    }
}

//Get Previous Shift
function* getPreviousShift(id) {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        url: endpoints.getPreviousShift + '/' + id.payload + '/' + getLoggedInUser().id,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getPreviousShiftSuccess(response.data));
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
        yield put(getPreviousShiftFailed(message));
    }
}


// Shift Edit
function* ShiftEdit({ payload: data }) {
    let send={
        "user_id":getLoggedInUser().id,
        "users":data.users 
    }
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'PUT',
        url: endpoints.editShift + '/' + data.shiftId,
        data: send,
    };

    try {
        const response = yield call(ApiCall, options);

        if(response.data.status){
            shiftEditSucsess();
            yield put(getShiftEditSuccess(response.data));
        }
        else{
            WarnFields(response.data.message);
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
        yield put(getShiftEditFailed(message));
    }
}

// First Shift Edit
function* FirstShiftEdit({ payload: data }) {
    let send={
        "user_id":getLoggedInUser().id,
        "users":data.users 
    }
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'PUT',
        url: endpoints.editShift + '/' + data.shiftId,
        data: send,
    };

    try {
        const response = yield call(ApiCall, options);

        if(response.data.status){
            shiftEditSucsess();
            yield put(getFirstShiftEditSuccess(response.data));
        }
        else{
            WarnFields(response.data.message);
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
        yield put(getFirstShiftEditFailed(message));
    }
}

// Shift Swap
function* ShiftSwap({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.swapShift,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        shiftSwapSucsess();
        yield put(getShiftSwapSuccess(response.data));
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
        yield put(getShiftSwapFailed(message));
    }
}

//First Shift Swap
function* FirstShiftSwap({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.swapShift,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        shiftSwapSucsess();
        yield put(getFirstShiftSwapSuccess(response.data));
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
        yield put(getFirstShiftSwapFailed(message));
    }
}



// Shift Delete
function* SwapDelete({ payload: data }) {
    console.log("saga",data)
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'DELETE',
        url: endpoints.swapDelete + "/" + data + "/" + getLoggedInUser().id,
        // data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        if(response.data.status){
            SwapDeleteSucsess();
            yield put(getSwapDeleteSuccess(response.data));
        }
        else{
            WarnFields(response.data.message);
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
        yield put(getSwapDeleteFailed(message));
    }
}


// Shift Add

function* ShiftAdd({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.departmentAdd,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        departmentAddedSucsess();
        yield put(getShiftAddSuccess(response.data));
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
        yield put(getShiftAddFailed(message));
    }
}

// Shift Update

function* ShiftUpdate({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'PUT',
        url: endpoints.departmentUpdate + '/' + (data && data.dep_id),
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        departmentUpdated();
        yield put(getShiftUpdateSuccess(response.data));
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
        yield put(getShiftUpdateFailed(message));
    }
}

// Shift Delete

function* ShiftDelete({ payload: id }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'DELETE',
        url: endpoints.departmentDelete + '/' + id,
    };

    try {
        const response = yield call(ApiCall, options);
        departmentDeletedSuccess();
        yield put(getShiftDeleteSuccess(response.data));
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
        yield put(getShiftDeleteFailed(message));
    }
}


// Shift Comment
function* ShiftCommentUpdate({ payload: data }) {
    let send={
        comment:data.comment
    }
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.swapComment + "/" + data.id,
        data: send,
    };

    try {
        const response = yield call(ApiCall, options);
        shiftCommentUpdate();
        yield put(getShiftCommentSuccess(response.data));
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
        yield put(getShiftCommentFailed(message));
    }
}




//Preview Shift
function* getPreviewShift(id) {
    console.log(id)
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'GET',
        url: endpoints.loadShifts + '/' + id.payload + "/" + user.id,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getPreviewShiftSuccess(response.data));
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
        yield put(getPreviewShiftFailed(message));
    }
}





export function* watchTeamMembersList(): any {
    yield takeEvery(TEAM_MEMBERS_LIST, TeamMembersList);
}
export function* watchShiftCreate(): any {
    yield takeEvery(SHIFT_CREATE, ShiftCreate);
}
export function* watchWeeksList(): any {
    yield takeEvery(GET_WEEKS_LIST, getWeeksList);
}
export function* watchPreviousShift(): any {
    yield takeEvery(GET_PREVIOUS_SHIFT, getPreviousShift);
}
export function* watchShiftEdit(): any {
    yield takeEvery(SHIFT_EDIT, ShiftEdit);
}
export function* watchFirstShiftEdit(): any {
    yield takeEvery(FIRST_SHIFT_EDIT, FirstShiftEdit);
}
export function* watchShiftSwap(): any {
    yield takeEvery(SHIFT_SWAP, ShiftSwap);
}
export function* watchSwapDelete(): any {
    yield takeEvery(SWAP_DELETE, SwapDelete);
}
export function* watchShiftAdd(): any {
    yield takeEvery(SHIFT_ADD, ShiftAdd);
}
export function* watchShiftUpdate(): any {
    yield takeEvery(SHIFT_UPDATE, ShiftUpdate);
}
export function* watchShiftDelete(): any {
    yield takeEvery(SHIFT_DELETE, ShiftDelete);
}
export function* watchShiftCommentUpdate(): any {
    yield takeEvery(SHIFT_COMMENT_EDIT, ShiftCommentUpdate);
}
export function* watchPreviewShift(): any {
    yield takeEvery(SHIFT_PREVIEW, getPreviewShift);
}
export function* watchFirstSwapShift(): any {
    yield takeEvery(FIRST_SHIFT_SWAP, FirstShiftSwap);
}

function* authSaga(): any {
    yield all([
        fork(watchTeamMembersList),
        fork(watchShiftCreate),
        fork(watchWeeksList),
        fork(watchPreviousShift),
        fork(watchShiftEdit),
        fork(watchShiftSwap),
        fork(watchSwapDelete),
        fork(watchShiftUpdate),
        fork(watchShiftDelete),
        fork(watchShiftCommentUpdate),
        fork(watchPreviewShift),
        fork(watchFirstSwapShift),
        fork(watchFirstShiftEdit),
    ]);
}

export default authSaga;
