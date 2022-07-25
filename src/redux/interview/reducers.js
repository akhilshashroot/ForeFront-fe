// @flow
import {
  INTERVIEW_LIST,
  INTERVIEW_LIST_SUCCESS,
  INTERVIEW_LIST_FAILED,
  INTERVIEW_ADD,
  INTERVIEW_ADD_SUCCESS,
  INTERVIEW_ADD_FAILED,
  INTERVIEW_UPDATE,
  INTERVIEW_UPDATE_SUCCESS,
  INTERVIEW_UPDATE_FAILED,
  INTERVIEW_DELETE,
  INTERVIEW_DELETE_SUCCESS,
  INTERVIEW_DELETE_FAILED,
  COMMENT_ADD,
  COMMENT_ADD_SUCCESS,
  COMMENT_ADD_FAILED,
} from "./constants";

import { getLoggedInUser } from "../../helpers/authUtils";

const INIT_STATE = {
  user: getLoggedInUser(),
  loading: false,
};

type InterviewAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const Interview = (state: State = INIT_STATE, action: InterviewAction) => {
  switch (action.type) {
    case INTERVIEW_LIST:
      return { ...state, listloading: true };
    case INTERVIEW_LIST_SUCCESS:
      return {
        ...state,
        interview: action.payload,
        listloading: false,
        error: null,
      };
    case INTERVIEW_LIST_FAILED:
      return { ...state, error: action.payload, loading: false };
    case INTERVIEW_ADD:
      return { ...state, loading: true };
    case INTERVIEW_ADD_SUCCESS:
      return {
        ...state,
        interviewAdd: action.payload,
        loading: false,
        error: null,
      };
    case INTERVIEW_ADD_FAILED:
      return { ...state, error: action.payload, loading: false };
    case INTERVIEW_UPDATE:
      return { ...state, loading: true };
    case INTERVIEW_UPDATE_SUCCESS:
      return {
        ...state,
        interviewUpdate: action.payload,
        loading: false,
        error: null,
      };
    case INTERVIEW_UPDATE_FAILED:
      return { ...state, error: action.payload, loading: false };
    case INTERVIEW_DELETE:
      return { ...state, loading: true };
    case INTERVIEW_DELETE_SUCCESS:
      return {
        ...state,
        interviewDelete: action.payload,
        loading: false,
        error: null,
      };
    case INTERVIEW_DELETE_FAILED:
      return { ...state, error: action.payload, loading: false };
    case COMMENT_ADD:
      return { ...state, loading: true };
    case COMMENT_ADD_SUCCESS:
      return {
        ...state,
        CommentAdd: action.payload,
        loading: false,
        error: null,
      };
    case COMMENT_ADD_FAILED:
      return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default Interview;
