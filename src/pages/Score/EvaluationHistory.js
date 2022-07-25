import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Row,
} from "reactstrap";
import "react-datetime/css/react-datetime.css";
import { connect } from "react-redux";
import { getPEHistoryList } from "../../redux/actions";
import { getLoggedInUser } from "../../helpers/authUtils";
import LoaderWidget from "../../components/Loader";

const EvaluationHistory = ({ getPEHistoryList, score }) => {
  const [date, setDate] = useState(null);

  const evaluationHistory = () => {
    let data = {
      user_id: getLoggedInUser().id,
      month_pick: date,
    };
    getPEHistoryList(data);
  };

  return (
    <React.Fragment>
      {/* <h5>EVALUATION HISTORY</h5>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <Datetime className="mx-auto my-auto" />
        </Col>
        <Col md={3}></Col>
      </Row> */}
      <Card>
        <CardBody>
          <h5>EVALUATION HISTORY</h5>
          <Row>
            <Col md={4}>
              <p className="mx-auto pt-4">Please select a month</p>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="exampleMonth">Month</Label>
                <Input
                  type="month"
                  name="month"
                  id="exampleMonth"
                  placeholder="date month"
                  onChange={(e) => setDate(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <button
                type="button"
                className="btn btn-primary mx-auto mt-3"
                onClick={evaluationHistory}
                disabled={date == null}
              >
                Proceed
              </button>
            </Col>
          </Row>
          {score && score.peHistoryloading && <LoaderWidget />}
          {score &&
            score.PEHistory &&
            score.PEHistory.data &&
            score.PEHistory.data.pe_data.length !== 0 && (
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between mb-3">
                    <h4 className="header-title">
                      Performance Evaluation Of {date}{" "}
                    </h4>

                    <span className="badge badge-danger pt-1">
                      Total Score : {score.PEHistory.data.pe_sum}
                    </span>
                  </div>
                  {score.PEHistory.data.pe_data.map((item, index) => (
                    <ListGroup key={index}>
                      <ListGroupItem>
                        <ListGroupItemHeading>
                          {item.pe_criteria}
                        </ListGroupItemHeading>
                        <ListGroupItemText>
                          Date: {item.pe_date}
                        </ListGroupItemText>
                        <ListGroupItemText>
                          Points: {item.pe_point}
                        </ListGroupItemText>
                      </ListGroupItem>
                    </ListGroup>
                  ))}
                </CardBody>
              </Card>
            )}
          {score &&
            score.PEHistory &&
            score.PEHistory.data &&
            score.PEHistory.data.ce_data.length !== 0 && (
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between mb-3">
                    <h4 className="header-title">
                      CULTURAL EVALUATION Of {date}{" "}
                    </h4>

                    <span className="badge badge-danger pt-1">
                      Total Score : {score.PEHistory.data.ce_sum}
                    </span>
                  </div>
                  {score.PEHistory.data.ce_data.map((item, index) => (
                    <ListGroup key={index}>
                      <ListGroupItem>
                        <ListGroupItemHeading>
                          {item.ce_criteria}
                        </ListGroupItemHeading>
                        <ListGroupItemText>
                          Date: {item.ce_date}
                        </ListGroupItemText>
                        <ListGroupItemText>
                          Points: {item.ce_point}
                        </ListGroupItemText>
                      </ListGroupItem>
                    </ListGroup>
                  ))}
                </CardBody>
              </Card>
            )}
          {score &&
            score.PEHistory &&
            score.PEHistory.data &&
            score.PEHistory.data.ie_data.length !== 0 && (
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between mb-3">
                    <h4 className="header-title">
                      CULTURAL EVALUATION Of {date}{" "}
                    </h4>

                    <span className="badge badge-danger pt-1">
                      Total Score : {score.PEHistory.data.ie_sum}
                    </span>
                  </div>
                  {score.PEHistory.data.ie_data.map((item, index) => (
                    <ListGroup key={index}>
                      <ListGroupItem>
                        <ListGroupItemHeading>
                          {item.ie_criteria}
                        </ListGroupItemHeading>
                        <ListGroupItemText>
                          Date: {item.ie_date}
                        </ListGroupItemText>
                        <ListGroupItemText>
                          Points: {item.ie_point}
                        </ListGroupItemText>
                      </ListGroupItem>
                    </ListGroup>
                  ))}
                </CardBody>
              </Card>
            )}

{score &&
            score.PEHistory &&
            score.PEHistory.data &&
            score.PEHistory.data.comments.length !== 0 && (
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between mb-3">
                    <h4 className="header-title">
                    Comments {date}{" "}
                    </h4>

                    {/* <span className="badge badge-danger pt-1">
                      Total Score : {score.PEHistory.data.ce_sum}
                    </span> */}
                  </div>
                  {score.PEHistory.data.comments.map((item, index) => (
                    <ListGroup key={index}>
                      <ListGroupItem>
                        <ListGroupItemHeading>
                         ID : {item.id}
                        </ListGroupItemHeading>
                        <ListGroupItemText>
                          Date: {item.date}
                        </ListGroupItemText>
                        <ListGroupItemText>
                          Comment: {item.comments}
                        </ListGroupItemText>
                      </ListGroupItem>
                    </ListGroup>
                  ))}
                </CardBody>
              </Card>
            )}
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

// export default EvaluationHistory;

const mapStateToProps = (state) => {
  return {
    score: state.Score,
  };
};
export default connect(mapStateToProps, {
  getPEHistoryList,
})(EvaluationHistory);
