// @flow
import {
    TEAM_LIST,
    TEAM_LIST_SUCCESS,
    TEAM_LIST_FAILED,
    TEAM_ADD,
    TEAM_ADD_SUCCESS,
    TEAM_ADD_FAILED,
    TEAM_UPDATE,
    TEAM_UPDATE_SUCCESS,
    TEAM_UPDATE_FAILED,
    TEAM_DELETE,
    TEAM_DELETE_SUCCESS,
    TEAM_DELETE_FAILED
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type TeamAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value ?: boolean };

const Team = (state: State = INIT_STATE, action: TeamAction) => {
    switch (action.type) {
        case TEAM_LIST:
            return { ...state, listloading: true };
        case TEAM_LIST_SUCCESS:
            return { ...state, team: action.payload, listloading: false, error: null };
        case TEAM_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case TEAM_ADD:
            return { ...state, loading: true };
        case TEAM_ADD_SUCCESS:
            return { ...state, teamAdd: action.payload, loading: false, error: null };
        case TEAM_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case TEAM_UPDATE:
            return { ...state, loading: true };
        case TEAM_UPDATE_SUCCESS:
            return { ...state, teamUpdate: action.payload, loading: false, error: null };
        case TEAM_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case TEAM_DELETE:
            return { ...state, loading: true };
        case TEAM_DELETE_SUCCESS:
            return { ...state, teamDelete: action.payload, loading: false, error: null };
        case TEAM_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Team;
