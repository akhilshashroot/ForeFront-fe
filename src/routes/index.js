import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

import { isUserAuthenticated, getLoggedInUser } from "../helpers/authUtils";

// lazy load all the views

// auth

const Login = React.lazy(() => import("../pages/auth/Login"));
const AdminLogin = React.lazy(() => import("../pages/auth/AdminLogin"));
const Logout = React.lazy(() => import("../pages/auth/Logout"));
const Register = React.lazy(() => import("../pages/auth/Register"));
const ForgetPassword = React.lazy(() => import("../pages/auth/ForgetPassword"));
const Confirm = React.lazy(() => import("../pages/auth/Confirm"));
const Resetpassword = React.lazy(() => import("../pages/auth/PasswordUpdate"));

//department
const Department = React.lazy(() => import("../pages/Department"));
//Tasker
const Tasker = React.lazy(() => import("../pages/Tasker"));

//Employee
const Employees = React.lazy(() => import("../pages/Employee"));

//Employee Performance
const EmployeePerformance = React.lazy(() => import("../pages/Employee/EmployeePerformance"));

//ShitSchedule
const ShitSchedule = React.lazy(() => import("../pages/Shiftschedule"));

//Team
const Team = React.lazy(() => import("../pages/Team"));
//Designation
const Designation = React.lazy(() => import("../pages/Designation"));
//Settings
const Settings = React.lazy(() => import("../pages/Settings"));
//Requests
const Request = React.lazy(() => import("../pages/Requests"));
//TimeSheet
const TimeSheet = React.lazy(() => import("../pages/Timesheet"));

//Management
const Notification = React.lazy(() =>
  import("../pages/Management/Notification")
);
const Inventory = React.lazy(() => import("../pages/Management/Inventory"));
const Project = React.lazy(() => import("../pages/Management/Project"));

//Interview
const Interview = React.lazy(() => import("../pages/Interview"));
//Announcement
const Announcement = React.lazy(() => import("../pages/Announcement"));
//Attendance
const Attendance = React.lazy(() => import("../pages/Attendance"));
//Shift Record
const Shiftrecord = React.lazy(() => import("../pages/Shiftrecord"));
//DailyReports
const Dailyreport = React.lazy(() => import("../pages/Reports/DailyReport"));
const Weeklyreport = React.lazy(() => import("../pages/Reports/WeeklyReport"));
const Monthlyreport = React.lazy(() =>
  import("../pages/Reports/MonthlyReport")
);

//Hashbook
const Hashbook = React.lazy(() => import("../pages/Hashbook"));
const HashbookComment = React.lazy(() =>
  import("../pages/Hashbook/HashbookComment")
);

//Leave request
const LeaveRequest = React.lazy(() => import("../pages/Leaverequest/index"));

//Instruction
const Instruction = React.lazy(() => import("../pages/Instruction/index"));

//Worksheet
const Worksheet = React.lazy(() => import("../pages/Worksheet/index"));

//My scores User
const Score = React.lazy(() => import("../pages/Score/index"));

//MyTask
const Mytask = React.lazy(() => import("../pages/my-task/index"));

//User Profile
const UserProfile = React.lazy(() => import("../pages/Userprofile/index"));

// dashboard
const EcommerceDashboard = React.lazy(() =>
  import("../pages/dashboards/Ecommerce")
);
const CRMDashboard = React.lazy(() => import("../pages/dashboards/CRM"));
const AnalyticsDashboard = React.lazy(() =>
  import("../pages/dashboards/Analytics")
);
const EmployeeDashboard = React.lazy(() => import("../pages/dashboard"));
// apps
const CalendarApp = React.lazy(() => import("../pages/apps/Calendar"));
const Projects = React.lazy(() => import("../pages/apps/Projects/"));
const ProjectDetail = React.lazy(() =>
  import("../pages/apps/Projects/Detail/")
);
const ProjectGannt = React.lazy(() => import("../pages/apps/Projects/Gantt/"));
const ProjectForm = React.lazy(() =>
  import("../pages/apps/Projects/ProjectForm")
);
// - ecommece pages
const EcommerceProducts = React.lazy(() =>
  import("../pages/apps/Ecommerce/Products")
);
const ProductDetails = React.lazy(() =>
  import("../pages/apps/Ecommerce/ProductDetails")
);
const Orders = React.lazy(() => import("../pages/apps/Ecommerce/Orders"));
const OrderDetails = React.lazy(() =>
  import("../pages/apps/Ecommerce/OrderDetails")
);
const Customers = React.lazy(() => import("../pages/apps/Ecommerce/Customers"));
const Cart = React.lazy(() => import("../pages/apps/Ecommerce/Cart"));
const Checkout = React.lazy(() => import("../pages/apps/Ecommerce/Checkout/"));
const Sellers = React.lazy(() => import("../pages/apps/Ecommerce/Sellers"));
// chat
const ChatApp = React.lazy(() => import("../pages/apps/Chat/"));
// social
const SocialFeed = React.lazy(() => import("../pages/apps/SocialFeed/"));
// tasks
const TaskList = React.lazy(() => import("../pages/apps/Tasks/List/"));
const Kanban = React.lazy(() => import("../pages/apps/Tasks/Board/"));

