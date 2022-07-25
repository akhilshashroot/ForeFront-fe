// @flow
import {
    INVENTORY_LIST,
    INVENTORY_LIST_SUCCESS,
    INVENTORY_LIST_FAILED,
    INVENTORY_ADD,
    INVENTORY_ADD_SUCCESS,
    INVENTORY_ADD_FAILED,
    INVENTORY_UPDATE,
    INVENTORY_UPDATE_SUCCESS,
    INVENTORY_UPDATE_FAILED,
    INVENTORY_DELETE,
    INVENTORY_DELETE_SUCCESS,
    INVENTORY_DELETE_FAILED
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type InventoryAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value ?: boolean };

const Inventory = (state: State = INIT_STATE, action: InventoryAction) => {
    switch (action.type) {
        case INVENTORY_LIST:
            return { ...state, listloading: true };
        case INVENTORY_LIST_SUCCESS:
            return { ...state, inventory: action.payload, listloading: false, error: null };
        case INVENTORY_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case INVENTORY_ADD:
            return { ...state, loading: true };
        case INVENTORY_ADD_SUCCESS:
            return { ...state, inventoryAdd: action.payload, loading: false, error: null };
        case INVENTORY_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case INVENTORY_UPDATE:
            return { ...state, loading: true };
        case INVENTORY_UPDATE_SUCCESS:
            return { ...state, inventoryUpdate: action.payload, loading: false, error: null };
        case INVENTORY_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case INVENTORY_DELETE:
            return { ...state, loading: true };
        case INVENTORY_DELETE_SUCCESS:
            return { ...state, inventoryDelete: action.payload, loading: false, error: null };
        case INVENTORY_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Inventory;
