// @flow
import {
    NOTIFICATION_LIST,
    NOTIFICATION_LIST_SUCCESS,
    NOTIFICATION_LIST_FAILED,

} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type NotificationAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value ?: boolean };

const Notification = (state: State = INIT_STATE, action: NotificationAction) => {
    switch (action.type) {
        case NOTIFICATION_LIST:
            return { ...state, listloading: true };
        case NOTIFICATION_LIST_SUCCESS:
            return { ...state, notification: action.payload, listloading: false, error: null };
        case NOTIFICATION_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
       
        default:
            return { ...state };
    }
};

export default Notification;