// - email
const Inbox = React.lazy(() => import("../pages/apps/Email/Inbox"));
const EmailDetail = React.lazy(() => import("../pages/apps/Email/Detail"));

// pages
const Starter = React.lazy(() => import("../pages/Starter"));
const Profile = React.lazy(() => import("../pages/profile"));
const ErrorPageNotFound = React.lazy(() =>
  import("../pages/error/PageNotFound")
);
const ServerError = React.lazy(() => import("../pages/error/ServerError"));

// - other
const Invoice = React.lazy(() => import("../pages/other/Invoice"));
const FAQ = React.lazy(() => import("../pages/other/FAQ"));
const Pricing = React.lazy(() => import("../pages/other/Pricing"));
const Timeline = React.lazy(() => import("../pages/other/Timeline"));

// uikit
const Accordions = React.lazy(() => import("../pages/uikit/Accordions"));
const Alerts = React.lazy(() => import("../pages/uikit/Alerts"));
const Badges = React.lazy(() => import("../pages/uikit/Badges"));
const Buttons = React.lazy(() => import("../pages/uikit/Buttons"));
const Cards = React.lazy(() => import("../pages/uikit/Cards"));
const Carousel = React.lazy(() => import("../pages/uikit/Carousel"));
const Dropdowns = React.lazy(() => import("../pages/uikit/Dropdowns"));
const ListGroups = React.lazy(() => import("../pages/uikit/ListGroups"));
const Modals = React.lazy(() => import("../pages/uikit/Modals"));
const Tabs = React.lazy(() => import("../pages/uikit/Tabs"));
const Toasts = React.lazy(() => import("../pages/uikit/Toasts"));
const Grid = React.lazy(() => import("../pages/uikit/Grid"));
const Popovers = React.lazy(() => import("../pages/uikit/Popovers"));
const Progress = React.lazy(() => import("../pages/uikit/Progress"));
const Ribbons = React.lazy(() => import("../pages/uikit/Ribbons"));
const Tooltips = React.lazy(() => import("../pages/uikit/Tooltips"));
const Typography = React.lazy(() => import("../pages/uikit/Typography"));
const Spinners = React.lazy(() => import("../pages/uikit/Spinners"));
const Widgets = React.lazy(() => import("../pages/uikit/Widgets"));
const DragDrop = React.lazy(() => import("../pages/uikit/DragDrop"));
const RangeSliders = React.lazy(() => import("../pages/uikit/RangeSliders"));
const Ratings = React.lazy(() => import("../pages/uikit/Ratings"));

const MDIIcons = React.lazy(() => import("../pages/uikit/MDIIcons"));
const Dripicons = React.lazy(() => import("../pages/uikit/Dripicons"));
const Unicons = React.lazy(() => import("../pages/uikit/Unicons"));
// forms
const BasicForms = React.lazy(() => import("../pages/forms/Basic"));
const FormValidation = React.lazy(() => import("../pages/forms/Validation"));
const FormAdvanced = React.lazy(() => import("../pages/forms/Advanced"));
const FormWizard = React.lazy(() => import("../pages/forms/Wizard"));
const FileUpload = React.lazy(() => import("../pages/forms/FileUpload"));
const Editors = React.lazy(() => import("../pages/forms/Editors"));
// charts
const ApexChart = React.lazy(() => import("../pages/charts/Apex"));
const BriteChart = React.lazy(() => import("../pages/charts/Brite"));
const ChartJs = React.lazy(() => import("../pages/charts/ChartJs"));
// tables
const BasicTables = React.lazy(() => import("../pages/tables/Basic"));
const AdvancedTables = React.lazy(() => import("../pages/tables/Advanced"));
// maps
const GoogleMaps = React.lazy(() => import("../pages/GoogleMaps"));

