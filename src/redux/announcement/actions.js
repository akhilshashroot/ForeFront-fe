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

type AnnouncementAction = { type: string, payload: {} | string };

export const getAnnouncementList = (): AnnouncementAction => ({
    type: ANNOUNCEMENT_LIST,
    payload: {},
});

export const getAnnouncementListSuccess = (announcement: string): AnnouncementAction => ({
    type: ANNOUNCEMENT_LIST_SUCCESS,
    payload: announcement,
});

export const getAnnouncementListFailed = (error: string): AnnouncementAction => ({
    type: ANNOUNCEMENT_LIST_FAILED,
    payload: error,
});

export const getAnnouncementAdd = (data:{}): AnnouncementAction => ({
    type: ANNOUNCEMENT_ADD,
    payload: data,
});

export const getAnnouncementAddSuccess = (announcementAdd: string): AnnouncementAction => ({
    type: ANNOUNCEMENT_ADD_SUCCESS,
    payload: announcementAdd,
});

export const getAnnouncementAddFailed = (error: string): AnnouncementAction => ({
    type: ANNOUNCEMENT_ADD_FAILED,
    payload: error,
});

export const getAnnouncementUpdate = (data:{}): AnnouncementAction => ({
    type: ANNOUNCEMENT_UPDATE,
    payload: data,
});

export const getAnnouncementUpdateSuccess = (announcementUpdate: string): AnnouncementAction => ({
    type: ANNOUNCEMENT_UPDATE_SUCCESS,
    payload: announcementUpdate,
});

export const getAnnouncementUpdateFailed = (error: string): AnnouncementAction => ({
    type: ANNOUNCEMENT_UPDATE_FAILED,
    payload: error,
});

export const getAnnouncementDelete = (id): AnnouncementAction => ({
    type: ANNOUNCEMENT_DELETE,
    payload: id,
});

export const getAnnouncementDeleteSuccess = (announcementDelete: string): AnnouncementAction => ({
    type: ANNOUNCEMENT_DELETE_SUCCESS,
    payload: announcementDelete,
});

export const getAnnouncementDeleteFailed = (error: string): AnnouncementAction => ({
    type: ANNOUNCEMENT_DELETE_FAILED,
    payload: error,
});
