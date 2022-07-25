// @flow
import {
    TIMESHEET_LIST,
    TIMESHEET_LIST_SUCCESS,
    TIMESHEET_LIST_FAILED,
    TIMESHEET_PUNCHIN,
    TIMESHEET_PUNCHIN_SUCCESS,
    TIMESHEET_PUNCHIN_FAILED,
    TIMESHEET_BREAK,
    TIMESHEET_BREAK_SUCCESS,
    TIMESHEET_BREAK_FAILED,
    TIMESHEET_PUNCHOUT,
    TIMESHEET_PUNCHOUT_SUCCESS,
    TIMESHEET_PUNCHOUT_FAILED,
    DESKSHOT_ADD,
    DESKSHOT_ADD_SUCCESS,
    DESKSHOT_ADD_FAILED,
   
} from './constants';

type TimesheetAction = { type: string, payload: {} | string };

export const getTimesheetList = (): TimesheetAction => ({
    type: TIMESHEET_LIST,
    payload: {},
});

export const getTimesheetListSuccess = (timesheet: string): TimesheetAction => ({
    type: TIMESHEET_LIST_SUCCESS,
    payload: timesheet,
});

export const getTimesheetListFailed = (error: string): TimesheetAction => ({
    type: TIMESHEET_LIST_FAILED,
    payload: error,
});

export const getTimesheetPunchin = (data:{}): TimesheetAction => ({
    type: TIMESHEET_PUNCHIN,
    payload: data,
});

export const getTimesheetPunchinSuccess = (timesheetPunchin: string): TimesheetAction => ({
    type: TIMESHEET_PUNCHIN_SUCCESS,
    payload: timesheetPunchin,
});

export const getTimesheetPunchinFailed = (error: string): TimesheetAction => ({
    type: TIMESHEET_PUNCHIN_FAILED,
    payload: error,
});
export const getTimesheetPunchout = (data:{}): TimesheetAction => ({
    type: TIMESHEET_PUNCHOUT,
    payload: data,
});

export const getTimesheetPunchoutSuccess = (timesheetPunchout: string): TimesheetAction => ({
    type: TIMESHEET_PUNCHOUT_SUCCESS,
    payload: timesheetPunchout,
});

export const getTimesheetPunchoutFailed = (error: string): TimesheetAction => ({
    type: TIMESHEET_PUNCHOUT_FAILED,
    payload: error,
});
export const getTimesheetBreak = (data:{}): TimesheetAction => ({
    type: TIMESHEET_BREAK,
    payload: data,
});

export const getTimesheetBreakSuccess = (timesheetBreak: string): TimesheetAction => ({
    type: TIMESHEET_BREAK_SUCCESS,
    payload: timesheetBreak,
});

export const getTimesheetBreakFailed = (error: string): TimesheetAction => ({
    type: TIMESHEET_BREAK_FAILED,
    payload: error,
});
export const getDeskshotAdd = (data:{}): TimesheetAction => ({
    type: DESKSHOT_ADD,
    payload: data,
});

export const getDeskshotAddSuccess = (deskshotAdd: string): TimesheetAction => ({
    type: DESKSHOT_ADD_SUCCESS,
    payload: deskshotAdd,
});

export const getDeskshotAddFailed = (error: string): TimesheetAction => ({
    type: DESKSHOT_ADD_FAILED,
    payload: error,
});