// handle auth and authorization

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!isUserAuthenticated()) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      const loggedInUser = getLoggedInUser();
      // check if route is restricted by role

      if (roles && roles.indexOf(loggedInUser.role) === -1) {
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: "/" }} />;
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);

// root routes
const rootRoute = {
  path: "/",
  exact: true,
  // component: () => <Redirect to='/dashboard' />,
  component: () =>
    getLoggedInUser().role === "Admin" ? (
      <Redirect to="/admin/dashboard" />
    ) : (
      <Redirect to="/employee/dashboard" />
    ),
  // component: EmployeeDashboard,
  route: PrivateRoute,
};

// dashboards
const dashboardRoutes = {
  path: "/admin/dashboard",
  name: "Dashboard",
  route: PrivateRoute,
  icon: "uil-home-alt",
  header: "Navigation",
  component: EmployeeDashboard,
  roles: ["Admin"],
  role_number: [0, 1, 2, 3, 4, 5],
};
const EmployeePerformanceRoutes = {
  path: "/admin/employee/performance/:id",
  name: "Employees",
  route: PrivateRoute,
  icon: "uil-user-check",
  component: EmployeePerformance,
  roles: ["Admin"],
  role_number: [0, 1, 2, 3, 4],
};
const EmployeeRoutes = {
  path: "/admin/employees",
  name: "Employees",
  route: PrivateRoute,
  icon: "uil-user-check",
  component: Employees,
  roles: ["Admin"],
  role_number: [0, 1, 2, 3, 4],
};
// dashboards
const empdashboardRoutes = {
  path: "/employee/dashboard",
  name: "Dashboard",
  route: PrivateRoute,
  icon: "uil-home-alt",
  header: "Navigation",
  component: EmployeeDashboard,
  roles: ["User"],
};

const TimesheetRoutes = {
  path: "/employee/timesheet",
  name: "Timesheet",
  route: PrivateRoute,
  icon: "uil-clock-eight",
  component: TimeSheet,
  roles: ["User"],
};

const Worksheetroutes = {
  path: "/employee/worksheet",
  name: "Worksheet",
  route: PrivateRoute,
  icon: "uil-clipboard-notes",
  component: Worksheet,
  roles: ["User"],
};

const TasksRoutes = {
  path: "/employee/tasks",
  name: "My Tasks",
  route: PrivateRoute,
  icon: "uil-briefcase",
  component: Mytask,
  roles: ["User"],
};

const ScoreRoutes = {
  path: "/employee/scores",
  name: "My Scores",
  route: PrivateRoute,
  icon: "uil-star",
  component: Score,
  roles: ["User"],
};
const RequestRoutes = {
  path: "/employee/request",
  name: "Requests",
  route: PrivateRoute,
  icon: "uil-bell",
  component: LeaveRequest,
  roles: ["User"],
};

// const ShiftupdateRoutes = {
//     path: '/shiftupdates',
//     name: 'Shift Updates',
//     route: PrivateRoute,
//     icon: 'uil-chat-info',
//     component: Starter,
//     roles: ['User'],
// };

const ShiftscheduleRoutes = {
  path: "/employee/shiftschedules",
  name: "Shift Schedule",
  route: PrivateRoute,
  icon: "uil-calender",
  component: ShitSchedule,
  roles: ["User"],
};
const hashbookRoutes = {
  path: "/admin/hashbook",
  name: "Hashbook",
  route: PrivateRoute,
  icon: "uil-book",
  component: Hashbook,
  roles: ["Admin"],
  role_number: [0, 1, 2, 3, 4],
};
const employeehashbookRoutes = {
  path: "/employee/hashbook",
  name: "Hashbook",
  route: PrivateRoute,
  icon: "uil-book",
  component: Hashbook,
  roles: ["User"],
};

