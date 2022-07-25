// @flow
import {
    SCORE_LIST,
    SCORE_LIST_SUCCESS,
    SCORE_LIST_FAILED,
    SCORE_ADD,
    SCORE_ADD_SUCCESS,
    SCORE_ADD_FAILED,
    SCORE_UPDATE,
    SCORE_UPDATE_SUCCESS,
    SCORE_UPDATE_FAILED,
    SCORE_DELETE,
    SCORE_DELETE_SUCCESS,
    SCORE_DELETE_FAILED,
    SCORE_PEDATA,
    SCORE_PEDATA_SUCCESS,
    SCORE_PEDATA_FAILED,
    SCORE_PEHISTORY,
    SCORE_PEHISTORY_SUCCESS,
    SCORE_PEHISTORY_FAILED
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type ScoreAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value ?: boolean };

const Score = (state: State = INIT_STATE, action: ScoreAction) => {
    switch (action.type) {
        case SCORE_LIST:
            return { ...state, listloading: true };
        case SCORE_LIST_SUCCESS:
            return { ...state, score: action.payload, listloading: false, error: null };
        case SCORE_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case SCORE_PEDATA:
            return { ...state, peDataloading: true };
        case SCORE_PEDATA_SUCCESS:
            return { ...state, PEData: action.payload, peDataloading: false, error: null };
        case SCORE_PEDATA_FAILED:
            return { ...state, error: action.payload, loading: false };
        case SCORE_PEHISTORY:
            return { ...state, peHistoryloading: true };
        case SCORE_PEHISTORY_SUCCESS:
            return { ...state, PEHistory: action.payload, peHistoryloading: false, error: null };
        case SCORE_PEHISTORY_FAILED:
            return { ...state, error: action.payload, loading: false };
        case SCORE_ADD:
            return { ...state, loading: true };
        case SCORE_ADD_SUCCESS:
            return { ...state, scoreAdd: action.payload, loading: false, error: null };
        case SCORE_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case SCORE_UPDATE:
            return { ...state, loading: true };
        case SCORE_UPDATE_SUCCESS:
            return { ...state, scoreUpdate: action.payload, loading: false, error: null };
        case SCORE_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case SCORE_DELETE:
            return { ...state, loading: true };
        case SCORE_DELETE_SUCCESS:
            return { ...state, scoreDelete: action.payload, loading: false, error: null };
        case SCORE_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Score;
