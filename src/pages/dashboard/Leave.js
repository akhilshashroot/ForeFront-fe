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
const Leave = (props) => {
  return (
    <Card>
      <CardBody>
        {props.data && props.data.listloading && <LoaderWidget />}

        {props.data && props.data.user && props.data.user.data && (
          <ListGroup className="p-0">
            <ListGroupItem>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  {/* <i className="mdi mdi-account text-primary rounded-circle widget-icon mr-1"></i> */}
                  Current Month Shifts
                </div>
                <div className="text-right font-weight-bold">
                  {props.data.user.data.countshift}
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  {/* <i className="mdi mdi-email-send-outline text-primary rounded-circle widget-icon mr-1"></i> */}
                  Casual Leaves
                </div>
                <div className="text-right font-weight-bold">
                  {props.data.user.data.casual}
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  {/* <i className="mdi mdi-comment-account text-primary rounded-circle widget-icon mr-1"></i> */}
                  Medical Leaves
                </div>
                <div className="text-right font-weight-bold">
                  {props.data.user.data.medical}
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  {/* <i className="mdi mdi-account-supervisor text-primary rounded-circle widget-icon mr-1"></i> */}
                  Work From Home
                </div>
                <div className="text-right font-weight-bold">
                  {props.data.user.data.wfh}
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  {/* <i className=" mdi mdi-briefcase text-primary rounded-circle widget-icon mr-1"></i> */}
                  Loss of Pay
                </div>
                <div className="text-right font-weight-bold">
                  {props.data.user.data.lop}
                </div>
              </div>
            </ListGroupItem>

            <ListGroupItem>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  {/* <i className=" mdi mdi-office-building  text-primary rounded-circle widget-icon mr-1"></i> */}
                  Swap Count
                </div>
                <div className="text-right font-weight-bold">
                  {props.data.user.data.swap_count}
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  {/* <i className=" mdi mdi-calendar-account  text-primary rounded-circle widget-icon mr-1"></i> */}
                  Holidays
                </div>
                <div className="text-right font-weight-bold">
                  {props.data.user.data.holiday}
                </div>
              </div>
            </ListGroupItem>
          </ListGroup>
        )}
      </CardBody>
    </Card>
  );
};

export default Leave;
