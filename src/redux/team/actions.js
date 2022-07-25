// @flow
import {
    TEAM_LIST,
    TEAM_LIST_SUCCESS,
    TEAM_LIST_FAILED,
    TEAM_ADD,
    TEAM_ADD_SUCCESS,
    TEAM_ADD_FAILED,
    TEAM_UPDATE,
    TEAM_UPDATE_SUCCESS,
    TEAM_UPDATE_FAILED,
    TEAM_DELETE,
    TEAM_DELETE_SUCCESS,
    TEAM_DELETE_FAILED
} from './constants';

type TeamAction = { type: string, payload: {} | string };

export const getTeamList = (): TeamAction => ({
    type: TEAM_LIST,
    payload: {},
});

export const getTeamListSuccess = (team: string): TeamAction => ({
    type: TEAM_LIST_SUCCESS,
    payload: team,
});

export const getTeamListFailed = (error: string): TeamAction => ({
    type: TEAM_LIST_FAILED,
    payload: error,
});

export const getTeamAdd = (data:{}): TeamAction => ({
    type: TEAM_ADD,
    payload: data,
});

export const getTeamAddSuccess = (teamAdd: string): TeamAction => ({
    type: TEAM_ADD_SUCCESS,
    payload: teamAdd,
});

export const getTeamAddFailed = (error: string): TeamAction => ({
    type: TEAM_ADD_FAILED,
    payload: error,
});

export const getTeamUpdate = (data:{}): TeamAction => ({
    type: TEAM_UPDATE,
    payload: data,
});

export const getTeamUpdateSuccess = (teamUpdate: string): TeamAction => ({
    type: TEAM_UPDATE_SUCCESS,
    payload: teamUpdate,
});

export const getTeamUpdateFailed = (error: string): TeamAction => ({
    type: TEAM_UPDATE_FAILED,
    payload: error,
});

export const getTeamDelete = (id): TeamAction => ({
    type: TEAM_DELETE,
    payload: id,
});

export const getTeamDeleteSuccess = (teamDelete: string): TeamAction => ({
    type: TEAM_DELETE_SUCCESS,
    payload: teamDelete,
});

export const getTeamDeleteFailed = (error: string): TeamAction => ({
    type: TEAM_DELETE_FAILED,
    payload: error,
});
