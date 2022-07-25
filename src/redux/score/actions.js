// @flow
import {
    SCORE_LIST,
    SCORE_LIST_SUCCESS,
    SCORE_LIST_FAILED,
    SCORE_ADD,
    SCORE_ADD_SUCCESS,
    SCORE_ADD_FAILED,
    SCORE_UPDATE,
    SCORE_UPDATE_SUCCESS,
    SCORE_UPDATE_FAILED,
    SCORE_DELETE,
    SCORE_DELETE_SUCCESS,
    SCORE_DELETE_FAILED,
    SCORE_PEDATA,
    SCORE_PEDATA_SUCCESS,
    SCORE_PEDATA_FAILED,
    SCORE_PEHISTORY,
    SCORE_PEHISTORY_SUCCESS,
    SCORE_PEHISTORY_FAILED
} from './constants';

type ScoreAction = { type: string, payload: {} | string };

export const getScoreList = (): ScoreAction => ({
    type: SCORE_LIST,
    payload: {},
});

export const getScoreListSuccess = (score: string): ScoreAction => ({
    type: SCORE_LIST_SUCCESS,
    payload: score,
});

export const getScoreListFailed = (error: string): ScoreAction => ({
    type: SCORE_LIST_FAILED,
    payload: error,
});

export const getPEDataList = (data): ScoreAction => ({
    type: SCORE_PEDATA,
    payload: data,
});

export const getPEDataSuccess = (score: string): ScoreAction => ({
    type: SCORE_PEDATA_SUCCESS,
    payload: score,
});

export const getPEDataFailed = (error: string): ScoreAction => ({
    type: SCORE_PEDATA_FAILED,
    payload: error,
});

export const getPEHistoryList = (data): ScoreAction => ({
    type: SCORE_PEHISTORY,
    payload: data,
});

export const getPEHistorySuccess = (score: string): ScoreAction => ({
    type: SCORE_PEHISTORY_SUCCESS,
    payload: score,
});

export const getPEHistoryFailed = (error: string): ScoreAction => ({
    type: SCORE_PEHISTORY_FAILED,
    payload: error,
});

export const getScoreAdd = (data:{}): ScoreAction => ({
    type: SCORE_ADD,
    payload: data,
});

export const getScoreAddSuccess = (scoreAdd: string): ScoreAction => ({
    type: SCORE_ADD_SUCCESS,
    payload: scoreAdd,
});

export const getScoreAddFailed = (error: string): ScoreAction => ({
    type: SCORE_ADD_FAILED,
    payload: error,
});

export const getScoreUpdate = (data:{}): ScoreAction => ({
    type: SCORE_UPDATE,
    payload: data,
});

export const getScoreUpdateSuccess = (scoreUpdate: string): ScoreAction => ({
    type: SCORE_UPDATE_SUCCESS,
    payload: scoreUpdate,
});

export const getScoreUpdateFailed = (error: string): ScoreAction => ({
    type: SCORE_UPDATE_FAILED,
    payload: error,
});

export const getScoreDelete = (id): ScoreAction => ({
    type: SCORE_DELETE,
    payload: id,
});

export const getScoreDeleteSuccess = (scoreDelete: string): ScoreAction => ({
    type: SCORE_DELETE_SUCCESS,
    payload: scoreDelete,
});

export const getScoreDeleteFailed = (error: string): ScoreAction => ({
    type: SCORE_DELETE_FAILED,
    payload: error,
});
