// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { fetchJSON } from "../../helpers/api";
import { ApiCall } from "../../services/index";
import { endpoints } from "../../services/endpoints";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  HASHBOOK_LIST,
  HASHBOOK_ADD,
  HASHBOOK_UPDATE,
  HASHBOOK_DELETE,
  HASHBOOK_AUTHOR,
  HASHBOOK_CREATE_COMMENT,
  HASHBOOK_COMMENT_DETAILS,
  HASHBOOK_SUBTOPIC,
} from "./constants";

import {
  getHashbookListSuccess,
  getHashbookListFailed,
  getHashbookAddSuccess,
  getHashbookAddFailed,
  getHashbookUpdateSuccess,
  getHashbookUpdateFailed,
  getHashbookDeleteSuccess,
  getHashbookDeleteFailed,
  getHashbookAuthorSuccess,
  getHashbookAuthorFailed,
  getHashbookCommentAddSuccess,
  getHashbookCommentAddFailed,
  getHashbookCommentDetailsSuccess,
  getHashbookCommentDetailsFailed,
  getHashbookSubTopicAddSuccess,
  getHashbookSubTopicAddFailed,
} from "./actions";

import { getLoggedInUser } from "../../helpers/authUtils";

const hashbookAddedSucsess = () =>
  toast.success("Hashbook Added Successfully", { transition: Zoom });
const hashbookSubTopicAddedSucsess = () =>
  toast.success("Sub Topic Added Successfully", { transition: Zoom });
const hashbookDeletedSuccess = () =>
  toast.success("Hashbook Deleted Successfully", { transition: Zoom });
const hashbookUpdated = () =>
  toast.info("Hashbook Updated Successfully", { transition: Zoom });
const emptyAllFields = () =>
  toast.warning("Please Fill All Fields", { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
const hashbookCommentAddedSucsess = () =>
  toast.success("Hashbook Comment Added Successfully", { transition: Zoom });

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* HashbookList() {
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
    url: endpoints.hashbookList,
    // data: sendData
  };

  try {
    const response = yield call(ApiCall, options);

    yield put(getHashbookListSuccess(response.data));
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
    yield put(getHashbookListFailed(message));
  }
}

// Hashbook Add

function* HashbookAdd({ payload: data }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.hashbookAdd,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    hashbookAddedSucsess();
    yield put(getHashbookAddSuccess(response.data));
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
    yield put(getHashbookAddFailed(message));
  }
}

// Hashbook Update

function* HashbookUpdate({ payload: data }) {
  let payload = data.title;

  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "PUT",
    url: endpoints.hashbookUpdate + "/" + (data && data.id),
    data: {
      title: payload,
    },
  };

  try {
    const response = yield call(ApiCall, options);
    hashbookUpdated();
    yield put(getHashbookUpdateSuccess(response.data));
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
    yield put(getHashbookUpdateFailed(message));
  }
}

// Hashbook Delete

function* HashbookDelete({ payload: id }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "DELETE",
    url: endpoints.hashbookDelete + "/" + id,
  };

  try {
    const response = yield call(ApiCall, options);
    hashbookDeletedSuccess();
    yield put(getHashbookDeleteSuccess(response.data));
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
    yield put(getHashbookDeleteFailed(message));
  }
}
// Hashbook Authors

function* HashbookAuthors() {
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
    url: endpoints.hashbookAuthors,
    // data: sendData
  };

  try {
    const response = yield call(ApiCall, options);

    yield put(getHashbookAuthorSuccess(response.data));
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
    yield put(getHashbookAuthorFailed(message));
  }
}

// Hashbook Comment Add

function* HashbookCommentAdd({ payload: data }) {
  const user = getLoggedInUser();

  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "POST",
    url: endpoints.hashbookCreateComment,
    data: data,
  };

  try {
    const response = yield call(ApiCall, options);
    hashbookCommentAddedSucsess();
    yield put(getHashbookCommentAddSuccess(response.data));
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
    yield put(getHashbookCommentAddFailed(message));
  }
}

function* HashbookCommentList({ payload: data }) {
  let topic_id = data.topicid;
  let user_id = data.userid;
  const user = getLoggedInUser();
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
    url: endpoints.hashbookCommentDetails + `/` + topic_id + `/` + user_id,
    // data: sendData
  };

  try {
    const response = yield call(ApiCall, options);

    yield put(getHashbookCommentDetailsSuccess(response.data));
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
    yield put(getHashbookCommentDetailsFailed(message));
  }
}



// Hashbook Sub Topic Add

function* HashbookSubTopicAdd({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        url: endpoints.hashbookSubTopic,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        hashbookSubTopicAddedSucsess();
        yield put(getHashbookSubTopicAddSuccess(response.data));
    } catch (error) {
        let message;
        switch (error.response.status) {
            case 500:
                message = 'Internal Server Error';
                WarnFields(message);
                break;
            case 401:
                message = 'Invalid credentials';
                WarnFields(message);
                break;
            case 400:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            default:
                message = error;
        }
        yield put(getHashbookSubTopicAddFailed(message));
    }
}


export function* watchHashbookList(): any {
  yield takeEvery(HASHBOOK_LIST, HashbookList);
}
export function* watchHashbookAdd(): any {
  yield takeEvery(HASHBOOK_ADD, HashbookAdd);
}
export function* watchHashbookUpdate(): any {
  yield takeEvery(HASHBOOK_UPDATE, HashbookUpdate);
}
export function* watchHashbookDelete(): any {
  yield takeEvery(HASHBOOK_DELETE, HashbookDelete);
}
export function* watchHashbookAuthor(): any {
  yield takeEvery(HASHBOOK_AUTHOR, HashbookAuthors);
}
export function* watchHashbookComment(): any {
  yield takeEvery(HASHBOOK_CREATE_COMMENT, HashbookCommentAdd);
}
export function* watchHashbookDetails(): any {
  yield takeEvery(HASHBOOK_COMMENT_DETAILS, HashbookCommentList);
}
export function* watchHashbookSubTopicAdd(): any {
  yield takeEvery(HASHBOOK_SUBTOPIC, HashbookSubTopicAdd);
}

function* authSaga(): any {
  yield all([
    fork(watchHashbookList),
    fork(watchHashbookAdd),
    fork(watchHashbookUpdate),
    fork(watchHashbookDelete),
    fork(watchHashbookAuthor),
    fork(watchHashbookComment),
    fork(watchHashbookDetails),
    fork(watchHashbookSubTopicAdd),
  ]);
}

export default authSaga;
