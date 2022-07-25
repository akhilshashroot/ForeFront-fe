// @flow
import {
    PROJECT_LIST,
    PROJECT_LIST_SUCCESS,
    PROJECT_LIST_FAILED,
    PROJECT_ADD,
    PROJECT_ADD_SUCCESS,
    PROJECT_ADD_FAILED,
    PROJECT_UPDATE,
    PROJECT_UPDATE_SUCCESS,
    PROJECT_UPDATE_FAILED,
    PROJECT_DELETE,
    PROJECT_DELETE_SUCCESS,
    PROJECT_DELETE_FAILED
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type ProjectAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value ?: boolean };

const Project = (state: State = INIT_STATE, action: ProjectAction) => {
    switch (action.type) {
        case PROJECT_LIST:
            return { ...state, listloading: true };
        case PROJECT_LIST_SUCCESS:
            return { ...state, project: action.payload, listloading: false, error: null };
        case PROJECT_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case PROJECT_ADD:
            return { ...state, loading: true };
        case PROJECT_ADD_SUCCESS:
            return { ...state, projectAdd: action.payload, loading: false, error: null };
        case PROJECT_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case PROJECT_UPDATE:
            return { ...state, loading: true };
        case PROJECT_UPDATE_SUCCESS:
            return { ...state, projectUpdate: action.payload, loading: false, error: null };
        case PROJECT_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case PROJECT_DELETE:
            return { ...state, loading: true };
        case PROJECT_DELETE_SUCCESS:
            return { ...state, projectDelete: action.payload, loading: false, error: null };
        case PROJECT_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Project;
