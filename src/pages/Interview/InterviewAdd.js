import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  CustomInput,
  UncontrolledAlert,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import "./style.scss";
import { AvForm, AvField } from "availity-reactstrap-validation";
// import DepImg from "../../assets/images/texa/add-interview.png"
import Select from "react-select";
// import LoaderWidget from '../../components/Loader';
import { getEmployeeList, getCommentAdd } from "../../redux/actions";
import { connect } from "react-redux";
import { getLoggedInUser } from "../../helpers/authUtils";
import { API_BASE_URL } from "../../services/hostSetting";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import FileUploader from "../../components/FileUploader";

const baseUrl = API_BASE_URL;
const leads = [
  { value: "5fc78772db194609be7ca210", label: "Magmina" },
  { value: "7fc78772db194609be7ca210", label: "Peter" },
  { value: "6fc78772db194609be7ca210", label: "Thomas" },
];

const modeofInterviewOptions = [
  { value: "Face to Face", label: "Face to Face" },
  { value: "Telephonic", label: "Telephonic" },
  { value: "skype", label: "skype" },
];

const statusOptions = [
  { value: "open", label: "open" },
  { value: "later", label: "later" },
  { value: "not interested", label: "not interested" },
  { value: "unavailable", label: "unavailable" },
  { value: "didn't appear", label: "didn't appear" },
  { value: "1st interview scheduled", label: "1st interview scheduled" },
  { value: "interviewed", label: "interviewed" },
  { value: "schedule 2nd round", label: "schedule 2nd round" },
  { value: "2nd Interview Scheduled", label: "2nd Interview Scheduled" },
  { value: "review done", label: "review done" },
  { value: "on hold", label: "on hold" },
  { value: "offered", label: "offered" },
  { value: "declined", label: "declined" },
  { value: "joined", label: "joined" },
  { value: "unqualified", label: "unqualified" },
];

class InterviewAddEdit extends React.Component {
  state = {
    displayResume: true,
    selectedLead: null,
    isLoading: false,
    name: null,
    desc: null,
    selectEmployees: null,
    dateOfJoiningDisplay: false,
    candidateName: null,
    candidateEmail: null,
    candidatePhone: null,
    DOI: null,
    position: null,
    noticePeriod: null,
    ETC: null,
    CTC: null,
    Interviews: null,
    modeOfInterview: null,
    Priortise: false,
    status: null,
    DOJ: null,
    notes: null,
    initresume: [],
    resume: [],
    updateResume: null,
    editInterviewDisplay: false,
    comment: null,
    commentDisplay: null,
  };

  toggleModal = () => {
    this.props.closeAddEditModal();
  };

  componentDidMount = () => {
    if (this.props.employee && !this.props.employee.employee) {
      this.props.getEmployeeList();
    }

    if (this.props.toggleAddEditModal) {
      if (this.props.data !== null) {
        // if(this.props.data.examiners_details.length!==0){
        //   console.log(this.props.name)
        //   let interview=this.props.data.examiners_details.map(item=>item.name)
        //   this.setState({Interviews:interview});
        // }
        this.setState({
          editInterviewDisplay: true,
          commentDisplay: this.props.data.comment,
        });
        this.handleEmployeeChange(
          this.convertRecilist(this.props.data.pr_userids)
        );
        if (this.props.data.priority === 1) {
          this.setState({ Priortise: true });
        } else {
          this.setState({ Priortise: false });
        }
        if (this.props.data.joining_date != null) {
          this.setState({ DOJ: this.props.data.joining_date });
        }
        this.setState({
          displayResume: false,
          candidateName: this.props.data.name,
          candidateEmail: this.props.data.candidate_email,
          candidatePhone: this.props.data.phone,
          DOI: this.props.data.interview_date,
          position: this.props.data.position,
          noticePeriod: this.props.data.notice_period,
          ETC: this.props.data.etc,
          CTC: this.props.data.ctc,
          // status: this.props.data.status,
          notes: this.props.data.note,
        });
        if (this.props.data.resume) {
          this.setState({
            initresume: this.props.data.resume,
          });
        }
        this.interviewTypeChange(
          modeofInterviewOptions.filter(
            (item) => item.label == this.props.data.mode
          )
        );
        if (this.props.data.status.startsWith("DOJ")) {
          this.statusChange(
            statusOptions.filter((item) => item.label == "offered")[0]
          );
          this.setState({
            DOJ: this.props.data.joining_date,
          });
        } else {
          this.statusChange(
            statusOptions.filter(
              (item) => item.label == this.props.data.status
            )[0]
          );
        }
      } else {
        this.setState({ editInterviewDisplay: false });
      }
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.interview && this.props.interview.interviewAdd) {
      if (
        prevProps.interview.interviewAdd !== this.props.interview.interviewAdd
      ) {
        this.props.getInterviewList();

        this.toggleModal();
      }
    }
    if (this.props.interview && this.props.interview.interviewUpdate) {
      if (
        prevProps.interview.interviewUpdate !==
        this.props.interview.interviewUpdate
      ) {
        this.props.getInterviewList();

        this.toggleModal();
      }
    }
    if (this.props.interview && this.props.interview.interviewUpdate) {
      if (
        prevProps.interview.interviewUpdate !==
        this.props.interview.interviewUpdate
      ) {
        this.props.getInterviewList();

        this.toggleModal();
      }
    }
    if (this.props.interview && this.props.interview.CommentAdd) {
      if (prevProps.interview.CommentAdd !== this.props.interview.CommentAdd) {
        this.props.getInterviewList();

        this.toggleModal();
      }
    }
  }

