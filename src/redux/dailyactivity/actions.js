// @flow
import {
    DAILYACTIVITY_LIST,
    DAILYACTIVITY_LIST_SUCCESS,
    DAILYACTIVITY_LIST_FAILED,
    DAILYACTIVITY_ADD,
    DAILYACTIVITY_ADD_SUCCESS,
    DAILYACTIVITY_ADD_FAILED,
    DAILYJOBDES_ADD,
    DAILYJOBDES_ADD_SUCCESS,
    DAILYJOBDES_ADD_FAILED,
    DAILYACTIVITY_UPDATE,
    DAILYACTIVITY_UPDATE_SUCCESS,
    DAILYACTIVITY_UPDATE_FAILED,
    DAILYACTIVITY_DELETE,
    DAILYACTIVITY_DELETE_SUCCESS,
    DAILYACTIVITY_DELETE_FAILED
} from './constants';

type DailyactivityAction = { type: string, payload: {} | string };

export const getDailyactivityList = (data:{}): DailyactivityAction => ({
    type: DAILYACTIVITY_LIST,
    payload: data,
});

export const getDailyactivityListSuccess = (dailyactivity: string): DailyactivityAction => ({
    type: DAILYACTIVITY_LIST_SUCCESS,
    payload: dailyactivity,
});

export const getDailyactivityListFailed = (error: string): DailyactivityAction => ({
    type: DAILYACTIVITY_LIST_FAILED,
    payload: error,
});

export const getDailyactivityAdd = (data:{}): DailyactivityAction => ({
    type: DAILYACTIVITY_ADD,
    payload: data,
});

export const getDailyactivityAddSuccess = (dailyactivityAdd: string): DailyactivityAction => ({
    type: DAILYACTIVITY_ADD_SUCCESS,
    payload: dailyactivityAdd,
});

export const getDailyactivityAddFailed = (error: string): DailyactivityAction => ({
    type: DAILYACTIVITY_ADD_FAILED,
    payload: error,
});


export const getDailyjobdesAdd = (data:{}): DailyactivityAction => ({
    type: DAILYJOBDES_ADD,
    payload: data,
});

export const getDailyjobdesAddSuccess = (dailyjobdesAdd: string): DailyactivityAction => ({
    type: DAILYJOBDES_ADD_SUCCESS,
    payload: dailyjobdesAdd,
});

export const getDailyjobdesAddFailed = (error: string): DailyactivityAction => ({
    type: DAILYJOBDES_ADD_FAILED,
    payload: error,
});




export const getDailyactivityUpdate = (data:{}): DailyactivityAction => ({
    type: DAILYACTIVITY_UPDATE,
    payload: data,
});

export const getDailyactivityUpdateSuccess = (dailyactivityUpdate: string): DailyactivityAction => ({
    type: DAILYACTIVITY_UPDATE_SUCCESS,
    payload: dailyactivityUpdate,
});

export const getDailyactivityUpdateFailed = (error: string): DailyactivityAction => ({
    type: DAILYACTIVITY_UPDATE_FAILED,
    payload: error,
});

export const getDailyactivityDelete = (id): DailyactivityAction => ({
    type: DAILYACTIVITY_DELETE,
    payload: id,
});

export const getDailyactivityDeleteSuccess = (dailyactivityDelete: string): DailyactivityAction => ({
    type: DAILYACTIVITY_DELETE_SUCCESS,
    payload: dailyactivityDelete,
});

export const getDailyactivityDeleteFailed = (error: string): DailyactivityAction => ({
    type: DAILYACTIVITY_DELETE_FAILED,
    payload: error,
});
