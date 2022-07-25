// @flow
import {
    TASKER_LIST,
    TASKER_LIST_SUCCESS,
    TASKER_LIST_FAILED,
    TASKER_ADD,
    TASKER_ADD_SUCCESS,
    TASKER_ADD_FAILED,
    TASKER_UPDATE,
    TASKER_UPDATE_SUCCESS,
    TASKER_UPDATE_FAILED,
    TASKER_DELETE,
    TASKER_DELETE_SUCCESS,
    TASKER_DELETE_FAILED,
    TASKER_COMMENT,
    TASKER_COMMENT_FAILED,
    TASKER_COMMENT_SUCCESS
} from './constants';

type TaskerAction = { type: string, payload: {} | string };

export const getTaskerList = (data:{}):  TaskerAction => ({
    type: TASKER_LIST,
    payload: data,
});

export const getTaskerListSuccess = (tasker: string): TaskerAction => ({
    type: TASKER_LIST_SUCCESS,
    payload: tasker,
});

export const getTaskerListFailed = (error: string): TaskerAction => ({
    type: TASKER_LIST_FAILED,
    payload: error,
});

export const getTaskerAdd = (data:{}): TaskerAction => ({
    type: TASKER_ADD,
    payload: data,
});

export const getTaskerAddSuccess = (taskerAdd: string): TaskerAction => ({
    type: TASKER_ADD_SUCCESS,
    payload: taskerAdd,
});

export const getTaskerAddFailed = (error: string): TaskerAction => ({
    type: TASKER_ADD_FAILED,
    payload: error,
});

export const getTaskerUpdate = (data:{}): TaskerAction => ({
    type: TASKER_UPDATE,
    payload: data,
});

export const getTaskerUpdateSuccess = (taskerUpdate: string): TaskerAction => ({
    type: TASKER_UPDATE_SUCCESS,
    payload: taskerUpdate,
});

export const getTaskerUpdateFailed = (error: string): TaskerAction => ({
    type: TASKER_UPDATE_FAILED,
    payload: error,
});

export const getTaskerDelete = (id): TaskerAction => ({
    type: TASKER_DELETE,
    payload: id,
});

export const getTaskerDeleteSuccess = (taskerDelete: string): TaskerAction => ({
    type: TASKER_DELETE_SUCCESS,
    payload: taskerDelete,
});

export const getTaskerDeleteFailed = (error: string): TaskerAction => ({
    type: TASKER_DELETE_FAILED,
    payload: error,
});


export const getTaskerAdminComment = (data:{}): TaskerAction => ({
    type: TASKER_COMMENT,
    payload: data,
});

export const getTaskerAdminCommentSuccess = (taskerAdminComment: string): TaskerAction => ({
    type: TASKER_COMMENT_SUCCESS,
    payload: taskerAdminComment,
});

export const getTaskerAdminCommentFailed = (error: string): TaskerAction => ({
    type: TASKER_COMMENT_FAILED,
    payload: error,
});