  convertEmployee = (data) => {
    var employeeData = [];
    data &&
      data.forEach((value) => {
        employeeData.push({
          label: value.fullname,
          value: value._id,
        });
      });
    return employeeData;
  };

  addInterview() {
    if (
      this.state.candidateName !== null &&
      this.state.candidateName !== "" &&
      this.state.candidateEmail !== null &&
      this.state.candidateEmail !== "" &&
      this.state.candidatePhone !== null &&
      this.state.candidatePhone !== "" &&
      this.state.position !== null &&
      this.state.position !== "" &&
      this.state.resume !== null &&
      this.state.resume !== "" &&
      this.state.noticePeriod !== null &&
      this.state.noticePeriod !== "" &&
      this.state.ETC !== null &&
      this.state.ETC !== "" &&
      this.state.CTC !== null &&
      this.state.CTC !== "" &&
      // this.state.Interviews !== null &&
      // this.state.Interviews !== "" &&
      this.state.modeOfInterview !== null &&
      this.state.modeOfInterview !== "" &&
      this.state.status !== null &&
      this.state.status !== ""
    ) {
      if (this.state.Interviews != null && this.state.Interviews != "" && this.state.Interviews != undefined) {
        console.log("in" ,this.state.Interviews )
        var interviewId = this.state.Interviews.map((item) => item.value);
      }else{
        var interviewId = null;
      }

      const formData = new FormData();

      if (this.state.Priortise == false) {
        formData.append("priority", 0);
      } else {
        formData.append("priority", 1);
      }

      if (this.state.DOJ !== null && this.state.DOJ !== "") {
        formData.append("joining_date", this.state.DOJ);
      }
      if (this.state.resume.length > 0) {
        for (let i = 0; i < this.state.resume.length; i++) {
          formData.append("resume", this.state.resume[i]);
        }
      }
      formData.append("examiner", interviewId);
      formData.append("candidate_name", this.state.candidateName);
      formData.append("candidate_email", this.state.candidateEmail);
      formData.append("candidate_phone", this.state.candidatePhone);
      formData.append("candidate_position", this.state.position);
      formData.append("interview_date", this.state.DOI);
      formData.append("notice_period", this.state.noticePeriod);
      formData.append("interview_mode", this.state.modeOfInterview.value);
      formData.append("creator_id", getLoggedInUser().id);
      formData.append("interview_status", this.state.status.value);
      formData.append("note", this.state.notes);
      formData.append("current_salary", this.state.CTC);
      formData.append("expected_salary", this.state.ETC);
      this.props.getInterviewAdd(formData);
    } else {
      this.props.emptyAllFields();
    }
  }

