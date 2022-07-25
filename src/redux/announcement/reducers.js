// @flow
import {
    ANNOUNCEMENT_LIST,
    ANNOUNCEMENT_LIST_SUCCESS,
    ANNOUNCEMENT_LIST_FAILED,
    ANNOUNCEMENT_ADD,
    ANNOUNCEMENT_ADD_SUCCESS,
    ANNOUNCEMENT_ADD_FAILED,
    ANNOUNCEMENT_UPDATE,
    ANNOUNCEMENT_UPDATE_SUCCESS,
    ANNOUNCEMENT_UPDATE_FAILED,
    ANNOUNCEMENT_DELETE,
    ANNOUNCEMENT_DELETE_SUCCESS,
    ANNOUNCEMENT_DELETE_FAILED
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type AnnouncementAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value ?: boolean };

const Announcement = (state: State = INIT_STATE, action: AnnouncementAction) => {
    switch (action.type) {
        case ANNOUNCEMENT_LIST:
            return { ...state, listloading: true };
        case ANNOUNCEMENT_LIST_SUCCESS:
            return { ...state, announcement: action.payload, listloading: false, error: null };
        case ANNOUNCEMENT_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case ANNOUNCEMENT_ADD:
            return { ...state, loading: true };
        case ANNOUNCEMENT_ADD_SUCCESS:
            return { ...state, announcementAdd: action.payload, loading: false, error: null };
        case ANNOUNCEMENT_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case ANNOUNCEMENT_UPDATE:
            return { ...state, loading: true };
        case ANNOUNCEMENT_UPDATE_SUCCESS:
            return { ...state, announcementUpdate: action.payload, loading: false, error: null };
        case ANNOUNCEMENT_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case ANNOUNCEMENT_DELETE:
            return { ...state, loading: true };
        case ANNOUNCEMENT_DELETE_SUCCESS:
            return { ...state, announcementDelete: action.payload, loading: false, error: null };
        case ANNOUNCEMENT_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Announcement;
