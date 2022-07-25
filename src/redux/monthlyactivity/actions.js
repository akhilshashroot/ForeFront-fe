// @flow
import {
    MONTHLYACTIVITY_LIST,
    MONTHLYACTIVITY_LIST_SUCCESS,
    MONTHLYACTIVITY_LIST_FAILED,
    MONTHLYACTIVITY_ADD,
    MONTHLYACTIVITY_ADD_SUCCESS,
    MONTHLYACTIVITY_ADD_FAILED,
    MONTHLYJOBDES_ADD,
    MONTHLYJOBDES_ADD_SUCCESS,
    MONTHLYJOBDES_ADD_FAILED,
    MONTHLYACTIVITY_UPDATE,
    MONTHLYACTIVITY_UPDATE_SUCCESS,
    MONTHLYACTIVITY_UPDATE_FAILED,
    MONTHLYACTIVITY_DELETE,
    MONTHLYACTIVITY_DELETE_SUCCESS,
    MONTHLYACTIVITY_DELETE_FAILED
} from './constants';

type MonthlyactivityAction = { type: string, payload: {} | string };

export const getMonthlyactivityList = (data:{}): MonthlyactivityAction => ({
    type: MONTHLYACTIVITY_LIST,
    payload: data,
});

export const getMonthlyactivityListSuccess = (monthlyactivity: string): MonthlyactivityAction => ({
    type: MONTHLYACTIVITY_LIST_SUCCESS,
    payload: monthlyactivity,
});

export const getMonthlyactivityListFailed = (error: string): MonthlyactivityAction => ({
    type: MONTHLYACTIVITY_LIST_FAILED,
    payload: error,
});

export const getMonthlyactivityAdd = (data:{}): MonthlyactivityAction => ({
    type: MONTHLYACTIVITY_ADD,
    payload: data,
});

export const getMonthlyactivityAddSuccess = (monthlyactivityAdd: string): MonthlyactivityAction => ({
    type: MONTHLYACTIVITY_ADD_SUCCESS,
    payload: monthlyactivityAdd,
});

export const getMonthlyactivityAddFailed = (error: string): MonthlyactivityAction => ({
    type: MONTHLYACTIVITY_ADD_FAILED,
    payload: error,
});


export const getMonthlyjobdesAdd = (data:{}): MonthlyactivityAction => ({
    type: MONTHLYJOBDES_ADD,
    payload: data,
});

export const getMonthlyjobdesAddSuccess = (monthlyjobdesAdd: string): MonthlyactivityAction => ({
    type: MONTHLYJOBDES_ADD_SUCCESS,
    payload: monthlyjobdesAdd,
});

export const getMonthlyjobdesAddFailed = (error: string): MonthlyactivityAction => ({
    type: MONTHLYJOBDES_ADD_FAILED,
    payload: error,
});




export const getMonthlyactivityUpdate = (data:{}): MonthlyactivityAction => ({
    type: MONTHLYACTIVITY_UPDATE,
    payload: data,
});

export const getMonthlyactivityUpdateSuccess = (monthlyactivityUpdate: string): MonthlyactivityAction => ({
    type: MONTHLYACTIVITY_UPDATE_SUCCESS,
    payload: monthlyactivityUpdate,
});

export const getMonthlyactivityUpdateFailed = (error: string): MonthlyactivityAction => ({
    type: MONTHLYACTIVITY_UPDATE_FAILED,
    payload: error,
});

export const getMonthlyactivityDelete = (id): MonthlyactivityAction => ({
    type: MONTHLYACTIVITY_DELETE,
    payload: id,
});

export const getMonthlyactivityDeleteSuccess = (monthlyactivityDelete: string): MonthlyactivityAction => ({
    type: MONTHLYACTIVITY_DELETE_SUCCESS,
    payload: monthlyactivityDelete,
});

export const getMonthlyactivityDeleteFailed = (error: string): MonthlyactivityAction => ({
    type: MONTHLYACTIVITY_DELETE_FAILED,
    payload: error,
});
