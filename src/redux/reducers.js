// @flow

import { combineReducers } from "redux";
import Layout from "./layout/reducers";
import Auth from "./auth/reducers";
import AppMenu from "./appMenu/reducers";
import Department from "./department/reducers";
import Team from "./team/reducers";
import Designation from "./designation/reducers";
import Settings from "./settings/reducers";
import Request from "./request/reducers";
import Notification from "./notification/reducers";
import Announcement from "./announcement/reducers";
import Employee from "./employee/reducers";
import Inventory from "./inventory/reducers";
import Project from "./project/reducers";
import Attendance from "./attendance/reducers";
import Interview from "./interview/reducers";
import Dailyreport from "./dailyreport/reducers";
import Dailyactivity from "./dailyactivity/reducers";
import Weeklyreport from "./weeklyreport/reducers";
import Weeklyactivity from "./weeklyactivity/reducers";
import Monthlyreport from "./monthlyreport/reducers";
import Monthlyactivity from "./monthlyactivity/reducers";
import Shiftrecord from "./shiftrecord/reducers";
import Hashbook from "./hashbook/reducers";
import Tasker from "./tasker/reducers";
import User from "./user/reducers";
import Leaverequest from "./leaverequest/reducers";
import Score from "./score/reducers";
import Timesheet from "./timesheet/reducers";
import Mytasks from "./mytasks/reducers";
import Worksheet from "./worksheet/reducers";
import Shift from "./shift/reducers";
import Workdata from "./workdata/reducers";

export default combineReducers({
  Auth,
  AppMenu,
  Layout,
  Department,
  Team,
  Designation,
  Settings,
  Request,
  Notification,
  Announcement,
  Employee,
  Inventory,
  Project,
  Interview,
  Attendance,
  Dailyreport,
  Dailyactivity,
  Weeklyreport,
  Weeklyactivity,
  Monthlyreport,
  Monthlyactivity,
  Shiftrecord,
  Hashbook,
  Tasker,
  User,
  Leaverequest,
  Score,
  Timesheet,
  Mytasks,
  Worksheet,
  Shift,
  Workdata
});
