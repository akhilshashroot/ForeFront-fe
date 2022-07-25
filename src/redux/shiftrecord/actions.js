// @flow
import {
    SHIFTRECORD_LIST,
    SHIFTRECORD_LIST_SUCCESS,
    SHIFTRECORD_LIST_FAILED,
    SHIFTRECORD_VIEW,
    SHIFTRECORD_VIEW_SUCCESS,
    SHIFTRECORD_VIEW_FAILED,

} from './constants';

type ShiftrecordAction = { type: string, payload: {} | string };

export const getShiftrecordList = (data:{}): ShiftrecordAction => ({
    type: SHIFTRECORD_LIST,
    payload: data,
});

export const getShiftrecordListSuccess = (shiftrecord: string): ShiftrecordAction => ({
    type: SHIFTRECORD_LIST_SUCCESS,
    payload: shiftrecord,
});

export const getShiftrecordListFailed = (error: string): ShiftrecordAction => ({
    type: SHIFTRECORD_LIST_FAILED,
    payload: error,
});
export const getShiftrecordView = (data:{}): ShiftrecordAction => ({
    type: SHIFTRECORD_VIEW,
    payload: data,
});

export const getShiftrecordViewSuccess = (shiftrecordView: string): ShiftrecordAction => ({
    type: SHIFTRECORD_VIEW_SUCCESS,
    payload: shiftrecordView,
});

export const getShiftrecordViewFailed = (error: string): ShiftrecordAction => ({
    type: SHIFTRECORD_VIEW_FAILED,
    payload: error,
});
