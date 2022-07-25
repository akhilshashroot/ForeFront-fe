// @flow
import { data } from "jquery";
import React from "react";
import Chart from "react-apexcharts";
import {
  Card,
  CardBody,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Badge,
  Spinner,
} from "reactstrap";
import LoaderWidget from "../../components/Loader";
const Assignment = (props) => {
  return (
    <Card>
      <CardBody>
        <h4 className="header-title">About</h4>

        {props.data && props.data.listloading && <LoaderWidget />}

        {props.data && props.data.user && props.data.user.data && (
          <ListGroup className="p-0">
            <ListGroupItem>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <i className="mdi mdi-account text-primary rounded-circle widget-icon mr-1"></i>
                  Name
                </div>
                <div className="text-right font-weight-bold">
                  {props.data.user.data.fullname || "N/A"}
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <i className="mdi mdi-email-send-outline text-primary rounded-circle widget-icon mr-1"></i>
                  Email
                </div>
                <div className="text-right font-weight-bold">
                  {props.data.user.data.email || "N/A"}
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <i className="mdi mdi-comment-account text-primary rounded-circle widget-icon mr-1"></i>
                  Hashroot ID
                </div>
                <div className="text-right font-weight-bold">
                  {props.data.user.data.emp_id || "N/A"}
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <i className="mdi mdi-account-supervisor text-primary rounded-circle widget-icon mr-1"></i>
                  Team
                </div>
                <div className="text-right font-weight-bold">
                  {props.data.user.data.team || "N/A"}
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <i className=" mdi mdi-briefcase text-primary rounded-circle widget-icon mr-1"></i>
                  Designation
                </div>
                <div className="text-right font-weight-bold">
                  {props.data.user.data.designation || "N/A"}
                </div>
              </div>
            </ListGroupItem>
       
            <ListGroupItem>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <i className=" mdi mdi-office-building  text-primary rounded-circle widget-icon mr-1"></i>
                  Dept.
                </div>
                <div className="text-right font-weight-bold">
                  {props.data.user.data.department || "N/A"}
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <i className=" mdi mdi-calendar-account  text-primary rounded-circle widget-icon mr-1"></i>
                  DOB
                </div>
                <div className="text-right font-weight-bold">
                  {props.data.user.data.dob || "N/A"}
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <i className="mdi mdi-phone text-primary rounded-circle widget-icon mr-1"></i>
                  Phone No
                </div>
                <div className="text-right font-weight-bold">
                  {props.data.user.data.phone || "N/A"}
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <i className=" mdi mdi-water  text-primary rounded-circle widget-icon mr-1"></i>
                  Blood Group
                </div>
                <div className="text-right font-weight-bold">
                  {props.data.user.data.bloodgroup || "N/A"}
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <i className=" mdi mdi-shield-account text-primary rounded-circle widget-icon mr-1"></i>
                  Certifications
                </div>
                <div className="text-right font-weight-bold">
                  {props.data.user.data.cert_list || "N/A"}
                </div>
              </div>
            </ListGroupItem>
          </ListGroup>
        )}
      </CardBody>
    </Card>
  );
};

export default Assignment;
