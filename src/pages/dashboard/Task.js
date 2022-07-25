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
const Task = (props) => {
  return (

      <>
        {props.data && props.data.listloading && <LoaderWidget />}

{props.data && props.data.user && props.data.user.data && (
  <ListGroup className="p-0">
    <ListGroupItem>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          {/* <i className="mdi mdi-account text-primary rounded-circle widget-icon mr-1"></i> */}
          Assigned Tasks
        </div>
        <div className="text-right font-weight-bold">
          {props.data.user.data.assigned_task}
        </div>
      </div>
    </ListGroupItem>
    <ListGroupItem>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          {/* <i className="mdi mdi-email-send-outline text-primary rounded-circle widget-icon mr-1"></i> */}
          Pending Tasks
        </div>
        <div className="text-right font-weight-bold">
          {props.data.user.data.pending_task}
        </div>
      </div>
    </ListGroupItem>
    <ListGroupItem>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          {/* <i className="mdi mdi-comment-account text-primary rounded-circle widget-icon mr-1"></i> */}
          Completed Tasks
        </div>
        <div className="text-right font-weight-bold">
          {props.data.user.data.completed_task}
        </div>
      </div>
    </ListGroupItem>
  </ListGroup>
)}
      </>

  );
};

export default Task;
