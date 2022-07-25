// @flow
import {
    REQUEST_LIST,
    REQUEST_LIST_SUCCESS,
    REQUEST_LIST_FAILED,    
    REQUEST_APPROVE,
    REQUEST_APPROVE_SUCCESS,
    REQUEST_APPROVE_FAILED,
    REQUEST_REJECT,
    REQUEST_REJECT_SUCCESS,
    REQUEST_REJECT_FAILED,
    REQUEST_DELETE,
    REQUEST_DELETE_SUCCESS,
    REQUEST_DELETE_FAILED
} from './constants';

type RequestAction = { type: string, payload: {} | string };

export const getRequestList = (): RequestAction => ({
    type: REQUEST_LIST,
    payload: {},
});

export const getRequestListSuccess = (request: string): RequestAction => ({
    type: REQUEST_LIST_SUCCESS,
    payload: request,
});

export const getRequestListFailed = (error: string): RequestAction => ({
    type: REQUEST_LIST_FAILED,
    payload: error,
});


export const getRequestApprove = (id): RequestAction => ({
    type: REQUEST_APPROVE,
    payload: id,
});

export const getRequestApproveSuccess = (requestApprove: string): RequestAction => ({
    type: REQUEST_APPROVE_SUCCESS,
    payload: requestApprove,
});

export const getRequestApproveFailed = (error: string): RequestAction => ({
    type: REQUEST_APPROVE_FAILED,
    payload: error,
});



export const getRequestReject = (id): RequestAction => ({
    type: REQUEST_REJECT,
    payload: id,
});

export const getRequestRejectSuccess = (requestReject: string): RequestAction => ({
    type: REQUEST_REJECT_SUCCESS,
    payload: requestReject,
});

export const getRequestRejectFailed = (error: string): RequestAction => ({
    type: REQUEST_REJECT_FAILED,
    payload: error,
});


export const getRequestDelete = (id): RequestAction => ({
    type: REQUEST_DELETE,
    payload: id,
});

export const getRequestDeleteSuccess = (requestDelete: string): RequestAction => ({
    type: REQUEST_DELETE_SUCCESS,
    payload: requestDelete,
});

export const getRequestDeleteFailed = (error: string): RequestAction => ({
    type: REQUEST_DELETE_FAILED,
    payload: error,
});
