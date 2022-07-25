// @flow
import {
  MYTASK_LIST,
  MYTASK_LIST_SUCCESS,
  MYTASK_LIST_FAILED,
  MYTASK_ADD,
  MYTASK_ADD_SUCCESS,
  MYTASK_ADD_FAILED,
  MYTASK_UPDATE,
  MYTASK_UPDATE_SUCCESS,
  MYTASK_UPDATE_FAILED,
  MYTASK_DELETE,
  MYTASK_DELETE_SUCCESS,
  MYTASK_DELETE_FAILED,
  MYTASK_COMMENT_ADD,
  MYTASK_COMMENT_ADD_SUCCESS,
  MYTASK_COMMENT_ADD_FAILED,
} from "./constants";

type MytaskAction = { type: string, payload: {} | string };

export const getMytaskList = (): MytaskAction => ({
  type: MYTASK_LIST,
  payload: {},
});

export const getMytaskListSuccess = (mytask: string): MytaskAction => ({
  type: MYTASK_LIST_SUCCESS,
  payload: mytask,
});

export const getMytaskListFailed = (error: string): MytaskAction => ({
  type: MYTASK_LIST_FAILED,
  payload: error,
});

export const getMytaskAdd = (data: {}): MytaskAction => ({
  type: MYTASK_ADD,
  payload: data,
});

export const getMytaskAddSuccess = (mytaskAdd: string): MytaskAction => ({
  type: MYTASK_ADD_SUCCESS,
  payload: mytaskAdd,
});

export const getMytaskAddFailed = (error: string): MytaskAction => ({
  type: MYTASK_ADD_FAILED,
  payload: error,
});

export const getCommentAdd = (data: {}): MytaskAction => ({
  type: MYTASK_COMMENT_ADD,
  payload: data,
});

export const getCommentAddSuccess = (mycommentAdd: string): MytaskAction => ({
  type: MYTASK_COMMENT_ADD_SUCCESS,
  payload: mycommentAdd,
});

export const getCommentAddFailed = (error: string): MytaskAction => ({
  type: MYTASK_COMMENT_ADD_FAILED,
  payload: error,
});

export const getMytaskUpdate = (data: {}): MytaskAction => ({
  type: MYTASK_UPDATE,
  payload: data,
});

export const getMytaskUpdateSuccess = (mytaskUpdate: string): MytaskAction => ({
  type: MYTASK_UPDATE_SUCCESS,
  payload: mytaskUpdate,
});

export const getMytaskUpdateFailed = (error: string): MytaskAction => ({
  type: MYTASK_UPDATE_FAILED,
  payload: error,
});

export const getMytaskDelete = (id): MytaskAction => ({
  type: MYTASK_DELETE,
  payload: id,
});

export const getMytaskDeleteSuccess = (mytaskDelete: string): MytaskAction => ({
  type: MYTASK_DELETE_SUCCESS,
  payload: mytaskDelete,
});

export const getMytaskDeleteFailed = (error: string): MytaskAction => ({
  type: MYTASK_DELETE_FAILED,
  payload: error,
});
