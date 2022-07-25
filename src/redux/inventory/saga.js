// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { INVENTORY_LIST, INVENTORY_ADD, INVENTORY_UPDATE, INVENTORY_DELETE } from './constants';

import {
    getInventoryListSuccess,
    getInventoryListFailed,
    getInventoryAddSuccess,
    getInventoryAddFailed,
    getInventoryUpdateSuccess,
    getInventoryUpdateFailed,
    getInventoryDeleteSuccess,
    getInventoryDeleteFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const inventoryAddedSucsess = () => toast.success('Inventory Added Successfully', { transition: Zoom });
const inventoryDeletedSuccess = () => toast.success('Inventory Deleted Successfully', { transition: Zoom });
const inventoryUpdated = () => toast.info('Inventory Updated Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* InventoryList  ({payload : data}){
    const user = getLoggedInUser();
    let rolenum = getLoggedInUser().role_number;

 
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,          
            
        },

      

        method: 'GET',
        url: endpoints.inventoryList+`?role=`+rolenum,   
        
    };


    try {
        const response = yield call(ApiCall, options);

        yield put(getInventoryListSuccess(response.data));
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
        yield put(getInventoryListFailed(message));
    }
}

// Inventory Add

function* InventoryAdd({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.inventoryAdd,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        inventoryAddedSucsess();
        yield put(getInventoryAddSuccess(response.data));
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
        yield put(getInventoryAddFailed(message));
    }
}

// Inventory Update

function* InventoryUpdate({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'PUT',
        url: endpoints.inventoryUpdate + '/' + (data && data.dep_id),
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        inventoryUpdated();
        yield put(getInventoryUpdateSuccess(response.data));
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
        yield put(getInventoryUpdateFailed(message));
    }
}

// Inventory Delete

function* InventoryDelete({ payload: id }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'DELETE',
        url: endpoints.inventoryDelete + '/' + id,
    };

    try {
        const response = yield call(ApiCall, options);
        inventoryDeletedSuccess();
        yield put(getInventoryDeleteSuccess(response.data));
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
        yield put(getInventoryDeleteFailed(message));
    }
}

export function* watchInventoryList(): any {
    yield takeEvery(INVENTORY_LIST, InventoryList);
}
export function* watchInventoryAdd(): any {
    yield takeEvery(INVENTORY_ADD, InventoryAdd);
}
export function* watchInventoryUpdate(): any {
    yield takeEvery(INVENTORY_UPDATE, InventoryUpdate);
}
export function* watchInventoryDelete(): any {
    yield takeEvery(INVENTORY_DELETE, InventoryDelete);
}

function* authSaga(): any {
    yield all([
        fork(watchInventoryList),
        fork(watchInventoryAdd),
        fork(watchInventoryUpdate),
        fork(watchInventoryDelete),
    ]);
}

export default authSaga;
