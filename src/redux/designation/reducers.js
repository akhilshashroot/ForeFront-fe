// @flow
import {
    DESIGNATION_LIST,
    DESIGNATION_LIST_SUCCESS,
    DESIGNATION_LIST_FAILED,
    DESIGNATION_ADD,
    DESIGNATION_ADD_SUCCESS,
    DESIGNATION_ADD_FAILED,
    DESIGNATION_UPDATE,
    DESIGNATION_UPDATE_SUCCESS,
    DESIGNATION_UPDATE_FAILED,
    DESIGNATION_DELETE,
    DESIGNATION_DELETE_SUCCESS,
    DESIGNATION_DELETE_FAILED
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type DesignationAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value ?: boolean };

const Designation = (state: State = INIT_STATE, action: DesignationAction) => {
    switch (action.type) {
        case DESIGNATION_LIST:
            return { ...state, listloading: true };
        case DESIGNATION_LIST_SUCCESS:
            return { ...state, designation: action.payload, listloading: false, error: null };
        case DESIGNATION_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case DESIGNATION_ADD:
            return { ...state, loading: true };
        case DESIGNATION_ADD_SUCCESS:
            return { ...state, designationAdd: action.payload, loading: false, error: null };
        case DESIGNATION_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case DESIGNATION_UPDATE:
            return { ...state, loading: true };
        case DESIGNATION_UPDATE_SUCCESS:
            return { ...state, designationUpdate: action.payload, loading: false, error: null };
        case DESIGNATION_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case DESIGNATION_DELETE:
            return { ...state, loading: true };
        case DESIGNATION_DELETE_SUCCESS:
            return { ...state, designationDelete: action.payload, loading: false, error: null };
        case DESIGNATION_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Designation;
