// @flow
import {
    USER_LIST,
    USER_LIST_SUCCESS,
    USER_LIST_FAILED,
    USER_ADD,
    USER_ADD_SUCCESS,
    USER_ADD_FAILED,
    USER_UPDATE,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAILED,
    USER_DELETE,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAILED
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type UserAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value ?: boolean };

const User = (state: State = INIT_STATE, action: UserAction) => {
    switch (action.type) {
        case USER_LIST:
            return { ...state, listloading: true };
        case USER_LIST_SUCCESS:
            return { ...state, user: action.payload, listloading: false, error: null };
        case USER_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case USER_ADD:
            return { ...state, loading: true };
        case USER_ADD_SUCCESS:
            return { ...state, userAdd: action.payload, loading: false, error: null };
        case USER_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case USER_UPDATE:
            return { ...state, loading: true };
        case USER_UPDATE_SUCCESS:
            return { ...state, userUpdate: action.payload, loading: false, error: null };
        case USER_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case USER_DELETE:
            return { ...state, loading: true };
        case USER_DELETE_SUCCESS:
            return { ...state, userDelete: action.payload, loading: false, error: null };
        case USER_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default User;
