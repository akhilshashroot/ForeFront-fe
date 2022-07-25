import React, { useEffect } from "react";
import Skills from "./Skills";
import TicketCount from "./TicketCount";

import { connect } from "react-redux";
import {
  getTicketList,
  getSkillList,
  getDailyReportList,
  getMonthlyReportList,
  getWeeklyReportList,
  getWorksheetTicketList,
} from "../../redux/actions";
import { ToastContainer } from "react-toastify";
import LoaderWidget from "../../components/Loader";
import { Card, CardBody } from "reactstrap";
import MonthlyReport from "./MonthlyReport";
import WeeklyReport from "./WeeklyReport";
import DailyReport1 from "./DailyReport1";

const WorksheetConfig = (props) => {
  useEffect(() => {
    props.getTicketList();
    props.getSkillList();
    props.getDailyReportList();
    props.getMonthlyReportList();
    props.getWeeklyReportList();
    props.getWorksheetTicketList();
  }, []);

  return (
    <>
      {props.worksheet && props.worksheet.listloading ? (
        <LoaderWidget />
      ) : (
       <>
            <Skills />
            <TicketCount />
            <DailyReport1 />
            <WeeklyReport />
            <MonthlyReport />
            <ToastContainer />
     
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    worksheet: state.Worksheet,
  };
};
export default connect(mapStateToProps, {
  getTicketList,
  getSkillList,
  getDailyReportList,
  getMonthlyReportList,
  getWeeklyReportList,
  getWorksheetTicketList,
})(WorksheetConfig);
