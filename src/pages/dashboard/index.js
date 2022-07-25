// @flow
import React, { useEffect } from 'react';
import { Row, Col, CardBody, Card } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import Statistics from './Statistics';
import Status from './Status';
import Tasks from './Tasks';
import TasksChart from './TasksChart';
import Activity from './Activity';
import Calendar from './Calendar';

import AttendanceChart from './attendanceChart';
import About from './About';
import { getLoggedInUser } from '../../helpers/authUtils';
import { connect } from 'react-redux';

import { getTimesheetList, getUserList, getUserAdd, getUserUpdate, getUserDelete,getWorkdataList } from '../../redux/actions';
import Leave from './Leave';
import Score from './Score';
import Task from './Task';
const ProjectDashboardPage = (props) => {
    const role = getLoggedInUser().role;
    useEffect(() => {
        if (role === 'User') {
            if (props.user) {
                props.getUserList();
            }
            if (props.timesheet && !props.timesheet.timesheet) {
                props.getTimesheetList();
            }
            if (props.workdata && !props.workdata.workdata) {
                props.getWorkdataList();
            }
        }
    }, []);


    return (
        <React.Fragment>
            <PageTitle breadCrumbItems={[{ label: 'Dashboard', active: true }]} title={'Dashboard'} />

            {role === 'User' && (
                <>
                    <Statistics data={props.user} />
                    <Row>
                        <Col xl={12} md={12} sm={12}>
                            <About data={props.user} />
                        </Col>
                        <Col xl={12} md={12} sm={12}>
                            {props.timesheet?.timesheet?.data && props.workdata?.workdata?.data?.length>0 && (
                                <AttendanceChart data={props.timesheet?.timesheet?.data} workdata={props.workdata?.workdata?.data} />
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} lg={6}>
                            <Leave data={props.user} />
                        </Col>
                        <Col md={12} lg={6}>
                          <Card>
                            <CardBody>
                            <Score data={props.user} />
                            <div className='mb-3'></div>
                            <Task data={props.user} />
                            </CardBody>
                          </Card>
                         
                        </Col>
                    </Row>
                </>
            )}

            {role === 'Admin' && (
                <>
                    {/* <Row>
                        <Col xl={4} md={12} sm={12}>
                            <Status />
                        </Col>
                        <Col xl={8} md={12} sm={12}>
                            <Tasks />
                        </Col>
                    </Row>

                    <TasksChart /> */}
                </>
            )}
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.User,
        timesheet: state.Timesheet,
        workdata: state.Workdata,
    };
};
export default connect(mapStateToProps, {
    getUserList,
    getTimesheetList,
    getUserAdd,
    getUserUpdate,
    getUserDelete,
    getWorkdataList,
})(ProjectDashboardPage);
