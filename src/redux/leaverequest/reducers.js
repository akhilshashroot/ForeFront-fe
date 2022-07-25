// @flow
import {
  LEAVEREQUEST_LIST,
  LEAVEREQUEST_LIST_SUCCESS,
  LEAVEREQUEST_LIST_FAILED,
  LEAVEREQUEST_ADD,
  LEAVEREQUEST_ADD_SUCCESS,
  LEAVEREQUEST_ADD_FAILED,
  LEAVEREQUEST_UPDATE,
  LEAVEREQUEST_UPDATE_SUCCESS,
  LEAVEREQUEST_UPDATE_FAILED,
  LEAVEREQUEST_DELETE,
  LEAVEREQUEST_DELETE_SUCCESS,
  LEAVEREQUEST_DELETE_FAILED,
  LEAVEREQUEST_TYPE_LIST,
  LEAVEREQUEST_TYPE_LIST_SUCCESS,
  LEAVEREQUEST_TYPE_LIST_FAILED,
} from "./constants";

import { getLoggedInUser } from "../../helpers/authUtils";

const INIT_STATE = {
  user: getLoggedInUser(),
  loading: false,
};

type LeaverequestAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const Leaverequest = (
  state: State = INIT_STATE,
  action: LeaverequestAction
) => {
  switch (action.type) {
    case LEAVEREQUEST_LIST:
      return { ...state, listloading: true };
    case LEAVEREQUEST_LIST_SUCCESS:
      return {
        ...state,
        leaverequest: action.payload,
        listloading: false,
        error: null,
      };
    case LEAVEREQUEST_LIST_FAILED:
      return { ...state, error: action.payload, loading: false };
    case LEAVEREQUEST_TYPE_LIST:
      return { ...state, listloading: true };
    case LEAVEREQUEST_TYPE_LIST_SUCCESS:
      return {
        ...state,
        leaverequesttype: action.payload,
        listloading: false,
        error: null,
      };
    case LEAVEREQUEST_TYPE_LIST_FAILED:
      return { ...state, error: action.payload, loading: false };
    case LEAVEREQUEST_ADD:
      return { ...state, loading: true };
    case LEAVEREQUEST_ADD_SUCCESS:
      return {
        ...state,
        leaverequestAdd: action.payload,
        loading: false,
        error: null,
      };
    case LEAVEREQUEST_ADD_FAILED:
      return { ...state, error: action.payload, loading: false };
    case LEAVEREQUEST_UPDATE:
      return { ...state, loading: true };
    case LEAVEREQUEST_UPDATE_SUCCESS:
      return {
        ...state,
        leaverequestUpdate: action.payload,
        loading: false,
        error: null,
      };
    case LEAVEREQUEST_UPDATE_FAILED:
      return { ...state, error: action.payload, loading: false };
    case LEAVEREQUEST_DELETE:
      return { ...state, loading: true };
    case LEAVEREQUEST_DELETE_SUCCESS:
      return {
        ...state,
        leaverequestDelete: action.payload,
        loading: false,
        error: null,
      };
    case LEAVEREQUEST_DELETE_FAILED:
      return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default Leaverequest;
