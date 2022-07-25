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

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type MonthlyactivityAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value ?: boolean };

const Monthlyactivity = (state: State = INIT_STATE, action: MonthlyactivityAction) => {
    switch (action.type) {
        case MONTHLYACTIVITY_LIST:
            return { ...state, listloading: true };
        case MONTHLYACTIVITY_LIST_SUCCESS:
            return { ...state, monthlyactivity: action.payload, listloading: false, error: null };
        case MONTHLYACTIVITY_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case MONTHLYACTIVITY_ADD:
            return { ...state, loading: true };
        case MONTHLYACTIVITY_ADD_SUCCESS:
            return { ...state, monthlyactivityAdd: action.payload, loading: false, error: null };
        case MONTHLYACTIVITY_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };

            case MONTHLYJOBDES_ADD:
                return { ...state, loading: true };
            case MONTHLYJOBDES_ADD_SUCCESS:
                return { ...state, monthlyjobdesAdd: action.payload, loading: false, error: null };
            case MONTHLYJOBDES_ADD_FAILED:
                return { ...state, error: action.payload, loading: false };


        case MONTHLYACTIVITY_UPDATE:
            return { ...state, loading: true };
        case MONTHLYACTIVITY_UPDATE_SUCCESS:
            return { ...state, monthlyactivityUpdate: action.payload, loading: false, error: null };
        case MONTHLYACTIVITY_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case MONTHLYACTIVITY_DELETE:
            return { ...state, loading: true };
        case MONTHLYACTIVITY_DELETE_SUCCESS:
            return { ...state, monthlyactivityDelete: action.payload, loading: false, error: null };
        case MONTHLYACTIVITY_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Monthlyactivity;
