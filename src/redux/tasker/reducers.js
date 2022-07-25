// @flow
import {
  TASKER_LIST,
  TASKER_LIST_SUCCESS,
  TASKER_LIST_FAILED,
  TASKER_ADD,
  TASKER_ADD_SUCCESS,
  TASKER_ADD_FAILED,
  TASKER_UPDATE,
  TASKER_UPDATE_SUCCESS,
  TASKER_UPDATE_FAILED,
  TASKER_DELETE,
  TASKER_DELETE_SUCCESS,
  TASKER_DELETE_FAILED,
  TASKER_COMMENT,
  TASKER_COMMENT_SUCCESS,
  TASKER_COMMENT_FAILED,
} from "./constants";

import { getLoggedInUser } from "../../helpers/authUtils";

const INIT_STATE = {
  user: getLoggedInUser(),
  loading: false,
};

type TaskerAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const Tasker = (state: State = INIT_STATE, action: TaskerAction) => {
  switch (action.type) {
    case TASKER_LIST:
      return { ...state, listloading: true };
    case TASKER_LIST_SUCCESS:
      return {
        ...state,
        tasker: action.payload,
        listloading: false,
        error: null,
      };
    case TASKER_LIST_FAILED:
      return { ...state, error: action.payload, loading: false };
    case TASKER_ADD:
      return { ...state, loading: true };
    case TASKER_ADD_SUCCESS:
      return {
        ...state,
        taskerAdd: action.payload,
        loading: false,
        error: null,
      };
    case TASKER_ADD_FAILED:
      return { ...state, error: action.payload, loading: false };
    case TASKER_UPDATE:
      return { ...state, loading: true };
    case TASKER_UPDATE_SUCCESS:
      return {
        ...state,
        taskerUpdate: action.payload,
        loading: false,
        error: null,
      };
    case TASKER_UPDATE_FAILED:
      return { ...state, error: action.payload, loading: false };
    case TASKER_DELETE:
      return { ...state, loading: true };
    case TASKER_DELETE_SUCCESS:
      return {
        ...state,
        taskerDelete: action.payload,
        loading: false,
        error: null,
      };
    case TASKER_DELETE_FAILED:
      return { ...state, error: action.payload, loading: false };
    case TASKER_COMMENT:
      return { ...state, loading: true };
    case TASKER_COMMENT_SUCCESS:
      return {
        ...state,
        taskerComment: action.payload,
        loading: false,
        error: null,
      };
    case TASKER_COMMENT_FAILED:
      return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default Tasker;
