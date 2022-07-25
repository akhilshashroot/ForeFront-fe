// @flow
import {
  HASHBOOK_LIST,
  HASHBOOK_LIST_SUCCESS,
  HASHBOOK_LIST_FAILED,
  HASHBOOK_ADD,
  HASHBOOK_ADD_SUCCESS,
  HASHBOOK_ADD_FAILED,
  HASHBOOK_UPDATE,
  HASHBOOK_UPDATE_SUCCESS,
  HASHBOOK_UPDATE_FAILED,
  HASHBOOK_DELETE,
  HASHBOOK_DELETE_SUCCESS,
  HASHBOOK_DELETE_FAILED,
  HASHBOOK_AUTHOR,
  HASHBOOK_AUTHOR_SUCCESS,
  HASHBOOK_AUTHOR_FAILED,
  HASHBOOK_CREATE_COMMENT,
  HASHBOOK_CREATE_COMMENT_SUCCESS,
  HASHBOOK_CREATE_COMMENT_FAILED,
  HASHBOOK_COMMENT_DETAILS,
  HASHBOOK_COMMENT_DETAILS_SUCCESS,
  HASHBOOK_COMMENT_DETAILS_FAILED,
  HASHBOOK_SUBTOPIC,
  HASHBOOK_SUBTOPIC_SUCCESS,
  HASHBOOK_SUBTOPIC_FAILED,
} from "./constants";

type HashbookAction = { type: string, payload: {} | string };

export const getHashbookList = (): HashbookAction => ({
  type: HASHBOOK_LIST,
  payload: {},
});

export const getHashbookListSuccess = (hashbook: string): HashbookAction => ({
  type: HASHBOOK_LIST_SUCCESS,
  payload: hashbook,
});

export const getHashbookListFailed = (error: string): HashbookAction => ({
  type: HASHBOOK_LIST_FAILED,
  payload: error,
});

export const getHashbookAdd = (data: {}): HashbookAction => ({
  type: HASHBOOK_ADD,
  payload: data,
});

export const getHashbookAddSuccess = (hashbookAdd: string): HashbookAction => ({
  type: HASHBOOK_ADD_SUCCESS,
  payload: hashbookAdd,
});

export const getHashbookAddFailed = (error: string): HashbookAction => ({
  type: HASHBOOK_ADD_FAILED,
  payload: error,
});

export const getHashbookUpdate = (data: {}): HashbookAction => ({
  type: HASHBOOK_UPDATE,
  payload: data,
});

export const getHashbookUpdateSuccess = (
  hashbookUpdate: string
): HashbookAction => ({
  type: HASHBOOK_UPDATE_SUCCESS,
  payload: hashbookUpdate,
});

export const getHashbookUpdateFailed = (error: string): HashbookAction => ({
  type: HASHBOOK_UPDATE_FAILED,
  payload: error,
});

export const getHashbookDelete = (id): HashbookAction => ({
  type: HASHBOOK_DELETE,
  payload: id,
});

export const getHashbookDeleteSuccess = (
  hashbookDelete: string
): HashbookAction => ({
  type: HASHBOOK_DELETE_SUCCESS,
  payload: hashbookDelete,
});

export const getHashbookDeleteFailed = (error: string): HashbookAction => ({
  type: HASHBOOK_DELETE_FAILED,
  payload: error,
});

export const getHashbookAuthor = () => ({
  type: HASHBOOK_AUTHOR,
  payload: {},
});

export const getHashbookAuthorSuccess = (hashbookAuthor: string) => ({
  type: HASHBOOK_AUTHOR_SUCCESS,
  payload: hashbookAuthor,
});

export const getHashbookAuthorFailed = (error: string) => ({
  type: HASHBOOK_AUTHOR_FAILED,
  payload: error,
});

export const getHashbookCommentAdd = (data: {}): HashbookAction => ({
  type: HASHBOOK_CREATE_COMMENT,
  payload: data,
});

export const getHashbookCommentAddSuccess = (
  hashbookAdd: string
): HashbookAction => ({
  type: HASHBOOK_CREATE_COMMENT_SUCCESS,
  payload: hashbookAdd,
});

export const getHashbookCommentAddFailed = (error: string): HashbookAction => ({
  type: HASHBOOK_CREATE_COMMENT_FAILED,
  payload: error,
});

export const getHashbookCommentDetails = (data: {}): HashbookAction => ({
  type: HASHBOOK_COMMENT_DETAILS,
  payload: data,
});

export const getHashbookCommentDetailsSuccess = (
  hashbookAdd: string
): HashbookAction => ({
  type: HASHBOOK_COMMENT_DETAILS_SUCCESS,
  payload: hashbookAdd,
});

export const getHashbookCommentDetailsFailed = (
  error: string
): HashbookAction => ({
  type: HASHBOOK_COMMENT_DETAILS_FAILED,
  payload: error,
});

export const getHashbookSubTopicAdd = (data: {}): HashbookAction => ({
  type: HASHBOOK_SUBTOPIC,
  payload: data,
});

export const getHashbookSubTopicAddSuccess = (
  subTopicAdd: string
): HashbookAction => ({
  type: HASHBOOK_SUBTOPIC_SUCCESS,
  payload: subTopicAdd,
});

export const getHashbookSubTopicAddFailed = (
  error: string
): HashbookAction => ({
  type: HASHBOOK_SUBTOPIC_FAILED,
  payload: error,
});
