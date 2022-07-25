import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import PageTitle from '../../components/PageTitle';
import Timer from './Timer';
import { getLoggedInUser } from '../../helpers/authUtils';
import { connect } from 'react-redux';
import { getTimesheetList, getTimesheetPunchin, getTimesheetPunchout, getTimesheetBreak ,getDeskshotAdd} from '../../redux/actions';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AttendanceLog from './AttendanceLog';
import DeskShot from './DeskShot';

// const teamAddedSucsess = () => toast.success("Team Added Successfully", { transition: Zoom })
// const teamDeletedSuccess = () => toast.success("Team Deleted Successfully", { transition: Zoom })
// const teamUpdated = () => toast.info("Team Updated Successfully", { transition: Zoom })
const emptyAllFields = (msg) => toast.warning(msg, { transition: Zoom });

const Timesheet = (props) => {
    const [attenstatus, setAttenstatus] = useState(false);
    useEffect(() => {
        if (props.timesheet && !props.timesheet.timesheet) {
            props.getTimesheetList();
        }
    }, []);
    useEffect(() => {
        if (props.timesheet && props.timesheet.timesheetPunchin) {
            props.getTimesheetList();
        }
    }, [props.timesheet.timesheetPunchin]);
    useEffect(() => {
        if (props.timesheet && props.timesheet.timesheetPunchout) {
            props.getTimesheetList();
        }
    }, [props.timesheet.timesheetPunchout]);
    useEffect(() => {
        if (props.timesheet && props.timesheet.timesheetBreak) {
            props.getTimesheetList();
        }
    }, [props.timesheet.timesheetBreak]);
    return (
        <>
            <PageTitle breadCrumbItems={[{ label: 'Timesheet', active: true }]} title={'Timesheet'} />
            <Row>
          
         
                {props.timesheet && props.timesheet.timesheet && (
                    <>
                          <Col md={6}>
                    <Timer
                        getTimesheetList={props.getTimesheetList}
                        getTimesheetPunchin={props.getTimesheetPunchin}
                        getTimesheetPunchout={props.getTimesheetPunchout}
                        getTimesheetBreak={props.getTimesheetBreak}
                        emptyAllFields={emptyAllFields}
                        data={props.timesheet}
                        graph={props.timesheet?.timesheet?.data?.log} 
                        attenstatus={attenstatus}
                    />
                       
                </Col>
                          <Col md={6}>
                <DeskShot getDeskshotAdd={props.getDeskshotAdd} emptyAllFields={emptyAllFields}/>
                       
                </Col>
                <Col md={12}>
                        <AttendanceLog data={props.timesheet?.timesheet?.data?.log} />
                    </Col>
                    </>
            
                )}
            </Row>
            <ToastContainer />
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        timesheet: state.Timesheet,
    };
};
export default connect(mapStateToProps, {
    getTimesheetList,
    getTimesheetPunchin,
    getTimesheetPunchout,
    getTimesheetBreak,
    getDeskshotAdd,
})(Timesheet);
