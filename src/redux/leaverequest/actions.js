// @flow
import {
    LEAVEREQUEST_LIST,
    LEAVEREQUEST_LIST_SUCCESS,
    LEAVEREQUEST_LIST_FAILED,
    LEAVEREQUEST_ADD,
    LEAVEREQUEST_ADD_SUCCESS,
    LEAVEREQUEST_ADD_FAILED,
    LEAVEREQUEST_UPDATE,
    LEAVEREQUEST_UPDATE_SUCCESS,
    LEAVEREQUEST_UPDATE_FAILED,
    LEAVEREQUEST_DELETE,
    LEAVEREQUEST_DELETE_SUCCESS,
    LEAVEREQUEST_DELETE_FAILED,
    LEAVEREQUEST_TYPE_LIST,
    LEAVEREQUEST_TYPE_LIST_SUCCESS,
    LEAVEREQUEST_TYPE_LIST_FAILED
} from './constants';

type LeaverequestAction = { type: string, payload: {} | string };

export const getLeaverequestList = (): LeaverequestAction => ({
    type: LEAVEREQUEST_LIST,
    payload: {},
});

export const getLeaverequestListSuccess = (leaverequest: string): LeaverequestAction => ({
    type: LEAVEREQUEST_LIST_SUCCESS,
    payload: leaverequest,
});

export const getLeaverequestListFailed = (error: string): LeaverequestAction => ({
    type: LEAVEREQUEST_LIST_FAILED,
    payload: error,
});

export const getLeaverequestTypeList = (): LeaverequestAction => ({
    type: LEAVEREQUEST_TYPE_LIST,
    payload: {},
});

export const getLeaverequestTypeListSuccess = (leaverequestList: string): LeaverequestAction => ({
    type: LEAVEREQUEST_TYPE_LIST_SUCCESS,
    payload: leaverequestList,
});

export const getLeaverequestTypeListFailed = (error: string): LeaverequestAction => ({
    type: LEAVEREQUEST_TYPE_LIST_FAILED,
    payload: error,
});

export const getLeaverequestAdd = (data:{}): LeaverequestAction => ({
    type: LEAVEREQUEST_ADD,
    payload: data,
});

export const getLeaverequestAddSuccess = (leaverequestAdd: string): LeaverequestAction => ({
    type: LEAVEREQUEST_ADD_SUCCESS,
    payload: leaverequestAdd,
});

export const getLeaverequestAddFailed = (error: string): LeaverequestAction => ({
    type: LEAVEREQUEST_ADD_FAILED,
    payload: error,
});

export const getLeaverequestUpdate = (data:{}): LeaverequestAction => ({
    type: LEAVEREQUEST_UPDATE,
    payload: data,
});

export const getLeaverequestUpdateSuccess = (leaverequestUpdate: string): LeaverequestAction => ({
    type: LEAVEREQUEST_UPDATE_SUCCESS,
    payload: leaverequestUpdate,
});

export const getLeaverequestUpdateFailed = (error: string): LeaverequestAction => ({
    type: LEAVEREQUEST_UPDATE_FAILED,
    payload: error,
});

export const getLeaverequestDelete = (id): LeaverequestAction => ({
    type: LEAVEREQUEST_DELETE,
    payload: id,
});

export const getLeaverequestDeleteSuccess = (leaverequestDelete: string): LeaverequestAction => ({
    type: LEAVEREQUEST_DELETE_SUCCESS,
    payload: leaverequestDelete,
});

export const getLeaverequestDeleteFailed = (error: string): LeaverequestAction => ({
    type: LEAVEREQUEST_DELETE_FAILED,
    payload: error,
});
