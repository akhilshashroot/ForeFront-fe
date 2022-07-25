// @flow
import { all } from "redux-saga/effects";
import authSaga from "./auth/saga";
import layoutSaga from "./layout/saga";
import appMenuSaga from "./appMenu/saga";
import departmentSaga from "./department/saga";
import teamSaga from "./team/saga";
import designationSaga from "./designation/saga";
import settingsSaga from "./settings/saga";
import requestSaga from "./request/saga";
import notificationSaga from "./notification/saga";
import announcementSaga from "./announcement/saga";
import employeeSaga from "./employee/saga";
import inventorySaga from "./inventory/saga";
import projectSaga from "./project/saga";
import interviewSaga from "./interview/saga";
import attendanceSaga from "./attendance/saga";
import dailyreportSaga from "./dailyreport/saga";
import dailyactivitySaga from "./dailyactivity/saga";
import weeklyreportSaga from "./weeklyreport/saga";
import weeklyactivitySaga from "./weeklyactivity/saga";
import monthlyreportSaga from "./monthlyreport/saga";
import monthlyactivitySaga from "./monthlyactivity/saga";
import shiftrecordSaga from "./shiftrecord/saga";
import hashbookSaga from "./hashbook/saga";
import taskerSaga from "./tasker/saga";
import userSaga from "./user/saga";
import leaverequestSaga from "./leaverequest/saga";
import scoreSaga from "./score/saga";
import timesheetSaga from "./timesheet/saga";
import mytaskSaga from "./mytasks/saga";
import worksheetSaga from "./worksheet/saga";
import shiftSaga from "./shift/saga";
import workdataSaga from "./workdata/saga";

export default function* rootSaga(getState: any): any {
  yield all([
    authSaga(),
    layoutSaga(),
    appMenuSaga(),
    departmentSaga(),
    teamSaga(),
    designationSaga(),
    settingsSaga(),
    requestSaga(),
    notificationSaga(),
    announcementSaga(),
    employeeSaga(),
    inventorySaga(),
    projectSaga(),
    interviewSaga(),
    attendanceSaga(),
    dailyreportSaga(),
    dailyactivitySaga(),
    weeklyreportSaga(),
    weeklyactivitySaga(),
    monthlyreportSaga(),
    monthlyactivitySaga(),
    shiftrecordSaga(),
    hashbookSaga(),
    taskerSaga(),
    userSaga(),
    leaverequestSaga(),
    scoreSaga(),
    timesheetSaga(),
    mytaskSaga(),
    worksheetSaga(),
    shiftSaga(),
    workdataSaga()
  ]);
}
