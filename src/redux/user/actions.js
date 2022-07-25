// @flow
import {
    USER_LIST,
    USER_LIST_SUCCESS,
    USER_LIST_FAILED,
    USER_ADD,
    USER_ADD_SUCCESS,
    USER_ADD_FAILED,
    USER_UPDATE,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAILED,
    USER_DELETE,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAILED
} from './constants';

type UserAction = { type: string, payload: {} | string };

export const getUserList = (): UserAction => ({
    type: USER_LIST,
    payload: {},
});

export const getUserListSuccess = (user: string): UserAction => ({
    type: USER_LIST_SUCCESS,
    payload: user,
});

export const getUserListFailed = (error: string): UserAction => ({
    type: USER_LIST_FAILED,
    payload: error,
});

export const getUserAdd = (data:{}): UserAction => ({
    type: USER_ADD,
    payload: data,
});

export const getUserAddSuccess = (userAdd: string): UserAction => ({
    type: USER_ADD_SUCCESS,
    payload: userAdd,
});

export const getUserAddFailed = (error: string): UserAction => ({
    type: USER_ADD_FAILED,
    payload: error,
});

export const getUserUpdate = (data:{}): UserAction => ({
    type: USER_UPDATE,
    payload: data,
});

export const getUserUpdateSuccess = (userUpdate: string): UserAction => ({
    type: USER_UPDATE_SUCCESS,
    payload: userUpdate,
});

export const getUserUpdateFailed = (error: string): UserAction => ({
    type: USER_UPDATE_FAILED,
    payload: error,
});

export const getUserDelete = (id): UserAction => ({
    type: USER_DELETE,
    payload: id,
});

export const getUserDeleteSuccess = (userDelete: string): UserAction => ({
    type: USER_DELETE_SUCCESS,
    payload: userDelete,
});

export const getUserDeleteFailed = (error: string): UserAction => ({
    type: USER_DELETE_FAILED,
    payload: error,
});
