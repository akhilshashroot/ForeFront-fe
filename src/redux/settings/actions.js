// @flow
import {
   
    SETTINGS_UPDATE,
    SETTINGS_UPDATE_SUCCESS,
    SETTINGS_UPDATE_FAILED,
  
} from './constants';

type SettingsAction = { type: string, payload: {} | string };


export const getSettingsUpdate = (data:{}): SettingsAction => ({
    type: SETTINGS_UPDATE,
    payload: data,
});

export const getSettingsUpdateSuccess = (settingsUpdate: string): SettingsAction => ({
    type: SETTINGS_UPDATE_SUCCESS,
    payload: settingsUpdate,
});

export const getSettingsUpdateFailed = (error: string): SettingsAction => ({
    type: SETTINGS_UPDATE_FAILED,
    payload: error,
});

