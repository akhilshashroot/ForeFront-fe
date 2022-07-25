// @flow
import {
    WORKDATA_LIST,
    WORKDATA_LIST_SUCCESS,
    WORKDATA_LIST_FAILED,
    WORKDATA_ADD,
    WORKDATA_ADD_SUCCESS,
    WORKDATA_ADD_FAILED,
    WORKDATA_UPDATE,
    WORKDATA_UPDATE_SUCCESS,
    WORKDATA_UPDATE_FAILED,
    WORKDATA_DELETE,
    WORKDATA_DELETE_SUCCESS,
    WORKDATA_DELETE_FAILED
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type WorkdataAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value ?: boolean };

const Workdata = (state: State = INIT_STATE, action: WorkdataAction) => {
    switch (action.type) {
        case WORKDATA_LIST:
            return { ...state, listloading: true };
        case WORKDATA_LIST_SUCCESS:
            return { ...state, workdata: action.payload, listloading: false, error: null };
        case WORKDATA_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case WORKDATA_ADD:
            return { ...state, loading: true };
        case WORKDATA_ADD_SUCCESS:
            return { ...state, workdataAdd: action.payload, loading: false, error: null };
        case WORKDATA_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case WORKDATA_UPDATE:
            return { ...state, loading: true };
        case WORKDATA_UPDATE_SUCCESS:
            return { ...state, workdataUpdate: action.payload, loading: false, error: null };
        case WORKDATA_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case WORKDATA_DELETE:
            return { ...state, loading: true };
        case WORKDATA_DELETE_SUCCESS:
            return { ...state, workdataDelete: action.payload, loading: false, error: null };
        case WORKDATA_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Workdata;
