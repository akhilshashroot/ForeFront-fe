// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { fetchJSON } from "../../helpers/api";
import { ApiCall } from "../../services/index";
import { endpoints } from "../../services/endpoints";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DAILY_REPORT_ADD,
  DAILY_REPORT_LIST,
  MONTHLY_REPORT_ADD,
  MONTHLY_REPORT_LIST,
  SKILL_LIST,
  SKILL_UPDATE,
  TICKET_DATA,
  TICKET_LIST,
  TICKET_UPDATE,
  VIEW_REPORT,
  WEEKLY_REPORT_ADD,
  WEEKLY_REPORT_LIST,
  WORKSHEET_TICKET_LIST,
} from "./constants";

import {
  getTicketListSuccess,
  getTicketListFailed,
  getSkillListFailed,
  getSkillListSuccess,
  getSkillUpdateSuccess,
  getSkillUpdateFailed,
  getDailyReportListSuccess,
  getDailyReportListFailed,
  getWeeklyReportListSuccess,
  getWeeklyReportListFailed,
  getMonthlyReportListSuccess,
  getMonthlyReportListFailed,
  getWorksheetTickettListFailed,
  getWorksheetTicketListSuccess,
  getDailyReportAddSuccess,
  getDailyReportAddFailed,
  getWeeklyReportAddSuccess,
  getWeeklyReportAddFailed,
  getMonthlyReportAddFailed,
  getMonthlyReportAddSuccess,
  getTicketUpdateSuccess,
  getTicketUpdateFailed,
  getTicketDataSuccess,
  getTicketDataFailed,
  viewReportListSuccess,
  viewReportListFailed,
} from "./actions";

import { getLoggedInUser } from "../../helpers/authUtils";

const skillUpdateSuccess = () =>
  toast.success("Skill Update Successfully", { transition: Zoom });
const ticketUpdateSuccess = () =>
  toast.success("Ticket Updated Successfully", { transition: Zoom });
const activityAddSuccess = () =>
  toast.success("Saved Successfully", { transition: Zoom });
const weeklyreportDeletedSuccess = () =>
  toast.success("Weeklyreport Deleted Successfully", { transition: Zoom });
const weeklyreportUpdated = () =>
  toast.info("Weeklyreport Updated Successfully", { transition: Zoom });
const emptyAllFields = () =>
  toast.warning("Please Fill Al]l Fields", { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* ticketList({ payload: data }) {
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
    url: endpoints.ticketList + "/" + getLoggedInUser().id,
    // data: sendData
  };

  try {
    const response = yield call(ApiCall, options);

    yield put(getTicketListSuccess(response.data));
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
      case 404:
        message = "Not Found";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getTicketListFailed(message));
  }
}

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* skillList({ payload: data }) {
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
    url: endpoints.skillView + "/" + getLoggedInUser().id,
    // data: sendData
  };

  try {
    const response = yield call(ApiCall, options);

    yield put(getSkillListSuccess(response.data));
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
      case 404:
        message = "Not Found";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getSkillListFailed(message));
  }
}

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* skillUpdate({ payload: data }) {
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.skillUpdate,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    skillUpdateSuccess();
    yield put(getSkillUpdateSuccess(response.data));
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
      case 404:
        message = "Not Found";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getSkillUpdateFailed(message));
  }
}

function* dailyReportList({ payload: data }) {
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
    url: endpoints.dailyReport + "/" + getLoggedInUser().id,
    // data: sendData
  };

  try {
    const response = yield call(ApiCall, options);

    yield put(getDailyReportListSuccess(response.data));
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
      case 404:
        message = "Not Found";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getDailyReportListFailed(message));
  }
}

function* monthlyReportList() {
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
    url: endpoints.monthlyReport + "/" + getLoggedInUser().id,
    // data: sendData
  };

  try {
    const response = yield call(ApiCall, options);

    yield put(getMonthlyReportListSuccess(response.data));
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
      case 404:
        message = "Not Found";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getMonthlyReportListFailed(message));
  }
}

function* weekReportList() {
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
    url: endpoints.reportWeekly + "/" + getLoggedInUser().id,
    // data: sendData
  };

  try {
    const response = yield call(ApiCall, options);

    yield put(getWeeklyReportListSuccess(response.data));
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
      case 404:
        message = "Not Found";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getWeeklyReportListFailed(message));
  }
}

