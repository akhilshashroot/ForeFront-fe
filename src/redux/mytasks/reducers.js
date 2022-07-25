// @flow
import {
    MYTASK_LIST,
    MYTASK_LIST_SUCCESS,
    MYTASK_LIST_FAILED,
    MYTASK_ADD,
    MYTASK_ADD_SUCCESS,
    MYTASK_ADD_FAILED,
    MYTASK_UPDATE,
    MYTASK_UPDATE_SUCCESS,
    MYTASK_UPDATE_FAILED,
    MYTASK_DELETE,
    MYTASK_DELETE_SUCCESS,
    MYTASK_DELETE_FAILED,
    MYTASK_COMMENT_ADD,
    MYTASK_COMMENT_ADD_SUCCESS,
    MYTASK_COMMENT_ADD_FAILED
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type MytaskAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value ?: boolean };

const Mytask = (state: State = INIT_STATE, action: MytaskAction) => {
    switch (action.type) {
        case MYTASK_LIST:
            return { ...state, listloading: true };
        case MYTASK_LIST_SUCCESS:
            return { ...state, mytask: action.payload, listloading: false, error: null };
        case MYTASK_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case MYTASK_ADD:
            return { ...state, loading: true };
        case MYTASK_ADD_SUCCESS:
            return { ...state, mytaskAdd: action.payload, loading: false, error: null };
        case MYTASK_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case MYTASK_COMMENT_ADD:
            return { ...state, loading: true };
        case MYTASK_COMMENT_ADD_SUCCESS:
            return { ...state, mycommentAdd: action.payload, loading: false, error: null };
        case MYTASK_COMMENT_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case MYTASK_UPDATE:
            return { ...state, loading: true };
        case MYTASK_UPDATE_SUCCESS:
            return { ...state, mytaskUpdate: action.payload, loading: false, error: null };
        case MYTASK_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case MYTASK_DELETE:
            return { ...state, loading: true };
        case MYTASK_DELETE_SUCCESS:
            return { ...state, mytaskDelete: action.payload, loading: false, error: null };
        case MYTASK_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Mytask;
