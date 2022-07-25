// @flow
import {
    MONTHLYREPORT_LIST,
    MONTHLYREPORT_LIST_SUCCESS,
    MONTHLYREPORT_LIST_FAILED,


} from './constants';

type MonthlyreportAction = { type: string, payload: {} | string };

export const getMonthlyreportList = (data:{}): MonthlyreportAction => ({
    type: MONTHLYREPORT_LIST,
    payload: data,
});

export const getMonthlyreportListSuccess = (monthlyreport: string): MonthlyreportAction => ({
    type: MONTHLYREPORT_LIST_SUCCESS,
    payload: monthlyreport,
});

export const getMonthlyreportListFailed = (error: string): MonthlyreportAction => ({
    type: MONTHLYREPORT_LIST_FAILED,
    payload: error,
});

