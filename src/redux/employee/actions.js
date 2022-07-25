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
  EMPLOYEE_UPDATE_MANDATORY,
  EMPLOYEE_UPDATE_MANDATORY_SUCCESS,
  EMPLOYEE_UPDATE_MANDATORY_FAILED,
  EMPLOYEE_PERFORMANCE,
  EMPLOYEE_PERFORMANCE_SUCCESS,
  EMPLOYEE_PERFORMANCE_FAILED,
  EMPLOYEE_RESET_OVERTIME,
  EMPLOYEE_RESET_OVERTIME_SUCCESS,
  EMPLOYEE_RESET_OVERTIME_FAILED,
  EMPLOYEE_WARNING,
  EMPLOYEE_WARNING_SUCCESS,
  EMPLOYEE_WARNING_FAILED,
  PERFROMANCE_UPDATE,
  PERFROMANCE_UPDATE_SUCCESS,
  PERFROMANCE_UPDATE_FAILED,
} from "./constants";

type EmployeeAction = { type: string, payload: {} | string };

export const getEmployeeList = (): EmployeeAction => ({
  type: EMPLOYEE_LIST,
  payload: {},
});
export const getEmployeeListUser = (): EmployeeAction => ({
  type: EMPLOYEE_LIST_USER,
  payload: {},
});

export const getEmployeeListSuccess = (employee: string): EmployeeAction => ({
  type: EMPLOYEE_LIST_SUCCESS,
  payload: employee,
});

export const getEmployeeListFailed = (error: string): EmployeeAction => ({
  type: EMPLOYEE_LIST_FAILED,
  payload: error,
});

export const getEmployeeAdd = (data: {}): EmployeeAction => ({
  type: EMPLOYEE_ADD,
  payload: data,
});

export const getEmployeeAddSuccess = (employeeAdd: string): EmployeeAction => ({
  type: EMPLOYEE_ADD_SUCCESS,
  payload: employeeAdd,
});

export const getEmployeeAddFailed = (error: string): EmployeeAction => ({
  type: EMPLOYEE_ADD_FAILED,
  payload: error,
});

export const getEmployeeUpdate = (data: {},id): EmployeeAction => ({
  type: EMPLOYEE_UPDATE,
  payload: {
    data,
    id
  },
});

export const getEmployeeUpdateSuccess = (
  employeeUpdate: string
): EmployeeAction => ({
  type: EMPLOYEE_UPDATE_SUCCESS,
  payload: employeeUpdate,
});

export const getEmployeeUpdateFailed = (error: string): EmployeeAction => ({
  type: EMPLOYEE_UPDATE_FAILED,
  payload: error,
});

export const getEmployeeDelete = (id): EmployeeAction => ({
  type: EMPLOYEE_DELETE,
  payload: id,
});

export const getEmployeeDeleteSuccess = (
  employeeDelete: string
): EmployeeAction => ({
  type: EMPLOYEE_DELETE_SUCCESS,
  payload: employeeDelete,
});

export const getEmployeeDeleteFailed = (error: string): EmployeeAction => ({
  type: EMPLOYEE_DELETE_FAILED,
  payload: error,
});

export const getResignedEmployeeList = (): EmployeeAction => ({
  type: RESIGNED_EMPLOYEE_LIST,
  payload: {},
});

export const getResignedEmployeeListSuccess = (
  employee: string
): EmployeeAction => ({
  type: RESIGNED_EMPLOYEE_LIST_SUCCESS,
  payload: employee,
});

export const getResignedEmployeeListFailed = (
  error: string
): EmployeeAction => ({
  type: RESIGNED_EMPLOYEE_LIST_FAILED,
  payload: error,
});

export const getEmployeeSkillList = (data): EmployeeAction => ({
  type: EMPLOYEE_SKILL_LIST,
  payload: data,
});

export const getEmployeeListSkillSuccess = (
  employee: string
): EmployeeAction => ({
  type: EMPLOYEE_SKILL_LIST_SUCCESS,
  payload: employee,
});

export const getEmployeeListSkillFailed = (error: string): EmployeeAction => ({
  type: EMPLOYEE_SKILL_LIST_FAILED,
  payload: error,
});

export const getEmployeeSkillAdd = (data: {}): EmployeeAction => ({
  type: EMPLOYEE_SKILL_ADD,
  payload: data,
});

export const getEmployeeSkillAddSuccess = (
  employeeSkillAdd: string
): EmployeeAction => ({
  type: EMPLOYEE_SKILL_ADD_SUCCESS,
  payload: employeeSkillAdd,
});

export const getEmployeeSkillAddFailed = (error: string): EmployeeAction => ({
  type: EMPLOYEE_SKILL_ADD_FAILED,
  payload: error,
});

export const getEmployeeSkillDelete = (id): EmployeeAction => ({
  type: EMPLOYEE_SKILL_DELETE,
  payload: id,
});

