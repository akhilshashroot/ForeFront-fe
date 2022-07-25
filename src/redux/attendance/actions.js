// @flow
import {
    ATTENDANCE_LIST,
    ATTENDANCE_LIST_SUCCESS,
    ATTENDANCE_LIST_FAILED,

} from './constants';

type AttendanceAction = { type: string, payload: {} | string };

export const getAttendanceList = (data:{}): AttendanceAction => ({
    type: ATTENDANCE_LIST,
    payload: data,
});

export const getAttendanceListSuccess = (attendance: string): AttendanceAction => ({
    type: ATTENDANCE_LIST_SUCCESS,
    payload: attendance,
});

export const getAttendanceListFailed = (error: string): AttendanceAction => ({
    type: ATTENDANCE_LIST_FAILED,
    payload: error,
});