const hashbookcommentRoutes = {
  path: "/hashcomment/:id",
  name: "Hashbook Comment",
  route: PrivateRoute,
  icon: "uil-comment-dots",
  component: HashbookComment,
  roles: ["Admin"],
  role_number: [0, 1, 2, 3, 4],
};
const employeehashbookcommentRoutes = {
  path: "/employee/hashcomment/:id",
  name: "Hashbook Comment",
  route: PrivateRoute,
  icon: "uil-comment-dots",
  component: HashbookComment,
  roles: ["User","Admin"],
};

const userProfile = {
  path: "/admin/userprofile",
  name: "User Profile",
  route: PrivateRoute,
  icon: "uil-chat-bubble-user",
  component: UserProfile,
  roles: ["Admin"],
  role_number: [0, 1, 2, 3, 4],
};

const employeeuserProfile = {
  path: "/employee/userprofile",
  name: "User Profile",
  route: PrivateRoute,
  icon: "uil-chat-bubble-user",
  component: UserProfile,
  roles: ["User"],
};

const InstructionRoutes = {
  path: "/employee/instructions",
  name: "Instructions",
  route: PrivateRoute,
  icon: "uil-info-circle",
  component: Instruction,
  roles: ["User"],
};



const DepartmentRoutes = {
  path: "/admin/department",
  name: "Department",
  route: PrivateRoute,
  icon: "uil-building",
  component: Department,
  roles: ["Admin"],
  role_number: [0, 1, 2, 3, 4, 5],
};

const TeamRoutes = {
  path: "/admin/teams",
  name: "Teams",
  route: PrivateRoute,
  icon: "uil-users-alt",
  component: Team,
  roles: ["Admin"],
  role_number: [0, 1, 2, 3, 5],
};
const TaskerRoutes = {
  path: "/admin/tasker",
  name: "Tasker",
  route: PrivateRoute,
  icon: "uil-clipboard-alt",
  component: Tasker,
  roles: ["Admin"],
  role_number: [0, 1, 2, 3, 4],
};
const AttendanceRoutes = {
  path: "/admin/attendance",
  name: "Attendance",
  route: PrivateRoute,
  icon: "uil-schedule",
  component: Attendance,
  roles: ["Admin"],
  role_number: [0, 1, 2, 3, 4, 5],
};
const AdminRequestRoutes = {
  path: "/admin/requests",
  name: "Requests",
  route: PrivateRoute,
  icon: "uil-bell",
  component: Request,
  roles: ["Admin"],
  role_number: [0, 1, 2, 3, 4, 5],
};
const SettingRoutes = {
  path: "/admin/settings",
  name: "Settings",
  route: PrivateRoute,
  icon: "uil-cog",
  component: Settings,
  roles: ["Admin"],
  role_number: [0, 4],
};
const ShiftRecordRoutes = {
  path: "/admin/shiftrecords",
  name: "Shift Records",
  route: PrivateRoute,
  icon: "uil-database",
  component: Shiftrecord,
  roles: ["Admin"],
  role_number: [0, 1, 2, 3],
};
const InterviewRoute = {
  path: "/admin/interviewscheduler",
  name: "Interview Scheduler",
  route: PrivateRoute,
  icon: "uil-chart-pie-alt",
  component: Interview,
  roles: ["Admin"],
  role_number: [0, 1, 2, 3, 4, 5],
};
// const AnnouncementRoute = {
//   path: "/admin/announcements",
//   name: "Announcements",
//   route: PrivateRoute,
//   icon: "uil-microphone",
//   component: Announcement,
//   roles: ["Admin"],
//   role_number: [0, 1, 2, 3],
// };
const DesignationRoute = {
  path: "/admin/designation",
  name: "Designation",
  route: PrivateRoute,
  icon: "uil-suitcase-alt",
  component: Designation,
  roles: ["Admin"],
  role_number: [0, 1, 2, 3, 4],
};
const ReportRoutes = {
  path: "/admin/reports",
  name: "Reports",
  route: PrivateRoute,
  icon: "uil-invoice",
  roles: ["Admin"],
  role_number: [0, 1, 2, 3, 4, 5],
  children: [
    {
      path: "/admin/reports/daily",
      name: "Daily Reports",
      route: PrivateRoute,

      component: Dailyreport,
      roles: ["Admin"],
      role_number: [0, 1, 2, 3, 4, 5],
    },
    {
      path: "/admin/reports/weekly",
      name: "Weekly Reports",
      route: PrivateRoute,

      component: Weeklyreport,
      roles: ["Admin"],
      role_number: [0, 1, 2, 3, 4, 5],
    },
    {
      path: "/admin/reports/monthly",
      name: "Monthly Reports",
      route: PrivateRoute,

      component: Monthlyreport,
      roles: ["Admin"],
      role_number: [0, 1, 2, 3, 4, 5],
    },
  ],
};

