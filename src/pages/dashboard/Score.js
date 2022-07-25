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
const Score = (props) => {
  return (
  <>
  {props.data && props.data.listloading && <LoaderWidget />}

{props.data && props.data.user && props.data.user.data && (
  <ListGroup className="p-0">
    <ListGroupItem>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          {/* <i className="mdi mdi-account text-primary rounded-circle widget-icon mr-1"></i> */}
          Performance Score
        </div>
        <div className="text-right font-weight-bold">
          {props.data.user.data.performance_score}
        </div>
      </div>
    </ListGroupItem>
    <ListGroupItem>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          {/* <i className="mdi mdi-email-send-outline text-primary rounded-circle widget-icon mr-1"></i> */}
          Integrity Score
        </div>
        <div className="text-right font-weight-bold">
          {props.data.user.data.integrity_score}
        </div>
      </div>
    </ListGroupItem>
    <ListGroupItem>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          {/* <i className="mdi mdi-comment-account text-primary rounded-circle widget-icon mr-1"></i> */}
          Cultural Score
        </div>
        <div className="text-right font-weight-bold">
          {props.data.user.data.cultural_score}
        </div>
      </div>
    </ListGroupItem>
  </ListGroup>
)}
  </>
        
    
  );
};

export default Score;
