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

type InventoryAction = { type: string, payload: {} | string };

export const getInventoryList = (data:{}): InventoryAction => ({
    type: INVENTORY_LIST,
    payload: data,
});

export const getInventoryListSuccess = (inventory: string): InventoryAction => ({
    type: INVENTORY_LIST_SUCCESS,
    payload: inventory,
});

export const getInventoryListFailed = (error: string): InventoryAction => ({
    type: INVENTORY_LIST_FAILED,
    payload: error,
});

export const getInventoryAdd = (data:{}): InventoryAction => ({
    type: INVENTORY_ADD,
    payload: data,
});

export const getInventoryAddSuccess = (inventoryAdd: string): InventoryAction => ({
    type: INVENTORY_ADD_SUCCESS,
    payload: inventoryAdd,
});

export const getInventoryAddFailed = (error: string): InventoryAction => ({
    type: INVENTORY_ADD_FAILED,
    payload: error,
});

export const getInventoryUpdate = (data:{}): InventoryAction => ({
    type: INVENTORY_UPDATE,
    payload: data,
});

export const getInventoryUpdateSuccess = (inventoryUpdate: string): InventoryAction => ({
    type: INVENTORY_UPDATE_SUCCESS,
    payload: inventoryUpdate,
});

export const getInventoryUpdateFailed = (error: string): InventoryAction => ({
    type: INVENTORY_UPDATE_FAILED,
    payload: error,
});

export const getInventoryDelete = (id): InventoryAction => ({
    type: INVENTORY_DELETE,
    payload: id,
});

export const getInventoryDeleteSuccess = (inventoryDelete: string): InventoryAction => ({
    type: INVENTORY_DELETE_SUCCESS,
    payload: inventoryDelete,
});

export const getInventoryDeleteFailed = (error: string): InventoryAction => ({
    type: INVENTORY_DELETE_FAILED,
    payload: error,
});
