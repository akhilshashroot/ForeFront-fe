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

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type TimesheetAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value ?: boolean };

const Timesheet = (state: State = INIT_STATE, action: TimesheetAction) => {
    switch (action.type) {
        case TIMESHEET_LIST:
            return { ...state, listloading: true };
        case TIMESHEET_LIST_SUCCESS:
            return { ...state, timesheet: action.payload, listloading: false, error: null };
        case TIMESHEET_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case TIMESHEET_PUNCHIN:
            return { ...state, loading: true };
        case TIMESHEET_PUNCHIN_SUCCESS:
            return { ...state, timesheetPunchin: action.payload, loading: false, error: null };
        case TIMESHEET_PUNCHIN_FAILED:
            return { ...state, error: action.payload, loading: false };
        case TIMESHEET_BREAK:
            return { ...state, loading: true };
        case TIMESHEET_BREAK_SUCCESS:
            return { ...state, timesheetBreak: action.payload, loading: false, error: null };
        case TIMESHEET_BREAK_FAILED:
            return { ...state, error: action.payload, loading: false };
        case TIMESHEET_PUNCHOUT:
            return { ...state, loading: true };
        case TIMESHEET_PUNCHOUT_SUCCESS:
            return { ...state, timesheetPunchout: action.payload, loading: false, error: null };
        case TIMESHEET_PUNCHOUT_FAILED:
            return { ...state, error: action.payload, loading: false };
        case DESKSHOT_ADD:
            return { ...state, loading: true };
        case DESKSHOT_ADD_SUCCESS:
            return { ...state, deskshotAdd: action.payload, loading: false, error: null };
        case DESKSHOT_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Timesheet;
