// @flow
import {
    WEEKLYREPORT_LIST,
    WEEKLYREPORT_LIST_SUCCESS,
    WEEKLYREPORT_LIST_FAILED,


} from './constants';

type WeeklyreportAction = { type: string, payload: {} | string };

export const getWeeklyreportList = (data:{}): WeeklyreportAction => ({
    type: WEEKLYREPORT_LIST,
    payload: data,
});

export const getWeeklyreportListSuccess = (weeklyreport: string): WeeklyreportAction => ({
    type: WEEKLYREPORT_LIST_SUCCESS,
    payload: weeklyreport,
});

export const getWeeklyreportListFailed = (error: string): WeeklyreportAction => ({
    type: WEEKLYREPORT_LIST_FAILED,
    payload: error,
});