const ManagementRoutes = {
  path: "/admin/management",
  name: "Management",
  route: PrivateRoute,
  icon: "uil-sitemap",
  roles: ["Admin"],
  role_number: [0, 1, 2, 3, 4],
  children: [
    {
      path: "/admin/management/inventory",
      name: "Inventory Mangement",
      route: PrivateRoute,
      component: Inventory,
      roles: ["Admin"],
      role_number: [0, 2, 3],
    },
    {
      path: "/admin/management/project",
      name: "Project Management",
      route: PrivateRoute,
      component: Project,
      roles: ["Admin"],
      role_number: [0, 1, 2, 3, 4],
    },
    {
      path: "/admin/management/notification",
      name: "Notification Management",
      route: PrivateRoute,
      component: Notification,
      roles: ["Admin"],
      role_number: [0, 1, 2, 3],
    },
  ],
};

const appRoutes = [
  EmployeeRoutes,
  DepartmentRoutes,
  TeamRoutes,
  DesignationRoute,
  TaskerRoutes,
  AttendanceRoutes,
  AdminRequestRoutes,
  ReportRoutes,
  ManagementRoutes,
  SettingRoutes,
  ShiftRecordRoutes,
  InterviewRoute,
  // AnnouncementRoute,
  TimesheetRoutes,
  Worksheetroutes,
  TasksRoutes,
  ScoreRoutes,
  RequestRoutes,
  // ShiftupdateRoutes,
  ShiftscheduleRoutes,
  hashbookRoutes,
  employeehashbookRoutes,
  InstructionRoutes,
];

const getUpdatedRoutes = (appRoutes) => {
  let roleRoutes = [];

  if (getLoggedInUser() && getLoggedInUser().role) {
    const getrole = getLoggedInUser().role;
    roleRoutes = appRoutes.filter((t) => t.roles.includes(getrole));
  }

  return roleRoutes;
};
let roleRoutes = getUpdatedRoutes(appRoutes);

// auth
const loginRoute = {
  path: "/login",
  name: "Login",
  component: Login,
  route: Route,
};

const AdminloginRoute = {
  path: "/admin",
  name: "Login",
  component: AdminLogin,
  route: Route,
};

const logoutRoute = {
  path: "/logout",
  name: "Logout",
  component: Logout,
  route: Route,
};

const forgotPasswordRoute = {
  path: "/forget-password",
  name: "Forget Password",
  component: ForgetPassword,
  route: Route,
};
const passwordReset = {
  path: "/password-reset/:id",
  name: "Reset Password",
  component: Resetpassword,
  route: Route,
};
const authRoutes = [
  loginRoute,
  AdminloginRoute,
  logoutRoute,
  forgotPasswordRoute,
  passwordReset,
];

// flatten the list of all nested routes
const flattenRoutes = (routes) => {
  let flatRoutes = [];

  routes = routes || [];
  routes.forEach((item) => {
    flatRoutes.push(item);

    if (typeof item.children !== "undefined") {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

// All routes
const allRoutes = [
  rootRoute,
  dashboardRoutes,
  EmployeePerformanceRoutes,
  empdashboardRoutes,
  ...appRoutes,
  ...authRoutes,
  hashbookcommentRoutes,
  employeehashbookcommentRoutes,
  employeeuserProfile,
  userProfile,
];
const loginRoutes = [
  rootRoute,
  dashboardRoutes,
  empdashboardRoutes,
  ...authRoutes,
];

const authProtectedRoutes = [dashboardRoutes, empdashboardRoutes, ...appRoutes];

const allFlattenRoutes = flattenRoutes(allRoutes);

export {
  allRoutes,
  authProtectedRoutes,
  allFlattenRoutes,
  getUpdatedRoutes,
  appRoutes,
  loginRoutes,
};
