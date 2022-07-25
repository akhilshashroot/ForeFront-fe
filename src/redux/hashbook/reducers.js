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

import { getLoggedInUser } from "../../helpers/authUtils";

const INIT_STATE = {
  user: getLoggedInUser(),
  loading: false,
};

type HashbookAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const Hashbook = (state: State = INIT_STATE, action: HashbookAction) => {
  switch (action.type) {
    case HASHBOOK_LIST:
      return { ...state, listloading: true };
    case HASHBOOK_LIST_SUCCESS:
      return {
        ...state,
        hashbook: action.payload,
        listloading: false,
        error: null,
      };
    case HASHBOOK_LIST_FAILED:
      return { ...state, error: action.payload, loading: false };
    case HASHBOOK_ADD:
      return { ...state, loading: true };
    case HASHBOOK_ADD_SUCCESS:
      return {
        ...state,
        hashbookAdd: action.payload,
        loading: false,
        error: null,
      };
    case HASHBOOK_ADD_FAILED:
      return { ...state, error: action.payload, loading: false };
    case HASHBOOK_UPDATE:
      return { ...state, loading: true };
    case HASHBOOK_UPDATE_SUCCESS:
      return {
        ...state,
        hashbookUpdate: action.payload,
        loading: false,
        error: null,
      };
    case HASHBOOK_UPDATE_FAILED:
      return { ...state, error: action.payload, loading: false };
    case HASHBOOK_DELETE:
      return { ...state, loading: true };
    case HASHBOOK_DELETE_SUCCESS:
      return {
        ...state,
        hashbookDelete: action.payload,
        loading: false,
        error: null,
      };
    case HASHBOOK_DELETE_FAILED:
      return { ...state, error: action.payload, loading: false };
    case HASHBOOK_AUTHOR:
      return { ...state, loading: true };
    case HASHBOOK_AUTHOR_SUCCESS:
      return {
        ...state,
        hashbookAuthor: action.payload,
        loading: false,
        error: null,
      };
    case HASHBOOK_AUTHOR_FAILED:
      return { ...state, error: action.payload, loading: false };
    case HASHBOOK_CREATE_COMMENT:
      return { ...state, loading: true };
    case HASHBOOK_CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        hashbookCommentAdd: action.payload,
        loading: false,
        error: null,
      };
    case HASHBOOK_CREATE_COMMENT_FAILED:
      return { ...state, error: action.payload, loading: false };
    case HASHBOOK_COMMENT_DETAILS:
      return { ...state, loading: true };
    case HASHBOOK_COMMENT_DETAILS_SUCCESS:
      return {
        ...state,
        hashbookCommentDetails: action.payload,
        loading: false,
        error: null,
      };
    case HASHBOOK_COMMENT_DETAILS_FAILED:
      return { ...state, error: action.payload, loading: false };
    case HASHBOOK_SUBTOPIC:
      return { ...state, loading: true };
    case HASHBOOK_SUBTOPIC_SUCCESS:
      return {
        ...state,
        hashbookSubTopicAdd: action.payload,
        loading: false,
        error: null,
      };
    case HASHBOOK_SUBTOPIC_FAILED:
      return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default Hashbook;
