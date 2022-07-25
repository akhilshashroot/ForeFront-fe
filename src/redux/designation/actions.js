// @flow
import {
    DESIGNATION_LIST,
    DESIGNATION_LIST_SUCCESS,
    DESIGNATION_LIST_FAILED,
    DESIGNATION_ADD,
    DESIGNATION_ADD_SUCCESS,
    DESIGNATION_ADD_FAILED,
    DESIGNATION_UPDATE,
    DESIGNATION_UPDATE_SUCCESS,
    DESIGNATION_UPDATE_FAILED,
    DESIGNATION_DELETE,
    DESIGNATION_DELETE_SUCCESS,
    DESIGNATION_DELETE_FAILED
} from './constants';

type DesignationAction = { type: string, payload: {} | string };

export const getDesignationList = (): DesignationAction => ({
    type: DESIGNATION_LIST,
    payload: {},
});

export const getDesignationListSuccess = (designation: string): DesignationAction => ({
    type: DESIGNATION_LIST_SUCCESS,
    payload: designation,
});

export const getDesignationListFailed = (error: string): DesignationAction => ({
    type: DESIGNATION_LIST_FAILED,
    payload: error,
});

export const getDesignationAdd = (data:{}): DesignationAction => ({
    type: DESIGNATION_ADD,
    payload: data,
});

export const getDesignationAddSuccess = (designationAdd: string): DesignationAction => ({
    type: DESIGNATION_ADD_SUCCESS,
    payload: designationAdd,
});

export const getDesignationAddFailed = (error: string): DesignationAction => ({
    type: DESIGNATION_ADD_FAILED,
    payload: error,
});

export const getDesignationUpdate = (data:{}): DesignationAction => ({
    type: DESIGNATION_UPDATE,
    payload: data,
});

export const getDesignationUpdateSuccess = (designationUpdate: string): DesignationAction => ({
    type: DESIGNATION_UPDATE_SUCCESS,
    payload: designationUpdate,
});

export const getDesignationUpdateFailed = (error: string): DesignationAction => ({
    type: DESIGNATION_UPDATE_FAILED,
    payload: error,
});

export const getDesignationDelete = (id): DesignationAction => ({
    type: DESIGNATION_DELETE,
    payload: id,
});

export const getDesignationDeleteSuccess = (designationDelete: string): DesignationAction => ({
    type: DESIGNATION_DELETE_SUCCESS,
    payload: designationDelete,
});

export const getDesignationDeleteFailed = (error: string): DesignationAction => ({
    type: DESIGNATION_DELETE_FAILED,
    payload: error,
});
