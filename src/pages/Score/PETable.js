import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  Row,
  Col,
} from "reactstrap";
import "./style.scss";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import ScoreDetails from "./ScoreDetails";
import ScoreAddEdit from "./ScoreAdd";
import ScoreDelete from "./ScoreDelete";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "../../assets/scss/toastr.scss"
import { connect } from "react-redux";
import {
  getScoreList,
  getScoreAdd,
  getScoreUpdate,
  getScoreDelete,
} from "../../redux/actions";
import LoaderWidget from "../../components/Loader";
import ScoreAdd from "./ScoreAdd";

const PETable = (props) => {
  const scoreAddedSucsess = () =>
    toast.success("Score Added Successfully", { transition: Zoom });
  const scoreDeletedSuccess = () =>
    toast.success("Score Deleted Successfully", { transition: Zoom });
  const scoreUpdated = () =>
    toast.info("Score Updated Successfully", { transition: Zoom });
  const emptyAllFields = () =>
    toast.warning("Please Fill All Fields", { transition: Zoom });

  const history = useHistory();

  const [PE, setPE] = useState([]);
  const [total, setTotal] = useState(0);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState();

  const toggle = (data) => {
    if (props.score && props.score.score && props.score.score.data) {
      setData(data);
      setModal(!modal);
    }
  };

  useEffect(() => {
    if (props.score && props.score.score && props.score.score.data) {
      setPE([
        {
          Criteria: "Trial Period Performance",
          Value: 10,
          Scores: props.score.score.data.trialpperf,
        },
        {
          Criteria: "Service Cancellation",
          Value: 30,
          Scores: props.score.score.data.servicecancellation,
        },
        {
          Criteria: "Public Review",
          Value: 20,
          Scores: props.score.score.data.preview,
        },
        {
          Criteria: "Client Reviews",
          Value: 10,
          Scores: props.score.score.data.creview,
        },
        {
          Criteria: "Work Quality",
          Value: 5,
          Scores: props.score.score.data.tquality,
        },
        {
          Criteria: "Communication",
          Value: 3,
          Scores: props.score.score.data.cquality,
        },
        {
          Criteria: "Client Policy Violation",
          Value: 5,
          Scores: props.score.score.data.pviolation,
        },
        {
          Criteria: "Company Policy Violation",
          Value: 5,
          Scores: props.score.score.data.cypviolation,
        },
        {
          Criteria: "SLA Violation",
          Value: 2,
          Scores: props.score.score.data.slaviolation,
        },
        {
          Criteria: "Work Reports",
          Value: 1,
          Scores: props.score.score.data.wreport,
        },
        {
          Criteria: "Challenge Of The Day",
          Value: 5,
          Scores: props.score.score.data.ChallengeOfTheDay,
        },
        {
          Criteria: "Warnings",
          Value: 10,
          Scores: props.score.score.data.warning,
        },
        {
          Criteria: "Suspensions",
          Value: 20,
          Scores: props.score.score.data.suspension,
        },
        {
          Criteria: "Awards",
          Value: 20,
          Scores: props.score.score.data.awards,
        },
      ]);
      setTotal(props.score.score.data.trialpperf+props.score.score.data.servicecancellation+props.score.score.data.preview
        +props.score.score.data.creview+props.score.score.data.tquality+ props.score.score.data.cquality+props.score.score.data.pviolation
        +props.score.score.data.cypviolation + props.score.score.data.slaviolation + props.score.score.data.wreport + props.score.score.data.ChallengeOfTheDay +
        props.score.score.data.warning+ props.score.score.data.suspension + props.score.score.data.awards)
    
    }
  }, [props.score && props.score.score && props.score.score.data]);

  return (
    <>
      <Card>
        <CardBody>
          <React.Fragment>
            <Row>
              <Col className="d-flex justify-content-between mb-1">
                <h5>PERFORMANCE EVALUATION</h5>
                <h5>Total Score : {total}</h5>
              </Col>
            </Row>
            {props.score && props.score.listloading && <LoaderWidget />}

            {props.score && props.score.score && props.score.score.data && (
              <Table className="mb-0" striped>
                <thead>
                  <tr>
                    <th>Criteria</th>
                    <th>Value</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {PE.map((record, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {" "}
                          <a
                            onClick={() => toggle(record)}
                            className="link_color"
                          >
                            {" "}
                            {record.Criteria}{" "}
                          </a>{" "}
                        </td>
                        <td>{record.Value}</td>
                        <td>{record.Scores}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </React.Fragment>

          <ScoreAdd toggle={toggle} modal={modal} data={data} />

          {/* <Modal toggle={toggle} isOpen={modal}
                           >
                            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                            <ModalBody>
                                <h6>Text in a modal</h6>
                                <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                                <hr />
                                <h6>Overflowing text to show scroll behavior</h6>
                                <p>
                                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                                    facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                                    vestibulum at eros.
                                </p>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                                    lacus vel augue laoreet rutrum faucibus dolor auctor.
                                </p>
                                <p>
                                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                                    scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non
                                    metus auctor fringilla.
                                </p>
                                <p>
                                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                                    facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                                    vestibulum at eros.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={toggle}>
                                    Do Something
                                </Button>{' '}
                                <Button color="secondary" onClick={toggle}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </Modal> */}
        </CardBody>
      </Card>

      <ToastContainer />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    score: state.Score,
  };
};
export default connect(mapStateToProps, {
  getScoreList,
  getScoreAdd,
  getScoreUpdate,
  getScoreDelete,
})(PETable);
