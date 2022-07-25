import { API_BASE_URL } from "./hostSetting";

const baseUrl = API_BASE_URL;

export const endpoints = {
  hostUrl: baseUrl,
  loginUrl: `${baseUrl}/api/user/login`,
  AdminloginUrl: `${baseUrl}/api/admin/login`,
  forgetPassword: `${baseUrl}/api/password/email`,
  resetPassword: `${baseUrl}/api/reset-password`,

  //Department
  departmentList: `${baseUrl}/api/admin/viewdepts`,
  departmentAdd: `${baseUrl}/api/admin/newdept`,
  departmentUpdate: `${baseUrl}/api/admin/editdepts`,
  departmentDelete: `${baseUrl}/api/admin/delete_depts`,

  //Team
  teamList: `${baseUrl}/api/admin/teams`,
  teamAdd: `${baseUrl}/api/admin/teams`,
  teamUpdate: `${baseUrl}/api/admin/teams`,
  teamDelete: `${baseUrl}/api/admin/teams`,

  //Designation
  designationList: `${baseUrl}/api/admin/designation`,
  designationAdd: `${baseUrl}/api/admin/designation`,
  designationUpdate: `${baseUrl}/api/admin/designation`,
  designationDelete: `${baseUrl}/api/admin/designation`,

  // Settings
  settingsUpdate: `${baseUrl}/api/admin/settings`,
  // User Details
  userList: `${baseUrl}/api/user/user_data`,

  //Request
  requestListAdmin: `${baseUrl}/api/admin/request`,
  requestApproveAdmin: `${baseUrl}/api/admin/request/approve`,
  requestRejectAdmin: `${baseUrl}/api/admin/request/reject`,
  requestDeleteAdmin: `${baseUrl}/api/admin/request/delete`,

  //Timesheet
  timesheetList: `${baseUrl}/api/user/attendancelog`,
  timesheetPunchin: `${baseUrl}/api/user/punchin`,
  timesheetPunchout: `${baseUrl}/api/user/punchout`,
  timesheetBreak: `${baseUrl}/api/user/breaktime`,
  deskshotAdd: `${baseUrl}/api/user/workscreenshort`,


  workdataList:`${baseUrl}/api/user/getuserWorkandBreaktime`,

  //Tasker
  taskerAdd: `${baseUrl}/api/admin/task_management`,
  taskerList: `${baseUrl}/api/admin/task_management`,
  taskerApprove: `${baseUrl}/api/admin/task_management`,
  taskerReject: `${baseUrl}/api/admin/task_management`,
  taskerDelete: `${baseUrl}/api/admin/task_management`,
  taskerComment: `${baseUrl}/api/admin/addcomment`,

  //Notification
  notificationList: `${baseUrl}/api/admin/notification`,

  //Department
  announcementList: `${baseUrl}/api/admin/announcement`,
  announcementAdd: `${baseUrl}/api/admin/announcement`,
  announcementUpdate: `${baseUrl}/api/admin/notice_board_details`,
  announcementDelete: `${baseUrl}/api/admin/announcement`,

  //Employee
  employeeList: `${baseUrl}/api/admin/employee`,
  useremployeeList: `${baseUrl}/api/user/get_employees`,
  employeeAdd: `${baseUrl}/api/admin/employee`,
  employeeUpdate: `${baseUrl}/api/admin/employee`,
  employeeDelete: `${baseUrl}/api/admin/employee`,
  resignedemployeeList: `${baseUrl}/api/admin/get_resigned`,
  designationList: `${baseUrl}/api/admin/designation`,
  employeeLogin: `${baseUrl}/api/admin_user/login`,

  //Inventory
  inventoryList: `${baseUrl}/api/admin/inventory`,
  inventoryAdd: `${baseUrl}/api/admin/inventory`,
  inventoryUpdate: `${baseUrl}/api/admin/inventory`,
  inventoryDelete: `${baseUrl}/api/admin/inventory`,

  //Interview
  interviewList: `${baseUrl}/api/admin/interview`,
  interviewAdd: `${baseUrl}/api/admin/interview`,
  interviewUpdate: `${baseUrl}/api/admin/interview_update`,
  interviewDelete: `${baseUrl}/api/admin/interview`,
  createComment : `${baseUrl}/api/admin/addcomment`,

  //Project
  projectList: `${baseUrl}/api/admin/project-room`,
  projectAdd: `${baseUrl}/api/admin/project-room`,
  projectUpdate: `${baseUrl}/api/admin/project-room`,
  projectDelete: `${baseUrl}/api/admin/project-room`,

  //Attendance
  attendanceList: `${baseUrl}/api/admin/attendance`,

  //DailyReport
  dailyreportList: `${baseUrl}/api/admin/daily_datas`,
  dailyactivityList: `${baseUrl}/api/admin/getjd`,
  dailyactivityDelete: `${baseUrl}/api/admin/delete_Activity`,
  dailyactivityAdd: `${baseUrl}/api/admin/add_new_act`,
  jobdesAdd: `${baseUrl}/api/admin/changejd`,

  //WeeklyReport
  weeklyreportList: `${baseUrl}/api/admin/weekly_report`,
  weeklyactivityList: `${baseUrl}/api/admin/getweeklyactivity`,
  weeklyactivityDelete: `${baseUrl}/api/admin/weekly_report`,
  weeklyactivityAdd: `${baseUrl}/api/admin/weekly_report`,

  //MonthlyReport
  monthlyreportList: `${baseUrl}/api/admin/monthly_report`,
  monthlyactivityList: `${baseUrl}/api/admin/getmonthlyactivity`,
  monthlyactivityDelete: `${baseUrl}/api/admin/monthly_report`,
  monthlyactivityAdd: `${baseUrl}/api/admin/monthly_report`,

  //Shiftrecord
  shiftrecordList: `${baseUrl}/api/admin/shiftweek_manager/getweeks`,
  shiftrecordView: `${baseUrl}/api/admin/shiftweek_manager/loadPreviousShift`,

  //Hashbook
  hashbookList: `${baseUrl}/api/discussion`,
  hashbookAdd: `${baseUrl}/api/discussion`,
  hashbookUpdate: `${baseUrl}/api/discussion`,
  hashbookDelete: `${baseUrl}/api/discussion`,
  hashbookAuthors: `${baseUrl}/api/get_authors`,
  hashbookCreateComment: `${baseUrl}/api/create_comment`,
  hashbookCommentDetails: `${baseUrl}/api/discussion_details`,
  hashbookSubTopic : `${baseUrl}/api/create_subtopic`,

  //EmployeeSkill
  employeeskillList: `${baseUrl}/api/admin/getEmployeeSkillSet`,
  employeeskillAdd: `${baseUrl}/api/admin/addNewSkill`,
  employeeskillDelete: `${baseUrl}/api/admin/removeSkill`,
  employeeskillReview: `${baseUrl}/api/admin/changeSkillStatus`,
  employeeProfileUpload: `${baseUrl}/api/admin/manage_upload`,

  //Leave Request
  requestList: `${baseUrl}/api/user/request_leave`,
  requestSend: `${baseUrl}/api/user/request_leave`,
  requestListType: `${baseUrl}/api/user/request_type`,

  //My scores User
  scoreList: `${baseUrl}/api/user/score`,
  performanceEvaluation: `${baseUrl}/api/user/get_evaluation_details`,
  performanceEvaluationHistory: `${baseUrl}/api/user/get_evaluation_history`,

  //MyTask
  taskList: `${baseUrl}/api/user/get_task`,
  postComment: `${baseUrl}/api/user/post_comment`,

  //Shift Schedule
  teamMembers: `${baseUrl}/api/user/getTeamMembers`,

  //Worksheet
  ticketList: `${baseUrl}/api/user/ticket_count`,
  skillView: `${baseUrl}/api/user/skill_list`,
  skillUpdate: `${baseUrl}/api/user/skill_status_update`,
  dailyReport: `${baseUrl}/api/user/work_data`,
  dailyReportAdd: `${baseUrl}/api/user/work_data`,
  reportWeekly: `${baseUrl}/api/user/weekly_data`,
  reportAddWeekly: `${baseUrl}/api/user/save_weekly_data`,
  monthlyReport: `${baseUrl}/api/user/monthly_data`,
  monthlyReportAdd: `${baseUrl}/api/user/save_montly_data`,
  ticketDetails: `${baseUrl}/api/user/get_saved_ticket_details`,
  ticketUpdate: `${baseUrl}/api/user/update_ticket_response`,
  ticketSave: `${baseUrl}/api/user/ticket_data_save`,
  viewReport : `${baseUrl}/api/user/work_report`,

  //Shift
  teamMembers :`${baseUrl}/api/user/getTeamMembers`,
  createShift:`${baseUrl}/api/user/createShift`,
  getWeeks:`${baseUrl}/api/user/getWeeks`,
  getPreviousShift:`${baseUrl}/api/user/loadPreviousShift`,
  editShift:`${baseUrl}/api/user/editShifts`,
  swapShift:`${baseUrl}/api/user/swapShift`,
  swapDelete:`${baseUrl}/api/user/deleteSwap`,
  swapComment:`${baseUrl}/api/user/updateComment`,
  loadShifts:`${baseUrl}/api/user/loadShifts`,


  //Performance Admin
  getEmployeePerformance : `${baseUrl}/api/admin/performance`,
  resetOvertime : `${baseUrl}/api/admin/overtime_reset`,
  updateMandatory : `${baseUrl}/api/admin/update_mandatory`,
  manageWarning : `${baseUrl}/api/admin/manage_warning`,
  performanceUpdate : `${baseUrl}/api/admin/performance_update`,

};
