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
import "./style.scss";
import ScoreAdd from "./ScoreAdd";

const CETable = (props) => {
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

  const [CE, setCE] = useState([]);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState();
  const [total,setTotal] = useState(0);

  const toggle = (data) => {
    if (props.score && props.score.score && props.score.score.data) {
      setData(data);
      setModal(!modal);
    }
  };

  useEffect(() => {
    if (props.score && props.score.score && props.score.score.data) {
      setCE([
        {
          Criteria: "Code Of Conduct",
          Value: 1,
          Scores: props.score.score.data.codeof,
        },
        {
          Criteria: "Social Media Engagements",
          Value: 1,
          Scores: props.score.score.data.ssmedia,
        },
        {
          Criteria: "Extra Curricular Activities",
          Value: 1,
          Scores: props.score.score.data.extracurricular,
        },
      ]);
      setTotal(props.score.score.data.codeof + props.score.score.data.ssmedia + props.score.score.data.extracurricular)
    }
  }, [props.score && props.score.score && props.score.score.data]);

  return (
    <>
      <Card>
        <CardBody>
          <React.Fragment>
            <Row>
              <Col className="d-flex justify-content-between mb-1">
                <h5>CULTURAL EVALUATION</h5>
                <h5>Total Score: {total}</h5>
              </Col>
            </Row>
            {props.score && props.score.listloading && <LoaderWidget />}
            {/* {props.score && props.score.score && props.score.score.data && (
              <BootstrapTable
                bootstrap4
                keyField={"dep_id"}
                data={
                  props.score && props.score.score && props.score.score.data
                }
                columns={columns}
                pagination={paginationFactory({ sizePerPage: 10 })}
                wrapperClasses="table-responsive"
                hover
                condensed
                noDataIndication={() => "There are no records to display"}
              />
            )} */}

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
                  {CE.map((record, index) => {
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
})(CETable);
