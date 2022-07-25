// @flow
import {
    SHIFTRECORD_LIST,
    SHIFTRECORD_LIST_SUCCESS,
    SHIFTRECORD_LIST_FAILED,
    SHIFTRECORD_VIEW,
    SHIFTRECORD_VIEW_SUCCESS,
    SHIFTRECORD_VIEW_FAILED,

} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type ShiftrecordAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value ?: boolean };

const Shiftrecord = (state: State = INIT_STATE, action: ShiftrecordAction) => {
 
    switch (action.type) {
        case SHIFTRECORD_LIST:
            return { ...state, listloading: true };
        case SHIFTRECORD_LIST_SUCCESS:
   
            return { ...state, shiftrecord: action.payload, listloading: false, error: null };
        case SHIFTRECORD_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case SHIFTRECORD_VIEW:           
            return { ...state, listloading: true };
        case SHIFTRECORD_VIEW_SUCCESS:
           
            return { ...state, shiftrecordView: action.payload, listloading: false, error: null };
        case SHIFTRECORD_VIEW_FAILED:
    
            return { ...state, error: action.payload, loading: false };
       
        default:
            return { ...state };
    }
};

export default Shiftrecord;
