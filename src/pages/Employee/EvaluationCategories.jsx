import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  Input,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import Counter from "../../components/Counter";
import CommentModal from "./CommentModal";
import "./styles.css";
import { useParams } from "react-router-dom";
const EvaluationCategories = (props) => {
  const { id } = useParams();
  const { data } = props;
  const [isDisabled, setisDisabled] = useState(true);
  const [list, setList] = useState([]);
  const [modal, setModal] = useState(false);
  const [data1, setData] = useState();
  const [performanceValue, setPerformanceValue] = useState(null);

  useEffect(() => {
    if (data !== undefined) {
      setList(listdata);
    }
  }, [data]);

  const toggle = (data1, value) => {
    setData(data1);
    setModal(true);
  };

  const toggle1 = (data1) => {
    setData(null);
    setModal(false);
  };

  var listdata = [
    {
      step: 10,
      value: data?.trialpperf,
      topic: "PE",
      title: "Trial Period Performance",
      apiTitle: "trialpperf",
      incrementDisable: false,
      decrementDisable: false,
    },
    {
      step: 30,
      value: data?.servicecancellation,
      topic: "PE",
      title: "Service Cancellation",
      apiTitle: "servicecancellation",
      incrementDisable: true,
      decrementDisable: false,
    },
    {
      step: 20,
      value: data?.preview,
      topic: "PE",
      title: "Public Review",
      apiTitle: "preview",
      incrementDisable: false,
      decrementDisable: false,
    },
    {
      step: 10,
      value: data?.creview,
      topic: "PE",
      title: "Client Reviews",
      apiTitle: "creview",
      incrementDisable: false,
      decrementDisable: false,
    },
    {
      step: 5,
      value: data?.tquality,
      topic: "PE",
      title: "Work Quality",
      apiTitle: "tquality",
      incrementDisable: false,
      decrementDisable: false,
    },
    {
      step: 3,
      value: data?.cquality,
      topic: "PE",
      title: "Communication",
      apiTitle: "cquality",
      incrementDisable: false,
      decrementDisable: false,
    },
    {
      step: 5,
      value: data?.clientvio,
      topic: "PE",
      title: "Client Policy Violation",
      apiTitle: "clientvio",
      incrementDisable: true,
      decrementDisable: false,
    },
    {
      step: 5,
      value: data?.cypviolation,
      topic: "PE",
      title: "Company Policy Violation",
      apiTitle: "cypviolation",
      incrementDisable: true,
      decrementDisable: false,
    },
    {
      step: 2,
      value: data?.slaviolation,
      topic: "PE",
      title: "SLA Violation",
      apiTitle: "slaviolation",
      incrementDisable: true,
      decrementDisable: false,
    },
    {
      step: 1,
      value: data?.wreport,
      topic: "PE",
      title: "Work Reports",
      apiTitle: "wreport",
      incrementDisable: true,
      decrementDisable: false,
    },
    {
      step: 5,
      value: data?.ChallengeOfTheDay,
      topic: "PE",
      title: "Challenge Of The Day",
      apiTitle: "ChallengeOfTheDay",
      incrementDisable: false,
      decrementDisable: true,
    },
    {
      step: 10,
      value: data?.warning,
      topic: "PE",
      title: "Warnings",
      apiTitle: "warning",
      incrementDisable: true,
      decrementDisable: false,
    },
    {
      step: 20,
      value: data?.suspension,
      topic: "PE",
      title: "Suspensions",
      apiTitle: "suspension",
      incrementDisable: true,
      decrementDisable: false,
    },
    {
      step: 20,
      value: data?.awards,
      topic: "PE",
      title: "Awards",
      apiTitle: "awards",
      incrementDisable: false,
      decrementDisable: true,
    },
    {
      step: 3,
      value: data?.goldenresponse,
      topic: "IE",
      title: "Golden Responses",
      apiTitle: "goldenresponse",
      incrementDisable: false,
      decrementDisable: true,
    },
    {
      step: 1,
      value: data?.treplies,
      topic: "IE",
      title: "Thanks Replies",
      apiTitle: "treplies",
      incrementDisable: false,
      decrementDisable: true,
    },
    {
      step: 1,
      value: data?.blogpost,
      topic: "IE",
      title: "Blog Posts",
      apiTitle: "blogpost",
      incrementDisable: true,
      decrementDisable: false,
    },
    {
      step: 3,
      value: data?.interviews,
      topic: "IE",
      title: "Interviews",
      apiTitle: "interviews",
      incrementDisable: false,
      decrementDisable: true,
    },
    {
      step: 10,
      value: data?.training,
      topic: "IE",
      title: "Training",
      apiTitle: "training",
      incrementDisable: false,
      decrementDisable: false,
    },
    {
      step: 10,
      value: data?.certifications,
      topic: "IE",
      title: "Certifications",
      apiTitle: "certifications",
      incrementDisable: false,
      decrementDisable: true,
    },
    {
      step: 5,
      value: data?.seminars,
      topic: "IE",
      title: "Seminars",
      apiTitle: "seminars",
      incrementDisable: false,
      decrementDisable: false,
    },
    {
      step: 1,
      value: data?.codeof,
      topic: "CE",
      title: "Code of conduct",
      apiTitle: "codeof",
      incrementDisable: false,
      decrementDisable: false,
    },
    {
      step: 1,
      value: data?.ssmedia,
      topic: "CE",
      title: "Social Media Engagements",
      apiTitle: "ssmedia",
      incrementDisable: false,
      decrementDisable: false,
    },
    {
      step: 1,
      value: data?.extracurricular,
      topic: "CE",
      title: "Extra Curricular Activities",
      apiTitle: "extracurricular",
      incrementDisable: false,
      decrementDisable: true,
    },
  ];

  return (
    <>
      <Row className="mt-3">
        <Col md={6}>
          <Alert color="success h5">
            <i className="dripicons-checkmark"></i> Performance Evaluation
          </Alert>
          <ListGroup>
            {list
              ?.filter((e) => e.topic === "PE")
              .map((e, i) => {
                return (
                  <ListGroupItem
                    hover
                    className="d-flex justify-content-between align-items-center"
                    key={i}
                  >
                    {e.title}
                    <div>
                      {data !== undefined && (
                        <div>
                          <Counter
                            onChange={(value) => {
                              console.log(value, e.title);
                              setPerformanceValue(value);
                              let temp = list.map((m) => {
                                if (m.title === e.title) {
                                  return { ...m, comment: true };
                                } else {
                                  return { ...m, comment: false };
                                }
                              });
                              setList(temp);
                            }}
                            step={e.step}
                            ivalue={e.value}
                            incrementDisable={e.incrementDisable}
                            decrementDisable={e.decrementDisable}
                          ></Counter>
                          <Button
                            color="primary"
                            className={`${
                              e.comment ? "d-inline" : "d-none"
                            } ml-2`}
                            onClick={() => toggle(e, performanceValue)}
                          >
                            <i className="uil-comment-plus"></i>
                          </Button>
                        </div>
                      )}
                    </div>
                  </ListGroupItem>
                );
              })}
          </ListGroup>
        </Col>
        <Col md={6}>
          <Alert color="success h5">
            <i className="dripicons-checkmark"></i> Integrity Evaluation
          </Alert>
          <ListGroup>
            {list
              ?.filter((e) => e.topic === "IE")
              .map((e, i) => {
                return (
                  <ListGroupItem className="d-flex justify-content-between align-items-center">
                    {e.title}
                    <div>
                      <Counter
                        onChange={(value) => {
                          console.log(value, e.title);
                          setPerformanceValue(value);
                          let temp = list.map((m) => {
                            if (m.title === e.title) {
                              return { ...m, comment: true };
                            } else {
                              return { ...m, comment: false };
                            }
                          });
                          setList(temp);
                        }}
                        step={e.step}
                        ivalue={e.value}
                        incrementDisable={e.incrementDisable}
                        decrementDisable={e.decrementDisable}
                      ></Counter>
                      <Button
                        color="primary"
                        className={`${e.comment ? "d-inline" : "d-none"} ml-2`}
                        onClick={() => toggle(e, performanceValue)}
                      >
                        <i className="uil-comment-plus"></i>
                      </Button>
                    </div>
                  </ListGroupItem>
                );
              })}
          </ListGroup>
          <Alert color="success h5">
            <i className="dripicons-checkmark"></i> Cultural Evaluation
          </Alert>
          <ListGroup>
            {list
              ?.filter((e) => e.topic === "CE")
              .map((e, i) => {
                return (
                  <ListGroupItem className="d-flex justify-content-between align-items-center">
                    {e.title}
                    <div>
                      <Counter
                        onChange={(value) => {
                          console.log(value, e.title);
                          setPerformanceValue(value);
                          let temp = list.map((m) => {
                            if (m.title === e.title) {
                              return { ...m, comment: true };
                            } else {
                              return { ...m, comment: false };
                            }
                          });
                          setList(temp);
                        }}
                        step={e.step}
                        ivalue={e.value}
                        incrementDisable={e.incrementDisable}
                        decrementDisable={e.decrementDisable}
                      ></Counter>
                      <Button
                        color="primary"
                        className={`${e.comment ? "d-inline" : "d-none"} ml-2`}
                        onClick={() => toggle(e, performanceValue)}
                      >
                        <i className="uil-comment-plus"></i>
                      </Button>
                    </div>
                  </ListGroupItem>
                );
              })}
          </ListGroup>
          <Alert color="success h5">
            <i className="dripicons-checkmark"></i> Warning Level
          </Alert>
          <ButtonGroup className="w-100">
            <Input
              style={{ width: "80%" }}
              className="mr-2"
              type="select"
              name="select"
              id="exampleSelect"
              value={props.warningLevel}
              onChange={(e) => {
                props.handleChangewarning(e);
              }}
            >
              <option value="0"> Warning Level is zero</option>
              <option value="1"> Warning Level is one</option>
              <option value="2"> Final Warning </option>
            </Input>
            <Button color="success" onClick={props.handleWarning}>
              Save
            </Button>
          </ButtonGroup>
          {modal && (
            <CommentModal
              toggle={toggle}
              toggle1={toggle1}
              modal={modal}
              data={data1}
              performanceValue={performanceValue}
              userid={id}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default EvaluationCategories;
