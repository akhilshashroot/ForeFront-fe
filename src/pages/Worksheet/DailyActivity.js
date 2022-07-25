import React, { useState, useEffect } from "react";
import { Button, FormGroup, Input } from "reactstrap";
import { getLoggedInUser } from "../../helpers/authUtils";

import { connect } from "react-redux";


const DailyActivity = (props) => {
  const{item ,getDailyReportAdd,emptyAllFields,dailyReportAdd,getWorksheetTicketList}=props
  const [data, setData] = useState(item?.reply||'');
useEffect(()=>{
  console.log('new')
  getWorksheetTicketList()
},[dailyReportAdd])
  const sendDailyActivity = () => {
    if(data!==null && data!==''){
      let s = {
        daily_act_id: item.daily_act_id,
        daily_inputValue: data,
        user_id: getLoggedInUser().id,
      };
      getDailyReportAdd(s);
    } else{
      emptyAllFields("Please Fill Data");
    }
    
  };

  return (
    <div className="py-2">
      <p>
        <span>{item.daily_act}</span>
      </p>
      <FormGroup>
        <Input
          type="textarea"
          name="text"
          value={data}
          className="form-control"
          rows="5"
          onChange={(e) => setData(e.target.value)}
        />
      </FormGroup>
      <Button color="primary" className="float-right" size='sm' onClick={sendDailyActivity}>
        Save
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};
export default DailyActivity;

