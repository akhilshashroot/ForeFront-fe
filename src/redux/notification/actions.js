// @flow
import {
    NOTIFICATION_LIST,
    NOTIFICATION_LIST_SUCCESS,
    NOTIFICATION_LIST_FAILED,

} from './constants';

type NotificationAction = { type: string, payload: {} | string };

export const getNotificationList = (): NotificationAction => ({
    type: NOTIFICATION_LIST,
    payload: {},
});

export const getNotificationListSuccess = (notification: string): NotificationAction => ({
    type: NOTIFICATION_LIST_SUCCESS,
    payload: notification,
});

export const getNotificationListFailed = (error: string): NotificationAction => ({
    type: NOTIFICATION_LIST_FAILED,
    payload: error,
});
