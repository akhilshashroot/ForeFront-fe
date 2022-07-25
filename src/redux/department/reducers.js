// @flow
import {
    DEPARTMENT_LIST,
    DEPARTMENT_LIST_SUCCESS,
    DEPARTMENT_LIST_FAILED,
    DEPARTMENT_ADD,
    DEPARTMENT_ADD_SUCCESS,
    DEPARTMENT_ADD_FAILED,
    DEPARTMENT_UPDATE,
    DEPARTMENT_UPDATE_SUCCESS,
    DEPARTMENT_UPDATE_FAILED,
    DEPARTMENT_DELETE,
    DEPARTMENT_DELETE_SUCCESS,
    DEPARTMENT_DELETE_FAILED
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type DepartmentAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value ?: boolean };

const Department = (state: State = INIT_STATE, action: DepartmentAction) => {
    switch (action.type) {
        case DEPARTMENT_LIST:
            return { ...state, listloading: true };
        case DEPARTMENT_LIST_SUCCESS:
            return { ...state, department: action.payload, listloading: false, error: null };
        case DEPARTMENT_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case DEPARTMENT_ADD:
            return { ...state, loading: true };
        case DEPARTMENT_ADD_SUCCESS:
            return { ...state, departmentAdd: action.payload, loading: false, error: null };
        case DEPARTMENT_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case DEPARTMENT_UPDATE:
            return { ...state, loading: true };
        case DEPARTMENT_UPDATE_SUCCESS:
            return { ...state, departmentUpdate: action.payload, loading: false, error: null };
        case DEPARTMENT_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case DEPARTMENT_DELETE:
            return { ...state, loading: true };
        case DEPARTMENT_DELETE_SUCCESS:
            return { ...state, departmentDelete: action.payload, loading: false, error: null };
        case DEPARTMENT_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Department;
