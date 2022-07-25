// @flow
import {
    PROJECT_LIST,
    PROJECT_LIST_SUCCESS,
    PROJECT_LIST_FAILED,
    PROJECT_ADD,
    PROJECT_ADD_SUCCESS,
    PROJECT_ADD_FAILED,
    PROJECT_UPDATE,
    PROJECT_UPDATE_SUCCESS,
    PROJECT_UPDATE_FAILED,
    PROJECT_DELETE,
    PROJECT_DELETE_SUCCESS,
    PROJECT_DELETE_FAILED
} from './constants';

type ProjectAction = { type: string, payload: {} | string };

export const getProjectList = (): ProjectAction => ({
    type: PROJECT_LIST,
    payload: {},
});

export const getProjectListSuccess = (project: string): ProjectAction => ({
    type: PROJECT_LIST_SUCCESS,
    payload: project,
});

export const getProjectListFailed = (error: string): ProjectAction => ({
    type: PROJECT_LIST_FAILED,
    payload: error,
});

export const getProjectAdd = (data:{}): ProjectAction => ({
    type: PROJECT_ADD,
    payload: data,
});

export const getProjectAddSuccess = (projectAdd: string): ProjectAction => ({
    type: PROJECT_ADD_SUCCESS,
    payload: projectAdd,
});

export const getProjectAddFailed = (error: string): ProjectAction => ({
    type: PROJECT_ADD_FAILED,
    payload: error,
});

export const getProjectUpdate = (data:{}): ProjectAction => ({
    type: PROJECT_UPDATE,
    payload: data,
});

export const getProjectUpdateSuccess = (projectUpdate: string): ProjectAction => ({
    type: PROJECT_UPDATE_SUCCESS,
    payload: projectUpdate,
});

export const getProjectUpdateFailed = (error: string): ProjectAction => ({
    type: PROJECT_UPDATE_FAILED,
    payload: error,
});

export const getProjectDelete = (id): ProjectAction => ({
    type: PROJECT_DELETE,
    payload: id,
});

export const getProjectDeleteSuccess = (projectDelete: string): ProjectAction => ({
    type: PROJECT_DELETE_SUCCESS,
    payload: projectDelete,
});

export const getProjectDeleteFailed = (error: string): ProjectAction => ({
    type: PROJECT_DELETE_FAILED,
    payload: error,
});
