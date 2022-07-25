// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { fetchJSON } from "../../helpers/api";
import { ApiCall } from "../../services/index";
import { endpoints } from "../../services/endpoints";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  EMPLOYEE_LIST,
  EMPLOYEE_ADD,
  EMPLOYEE_LOGIN,
  EMPLOYEE_UPDATE,
  EMPLOYEE_DELETE,
  RESIGNED_EMPLOYEE_LIST,
  EMPLOYEE_SKILL_LIST,
  EMPLOYEE_SKILL_ADD,
  EMPLOYEE_SKILL_DELETE,
  EMPLOYEE_SKILL_REVIEW,
  EMPLOYEE_PROFILE_ADD,
  EMPLOYEE_LIST_USER,
  EMPLOYEE_PERFORMANCE,
  EMPLOYEE_RESET_OVERTIME,
  EMPLOYEE_UPDATE_MANDATORY,
  EMPLOYEE_WARNING,
  PERFROMANCE_UPDATE,
} from "./constants";

import {
  getEmployeeListSuccess,
  getEmployeeListFailed,
  getEmployeeAddSuccess,
  getEmployeeAddFailed,
  getEmployeeUpdateSuccess,
  getEmployeeUpdateFailed,
  getEmployeeDeleteSuccess,
  getEmployeeDeleteFailed,
  getResignedEmployeeListSuccess,
  getResignedEmployeeListFailed,
  getEmployeeListSkillSuccess,
  getEmployeeListSkillFailed,
  getEmployeeSkillAddSuccess,
  getEmployeeSkillAddFailed,
  getEmployeeSkillList,
  getEmployeeSkillDeleteFailed,
  getEmployeeSkillDeleteSuccess,
  getEmployeeSkillReviewSuccess,
  getEmployeeSkillReviewFailed,
  getEmployeeProfileAddSuccess,
  getEmployeeProfileAddFailed,
  getEmployeeLoginSuccess,
  getEmployeeLoginFailed,
  getEmployeePerformanceSuccess,
  getEmployeePerformanceFailed,
  getEmployeeResetOvertimeSuccess,
  getEmployeeResetOvertimeFailed,
  getEmployeeUpdateMandatorySuccess,
  getEmployeeUpdateMandatoryFailed,
  getEmployeeWarningSuccess,
  getEmployeeWarningFailed,
  getPerformanceUpdateSuccess,
  getPerformanceUpdateFailed,
} from "./actions";

import { getLoggedInUser } from "../../helpers/authUtils";

const employeeAddedSucsess = () =>
  toast.success("Employee Added Successfully", { transition: Zoom });
const performanceUpdatedSucsess = () =>
  toast.success("Updated Successfully", { transition: Zoom });
const employeeWarning = () =>
  toast.success("Employee Warning Updated Succss", { transition: Zoom });
const employeelogin = () =>
  toast.success("Logged in as employee Successfully", { transition: Zoom });
const employeeImageAddedSucsess = () =>
  toast.success("Employee Image Added Successfully", { transition: Zoom });
const employeeSkillAddedSucsess = () =>
  toast.success("Employee Skill Added Successfully", { transition: Zoom });
const employeeDeletedSuccess = () =>
  toast.success("Employee Deleted Successfully", { transition: Zoom });
const employeeSkillDeletedSuccess = () =>
  toast.success("Employee Skill Deleted Successfully", { transition: Zoom });
const employeeUpdated = () =>
  toast.info("Employee Updated Successfully", { transition: Zoom });
const emptyAllFields = () =>
  toast.warning("Please Fill All Fields", { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });

const setSession = (user) => {
  if (user) {
    let cookies = new Cookies();
    cookies.remove("employee", { path: "/" });
    window.open(window.location.origin + "/employee/dashboard", "_blank", "");
    cookies.set("employee", JSON.stringify(user), { path: "/" });
    employeelogin();
  } else {
    WarnFields("Invalid User");
  }
};

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* EmployeeList() {
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
    url: endpoints.employeeList,
    // data: sendData
  };

  try {
    const response = yield call(ApiCall, options);

    yield put(getEmployeeListSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        WarnFields(message);
        break;
      case 401:
        message = "Invalid credentials";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getEmployeeListFailed(message));
  }
}
function* UserEmployeeList() {
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
    url: endpoints.useremployeeList,
    // data: sendData
  };

  try {
    const response = yield call(ApiCall, options);

    yield put(getEmployeeListSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        WarnFields(message);
        break;
      case 401:
        message = "Invalid credentials";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getEmployeeListFailed(message));
  }
}

// Employee Add

