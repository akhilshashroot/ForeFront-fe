import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FormGroup, Input, ListGroup, ListGroupItem } from "reactstrap";
import { getWeeklyReportAdd } from "../../redux/actions";
import { getLoggedInUser } from "../../helpers/authUtils";

const WeeklyActivity = ({ item, updateItem ,getWeeklyReportAdd}) => {
  const [data, setData] = useState("");

  const sendWeeklyActivity = () => {
    let s = {
      user_id: getLoggedInUser().id,
      weekly_inputValue: data,
      wa_id: item.wa_id,
    };
    getWeeklyReportAdd(s)
  };

  if (item.type === "checkbox") {
    return (
      <div>
        <ListGroup>
          <ListGroupItem className="d-flex justify-content-between align-items-center">
            {item.wa_activity}
            {item.reply == "" ? (
              <i
                className="uil uil-times  widget-icon bg-danger-lighten text-danger"
                onClick={() => updateItem(item.wa_id)}
              ></i>
            ) : (
              <i className="uil  uil-check widget-icon bg-success-lighten text-success"></i>
            )}
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }

  return (
    <div>
      <p className="pt-2">
        {" "}
        <span>{item.wa_activity}</span>{" "}
      </p>
      <FormGroup>
        <Input
          type="textarea"
          name="text"
          rows="5"
          defaultValue={item.reply}
          onChange={(e) => setData(e.target.value)}
        />
      </FormGroup>
      <button className="float-right btn btn-primary btn-sm" onClick={sendWeeklyActivity}>
        Save
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, { getWeeklyReportAdd })(WeeklyActivity);
