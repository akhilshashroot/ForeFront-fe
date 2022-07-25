// @flow
import {
  SHIFT_LIST,
  SHIFT_LIST_SUCCESS,
  SHIFT_LIST_FAILED,
  SHIFT_ADD,
  SHIFT_ADD_SUCCESS,
  SHIFT_ADD_FAILED,
  SHIFT_UPDATE,
  SHIFT_UPDATE_SUCCESS,
  SHIFT_UPDATE_FAILED,
  SHIFT_DELETE,
  SHIFT_DELETE_SUCCESS,
  SHIFT_DELETE_FAILED,
  TEAM_MEMBERS_LIST,
  TEAM_MEMBERS_LIST_SUCCESS,
  TEAM_MEMBERS_LIST_FAILED,
  SHIFT_CREATE,
  SHIFT_CREATE_SUCCESS,
  SHIFT_CREATE_FAILED,
  GET_WEEKS_LIST,
  GET_WEEKS_LIST_SUCCESS,
  GET_WEEKS_LIST_FAILED,
  GET_PREVIOUS_SHIFT,
  GET_PREVIOUS_SHIFT_SUCCESS,
  GET_PREVIOUS_SHIFT_FAILED,
  SHIFT_EDIT,
  SHIFT_EDIT_SUCCESS,
  SHIFT_EDIT_FAILED,
  SHIFT_SWAP,
  SHIFT_SWAP_SUCCESS,
  SHIFT_SWAP_FAILED,
  SWAP_DELETE,
  SWAP_DELETE_SUCCESS,
  SWAP_DELETE_FAILED,
  SHIFT_COMMENT_EDIT,
  SHIFT_COMMENT_EDIT_SUCCESS,
  SHIFT_COMMENT_EDIT_FAILED,
  SHIFT_PREVIEW,
  SHIFT_PREVIEW_SUCCESS,
  SHIFT_PREVIEW_FAILED,
  FIRST_SHIFT_EDIT,
  FIRST_SHIFT_EDIT_SUCCESS,
  FIRST_SHIFT_EDIT_FAILED,
  FIRST_SHIFT_SWAP,
  FIRST_SHIFT_SWAP_SUCCESS,
  FIRST_SHIFT_SWAP_FAILED,
} from "./constants";

import { getLoggedInUser } from "../../helpers/authUtils";

const INIT_STATE = {
  user: getLoggedInUser(),
  loading: false,
};

type ShiftAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const Shift = (state: State = INIT_STATE, action: ShiftAction) => {
  switch (action.type) {
    case TEAM_MEMBERS_LIST:
      return { ...state, listloading: true };
    case TEAM_MEMBERS_LIST_SUCCESS:
      return {
        ...state,
        team: action.payload,
        listloading: false,
        error: null,
      };
    case TEAM_MEMBERS_LIST_FAILED:
      return { ...state, error: action.payload, loading: false };
    case SHIFT_CREATE:
      return { ...state, loading: true };
    case SHIFT_CREATE_SUCCESS:
      return {
        ...state,
        shiftCreate: action.payload,
        loading: false,
        error: null,
      };
    case SHIFT_CREATE_FAILED:
      return { ...state, error: action.payload, loading: false };
    case GET_WEEKS_LIST:
      return { ...state, listloading: true };
    case GET_WEEKS_LIST_SUCCESS:
      return {
        ...state,
        getWeeks: action.payload,
        listloading: false,
        error: null,
      };
    case GET_WEEKS_LIST_FAILED:
      return { ...state, error: action.payload, loading: false };
    case GET_PREVIOUS_SHIFT:
      return { ...state, listloading: true };
    case GET_PREVIOUS_SHIFT_SUCCESS:
      return {
        ...state,
        getPreviousShift: action.payload,
        listloading: false,
        error: null,
      };
    case GET_PREVIOUS_SHIFT_FAILED:
      return { ...state, error: action.payload, loading: false };
    case SHIFT_EDIT:
      return { ...state, loading: true };
    case SHIFT_EDIT_SUCCESS:
      return {
        ...state,
        shiftEdit: action.payload,
        loading: false,
        error: null,
      };
    case SHIFT_EDIT_FAILED:
      return { ...state, error: action.payload, loading: false };
    case FIRST_SHIFT_EDIT:
      return { ...state, loading: true };
    case FIRST_SHIFT_EDIT_SUCCESS:
      return {
        ...state,
        firstShiftEdit: action.payload,
        loading: false,
        error: null,
      };
    case FIRST_SHIFT_EDIT_FAILED:
      return { ...state, error: action.payload, loading: false };
    case SHIFT_SWAP:
      return { ...state, loading: true };
    case SHIFT_SWAP_SUCCESS:
      return {
        ...state,
        shiftSwap: action.payload,
        loading: false,
        error: null,
      };
    case SHIFT_SWAP_FAILED:
      return { ...state, error: action.payload, loading: false };
    case FIRST_SHIFT_SWAP:
      return { ...state, loading: true };
    case FIRST_SHIFT_SWAP_SUCCESS:
      return {
        ...state,
        firstShiftSwap: action.payload,
        loading: false,
        error: null,
      };
    case FIRST_SHIFT_SWAP_FAILED:
      return { ...state, error: action.payload, loading: false };
    case SWAP_DELETE:
      return { ...state, loading: true };
    case SWAP_DELETE_SUCCESS:
      return {
        ...state,
        swapDelete: action.payload,
        loading: false,
        error: null,
      };
    case SWAP_DELETE_FAILED:
      return { ...state, error: action.payload, loading: false };

    case SHIFT_ADD:
      return { ...state, loading: true };
    case SHIFT_ADD_SUCCESS:
      return {
        ...state,
        departmentAdd: action.payload,
        loading: false,
        error: null,
      };
    case SHIFT_ADD_FAILED:
      return { ...state, error: action.payload, loading: false };
    case SHIFT_UPDATE:
      return { ...state, loading: true };
    case SHIFT_UPDATE_SUCCESS:
      return {
        ...state,
        departmentUpdate: action.payload,
        loading: false,
        error: null,
      };
    case SHIFT_UPDATE_FAILED:
      return { ...state, error: action.payload, loading: false };
    case SHIFT_DELETE:
      return { ...state, loading: true };
    case SHIFT_DELETE_SUCCESS:
      return {
        ...state,
        departmentDelete: action.payload,
        loading: false,
        error: null,
      };
    case SHIFT_DELETE_FAILED:
      return { ...state, error: action.payload, loading: false };

    case SHIFT_COMMENT_EDIT:
      return { ...state };
    case SHIFT_COMMENT_EDIT_SUCCESS:
      return {
        ...state,
        shiftComment: action.payload,
        error: null,
      };
    case SHIFT_COMMENT_EDIT_FAILED:
      return { ...state, error: action.payload };
    case SHIFT_PREVIEW:
      return { ...state, loading: true };
    case SHIFT_PREVIEW_SUCCESS:
      return {
        ...state,
        previewShift: action.payload,
        loading: false,
        error: null,
      };
    case SHIFT_PREVIEW_FAILED:
      return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default Shift;
