// @flow
import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import Statistics from './Statistics';
import Status from './Status';
import Tasks from './Tasks';
import TasksChart from './TasksChart';
import Activity from './Activity';
import Calendar from './Calendar';
import LoaderWidget from '../../components/Loader';
import AttendanceChart from './attendanceChart';
import About from './About';
import { getLoggedInUser } from '../../helpers/authUtils';
import { connect } from 'react-redux';
import { getTimesheetList,getUserList, getUserAdd, getUserUpdate, getUserDelete } from '../../redux/actions';
const EmployeeDashboard = (props) => {
    useEffect(() => {
        if (props.user) {
            props.getUserList();
        }
        if (props.timesheet) {
            let data = {
                user_id: getLoggedInUser().id,
            };
            props.getTimesheetList(data);
        }
    }, []);
    const role = getLoggedInUser().role;
    
    return (
        <React.Fragment>
            <PageTitle breadCrumbItems={[{ label: 'Dashboard', active: true }]} title={'Dashboard'} />

            <Statistics />
            <Row>
                <Col xl={4} md={12} sm={12}>
                    {props.department && props.department.listloading && <LoaderWidget />}
                    <About data={props.user} />
                </Col>
{/*              
                          <Col xl={8} md={12} sm={12}>
                          {props.department && props.department.listloading && <LoaderWidget />}
                          {props.timesheet&&props.timesheet.timesheet&&(
                          <AttendanceChart data={props.timesheet.timesheet} />
                          )}
                      </Col> */}
            
          
            </Row>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
   
        return {
        user: state.User,
        timesheet: state.Timesheet,
    };
};
export default connect(mapStateToProps, { getUserList,getTimesheetList, getUserAdd, getUserUpdate, getUserDelete, })(EmployeeDashboard);
