// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { fetchJSON } from "../../helpers/api";
import { ApiCall } from "../../services/index";
import { endpoints } from "../../services/endpoints";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TASKER_LIST,
  TASKER_ADD,
  TASKER_UPDATE,
  TASKER_DELETE,
  TASKER_COMMENT,
} from "./constants";

import {
  getTaskerListSuccess,
  getTaskerListFailed,
  getTaskerAddSuccess,
  getTaskerAddFailed,
  getTaskerUpdateSuccess,
  getTaskerUpdateFailed,
  getTaskerDeleteSuccess,
  getTaskerDeleteFailed,
  getTaskerAdminCommentSuccess,
  getTaskerAdminCommentFailed,
} from "./actions";

import { getLoggedInUser } from "../../helpers/authUtils";

const taskerAddedSucsess = () =>
  toast.success("Tasker Added Successfully", { transition: Zoom });
const taskerCommentSucsess = () =>
  toast.success("Tasker Comment Added Successfully", { transition: Zoom });
const taskerDeletedSuccess = () =>
  toast.success("Tasker Deleted Successfully", { transition: Zoom });
const taskerUpdated = () =>
  toast.info("Tasker Updated Successfully", { transition: Zoom });
const emptyAllFields = () =>
  toast.warning("Please Fill All Fields", { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* TaskerList({ payload: data }) {
  const user = getLoggedInUser();
  const userid = getLoggedInUser().id;
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
    url: endpoints.taskerList + "/" + userid,
    // data: sendData
  };

  try {
    const response = yield call(ApiCall, options);

    yield put(getTaskerListSuccess(response.data));
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
    yield put(getTaskerListFailed(message));
  }
}

// Tasker Add

function* TaskerAdd({ payload: data }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.taskerAdd,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    taskerAddedSucsess();
    yield put(getTaskerAddSuccess(response.data));
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
    yield put(getTaskerAddFailed(message));
  }
}

// Tasker Update

function* TaskerUpdate({ payload: data }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "PUT",
    url: endpoints.taskerUpdate + "/" + (data && data.dep_id),
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    taskerUpdated();
    yield put(getTaskerUpdateSuccess(response.data));
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
    yield put(getTaskerUpdateFailed(message));
  }
}

// Tasker Delete

function* TaskerDelete({ payload: id }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "DELETE",
    url: endpoints.taskerDelete + "/" + id,
  };

  try {
    const response = yield call(ApiCall, options);
    taskerDeletedSuccess();
    yield put(getTaskerDeleteSuccess(response.data));
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
    yield put(getTaskerDeleteFailed(message));
  }
}

// Tasker Add

function* TaskerComment({ payload: data }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.taskerComment,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    taskerCommentSucsess();
    yield put(getTaskerAdminCommentSuccess(response.data));
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
    yield put(getTaskerAdminCommentFailed(message));
  }
}

export function* watchTaskerList(): any {
  yield takeEvery(TASKER_LIST, TaskerList);
}
export function* watchTaskerAdd(): any {
  yield takeEvery(TASKER_ADD, TaskerAdd);
}
export function* watchTaskerUpdate(): any {
  yield takeEvery(TASKER_UPDATE, TaskerUpdate);
}
export function* watchTaskerDelete(): any {
  yield takeEvery(TASKER_DELETE, TaskerDelete);
}
export function* watchTaskerComment(): any {
  yield takeEvery(TASKER_COMMENT, TaskerComment);
}

function* authSaga(): any {
  yield all([
    fork(watchTaskerList),
    fork(watchTaskerAdd),
    fork(watchTaskerUpdate),
    fork(watchTaskerDelete),
    fork(watchTaskerComment),
  ]);
}

export default authSaga;
