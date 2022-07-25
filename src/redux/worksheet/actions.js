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
  TICKET_DATA_SAVE,
  TICKET_DATA_SAVE_SUCCESS,
  TICKET_DATA_SAVE_FAILED,
  VIEW_REPORT,
  VIEW_REPORT_SUCCESS,
  VIEW_REPORT_FAILED
} from "./constants";

export const getTicketList = (data) => ({
  type: TICKET_LIST,
  payload: data,
});

export const getTicketListSuccess = (ticketList) => ({
  type: TICKET_LIST_SUCCESS,
  payload: ticketList,
});

export const getTicketListFailed = (error) => ({
  type: TICKET_LIST_FAILED,
  payload: error,
});

export const getTicketUpdate = (data) => ({
  type: TICKET_UPDATE,
  payload: data,
});

export const getTicketUpdateSuccess = (ticketUpdate) => ({
  type: TICKET_UPDATE_SUCCESS,
  payload: ticketUpdate,
});

export const getTicketUpdateFailed = (error) => ({
  type: TICKET_UPDATE_FAILED,
  payload: error,
});

export const getTicketData = (data) => ({
  type: TICKET_DATA,
  payload: data,
});

export const getTicketDataSuccess = (ticketData) => ({
  type: TICKET_DATA_SUCCESS,
  payload: ticketData,
});

export const getTicketDataFailed = (error) => ({
  type: TICKET_DATA_FAILED,
  payload: error,
});


export const getSkillList = (data) => ({
  type: SKILL_LIST,
  payload: data,
});

export const getSkillListSuccess = (ticketList) => ({
  type: SKILL_LIST_SUCCESS,
  payload: ticketList,
});

export const getSkillListFailed = (error) => ({
  type: SKILL_LIST_FAILED,
  payload: error,
});

export const getSkillUpdate = (data) => ({
  type: SKILL_UPDATE,
  payload: data,
});

export const getSkillUpdateSuccess = (ticketList) => ({
  type: SKILL_UPDATE_SUCCESS,
  payload: ticketList,
});

export const getSkillUpdateFailed = (error) => ({
  type: SKILL_UPDATE_FAILED,
  payload: error,
});

export const getDailyReportList = (data) => ({
  type: DAILY_REPORT_LIST,
  payload: data,
});

export const getDailyReportListSuccess = (ticketList) => ({
  type: DAILY_REPORT_LIST_SUCCESS,
  payload: ticketList,
});

export const getDailyReportListFailed = (error) => ({
  type: DAILY_REPORT_LIST_FAILED,
  payload: error,
});

export const getDailyReportAdd = (data) => ({
  type: DAILY_REPORT_ADD,
  payload: data,
});

export const getDailyReportAddSuccess = (ticketAdd) => ({
  type: DAILY_REPORT_ADD_SUCCESS,
  payload: ticketAdd,
});

export const getDailyReportAddFailed = (error) => ({
  type: DAILY_REPORT_ADD_FAILED,
  payload: error,
});

export const getWeeklyReportList = (data) => ({
  type: WEEKLY_REPORT_LIST,
  payload: data,
});

export const getWeeklyReportListSuccess = (ticketList) => ({
  type: WEEKLY_REPORT_LIST_SUCCESS,
  payload: ticketList,
});

export const getWeeklyReportListFailed = (error) => ({
  type: WEEKLY_REPORT_LIST_FAILED,
  payload: error,
});

export const getWeeklyReportAdd = (data) => ({
  type: WEEKLY_REPORT_ADD,
  payload: data,
});

export const getWeeklyReportAddSuccess = (ticketAdd) => ({
  type: WEEKLY_REPORT_ADD_SUCCESS,
  payload: ticketAdd,
});

export const getWeeklyReportAddFailed = (error) => ({
  type: WEEKLY_REPORT_ADD_FAILED,
  payload: error,
});

export const getMonthlyReportList = (data) => ({
  type: MONTHLY_REPORT_LIST,
  payload: data,
});

export const getMonthlyReportListSuccess = (ticketList) => ({
  type: MONTHLY_REPORT_LIST_SUCCESS,
  payload: ticketList,
});

export const getMonthlyReportListFailed = (error) => ({
  type: MONTHLY_REPORT_LIST_FAILED,
  payload: error,
});

export const getMonthlyReportAdd = (data) => ({
  type: MONTHLY_REPORT_ADD,
  payload: data,
});

export const getMonthlyReportAddSuccess = (ticketAdd) => ({
  type: MONTHLY_REPORT_ADD_SUCCESS,
  payload: ticketAdd,
});

export const getMonthlyReportAddFailed = (error) => ({
  type: MONTHLY_REPORT_ADD_FAILED,
  payload: error,
});

export const getWorksheetTicketList = (data) => ({
  type: WORKSHEET_TICKET_LIST,
  payload: data,
});

export const getWorksheetTicketListSuccess = (ticketList) => ({
  type: WORKSHEET_TICKET_LIST_SUCCESS,
  payload: ticketList,
});

export const getWorksheetTickettListFailed = (error) => ({
  type: WORKSHEET_TICKET_LIST_FAILED,
  payload: error,
});


export const viewReportList = (data) => ({
  type: VIEW_REPORT,
  payload: data,
});

export const viewReportListSuccess = (reportList) => ({
  type: VIEW_REPORT_SUCCESS,
  payload: reportList,
});

export const viewReportListFailed = (error) => ({
  type: VIEW_REPORT_FAILED,
  payload: error,
});

