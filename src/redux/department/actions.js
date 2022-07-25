// @flow
import {
    DEPARTMENT_LIST,
    DEPARTMENT_LIST_SUCCESS,
    DEPARTMENT_LIST_FAILED,
    DEPARTMENT_ADD,
    DEPARTMENT_ADD_SUCCESS,
    DEPARTMENT_ADD_FAILED,
    DEPARTMENT_UPDATE,
    DEPARTMENT_UPDATE_SUCCESS,
    DEPARTMENT_UPDATE_FAILED,
    DEPARTMENT_DELETE,
    DEPARTMENT_DELETE_SUCCESS,
    DEPARTMENT_DELETE_FAILED
} from './constants';

type DepartmentAction = { type: string, payload: {} | string };

export const getDepartmentList = (): DepartmentAction => ({
    type: DEPARTMENT_LIST,
    payload: {},
});

export const getDepartmentListSuccess = (department: string): DepartmentAction => ({
    type: DEPARTMENT_LIST_SUCCESS,
    payload: department,
});

export const getDepartmentListFailed = (error: string): DepartmentAction => ({
    type: DEPARTMENT_LIST_FAILED,
    payload: error,
});

export const getDepartmentAdd = (data:{}): DepartmentAction => ({
    type: DEPARTMENT_ADD,
    payload: data,
});

export const getDepartmentAddSuccess = (departmentAdd: string): DepartmentAction => ({
    type: DEPARTMENT_ADD_SUCCESS,
    payload: departmentAdd,
});

export const getDepartmentAddFailed = (error: string): DepartmentAction => ({
    type: DEPARTMENT_ADD_FAILED,
    payload: error,
});

export const getDepartmentUpdate = (data:{}): DepartmentAction => ({
    type: DEPARTMENT_UPDATE,
    payload: data,
});

export const getDepartmentUpdateSuccess = (departmentUpdate: string): DepartmentAction => ({
    type: DEPARTMENT_UPDATE_SUCCESS,
    payload: departmentUpdate,
});

export const getDepartmentUpdateFailed = (error: string): DepartmentAction => ({
    type: DEPARTMENT_UPDATE_FAILED,
    payload: error,
});

export const getDepartmentDelete = (id): DepartmentAction => ({
    type: DEPARTMENT_DELETE,
    payload: id,
});

export const getDepartmentDeleteSuccess = (departmentDelete: string): DepartmentAction => ({
    type: DEPARTMENT_DELETE_SUCCESS,
    payload: departmentDelete,
});

export const getDepartmentDeleteFailed = (error: string): DepartmentAction => ({
    type: DEPARTMENT_DELETE_FAILED,
    payload: error,
});
