// @flow
import {
    DAILYACTIVITY_LIST,
    DAILYACTIVITY_LIST_SUCCESS,
    DAILYACTIVITY_LIST_FAILED,
    DAILYACTIVITY_ADD,
    DAILYACTIVITY_ADD_SUCCESS,
    DAILYACTIVITY_ADD_FAILED,
    DAILYJOBDES_ADD,
    DAILYJOBDES_ADD_SUCCESS,
    DAILYJOBDES_ADD_FAILED,
    DAILYACTIVITY_UPDATE,
    DAILYACTIVITY_UPDATE_SUCCESS,
    DAILYACTIVITY_UPDATE_FAILED,
    DAILYACTIVITY_DELETE,
    DAILYACTIVITY_DELETE_SUCCESS,
    DAILYACTIVITY_DELETE_FAILED
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type DailyactivityAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value ?: boolean };

const Dailyactivity = (state: State = INIT_STATE, action: DailyactivityAction) => {
    switch (action.type) {
        case DAILYACTIVITY_LIST:
            return { ...state, listloading: true };
        case DAILYACTIVITY_LIST_SUCCESS:
            return { ...state, dailyactivity: action.payload, listloading: false, error: null };
        case DAILYACTIVITY_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case DAILYACTIVITY_ADD:
            return { ...state, loading: true };
        case DAILYACTIVITY_ADD_SUCCESS:
            return { ...state, dailyactivityAdd: action.payload, loading: false, error: null };
        case DAILYACTIVITY_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };

            case DAILYJOBDES_ADD:
                return { ...state, loading: true };
            case DAILYJOBDES_ADD_SUCCESS:
                return { ...state, dailyjobdesAdd: action.payload, loading: false, error: null };
            case DAILYJOBDES_ADD_FAILED:
                return { ...state, error: action.payload, loading: false };


        case DAILYACTIVITY_UPDATE:
            return { ...state, loading: true };
        case DAILYACTIVITY_UPDATE_SUCCESS:
            return { ...state, dailyactivityUpdate: action.payload, loading: false, error: null };
        case DAILYACTIVITY_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case DAILYACTIVITY_DELETE:
            return { ...state, loading: true };
        case DAILYACTIVITY_DELETE_SUCCESS:
            return { ...state, dailyactivityDelete: action.payload, loading: false, error: null };
        case DAILYACTIVITY_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Dailyactivity;