  updateInterview = () => {
    if (
      this.state.candidateName !== null &&
      this.state.candidateName !== "" &&
      this.state.candidateEmail !== null &&
      this.state.candidateEmail !== "" &&
      this.state.candidatePhone !== null &&
      this.state.candidatePhone !== "" &&
      this.state.noticePeriod !== null &&
      this.state.noticePeriod !== "" &&
      this.state.ETC !== null &&
      this.state.ETC !== "" &&
      this.state.CTC !== null &&
      this.state.CTC !== "" &&
      // this.state.Interviews !== null &&
      // this.state.Interviews !== "" &&
      this.state.modeOfInterview !== null &&
      this.state.modeOfInterview !== "" &&
      this.state.status !== null &&
      this.state.status !== ""
    ) {
      // let data = {
      //   dep_name: this.state.name,
      //   dep_id: this.props.data.dep_id,
      // };
      if (this.state.Interviews != null && this.state.Interviews != "" && this.state.Interviews != undefined) {
        var interviewId = this.state.Interviews.map((item) => item.value);
      }else{
        var interviewId = null;
      }
      // const interviewId = this.state.Interviews.map((item) => item.value);
      const formData = new FormData();

      if (this.state.Priortise == false) {
        formData.append("priority", 0);
      } else {
        formData.append("priority", 1);
      }

      if (this.state.DOJ !== null && this.state.DOJ !== "") {
        formData.append("joining_date", this.state.DOJ);
      }
      if (this.state.resume.length > 0) {
        for (let i = 0; i < this.state.resume.length; i++) {
          formData.append("resume", this.state.resume[i]);
        }
      }
      formData.append("examiner", interviewId);
      formData.append("candidate_name", this.state.candidateName);
      formData.append("candidate_email", this.state.candidateEmail);
      formData.append("candidate_phone", this.state.candidatePhone);
      formData.append("candidate_position", this.state.position);
      formData.append("interview_date", this.state.DOI);
      formData.append("notice_period", this.state.noticePeriod);
      formData.append("interview_mode", "skype");
      formData.append("creator_id", getLoggedInUser().id);
      formData.append("interview_status", this.state.status.value);
      formData.append("note", "check");
      formData.append("current_salary", this.state.CTC);
      formData.append("expected_salary", this.state.ETC);
      formData.append("resume", this.state.updateResume);
      this.props.getInterviewUpdate(formData, this.props.data.id);
    } else {
      this.props.emptyAllFields();
    }
  };

  convertRecilist = (data) => {
    var Data = [];
    data &&
      data.forEach((value) => {
        Data.push({ label: value.fullname, value: value.id });
      });
    return Data;
  };

  handleEmployeeChange = (e) => {
    this.setState({
      Interviews: e,
    });
  };

  statusChange = (e) => {
    if (e.value === "offered") {
      this.setState({
        dateOfJoiningDisplay: true,
        status: e,
      });
    } else {
      this.setState({
        dateOfJoiningDisplay: false,
      });
      this.setState({
        status: e,
      });
    }
  };

  interviewTypeChange = (e) => {
    this.setState({
      modeOfInterview: e,
    });
  };

  resumeUpload = (e) => {
    this.setState({
      resume: e.target.files[0],
    });
  };

  dateOfInterviewChange = (e) => {};

  toggleResume = () => {
    this.setState({
      displayResume: true,
    });
  };

  handleFileupload = (e) => {
    this.setState({ resume: e });
  };
  handleDelete = () => {
    this.setState({ initresume: [] });
  };

  updateResumeChange = (e) => {
    this.setState({
      updateResume: e.target.files[0],
    });
  };

  addComment = () => {
    let send = {
      candidate_id: this.props.data.id,
      comment: this.state.comment,
      admin_id: getLoggedInUser().id,
    };
    this.props.getCommentAdd(send);
  };

