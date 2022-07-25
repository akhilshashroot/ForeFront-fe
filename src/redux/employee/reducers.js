// @flow
import {
  EMPLOYEE_LIST,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_LIST_FAILED,
  EMPLOYEE_ADD,
  EMPLOYEE_ADD_SUCCESS,
  EMPLOYEE_ADD_FAILED,
  EMPLOYEE_UPDATE,
  EMPLOYEE_UPDATE_SUCCESS,
  EMPLOYEE_UPDATE_FAILED,
  EMPLOYEE_DELETE,
  EMPLOYEE_DELETE_SUCCESS,
  EMPLOYEE_DELETE_FAILED,
  RESIGNED_EMPLOYEE_LIST,
  RESIGNED_EMPLOYEE_LIST_SUCCESS,
  RESIGNED_EMPLOYEE_LIST_FAILED,
  EMPLOYEE_SKILL_LIST,
  EMPLOYEE_SKILL_LIST_SUCCESS,
  EMPLOYEE_SKILL_LIST_FAILED,
  EMPLOYEE_SKILL_ADD,
  EMPLOYEE_SKILL_ADD_SUCCESS,
  EMPLOYEE_SKILL_ADD_FAILED,
  EMPLOYEE_SKILL_DELETE,
  EMPLOYEE_SKILL_DELETE_SUCCESS,
  EMPLOYEE_SKILL_DELETE_FAILED,
  EMPLOYEE_SKILL_REVIEW,
  EMPLOYEE_SKILL_REVIEW_SUCCESS,
  EMPLOYEE_SKILL_REVIEW_FAILED,
  EMPLOYEE_PROFILE_ADD,
  EMPLOYEE_PROFILE_ADD_SUCCESS,
  EMPLOYEE_PROFILE_ADD_FAILED,
  EMPLOYEE_LIST_USER,
  EMPLOYEE_LOGIN,
  EMPLOYEE_LOGIN_SUCCESS,
  EMPLOYEE_LOGIN_FAILED,
  EMPLOYEE_PERFORMANCE,
  EMPLOYEE_PERFORMANCE_FAILED,
  EMPLOYEE_PERFORMANCE_SUCCESS,
  EMPLOYEE_RESET_OVERTIME,
  EMPLOYEE_RESET_OVERTIME_SUCCESS,
  EMPLOYEE_RESET_OVERTIME_FAILED,
  EMPLOYEE_UPDATE_MANDATORY,
  EMPLOYEE_UPDATE_MANDATORY_SUCCESS,
  EMPLOYEE_UPDATE_MANDATORY_FAILED,
  EMPLOYEE_WARNING,
  EMPLOYEE_WARNING_SUCCESS,
  EMPLOYEE_WARNING_FAILED,
  PERFROMANCE_UPDATE,
  PERFROMANCE_UPDATE_SUCCESS,
  PERFROMANCE_UPDATE_FAILED,
} from "./constants";

import { getLoggedInUser } from "../../helpers/authUtils";

const INIT_STATE = {
  user: getLoggedInUser(),
  loading: false,
};

type EmployeeAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const Employee = (state: State = INIT_STATE, action: EmployeeAction) => {
  switch (action.type) {
    case EMPLOYEE_LIST:
      return { ...state, listloading: true };
    case EMPLOYEE_LIST_USER:
      return { ...state, listloading: true };
    case EMPLOYEE_LIST_SUCCESS:
      return {
        ...state,
        employee: action.payload,
        listloading: false,
        error: null,
      };
    case EMPLOYEE_LIST_FAILED:
      return { ...state, error: action.payload, loading: false };
    case EMPLOYEE_ADD:
      return { ...state, loading: true };
    case EMPLOYEE_ADD_SUCCESS:
      return {
        ...state,
        employeeAdd: action.payload,
        loading: false,
        error: null,
      };
    case EMPLOYEE_ADD_FAILED:
      return { ...state, error: action.payload, loading: false };
    case EMPLOYEE_UPDATE:
      return { ...state, loading: true };
    case EMPLOYEE_UPDATE_SUCCESS:
      return {
        ...state,
        employeeUpdate: action.payload,
        loading: false,
        error: null,
      };
    case EMPLOYEE_UPDATE_FAILED:
      return { ...state, error: action.payload, loading: false };
    case EMPLOYEE_DELETE:
      return { ...state, loading: true };
    case EMPLOYEE_DELETE_SUCCESS:
      return {
        ...state,
        employeeDelete: action.payload,
        loading: false,
        error: null,
      };
    case EMPLOYEE_DELETE_FAILED:
      return { ...state, error: action.payload, loading: false };
    case RESIGNED_EMPLOYEE_LIST:
      return { ...state, listloading: true };
    case RESIGNED_EMPLOYEE_LIST_SUCCESS:
      return {
        ...state,
        employee: action.payload,
        listloading: false,
        error: null,
      };
    case RESIGNED_EMPLOYEE_LIST_FAILED:
      return { ...state, error: action.payload, loading: false };
    case EMPLOYEE_SKILL_LIST:
      return { ...state };
    case EMPLOYEE_SKILL_LIST_SUCCESS:
      return {
        ...state,
        employeeskill: action.payload,
        error: null,
      };
    case EMPLOYEE_SKILL_LIST_FAILED:
      return { ...state, error: action.payload, loading: false };
    case EMPLOYEE_SKILL_ADD:
      return { ...state, loading: true };
    case EMPLOYEE_SKILL_ADD_SUCCESS:
      return {
        ...state,
        employeeSkillAdd: action.payload,
        loading: false,
        error: null,
      };
    case EMPLOYEE_SKILL_ADD_FAILED:
      return { ...state, error: action.payload, loading: false };
    case EMPLOYEE_SKILL_DELETE:
      return { ...state, loading: true };
    case EMPLOYEE_SKILL_DELETE_SUCCESS:
      return {
        ...state,
        employeeSkillDelete: action.payload,
        loading: false,
        error: null,
      };
    case EMPLOYEE_SKILL_DELETE_FAILED:
      return { ...state, error: action.payload, loading: false };
    case EMPLOYEE_SKILL_REVIEW:
      return { ...state, loading: true };
    case EMPLOYEE_SKILL_REVIEW_SUCCESS:
      return {
        ...state,
        employeeSkillReviewAdd: action.payload,
        loading: false,
        error: null,
      };
    case EMPLOYEE_SKILL_REVIEW_FAILED:
      return { ...state, error: action.payload, loading: false };
    case EMPLOYEE_PROFILE_ADD:
      return { ...state, loading1: true };
    case EMPLOYEE_PROFILE_ADD_SUCCESS:
      return {
        ...state,
        employeeProfileAdd: action.payload,
        loading1: false,
        error: null,
      };
    case EMPLOYEE_PROFILE_ADD_FAILED:
      return { ...state, error: action.payload, loading1: false };
    case EMPLOYEE_LOGIN:
      return { ...state, loading: true };
    case EMPLOYEE_LOGIN_SUCCESS:
      return {
        ...state,
        employeeLogin: action.payload,
        loading: false,
        error: null,
      };
    case EMPLOYEE_LOGIN_FAILED:
      return { ...state, error: action.payload, loading: false };
    case EMPLOYEE_PERFORMANCE:
      return { ...state, loading: true };
    case EMPLOYEE_PERFORMANCE_SUCCESS:
      return {
        ...state,
        employeePerformance: action.payload,
        loading: false,
        error: null,
      };
    case EMPLOYEE_PERFORMANCE_FAILED:
      return { ...state, error: action.payload, loading: false };
    case EMPLOYEE_RESET_OVERTIME:
      return { ...state, loading: true };
    case EMPLOYEE_RESET_OVERTIME_SUCCESS:
      return {
        ...state,
        employeeResetOvertime: action.payload,
        loading: false,
        error: null,
      };
    case EMPLOYEE_RESET_OVERTIME_FAILED:
      return { ...state, error: action.payload, loading: false };
    case EMPLOYEE_UPDATE_MANDATORY:
      return { ...state, loading: true };
    case EMPLOYEE_UPDATE_MANDATORY_SUCCESS:
      return {
        ...state,
        employeeUpdateMandatory: action.payload,
        loading: false,
        error: null,
      };
    case EMPLOYEE_UPDATE_MANDATORY_FAILED:
      return { ...state, error: action.payload, loading: false };
    case EMPLOYEE_WARNING:
      return { ...state, loading: true };
    case EMPLOYEE_WARNING_SUCCESS:
      return {
        ...state,
        employeeWarning: action.payload,
        loading: false,
        error: null,
      };
    case EMPLOYEE_WARNING_FAILED:
      return { ...state, error: action.payload, loading: false };
    case PERFROMANCE_UPDATE:
      return { ...state, loading: true };
    case PERFROMANCE_UPDATE_SUCCESS:
      return {
        ...state,
        performanceUpdate: action.payload,
        loading: false,
        error: null,
      };
    case PERFROMANCE_UPDATE_FAILED:
      return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default Employee;
