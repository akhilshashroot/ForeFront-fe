// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { fetchJSON } from "../../helpers/api";
import { ApiCall } from "../../services/index";
import { endpoints } from "../../services/endpoints";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  SCORE_LIST,
  SCORE_ADD,
  SCORE_UPDATE,
  SCORE_DELETE,
  SCORE_PEDATA,
  SCORE_PEHISTORY,
} from "./constants";

import {
  getScoreListSuccess,
  getScoreListFailed,
  getScoreAddSuccess,
  getScoreAddFailed,
  getScoreUpdateSuccess,
  getScoreUpdateFailed,
  getScoreDeleteSuccess,
  getScoreDeleteFailed,
  getPEDataSuccess,
  getPEDataFailed,
  getPEHistorySuccess,
  getPEHistoryFailed,
} from "./actions";

import { getLoggedInUser } from "../../helpers/authUtils";

const scoreAddedSucsess = () =>
  toast.success("Score Added Successfully", { transition: Zoom });
const scoreDeletedSuccess = () =>
  toast.success("Score Deleted Successfully", { transition: Zoom });
const scoreUpdated = () =>
  toast.info("Score Updated Successfully", { transition: Zoom });
const emptyAllFields = () =>
  toast.warning("Please Fill All Fields", { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* ScoreList() {
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
    url: endpoints.scoreList + "/" + user.id,
    // data: sendData
  };

  try {
    const response = yield call(ApiCall, options);

    yield put(getScoreListSuccess(response.data));
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
    yield put(getScoreListFailed(message));
  }
}

// Score Performace evolution data

function* PEData({ payload: data }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.performanceEvaluation,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    yield put(getPEDataSuccess(response.data));
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
    yield put(getPEDataFailed(message));
  }
}

// Score Performace evolution History data

function* PEHistory({ payload: data }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.performanceEvaluationHistory,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    yield put(getPEHistorySuccess(response.data));
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
    yield put(getPEHistoryFailed(message));
  }
}

// Score Add

function* ScoreAdd({ payload: data }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.scoreAdd,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    scoreAddedSucsess();
    yield put(getScoreAddSuccess(response.data));
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
    yield put(getScoreAddFailed(message));
  }
}

// Score Update

function* ScoreUpdate({ payload: data }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "PUT",
    url: endpoints.scoreUpdate + "/" + (data && data.dep_id),
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    scoreUpdated();
    yield put(getScoreUpdateSuccess(response.data));
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
    yield put(getScoreUpdateFailed(message));
  }
}

// Score Delete

function* ScoreDelete({ payload: id }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "DELETE",
    url: endpoints.scoreDelete + "/" + id,
  };

  try {
    const response = yield call(ApiCall, options);
    scoreDeletedSuccess();
    yield put(getScoreDeleteSuccess(response.data));
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
    yield put(getScoreDeleteFailed(message));
  }
}

export function* watchScoreList(): any {
  yield takeEvery(SCORE_LIST, ScoreList);
}
export function* watchScoreAdd(): any {
  yield takeEvery(SCORE_ADD, ScoreAdd);
}
export function* watchScoreUpdate(): any {
  yield takeEvery(SCORE_UPDATE, ScoreUpdate);
}
export function* watchScoreDelete(): any {
  yield takeEvery(SCORE_DELETE, ScoreDelete);
}
export function* watchPEData(): any {
  yield takeEvery(SCORE_PEDATA, PEData);
}
export function* watchPEHistory(): any {
  yield takeEvery(SCORE_PEHISTORY, PEHistory);
}

function* authSaga(): any {
  yield all([
    fork(watchScoreList),
    fork(watchScoreAdd),
    fork(watchScoreUpdate),
    fork(watchScoreDelete),
    fork(watchPEData),
    fork(watchPEHistory),
  ]);
}

export default authSaga;