export const getEmployeeSkillDeleteSuccess = (
  employeeSkillDelete: string
): EmployeeAction => ({
  type: EMPLOYEE_SKILL_DELETE_SUCCESS,
  payload: employeeSkillDelete,
});

export const getEmployeeSkillDeleteFailed = (
  error: string
): EmployeeAction => ({
  type: EMPLOYEE_SKILL_DELETE_FAILED,
  payload: error,
});

export const getEmployeeSkillReview = (data: {}): EmployeeAction => ({
  type: EMPLOYEE_SKILL_REVIEW,
  payload: data,
});

export const getEmployeeSkillReviewSuccess = (
  employeeSkillReviewAdd: string
): EmployeeAction => ({
  type: EMPLOYEE_SKILL_REVIEW_SUCCESS,
  payload: employeeSkillReviewAdd,
});

export const getEmployeeSkillReviewFailed = (
  error: string
): EmployeeAction => ({
  type: EMPLOYEE_SKILL_REVIEW_FAILED,
  payload: error,
});

export const getEmployeeProfileAdd = (data: {}): EmployeeAction => ({
  type: EMPLOYEE_PROFILE_ADD,
  payload: data,
});

export const getEmployeeProfileAddSuccess = (employeeProfileAdd: string): EmployeeAction => ({
  type: EMPLOYEE_PROFILE_ADD_SUCCESS,
  payload: employeeProfileAdd,
});

export const getEmployeeProfileAddFailed = (error: string): EmployeeAction => ({
  type: EMPLOYEE_PROFILE_ADD_FAILED,
  payload: error,
});


export const getEmployeeLogin = (data: {}): EmployeeAction => ({
  type: EMPLOYEE_LOGIN,
  payload: data,
});

export const getEmployeeLoginSuccess = (employeeLogin: string): EmployeeAction => ({
  type: EMPLOYEE_LOGIN_SUCCESS,
  payload: employeeLogin,
});

export const getEmployeeLoginFailed = (error: string): EmployeeAction => ({
  type: EMPLOYEE_LOGIN_FAILED,
  payload: error,
});


export const getEmployeePerformance = (data: {}): EmployeeAction => ({
  type: EMPLOYEE_PERFORMANCE,
  payload: data,
});

export const getEmployeePerformanceSuccess = (employeePerformance: string): EmployeeAction => ({
  type: EMPLOYEE_PERFORMANCE_SUCCESS,
  payload: employeePerformance,
});

export const getEmployeePerformanceFailed = (error: string): EmployeeAction => ({
  type: EMPLOYEE_PERFORMANCE_FAILED,
  payload: error,
});

export const getEmployeeResetOvertime = (data: {}): EmployeeAction => ({
  type: EMPLOYEE_RESET_OVERTIME,
  payload: data,
});

export const getEmployeeResetOvertimeSuccess = (resetOvertime: string): EmployeeAction => ({
  type: EMPLOYEE_RESET_OVERTIME_SUCCESS,
  payload: resetOvertime,
});

export const getEmployeeResetOvertimeFailed = (error: string): EmployeeAction => ({
  type: EMPLOYEE_RESET_OVERTIME_FAILED,
  payload: error,
});

export const getEmployeeUpdateMandatory = (data: {}): EmployeeAction => ({
  type: EMPLOYEE_UPDATE_MANDATORY,
  payload: data,
});

export const getEmployeeUpdateMandatorySuccess = (UpdateMandatory: string): EmployeeAction => ({
  type: EMPLOYEE_UPDATE_MANDATORY_SUCCESS,
  payload: UpdateMandatory,
});

export const getEmployeeUpdateMandatoryFailed = (error: string): EmployeeAction => ({
  type: EMPLOYEE_UPDATE_MANDATORY_FAILED,
  payload: error,
});


export const getEmployeeWarning = (data: {}): EmployeeAction => ({
  type: EMPLOYEE_WARNING,
  payload: data,
});

export const getEmployeeWarningSuccess = (employeeWarning: string): EmployeeAction => ({
  type: EMPLOYEE_WARNING_SUCCESS,
  payload: employeeWarning,
});

export const getEmployeeWarningFailed = (error: string): EmployeeAction => ({
  type: EMPLOYEE_WARNING_FAILED,
  payload: error,
});

export const getPerformanceUpdate = (data: {}): EmployeeAction => ({
  type: PERFROMANCE_UPDATE,
  payload: data,
});

export const getPerformanceUpdateSuccess = (PerformanceUpdate: string): EmployeeAction => ({
  type: PERFROMANCE_UPDATE_SUCCESS,
  payload: PerformanceUpdate,
});

export const getPerformanceUpdateFailed = (error: string): EmployeeAction => ({
  type: PERFROMANCE_UPDATE_FAILED,
  payload: error,
});

