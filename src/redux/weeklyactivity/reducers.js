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

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type WeeklyactivityAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value ?: boolean };

const Weeklyactivity = (state: State = INIT_STATE, action: WeeklyactivityAction) => {
    switch (action.type) {
        case WEEKLYACTIVITY_LIST:
            return { ...state, listloading: true };
        case WEEKLYACTIVITY_LIST_SUCCESS:
            return { ...state, weeklyactivity: action.payload, listloading: false, error: null };
        case WEEKLYACTIVITY_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case WEEKLYACTIVITY_ADD:
            return { ...state, loading: true };
        case WEEKLYACTIVITY_ADD_SUCCESS:
            return { ...state, weeklyactivityAdd: action.payload, loading: false, error: null };
        case WEEKLYACTIVITY_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };

            case WEEKLYJOBDES_ADD:
                return { ...state, loading: true };
            case WEEKLYJOBDES_ADD_SUCCESS:
                return { ...state, weeklyjobdesAdd: action.payload, loading: false, error: null };
            case WEEKLYJOBDES_ADD_FAILED:
                return { ...state, error: action.payload, loading: false };


        case WEEKLYACTIVITY_UPDATE:
            return { ...state, loading: true };
        case WEEKLYACTIVITY_UPDATE_SUCCESS:
            return { ...state, weeklyactivityUpdate: action.payload, loading: false, error: null };
        case WEEKLYACTIVITY_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case WEEKLYACTIVITY_DELETE:
            return { ...state, loading: true };
        case WEEKLYACTIVITY_DELETE_SUCCESS:
            return { ...state, weeklyactivityDelete: action.payload, loading: false, error: null };
        case WEEKLYACTIVITY_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Weeklyactivity;
