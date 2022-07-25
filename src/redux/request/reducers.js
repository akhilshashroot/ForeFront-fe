// @flow
import {
    REQUEST_LIST,
    REQUEST_LIST_SUCCESS,
    REQUEST_LIST_FAILED,
    REQUEST_APPROVE,
    REQUEST_APPROVE_SUCCESS,
    REQUEST_APPROVE_FAILED,
    REQUEST_REJECT,
    REQUEST_REJECT_SUCCESS,
    REQUEST_REJECT_FAILED,
    REQUEST_DELETE,
    REQUEST_DELETE_SUCCESS,
    REQUEST_DELETE_FAILED,
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type RequestAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const Request = (state: State = INIT_STATE, action: RequestAction) => {
    switch (action.type) {
        case REQUEST_LIST:
            return { ...state, listloading: true };
        case REQUEST_LIST_SUCCESS:
            return { ...state, request: action.payload, listloading: false, error: null };
        case REQUEST_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };

        case REQUEST_APPROVE:
            return { ...state, loading: true };
        case REQUEST_APPROVE_SUCCESS:
            return { ...state, requestApprove: action.payload, loading: false, error: null };
        case REQUEST_APPROVE_FAILED:
            return { ...state, error: action.payload, loading: false };

        case REQUEST_REJECT:
            return { ...state, loading: true };
        case REQUEST_REJECT_SUCCESS:
            return { ...state, requestReject: action.payload, loading: false, error: null };
        case REQUEST_REJECT_FAILED:
            return { ...state, error: action.payload, loading: false };

        case REQUEST_DELETE:
            return { ...state, loading: true };
        case REQUEST_DELETE_SUCCESS:
            return { ...state, requestDelete: action.payload, loading: false, error: null };
        case REQUEST_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Request;
