// @flow
import {
    WEEKLYREPORT_LIST,
    WEEKLYREPORT_LIST_SUCCESS,
    WEEKLYREPORT_LIST_FAILED,

} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type WeeklyreportAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const Weeklyreport = (state: State = INIT_STATE, action: WeeklyreportAction) => {
    switch (action.type) {
        case WEEKLYREPORT_LIST:
            return { ...state, listloading: true };
        case WEEKLYREPORT_LIST_SUCCESS:
            return { ...state, weeklyreport: action.payload, listloading: false, error: null };
        case WEEKLYREPORT_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
      

        default:
            return { ...state };
    }
};

export default Weeklyreport;
