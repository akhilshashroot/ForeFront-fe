// @flow
import {
    WORKDATA_LIST,
    WORKDATA_LIST_SUCCESS,
    WORKDATA_LIST_FAILED,
    WORKDATA_ADD,
    WORKDATA_ADD_SUCCESS,
    WORKDATA_ADD_FAILED,
    WORKDATA_UPDATE,
    WORKDATA_UPDATE_SUCCESS,
    WORKDATA_UPDATE_FAILED,
    WORKDATA_DELETE,
    WORKDATA_DELETE_SUCCESS,
    WORKDATA_DELETE_FAILED
} from './constants';

type WorkdataAction = { type: string, payload: {} | string };

export const getWorkdataList = (): WorkdataAction => ({
    type: WORKDATA_LIST,
    payload: {},
});

export const getWorkdataListSuccess = (workdata: string): WorkdataAction => ({
    type: WORKDATA_LIST_SUCCESS,
    payload: workdata,
});

export const getWorkdataListFailed = (error: string): WorkdataAction => ({
    type: WORKDATA_LIST_FAILED,
    payload: error,
});

export const getWorkdataAdd = (data:{}): WorkdataAction => ({
    type: WORKDATA_ADD,
    payload: data,
});

export const getWorkdataAddSuccess = (workdataAdd: string): WorkdataAction => ({
    type: WORKDATA_ADD_SUCCESS,
    payload: workdataAdd,
});

export const getWorkdataAddFailed = (error: string): WorkdataAction => ({
    type: WORKDATA_ADD_FAILED,
    payload: error,
});

export const getWorkdataUpdate = (data:{}): WorkdataAction => ({
    type: WORKDATA_UPDATE,
    payload: data,
});

export const getWorkdataUpdateSuccess = (workdataUpdate: string): WorkdataAction => ({
    type: WORKDATA_UPDATE_SUCCESS,
    payload: workdataUpdate,
});

export const getWorkdataUpdateFailed = (error: string): WorkdataAction => ({
    type: WORKDATA_UPDATE_FAILED,
    payload: error,
});

export const getWorkdataDelete = (id): WorkdataAction => ({
    type: WORKDATA_DELETE,
    payload: id,
});

export const getWorkdataDeleteSuccess = (workdataDelete: string): WorkdataAction => ({
    type: WORKDATA_DELETE_SUCCESS,
    payload: workdataDelete,
});

export const getWorkdataDeleteFailed = (error: string): WorkdataAction => ({
    type: WORKDATA_DELETE_FAILED,
    payload: error,
});
