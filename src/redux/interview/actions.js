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
    COMMENT_ADD_FAILED
} from './constants';

type InterviewAction = { type: string, payload: {} | string };

export const getInterviewList = (): InterviewAction => ({
    type: INTERVIEW_LIST,
    payload: {},
});

export const getInterviewListSuccess = (interview: string): InterviewAction => ({
    type: INTERVIEW_LIST_SUCCESS,
    payload: interview,
});

export const getInterviewListFailed = (error: string): InterviewAction => ({
    type: INTERVIEW_LIST_FAILED,
    payload: error,
});

export const getInterviewAdd = (data:{}): InterviewAction => ({
    type: INTERVIEW_ADD,
    payload: data,
});

export const getInterviewAddSuccess = (interviewAdd: string): InterviewAction => ({
    type: INTERVIEW_ADD_SUCCESS,
    payload: interviewAdd,
});

export const getInterviewAddFailed = (error: string): InterviewAction => ({
    type: INTERVIEW_ADD_FAILED,
    payload: error,
});

export const getInterviewUpdate = (data:{},id): InterviewAction => ({
    type: INTERVIEW_UPDATE,
    payload: {
        data,
        id
    },
});

export const getInterviewUpdateSuccess = (interviewUpdate: string): InterviewAction => ({
    type: INTERVIEW_UPDATE_SUCCESS,
    payload: interviewUpdate,
});

export const getInterviewUpdateFailed = (error: string): InterviewAction => ({
    type: INTERVIEW_UPDATE_FAILED,
    payload: error,
});

export const getInterviewDelete = (id): InterviewAction => ({
    type: INTERVIEW_DELETE,
    payload: id,
});

export const getInterviewDeleteSuccess = (interviewDelete: string): InterviewAction => ({
    type: INTERVIEW_DELETE_SUCCESS,
    payload: interviewDelete,
});

export const getInterviewDeleteFailed = (error: string): InterviewAction => ({
    type: INTERVIEW_DELETE_FAILED,
    payload: error,
});

export const getCommentAdd = (data:{}) => ({
    type: COMMENT_ADD,
    payload: data,
});

export const getCommentAddSuccess = (CommentAdd: string) => ({
    type: COMMENT_ADD_SUCCESS,
    payload: CommentAdd,
});

export const getCommentAddFailed = (error: string) => ({
    type: COMMENT_ADD_FAILED,
    payload: error,
});
