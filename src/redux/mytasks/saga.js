// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { fetchJSON } from "../../helpers/api";
import { ApiCall } from "../../services/index";
import { endpoints } from "../../services/endpoints";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MYTASK_LIST,
  MYTASK_ADD,
  MYTASK_UPDATE,
  MYTASK_DELETE,
  MYTASK_COMMENT_ADD,
} from "./constants";

import {
  getMytaskListSuccess,
  getMytaskListFailed,
  getMytaskAddSuccess,
  getMytaskAddFailed,
  getMytaskUpdateSuccess,
  getMytaskUpdateFailed,
  getMytaskDeleteSuccess,
  getMytaskDeleteFailed,
  getCommentAddSuccess,
  getCommentAddFailed,
} from "./actions";

import { getLoggedInUser } from "../../helpers/authUtils";

const mytaskAddedSucsess = () =>
  toast.success("Mytask Added Successfully", { transition: Zoom });
const mytaskCommentAddedSucsess = () =>
  toast.success("Comment Added Successfully", { transition: Zoom });
const mytaskDeletedSuccess = () =>
  toast.success("Mytask Deleted Successfully", { transition: Zoom });
const mytaskUpdated = () =>
  toast.info("Mytask Updated Successfully", { transition: Zoom });
const emptyAllFields = () =>
  toast.warning("Please Fill All Fields", { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* MytaskList() {
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
    url: endpoints.taskList + "/" + user.id,
    // data: sendData
  };

  try {
    const response = yield call(ApiCall, options);

    yield put(getMytaskListSuccess(response.data));
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
    yield put(getMytaskListFailed(message));
  }
}

// Mytask Add

function* MytaskAdd({ payload: data }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.taskList,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    mytaskAddedSucsess();
    yield put(getMytaskAddSuccess(response.data));
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
    yield put(getMytaskAddFailed(message));
  }
}

// Mytask Comment Add

function* MytaskCommentAdd({ payload: data }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.postComment,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    mytaskCommentAddedSucsess();
    yield put(getCommentAddSuccess(response.data));
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
    yield put(getCommentAddFailed(message));
  }
}

// Mytask Update

function* MytaskUpdate({ payload: data }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "PUT",
    url: endpoints.mytaskUpdate + "/" + (data && data.dep_id),
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    mytaskUpdated();
    yield put(getMytaskUpdateSuccess(response.data));
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
    yield put(getMytaskUpdateFailed(message));
  }
}

// Mytask Delete

function* MytaskDelete({ payload: id }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "DELETE",
    url: endpoints.taskList + "/" + id,
  };

  try {
    const response = yield call(ApiCall, options);
    mytaskDeletedSuccess();
    yield put(getMytaskDeleteSuccess(response.data));
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
    yield put(getMytaskDeleteFailed(message));
  }
}

export function* watchMytaskList(): any {
  yield takeEvery(MYTASK_LIST, MytaskList);
}
export function* watchMytaskAdd(): any {
  yield takeEvery(MYTASK_ADD, MytaskAdd);
}
export function* watchMytaskUpdate(): any {
  yield takeEvery(MYTASK_UPDATE, MytaskUpdate);
}
export function* watchMytaskDelete(): any {
  yield takeEvery(MYTASK_DELETE, MytaskDelete);
}
export function* watchMytaskCommentAdd(): any {
  yield takeEvery(MYTASK_COMMENT_ADD, MytaskCommentAdd);
}

function* authSaga(): any {
  yield all([
    fork(watchMytaskList),
    fork(watchMytaskAdd),
    fork(watchMytaskUpdate),
    fork(watchMytaskDelete),
    fork(watchMytaskCommentAdd),
  ]);
}

export default authSaga;
