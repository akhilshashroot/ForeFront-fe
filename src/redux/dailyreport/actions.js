// @flow
import {
    DAILYREPORT_LIST,
    DAILYREPORT_LIST_SUCCESS,
    DAILYREPORT_LIST_FAILED,


} from './constants';

type DailyreportAction = { type: string, payload: {} | string };

export const getDailyreportList = (data:{}): DailyreportAction => ({
    type: DAILYREPORT_LIST,
    payload: data,
});

export const getDailyreportListSuccess = (dailyreport: string): DailyreportAction => ({
    type: DAILYREPORT_LIST_SUCCESS,
    payload: dailyreport,
});

export const getDailyreportListFailed = (error: string): DailyreportAction => ({
    type: DAILYREPORT_LIST_FAILED,
    payload: error,
});

