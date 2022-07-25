import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FormGroup, Input } from "reactstrap";
import { getMonthlyReportAdd } from "../../redux/actions";
import { getLoggedInUser } from "../../helpers/authUtils";

const MonthlyActivity = ({ item, getMonthlyReportAdd ,emptyAllFields}) => {
  const [data, setData] = useState(item.reply||"");

  const sendMonthlyActivity = () => {
    if(data!==null && data!==''){
      let s = {
        user_id: getLoggedInUser().id,
        monthly_inputValue: data,
        mid: item.ma_id,
      };
      getMonthlyReportAdd(s);
    }
    else{
      emptyAllFields("Please Fill Data");
    }
    
  };

  return (
    <div className="py-2">
      <p >
     
        <span>{item.ma_activity}</span>{" "}
      </p>
      <FormGroup>
        <Input
          type="textarea"
          name="text"
          rows="5"
         value={data||''}
          onChange={(e) => setData(e.target.value)}
        />
      </FormGroup>
      <button className="btn btn-primary btn-sm float-right" onClick={sendMonthlyActivity}>
        Save
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, { getMonthlyReportAdd })(
  MonthlyActivity
);
