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

type ShiftAction = { type: string, payload: {} | string };

export const getTeamMembersList = (id): ShiftAction => ({
  type: TEAM_MEMBERS_LIST,
  payload: id,
});

export const getTeamMembersListSuccess = (team: string): ShiftAction => ({
  type: TEAM_MEMBERS_LIST_SUCCESS,
  payload: team,
});

export const getTeamMembersListFailed = (error: string): ShiftAction => ({
  type: TEAM_MEMBERS_LIST_FAILED,
  payload: error,
});

export const getShiftCreate = (data: {}): ShiftAction => ({
  type: SHIFT_CREATE,
  payload: data,
});

export const getShiftCreateSuccess = (shiftCreate: string): ShiftAction => ({
  type: SHIFT_CREATE_SUCCESS,
  payload: shiftCreate,
});

export const getShiftCreateFailed = (error: string): ShiftAction => ({
  type: SHIFT_CREATE_FAILED,
  payload: error,
});

export const getWeeksList = (id): ShiftAction => ({
  type: GET_WEEKS_LIST,
  payload: id,
});

export const getWeeksListSuccess = (getWeeks: string): ShiftAction => ({
  type: GET_WEEKS_LIST_SUCCESS,
  payload: getWeeks,
});

export const getWeeksListFailed = (error: string): ShiftAction => ({
  type: GET_WEEKS_LIST_FAILED,
  payload: error,
});

export const getPreviousShift = (id): ShiftAction => ({
  type: GET_PREVIOUS_SHIFT,
  payload: id,
});

export const getPreviousShiftSuccess = (
  getPreviousShift: string
): ShiftAction => ({
  type: GET_PREVIOUS_SHIFT_SUCCESS,
  payload: getPreviousShift,
});

export const getPreviousShiftFailed = (error: string): ShiftAction => ({
  type: GET_PREVIOUS_SHIFT_FAILED,
  payload: error,
});

export const getShiftEdit = (data: {}): ShiftAction => ({
  type: SHIFT_EDIT,
  payload: data,
});

export const getShiftEditSuccess = (shiftEdit: string): ShiftAction => ({
  type: SHIFT_EDIT_SUCCESS,
  payload: shiftEdit,
});

export const getShiftEditFailed = (error: string): ShiftAction => ({
  type: SHIFT_EDIT_FAILED,
  payload: error,
});

export const getShiftSwap = (data: {}): ShiftAction => ({
  type: SHIFT_SWAP,
  payload: data,
});

export const getShiftSwapSuccess = (shiftSwap: string): ShiftAction => ({
  type: SHIFT_SWAP_SUCCESS,
  payload: shiftSwap,
});

export const getShiftSwapFailed = (error: string): ShiftAction => ({
  type: SHIFT_SWAP_FAILED,
  payload: error,
});

export const getFirstShiftEdit = (data: {}): ShiftAction => ({
  type: FIRST_SHIFT_EDIT,
  payload: data,
});

export const getFirstShiftEditSuccess = (
  firstShiftEdit: string
): ShiftAction => ({
  type: FIRST_SHIFT_EDIT_SUCCESS,
  payload: firstShiftEdit,
});

export const getFirstShiftEditFailed = (error: string): ShiftAction => ({
  type: FIRST_SHIFT_EDIT_FAILED,
  payload: error,
});

export const getFirstShiftSwap = (data: {}): ShiftAction => ({
  type: FIRST_SHIFT_SWAP,
  payload: data,
});

export const getFirstShiftSwapSuccess = (
  firstShiftSwap: string
): ShiftAction => ({
  type: FIRST_SHIFT_SWAP_SUCCESS,
  payload: firstShiftSwap,
});

export const getFirstShiftSwapFailed = (error: string): ShiftAction => ({
  type: FIRST_SHIFT_SWAP_FAILED,
  payload: error,
});

export const getSwapDelete = (data: {}): ShiftAction => ({
  type: SWAP_DELETE,
  payload: data,
});

export const getSwapDeleteSuccess = (swapDelete: string): ShiftAction => ({
  type: SWAP_DELETE_SUCCESS,
  payload: swapDelete,
});

export const getSwapDeleteFailed = (error: string): ShiftAction => ({
  type: SWAP_DELETE_FAILED,
  payload: error,
});

export const getShiftList = (): ShiftAction => ({
  type: SHIFT_LIST,
  payload: {},
});

export const getShiftListSuccess = (department: string): ShiftAction => ({
  type: SHIFT_LIST_SUCCESS,
  payload: department,
});

export const getShiftListFailed = (error: string): ShiftAction => ({
  type: SHIFT_LIST_FAILED,
  payload: error,
});

export const getShiftAdd = (data: {}): ShiftAction => ({
  type: SHIFT_ADD,
  payload: data,
});

export const getShiftAddSuccess = (departmentAdd: string): ShiftAction => ({
  type: SHIFT_ADD_SUCCESS,
  payload: departmentAdd,
});

export const getShiftAddFailed = (error: string): ShiftAction => ({
  type: SHIFT_ADD_FAILED,
  payload: error,
});

export const getShiftUpdate = (data: {}): ShiftAction => ({
  type: SHIFT_UPDATE,
  payload: data,
});

export const getShiftUpdateSuccess = (
  departmentUpdate: string
): ShiftAction => ({
  type: SHIFT_UPDATE_SUCCESS,
  payload: departmentUpdate,
});

export const getShiftUpdateFailed = (error: string): ShiftAction => ({
  type: SHIFT_UPDATE_FAILED,
  payload: error,
});

export const getShiftDelete = (id): ShiftAction => ({
  type: SHIFT_DELETE,
  payload: id,
});

export const getShiftDeleteSuccess = (
  departmentDelete: string
): ShiftAction => ({
  type: SHIFT_DELETE_SUCCESS,
  payload: departmentDelete,
});

export const getShiftDeleteFailed = (error: string): ShiftAction => ({
  type: SHIFT_DELETE_FAILED,
  payload: error,
});

export const getShiftComment = (data: {}): ShiftAction => ({
  type: SHIFT_COMMENT_EDIT,
  payload: data,
});

export const getShiftCommentSuccess = (shiftComment: string): ShiftAction => ({
  type: SHIFT_COMMENT_EDIT_SUCCESS,
  payload: shiftComment,
});

export const getShiftCommentFailed = (error: string): ShiftAction => ({
  type: SHIFT_COMMENT_EDIT_FAILED,
  payload: error,
});

export const getPreviewShift = (data: {}): ShiftAction => ({
  type: SHIFT_PREVIEW,
  payload: data,
});

export const getPreviewShiftSuccess = (previewShift: string): ShiftAction => ({
  type: SHIFT_PREVIEW_SUCCESS,
  payload: previewShift,
});

export const getPreviewShiftFailed = (error: string): ShiftAction => ({
  type: SHIFT_PREVIEW_FAILED,
  payload: error,
});