  render() {
    const {
      selectedLead,
      name,
      desc,
      candidateName,
      candidateEmail,
      candidatePhone,
      DOI,
      position,
      noticePeriod,
      ETC,
      CTC,
      Interviews,
      modeOfInterview,
      Priortise,
      DOJ,
      notes,
      status,
      initresume,
      resume,
      comment,
      editInterviewDisplay,
      commentDisplay,
    } = this.state;
    const { data } = this.props;
    return (
      <React.Fragment>
        <Card className="dept-details-card">
          <CardBody>
            <Modal
              isOpen={this.props.toggleAddEditModal}
              toggle={this.toggleModal}
              className="modal-dialog-centered"
              size="xl"
            >
              <ModalHeader
                toggle={this.toggleModal}
                className="modal-colored-header bg-dark"
              >
                {data !== null ? "Edit Interview" : "Interview Scheduler"}
              </ModalHeader>
              <ModalBody>
                {/* {this.props.employee && this.props.employee.employeelistloading && this.props.interview && this.props.interview.listloading && <LoaderWidget />} */}
                <AvForm>
                  <Row>
                    <Col md={12}>
                      <Row>
                        <Col md={4}>
                          <AvField
                            name="dept-name"
                            label="Candidate Name"
                            type="text"
                            value={candidateName || ""}
                            onChange={(e) => {
                              this.setState({ candidateName: e.target.value });
                            }}
                            placeholder="Enter Candidate Name"
                          />
                          <AvField
                            name="dept-name"
                            label="Candidate Email"
                            type="text"
                            value={candidateEmail || ""}
                            onChange={(e) => {
                              this.setState({ candidateEmail: e.target.value });
                            }}
                            placeholder="Enter Candidate Email"
                          />
                          <AvField
                            name="dept-name"
                            label="Candidate Phone"
                            type="text"
                            value={candidatePhone || ""}
                            onChange={(e) => {
                              this.setState({ candidatePhone: e.target.value });
                            }}
                            placeholder="Enter Candidate Phone"
                          />

                          <p className="mb-1 font-weight-bold">Interviews</p>
                          <Select
                            isMulti={true}
                            isClearable={true}
                            className="react-select mb-3"
                            classNamePrefix="react-select"
                            defaultValue={this.state.Interviews || ""}
                            options={this.convertRecilist(
                              this.props.employee &&
                                this.props.employee.employee &&
                                this.props.employee.employee.data
                            )}
                            onChange={(e) => this.handleEmployeeChange(e)}
                          ></Select>

                          {this.state.dateOfJoiningDisplay && (
                            <FormGroup>
                              <Label for="exampleDate">Date Of Joining</Label>
                              <Input
                                type="date"
                                name="date"
                                id="exampleDate"
                                placeholder="date placeholder"
                                value={DOJ || ""}
                                onChange={(e) => {
                                  this.setState({ DOJ: e.target.value });
                                }}
                              />
                            </FormGroup>
                          )}
                          {!this.state.displayResume && (
                            <input
                              type="file"
                              onChange={this.updateResumeChange}
                            />
                          )}
                        </Col>

                        <Col md={4}>
                          <AvField
                            name="dept-name"
                            label="Position"
                            type="text"
                            value={position || ""}
                            onChange={(e) => {
                              this.setState({ position: e.target.value });
                            }}
                            placeholder="Enter Position"
                          />

                          <FormGroup>
                            <Label for="exampleCheckbox">Priortise</Label>
                            <div>
                              <CustomInput
                                type="checkbox"
                                id="exampleCustomCheckbox"
                                label="Prioritize"
                                // value={Priortise || ""}
                                onChange={(e) => {
                                  this.setState({ Priortise: !Priortise });
                                }}
                              />
                            </div>
                          </FormGroup>

                          <FormGroup>
                            <Label for="exampleSelect">Mode Of Interview</Label>

                            <Select
                              label="Inventory Type"
                              className="react-select mb-3"
                              classNamePrefix="react-select"
                              defaultValue={this.state.modeOfInterview || ""}
                              onChange={(e) => this.interviewTypeChange(e)}
                              options={modeofInterviewOptions}
                            ></Select>
                          </FormGroup>

                          <FormGroup>
                            <Label for="exampleSelect">Status</Label>

                            <Select
                              label="Inventory Type"
                              className="react-select mb-3"
                              classNamePrefix="react-select"
                              defaultValue={this.state.status || ""}
                              options={statusOptions}
                              onChange={(e) => this.statusChange(e)}
                            ></Select>
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <AvField
                            name="dept-name"
                            label="Notice Period"
                            type="text"
                            value={noticePeriod || ""}
                            onChange={(e) => {
                              this.setState({ noticePeriod: e.target.value });
                            }}
                            placeholder="Enter Notice Period"
                          />
                          <AvField
                            name="dept-name"
                            label="CTC"
                            type="text"
                            value={CTC || ""}
                            onChange={(e) => {
                              this.setState({ CTC: e.target.value });
                            }}
                            placeholder="Enter CTC"
                          />
                          <AvField
                            name="dept-name"
                            label="ETC"
                            type="text"
                            value={ETC || ""}
                            onChange={(e) => {
                              this.setState({ ETC: e.target.value });
                            }}
                            placeholder="Enter ETC"
                          />
                          <Label for="exampleDate">Date Of Interview</Label>
                          <Datetime
                            type="date"
                            name="date"
                            id="exampleDate"
                            placeholder="date placeholder"
                            value={DOI || ""}
                            onChange={(e) => {
                              this.setState({ DOI: e });
                            }}
                          />
                        </Col>
                        {/* <Col md="6">
                        <div className="form-group">
                            <Label for="exampleDate">Date Of Interview</Label>
                            <HyperDatepicker
                                hideAddon={true}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={60}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                timeCaption="time"
                                onChange={(e) => this.dateOfInterviewChange(e)}
                            />
                        </div>
                        </Col> */}
                        <Col md="12">
                          {initresume.length == 0 && (
                            <>
                              <Label for="fileuploader">Upload Resume</Label>
                              <FileUploader
                                id="fileuploader"
                                onFileUpload={(files) =>
                                  this.handleFileupload(files)
                                }
                              />
                            </>
                          )}

                          {initresume.length !== 0 && (
                            <>
                              {this.state.displayResume ? (
                                <Label for="fileuploader">Resume</Label>
                              ) : (
                                <Label for="fileuploader">Update Resume</Label>
                              )}

                              <Card>
                                <CardBody>
                                  <Row>
                                    <Col className="col-auto">
                                      <div className="avatar-sm">
                                        <span className="avatar-title bg-primary rounded">
                                          {initresume.split(".")[1]}
                                        </span>
                                      </div>
                                    </Col>
                                    <Col className="pl-0">
                                      <a
                                        href={initresume}
                                        target="_blank"
                                        className="text-muted font-weight-bold"
                                      >
                                        {initresume}
                                      </a>
                                    </Col>
                                    {this.state.displayResume && (
                                      <Col className="text-right">
                                        <i
                                          style={{ cursor: "pointer" }}
                                          className="mdi mdi-close widget-icon bg-danger-lighten text-danger hover-scale-lg"
                                          onClick={() => this.handleDelete()}
                                        ></i>
                                      </Col>
                                    )}
                                  </Row>
                                </CardBody>
                              </Card>
                            </>
                          )}
                          <FormGroup>
                            <Label for="exampleText">Notes</Label>
                            <Input
                              type="textarea"
                              name="text"
                              id="exampleText"
                              rows="3"
                              value={notes || ""}
                              onChange={(e) => {
                                this.setState({ notes: e.target.value });
                              }}
                              disabled
                            />
                          </FormGroup>
                          {editInterviewDisplay && (
                            <FormGroup>
                              <Label for="exampleText">Comments</Label>
                              <Input
                                type="textarea"
                                name="text"
                                id="exampleText"
                                rows="4"
                                value={comment}
                                onChange={(e) => {
                                  this.setState({ comment: e.target.value });
                                }}
                              />
                              <Button
                                className="btn btn-success mt-2"
                                onClick={this.addComment}
                              >
                                Add Comment
                              </Button>
                            </FormGroup>
                          )}
                          {editInterviewDisplay &&
                            commentDisplay &&
                            commentDisplay.length !== 0 &&
                            commentDisplay.map((item, index) => (
                              <ListGroup key={index}>
                                <ListGroupItem>
                                  <div>
                                    <p>{item.comment}</p>
                                    <p className="text-success">
                                      {item.name} | {item.time}
                                    </p>
                                  </div>
                                </ListGroupItem>
                              </ListGroup>
                            ))}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </AvForm>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={this.toggleModal}>
                  Cancel
                </Button>{" "}
                {data !== null ? (
                  <Button
                    color="success"
                    onClick={() => this.updateInterview()}
                  >
                    Update Interview
                  </Button>
                ) : (
                  <Button color="success" onClick={() => this.addInterview()}>
                    Add Interview
                  </Button>
                )}
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employee: state.Employee,
  };
};

export default connect(mapStateToProps, { getEmployeeList, getCommentAdd })(
  InterviewAddEdit
);
