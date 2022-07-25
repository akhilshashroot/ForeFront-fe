// @flow
import {
    DAILYREPORT_LIST,
    DAILYREPORT_LIST_SUCCESS,
    DAILYREPORT_LIST_FAILED,

} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type DailyreportAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const Dailyreport = (state: State = INIT_STATE, action: DailyreportAction) => {
    switch (action.type) {
        case DAILYREPORT_LIST:
            return { ...state, listloading: true };
        case DAILYREPORT_LIST_SUCCESS:
            return { ...state, dailyreport: action.payload, listloading: false, error: null };
        case DAILYREPORT_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
      

        default:
            return { ...state };
    }
};

export default Dailyreport;
