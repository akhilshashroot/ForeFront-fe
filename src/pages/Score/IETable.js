import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Button,
  UncontrolledTooltip,
  Table,
} from "reactstrap";
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
import "./style.scss";

const IETable = (props) => {
  const scoreAddedSucsess = () =>
    toast.success("Score Added Successfully", { transition: Zoom });
  const scoreDeletedSuccess = () =>
    toast.success("Score Deleted Successfully", { transition: Zoom });
  const scoreUpdated = () =>
    toast.info("Score Updated Successfully", { transition: Zoom });
  const emptyAllFields = () =>
    toast.warning("Please Fill All Fields", { transition: Zoom });

  const history = useHistory();
  const [toggleDetailsModal, setToggleDetailsModal] = useState(false);
  const [toggleAddEditModal, setToggleAddEditModal] = useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
  const [scoreData, setScoreData] = useState(null);
  const [index, setIndex] = useState(null);
  const [IE, setIE] = useState([]);
  const [IeTotal, setIeTotal] = useState(0);
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
      setIE([
        {
          Criteria: "Golden Responses",
          Value: 3,
          Scores: props.score.score.data.goldenresponse,
        },
        {
          Criteria: "Thanks Replies",
          Value: 1,
          Scores: props.score.score.data.treplies,
        },
        {
          Criteria: "Blog Posts",
          Value: 1,
          Scores: props.score.score.data.blogpost,
        },
        {
          Criteria: "Interviews",
          Value: 3,
          Scores: props.score.score.data.interviews,
        },
        {
          Criteria: "Training",
          Value: 10,
          Scores: props.score.score.data.training,
        },
        {
          Criteria: "Certificates",
          Value: 10,
          Scores: props.score.score.data.certifications,
        },
        {
          Criteria: "Seminars",
          Value: 5,
          Scores: props.score.score.data.seminars,
        },
      ]);
      setIeTotal(
        props.score.score.data.goldenresponse +
          props.score.score.data.treplies +
          props.score.score.data.blogpost +
          props.score.score.data.interviews +
          props.score.score.data.training +
          props.score.score.data.certifications +
          props.score.score.data.seminars
      );
    }
  }, [props.score && props.score.score && props.score.score.data]);

  return (
    <>
      <Card>
        <CardBody>
          <React.Fragment>
            <Row>
              <Col className="d-flex justify-content-between mb-1">
                <h5>INTEGRITY EVALUATION</h5>
                <h5>Total Score: {IeTotal}</h5>
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
                  {IE.map((record, index) => {
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

            <ScoreAdd toggle={toggle} modal={modal} data={data} />
          </React.Fragment>
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
})(IETable);