function* EmployeeAdd({ payload: data }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.employeeAdd,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    if (response.data.status === false) {
      WarnFields(response.data.message);
    } else {
      console.log(response);
      employeeAddedSucsess();
      yield put(getEmployeeAddSuccess(response.data));
    }
  } catch (error) {
    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        WarnFields(message);
        break;
      case 401:
        message = "Invalid credentials";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getEmployeeAddFailed(message));
  }
}
function* EmployeeLogin({ payload: data }) {
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.employeeLogin,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    if (response.data.status === false) {
      WarnFields(response.data.message);
    } else {
      setSession(response.data);
      yield put(getEmployeeLoginSuccess(response.data));
    }
  } catch (error) {
    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        WarnFields(message);
        break;
      case 401:
        message = "Invalid credentials";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getEmployeeLoginFailed(message));
  }
}

// Employee Update

function* EmployeeUpdate({ payload: data }) {
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "PUT",
    url: endpoints.employeeUpdate + "/" + data.id,
    data: data.data,
  };

  try {
    const response = yield call(ApiCall, options);
    employeeUpdated();
    yield put(getEmployeeUpdateSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        WarnFields(message);
        break;
      case 401:
        message = "Invalid credentials";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getEmployeeUpdateFailed(message));
  }
}

// Employee Delete

function* EmployeeDelete({ payload: id }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "DELETE",
    url: endpoints.employeeDelete + "/" + id,
  };

  try {
    const response = yield call(ApiCall, options);
    employeeDeletedSuccess();
    yield put(getEmployeeDeleteSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        WarnFields(message);
        break;
      case 401:
        message = "Invalid credentials";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getEmployeeDeleteFailed(message));
  }
}

//Resigned Employee List
function* ResignedEmployeeList() {
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
    url: endpoints.resignedemployeeList,
    // data: sendData
  };

  try {
    const response = yield call(ApiCall, options);
    console.log(response);
    yield put(getResignedEmployeeListSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        WarnFields(message);
        break;
      case 401:
        message = "Invalid credentials";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getResignedEmployeeListFailed(message));
  }
}

//Employee Skill List
function* EmployeeSkillList({ payload: id }) {
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
    url: endpoints.employeeskillList + "/" + id,
    // data: sendData
  };

  try {
    const response = yield call(ApiCall, options);

    yield put(getEmployeeListSkillSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        WarnFields(message);
        break;
      case 401:
        message = "Invalid credentials";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getEmployeeListSkillFailed(message));
  }
}

// Employee Skill Add

function* EmployeeSkillAdd({ payload: data }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.employeeskillAdd,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    employeeSkillAddedSucsess();
    getEmployeeSkillList();
    yield put(getEmployeeSkillAddSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        WarnFields(message);
        break;
      case 401:
        message = "Invalid credentials";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getEmployeeSkillAddFailed(message));
  }
}

// Employee Skill Delete

function* EmployeeSkillDelete({ payload: id }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "DELETE",
    url: endpoints.employeeskillDelete + "/" + id,
  };

  try {
    const response = yield call(ApiCall, options);
    employeeSkillDeletedSuccess();
    yield put(getEmployeeSkillDeleteSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        WarnFields(message);
        break;
      case 401:
        message = "Invalid credentials";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getEmployeeSkillDeleteFailed(message));
  }
}

// Employee Skill Review

function* EmployeeSkillReview({ payload: data }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.employeeskillReview,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    getEmployeeSkillList();
    yield put(getEmployeeSkillReviewSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        WarnFields(message);
        break;
      case 401:
        message = "Invalid credentials";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getEmployeeSkillReviewFailed(message));
  }
}

// Employee Image Add

function* EmployeeImageAdd({ payload: data }) {
  const user = getLoggedInUser();

  const id = data.get("id");

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.employeeProfileUpload + "/" + id,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    employeeImageAddedSucsess();
    yield put(getEmployeeProfileAddSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        WarnFields(message);
        break;
      case 401:
        message = "Invalid credentials";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getEmployeeProfileAddFailed(message));
  }
}

//Employee Performance

function* EmployeePerformaceList({ payload: data }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
    url: endpoints.getEmployeePerformance + "/" + data,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    if (response.data.status === false) {
      WarnFields(response.data.message);
    } else {
      // resetHour();
      yield put(getEmployeePerformanceSuccess(response.data));
    }
  } catch (error) {
    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        WarnFields(message);
        break;
      case 401:
        message = "Invalid credentials";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getEmployeePerformanceFailed(message));
  }
}

//Reset Hour

function* EmployeeResetOverTime({ payload: data }) {
  let send={
    "work_id":data
  }
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.resetOvertime,
    data: send,
  };

  try {
    const response = yield call(ApiCall, options);
    if (response.data.status === false) {
      WarnFields(response.data.message);
    } else {
      // resetHour();
      yield put(getEmployeeResetOvertimeSuccess(response.data));
    }
  } catch (error) {
    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        WarnFields(message);
        break;
      case 401:
        message = "Invalid credentials";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getEmployeeResetOvertimeFailed(message));
  }
}

