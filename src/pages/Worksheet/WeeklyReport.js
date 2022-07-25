import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, FormGroup, Input, Label, Row,Card, CardBody } from "reactstrap";
import {} from "../../redux/actions";
import WeeklyActivity from "./WeeklyActivity";

const WeeklyReport = ({ weeklyReport }) => {
  const updateItem = (id) => {
    weeklyReport.data.weekly_act[0].key = "123";
  };

  return (
    <Card>
    <CardBody>
      {weeklyReport &&
        weeklyReport.data &&
        weeklyReport.data.weekly_act &&
        weeklyReport.data.weekly_act.length !== 0 && (
          <div>
            <h3 className="header-title">WEEKLY ACTIVITIES</h3>
            <hr />
          </div>
        )}
      {weeklyReport &&
        weeklyReport.data &&
        weeklyReport.data.weekly_act &&
        weeklyReport.data.weekly_act.length !== 0 &&
        weeklyReport.data.weekly_act.map((item, index) => (
          <WeeklyActivity key={index} item={item} updateItem={updateItem} />
        ))}
     </CardBody>
            </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    weeklyReport: state.Worksheet.weeklyReport,
  };
};
export default connect(mapStateToProps, {})(WeeklyReport);
