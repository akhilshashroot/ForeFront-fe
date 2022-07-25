// @flow
import {
  TICKET_LIST,
  TICKET_LIST_SUCCESS,
  TICKET_LIST_FAILED,
  SKILL_LIST,
  SKILL_LIST_SUCCESS,
  SKILL_LIST_FAILED,
  SKILL_UPDATE,
  SKILL_UPDATE_SUCCESS,
  SKILL_UPDATE_FAILED,
  DAILY_REPORT_LIST,
  DAILY_REPORT_LIST_SUCCESS,
  DAILY_REPORT_LIST_FAILED,
  WEEKLY_REPORT_LIST,
  WEEKLY_REPORT_LIST_SUCCESS,
  WEEKLY_REPORT_LIST_FAILED,
  MONTHLY_REPORT_LIST,
  MONTHLY_REPORT_LIST_SUCCESS,
  MONTHLY_REPORT_LIST_FAILED,
  WORKSHEET_TICKET_LIST,
  WORKSHEET_TICKET_LIST_SUCCESS,
  WORKSHEET_TICKET_LIST_FAILED,
  DAILY_REPORT_ADD,
  DAILY_REPORT_ADD_SUCCESS,
  DAILY_REPORT_ADD_FAILED,
  WEEKLY_REPORT_ADD,
  WEEKLY_REPORT_ADD_SUCCESS,
  WEEKLY_REPORT_ADD_FAILED,
  MONTHLY_REPORT_ADD,
  MONTHLY_REPORT_ADD_SUCCESS,
  MONTHLY_REPORT_ADD_FAILED,
  TICKET_UPDATE,
  TICKET_UPDATE_SUCCESS,
  TICKET_UPDATE_FAILED,
  TICKET_DATA,
  TICKET_DATA_SUCCESS,
  TICKET_DATA_FAILED,
  VIEW_REPORT,
  VIEW_REPORT_SUCCESS,
  VIEW_REPORT_FAILED,
} from "./constants";

import { getLoggedInUser } from "../../helpers/authUtils";

const INIT_STATE = {
  user: getLoggedInUser(),
  loading: false,
};

const Worksheet = (state = INIT_STATE, action) => {
  switch (action.type) {
    case TICKET_LIST:
      return { ...state, listloading: true };
    case TICKET_LIST_SUCCESS:
      return {
        ...state,
        ticket: action.payload,
        listloading: false,
        error: null,
      };
    case TICKET_LIST_FAILED:
      return {
        ...state,
        error: action.payload,
        listloading: false,
        loading: false,
      };
    case TICKET_DATA:
      return { ...state };
    case TICKET_DATA_SUCCESS:
      return {
        ...state,
        ticketData: action.payload,
        listloading: false,
        error: null,
      };
    case TICKET_DATA_FAILED:
      return {
        ...state,
        error: action.payload,
        listloading: false,
        loading: false,
      };
    case TICKET_UPDATE:
      return { ...state };
    case TICKET_UPDATE_SUCCESS:
      return {
        ...state,
        ticketUpdate: action.payload,
        error: null,
      };
    case TICKET_UPDATE_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case SKILL_LIST:
      return { ...state, listloading: true };
    case SKILL_LIST_SUCCESS:
      return {
        ...state,
        skill: action.payload,
        listloading: false,
        error: null,
      };
    case SKILL_LIST_FAILED:
      return {
        ...state,
        error: action.payload,
        listloading: false,
        loading: false,
      };
    case SKILL_UPDATE:
      return { ...state, listloading: true };
    case SKILL_UPDATE_SUCCESS:
      return {
        ...state,
        skillUpdate: action.payload,
        listloading: false,
        error: null,
      };
    case SKILL_UPDATE_FAILED:
      return {
        ...state,
        error: action.payload,
        listloading: false,
        loading: false,
      };
    case DAILY_REPORT_LIST:
      return { ...state, listloading: true };
    case DAILY_REPORT_LIST_SUCCESS:
      return {
        ...state,
        dailyReport: action.payload,
        listloading: false,
        error: null,
      };
    case DAILY_REPORT_LIST_FAILED:
      return {
        ...state,
        error: action.payload,
        listloading: false,
        loading: false,
      };
    case DAILY_REPORT_ADD:
      return { ...state };
    case DAILY_REPORT_ADD_SUCCESS:
      return {
        ...state,
        dailyReportAdd: action.payload,
        error: null,
      };
    case DAILY_REPORT_ADD_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case WEEKLY_REPORT_LIST:
      return { ...state, listloading: true };
    case WEEKLY_REPORT_LIST_SUCCESS:
      return {
        ...state,
        weeklyReport: action.payload,
        listloading: false,
        error: null,
      };
    case WEEKLY_REPORT_LIST_FAILED:
      return {
        ...state,
        error: action.payload,
        listloading: false,
        loading: false,
      };
    case WEEKLY_REPORT_ADD:
      return { ...state };
    case WEEKLY_REPORT_ADD_SUCCESS:
      return {
        ...state,
        WeeklyReportAdd: action.payload,
        error: null,
      };
    case WEEKLY_REPORT_ADD_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case MONTHLY_REPORT_LIST:
      return { ...state, listloading: true };
    case MONTHLY_REPORT_LIST_SUCCESS:
      return {
        ...state,
        monthlyReport: action.payload,
        listloading: false,
        error: null,
      };
    case MONTHLY_REPORT_LIST_FAILED:
      return {
        ...state,
        error: action.payload,
        listloading: false,
        loading: false,
      };
    case MONTHLY_REPORT_ADD:
      return { ...state };
    case MONTHLY_REPORT_ADD_SUCCESS:
      return {
        ...state,
        MonthlyReportAdd: action.payload,
        error: null,
      };
    case MONTHLY_REPORT_ADD_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case WORKSHEET_TICKET_LIST:
      return { ...state };
    case WORKSHEET_TICKET_LIST_SUCCESS:
      return {
        ...state,
        ticketList: action.payload,
        error: null,
      };
    case WORKSHEET_TICKET_LIST_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case VIEW_REPORT:
      return { ...state};
    case VIEW_REPORT_SUCCESS:
      return {
        ...state,
        report: action.payload,
        error: null,
      };
    case VIEW_REPORT_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export default Worksheet;
