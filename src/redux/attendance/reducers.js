// @flow
import {
    ATTENDANCE_LIST,
    ATTENDANCE_LIST_SUCCESS,
    ATTENDANCE_LIST_FAILED,

} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type AttendanceAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value ?: boolean };

const Attendance = (state: State = INIT_STATE, action: AttendanceAction) => {
    switch (action.type) {
        case ATTENDANCE_LIST:
            return { ...state, listloading: true };
        case ATTENDANCE_LIST_SUCCESS:
            return { ...state, attendance: action.payload, listloading: false, error: null };
        case ATTENDANCE_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
       
        default:
            return { ...state };
    }
};

export default Attendance;