function* dailyTicketList() {
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
    url: endpoints.ticketDetails + "/" + getLoggedInUser().id,
    // data: sendData
  };

  try {
    const response = yield call(ApiCall, options);

    yield put(getWorksheetTicketListSuccess(response.data));
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
      case 404:
        message = "Not Found";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getWorksheetTickettListFailed(message));
  }
}

function* dailyReportAdd({ payload: data }) {
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.dailyReportAdd,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    console.log(response);
    activityAddSuccess();
    yield put(getDailyReportAddSuccess(response.data));
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
      case 404:
        message = "Not Found";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getDailyReportAddFailed(message));
  }
}

function* weeklyReportAdd({ payload: data }) {
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.reportAddWeekly,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    activityAddSuccess();
    yield put(getWeeklyReportAddSuccess(response.data));
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
      case 404:
        message = "Not Found";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getWeeklyReportAddFailed(message));
  }
}

//Monthly Report Add
function* monthlyReportAdd({ payload: data }) {
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.monthlyReportAdd,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    activityAddSuccess();
    yield put(getMonthlyReportAddSuccess(response.data));
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
      case 404:
        message = "Not Found";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getMonthlyReportAddFailed(message));
  }
}

//Ticket Update
function* ticketUpdate({ payload: data }) {
  console.log("ticker updae");
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "PUT",
    url: endpoints.ticketUpdate,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    ticketUpdateSuccess();
    yield put(getTicketUpdateSuccess(response.data));
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
      case 404:
        message = "Not Found";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getTicketUpdateFailed(message));
  }
}

//Save TIcket Data
function* ticketDataSave({ payload: data }) {
  console.log("ticker updae");
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.ticketSave,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    ticketUpdateSuccess();
    yield put(getTicketDataSuccess(response.data));
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
      case 404:
        message = "Not Found";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getTicketDataFailed(message));
  }
}

//View Report List
function* viewReportList({ payload: data }) {
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.viewReport,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);

    yield put(viewReportListSuccess(response.data));
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
      case 404:
        message = "Not Found";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(viewReportListFailed(message));
  }
}

export function* watchTicketList(): any {
  yield takeEvery(TICKET_LIST, ticketList);
}
export function* watchReportList(): any {
  yield takeEvery(VIEW_REPORT, viewReportList);
}
export function* watchTicketUpdate(): any {
  yield takeEvery(TICKET_UPDATE, ticketUpdate);
}
export function* watchTicketDataSave(): any {
  yield takeEvery(TICKET_DATA, ticketDataSave);
}
export function* watchSkillList(): any {
  yield takeEvery(SKILL_LIST, skillList);
}
export function* watchSkillUpdate(): any {
  yield takeEvery(SKILL_UPDATE, skillUpdate);
}
export function* watchDailyReport(): any {
  yield takeEvery(DAILY_REPORT_LIST, dailyReportList);
}
export function* watchDailyReportAdd(): any {
  yield takeEvery(DAILY_REPORT_ADD, dailyReportAdd);
}

export function* watchWeekReport(): any {
  yield takeEvery(WEEKLY_REPORT_LIST, weekReportList);
}
export function* watchWeekReportAdd(): any {
  yield takeEvery(WEEKLY_REPORT_ADD, weeklyReportAdd);
}

export function* watchMonthlyReport(): any {
  yield takeEvery(MONTHLY_REPORT_LIST, monthlyReportList);
}
export function* watchMonthlyReportAdd(): any {
  yield takeEvery(MONTHLY_REPORT_ADD, monthlyReportAdd);
}
export function* watchTicketDetailReport(): any {
  yield takeEvery(WORKSHEET_TICKET_LIST, dailyTicketList);
}

function* authSaga(): any {
  yield all([
    fork(watchTicketList),
    fork(watchSkillList),
    fork(watchSkillUpdate),
    fork(watchDailyReport),
    fork(watchMonthlyReport),
    fork(watchWeekReport),
    fork(watchTicketDetailReport),
    fork(watchDailyReportAdd),
    fork(watchWeekReportAdd),
    fork(watchMonthlyReportAdd),
    fork(watchTicketUpdate),
    fork(watchTicketDataSave),
    fork(watchReportList),
  ]);
}

export default authSaga;
