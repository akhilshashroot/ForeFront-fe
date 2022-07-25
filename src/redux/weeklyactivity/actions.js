// @flow
import {
    WEEKLYACTIVITY_LIST,
    WEEKLYACTIVITY_LIST_SUCCESS,
    WEEKLYACTIVITY_LIST_FAILED,
    WEEKLYACTIVITY_ADD,
    WEEKLYACTIVITY_ADD_SUCCESS,
    WEEKLYACTIVITY_ADD_FAILED,
    WEEKLYJOBDES_ADD,
    WEEKLYJOBDES_ADD_SUCCESS,
    WEEKLYJOBDES_ADD_FAILED,
    WEEKLYACTIVITY_UPDATE,
    WEEKLYACTIVITY_UPDATE_SUCCESS,
    WEEKLYACTIVITY_UPDATE_FAILED,
    WEEKLYACTIVITY_DELETE,
    WEEKLYACTIVITY_DELETE_SUCCESS,
    WEEKLYACTIVITY_DELETE_FAILED
} from './constants';

type WeeklyactivityAction = { type: string, payload: {} | string };

export const getWeeklyactivityList = (data:{}): WeeklyactivityAction => ({
    type: WEEKLYACTIVITY_LIST,
    payload: data,
});

export const getWeeklyactivityListSuccess = (weeklyactivity: string): WeeklyactivityAction => ({
    type: WEEKLYACTIVITY_LIST_SUCCESS,
    payload: weeklyactivity,
});

export const getWeeklyactivityListFailed = (error: string): WeeklyactivityAction => ({
    type: WEEKLYACTIVITY_LIST_FAILED,
    payload: error,
});

export const getWeeklyactivityAdd = (data:{}): WeeklyactivityAction => ({
    type: WEEKLYACTIVITY_ADD,
    payload: data,
});

export const getWeeklyactivityAddSuccess = (weeklyactivityAdd: string): WeeklyactivityAction => ({
    type: WEEKLYACTIVITY_ADD_SUCCESS,
    payload: weeklyactivityAdd,
});

export const getWeeklyactivityAddFailed = (error: string): WeeklyactivityAction => ({
    type: WEEKLYACTIVITY_ADD_FAILED,
    payload: error,
});


export const getWeeklyjobdesAdd = (data:{}): WeeklyactivityAction => ({
    type: WEEKLYJOBDES_ADD,
    payload: data,
});

export const getWeeklyjobdesAddSuccess = (weeklyjobdesAdd: string): WeeklyactivityAction => ({
    type: WEEKLYJOBDES_ADD_SUCCESS,
    payload: weeklyjobdesAdd,
});

export const getWeeklyjobdesAddFailed = (error: string): WeeklyactivityAction => ({
    type: WEEKLYJOBDES_ADD_FAILED,
    payload: error,
});




export const getWeeklyactivityUpdate = (data:{}): WeeklyactivityAction => ({
    type: WEEKLYACTIVITY_UPDATE,
    payload: data,
});

export const getWeeklyactivityUpdateSuccess = (weeklyactivityUpdate: string): WeeklyactivityAction => ({
    type: WEEKLYACTIVITY_UPDATE_SUCCESS,
    payload: weeklyactivityUpdate,
});

export const getWeeklyactivityUpdateFailed = (error: string): WeeklyactivityAction => ({
    type: WEEKLYACTIVITY_UPDATE_FAILED,
    payload: error,
});

export const getWeeklyactivityDelete = (id): WeeklyactivityAction => ({
    type: WEEKLYACTIVITY_DELETE,
    payload: id,
});

export const getWeeklyactivityDeleteSuccess = (weeklyactivityDelete: string): WeeklyactivityAction => ({
    type: WEEKLYACTIVITY_DELETE_SUCCESS,
    payload: weeklyactivityDelete,
});

export const getWeeklyactivityDeleteFailed = (error: string): WeeklyactivityAction => ({
    type: WEEKLYACTIVITY_DELETE_FAILED,
    payload: error,
});