//Performance Update

function* EmployeePerformaceUpdate({ payload: data }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.updateMandatory,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    if (response.data.status === false) {
      WarnFields(response.data.message);
    } else {
      yield put(getEmployeeUpdateMandatorySuccess(response.data));
    }
  } catch (error) {
    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        WarnFields(message);
        break;
      case 401:
        message = "Invalid credentials";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getEmployeeUpdateMandatoryFailed(message));
  }
}

//Employee Warning


function* EmployeeWarning({ payload: data }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.manageWarning,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    if (response.data.status === false) {
      WarnFields(response.data.message);
    } else {
      employeeWarning();
      yield put(getEmployeeWarningSuccess(response.data));
    }
  } catch (error) {
    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        WarnFields(message);
        break;
      case 401:
        message = "Invalid credentials";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getEmployeeWarningFailed(message));
  }
}


// Performance Update

function* PerformanceUpdate({ payload: data }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "PUT",
    url: endpoints.performanceUpdate + '/' + 2,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    if (response.data.status === false) {
      WarnFields(response.data.message);
    } else {
      performanceUpdatedSucsess();
      yield put(getPerformanceUpdateSuccess(response.data));
    }
  } catch (error) {
    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        WarnFields(message);
        break;
      case 401:
        message = "Invalid credentials";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getPerformanceUpdateFailed(message));
  }
}



export function* watchEmployeeList(): any {
  yield takeEvery(EMPLOYEE_LIST, EmployeeList);
}
export function* watchEmployeeListUser(): any {
  yield takeEvery(EMPLOYEE_LIST_USER, UserEmployeeList);
}
export function* watchEmployeeAdd(): any {
  yield takeEvery(EMPLOYEE_ADD, EmployeeAdd);
}
export function* watchEmployeeLogin(): any {
  yield takeEvery(EMPLOYEE_LOGIN, EmployeeLogin);
}
export function* watchEmployeeUpdate(): any {
  yield takeEvery(EMPLOYEE_UPDATE, EmployeeUpdate);
}
export function* watchEmployeeDelete(): any {
  yield takeEvery(EMPLOYEE_DELETE, EmployeeDelete);
}
export function* watchResignedEmployeeList(): any {
  yield takeEvery(RESIGNED_EMPLOYEE_LIST, ResignedEmployeeList);
}
export function* watchSkillEmployeeList(): any {
  yield takeEvery(EMPLOYEE_SKILL_LIST, EmployeeSkillList);
}
export function* watchEmployeeSkillAdd(): any {
  yield takeEvery(EMPLOYEE_SKILL_ADD, EmployeeSkillAdd);
}
export function* watchEmployeeSkillDelete(): any {
  yield takeEvery(EMPLOYEE_SKILL_DELETE, EmployeeSkillDelete);
}
export function* watchEmployeeSkillReview(): any {
  yield takeEvery(EMPLOYEE_SKILL_REVIEW, EmployeeSkillReview);
}
export function* watchEmployeeProfileUpload(): any {
  yield takeEvery(EMPLOYEE_PROFILE_ADD, EmployeeImageAdd);
}
export function* watchEmployeePerformanceList(): any {
  yield takeEvery(EMPLOYEE_PERFORMANCE, EmployeePerformaceList);
}
export function* watchEmployeeResetOverTime(): any {
  yield takeEvery(EMPLOYEE_RESET_OVERTIME, EmployeeResetOverTime);
}
export function* watchEmployeePerformaceUpdate(): any {
  yield takeEvery(EMPLOYEE_UPDATE_MANDATORY, EmployeePerformaceUpdate);
}
export function* watchEmployeeWarning(): any {
  yield takeEvery(EMPLOYEE_WARNING, EmployeeWarning);
}
export function* watchPerformanceUpdate(): any {
  yield takeEvery(PERFROMANCE_UPDATE, PerformanceUpdate);
}

function* authSaga(): any {
  yield all([
    fork(watchEmployeeList),
    fork(watchEmployeeListUser),
    fork(watchEmployeeAdd),
    fork(watchEmployeeLogin),
    fork(watchEmployeeUpdate),
    fork(watchEmployeeDelete),
    fork(watchResignedEmployeeList),
    fork(watchSkillEmployeeList),
    fork(watchEmployeeSkillAdd),
    fork(watchEmployeeSkillDelete),
    fork(watchEmployeeSkillReview),
    fork(watchEmployeeProfileUpload),
    fork(watchEmployeePerformanceList),
    fork(watchEmployeeResetOverTime),
    fork(watchEmployeePerformaceUpdate),
    fork(watchEmployeeWarning),
    fork(watchPerformanceUpdate),
  ]);
}

export default authSaga;
