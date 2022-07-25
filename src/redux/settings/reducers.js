// @flow
import {
   
    SETTINGS_UPDATE,
    SETTINGS_UPDATE_SUCCESS,
    SETTINGS_UPDATE_FAILED,
 
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type SettingsAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value ?: boolean };

const Settings = (state: State = INIT_STATE, action: SettingsAction) => {
    switch (action.type) {
       
        case SETTINGS_UPDATE:
            return { ...state, loading: true };
        case SETTINGS_UPDATE_SUCCESS:
            return { ...state, settingsUpdate: action.payload, loading: false, error: null };
        case SETTINGS_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
       
        default:
            return { ...state };
    }
};

export default Settings;
