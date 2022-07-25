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
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import "./style.scss";
import { AvForm, AvField } from "availity-reactstrap-validation";
// import DepImg from "../../assets/images/texa/add-tasker.png"
import Select from "react-select";
// import LoaderWidget from '../../components/Loader';
import { connect } from "react-redux";
import {
  getEmployeeList,
  getTaskerAdd,
  getTaskerUpdate,
} from "../../redux/actions";
import FileUploaderNew from "../../components/FileUploaderNew";
import FileUploader from "../../components/FileUploader";
import DatePicker from "react-flatpickr";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { getLoggedInUser } from "../../helpers/authUtils";

const periodOptions = [
  { value: "ONE", label: "One Time" },
  { value: "WEEK", label: "Weekly" },
  { value: "MONTH", label: "Monthly" },
  { value: "DAY", label: "Daily" },
];
const weekOptions = [
  { value: "0", label: "Sunday" },
  { value: "1", label: "Monday" },
  { value: "2", label: "Tuesday" },
  { value: "3", label: "Wednesday" },
  { value: "4", label: "Thursday" },
  { value: "5", label: "Friday" },
  { value: "6", label: "Saturday" },
];
class TaskerAddEdit extends React.Component {
  state = {
    selectedLead: null,
    selectedWeek: null,
    selectedType: null,
    isLoading: false,
    name: null,
    desc: null,
    Upfiles: [],
  };

  toggleModal = () => {
    this.props.closeAddEditModal();
  };

  componentDidMount = () => {
    if (this.props.toggleAddEditModal) {
      if (this.props.data !== null) {
        this.setState({
          // name: this.props.data.title,
          // selectedWeek: this.props.data.date,
          // selectedLead: {
          //   label: this.props.data.assignee,
          //   value: this.props.data.assign_to,
          // },
          // Upfiles: this.props.data.task_attachment,
          // desc:this.props.data.title,
        });
      }
    }

    this.props.getEmployeeList();
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.tasker && this.props.tasker.taskerAdd) {
      if (prevProps.tasker.taskerAdd !== this.props.tasker.taskerAdd) {
        this.props.getTaskerList();

        this.toggleModal();
      }
    }
    if (this.props.tasker && this.props.tasker.taskerUpdate) {
      if (prevProps.tasker.taskerUpdate !== this.props.tasker.taskerUpdate) {
        this.props.getTaskerList();

        this.toggleModal();
      }
    }
  }

  convertEmployee = (data) => {
    var employeeData = [];
    data &&
      data.forEach((value) => {
        employeeData.push({
          label: value.firstname + value.lastname,
          value: value._id,
        });
      });
    return employeeData;
  };

  addTasker() {
    if (
      this.state.name !== null &&
      this.state.name !== "" &&
      this.state.selectedLead !== null &&
      this.state.selectedLead !== "" &&
      this.state.selectedType !== null &&
      this.state.selectedType !== "" &&
      this.state.selectedWeek !== null &&
      this.state.selectedWeek !== ""
    ) {
      let formData = new FormData();
      formData.append("creater_id", getLoggedInUser().id);
      formData.append("title", this.state.name);
      formData.append("user_id", this.state.selectedLead.value);
      formData.append("period", this.state.selectedType.value);
      formData.append("date", this.state.selectedWeek);

      formData.append("attachment", this.state.Upfiles[0]);
      formData.append("body", this.state.desc);
      this.props.getTaskerAdd(formData);
    } else {
      this.props.emptyAllFields();
    }
  }

  updateTasker = () => {
    if (this.state.name !== null && this.state.name !== "") {
      let data = {
        dep_name: this.state.name,
        dep_id: this.props.data.dep_id,
      };
      this.props.getTaskerUpdate(data);
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

  handleAssigneeChange = (e) => {
    this.setState({ selectedLead: e });
  };
  handleTypeChange = (e) => {
    this.setState({ selectedType: e });
  };
  handleTimeChange = (e) => {
    this.setState({ selectedWeek: this.changeDateformat(e[0]) });
  };
  handleFileChange = (e) => {
    this.setState({ Upfiles: e });
  };
  changeDateformat = (e) => {
    let SearchDate = moment(e).format("DD-MM-YYYY");
    return SearchDate;
  };
  render() {
    const { data } = this.props;
  

    return (
      <React.Fragment>
        <Card className="dept-details-card">
          <CardBody>
            <Modal
              isOpen={this.props.toggleAddEditModal}
              toggle={this.toggleModal}
              className="modal-dialog-centered"
              size="lg"
            >
              <ModalHeader
                toggle={this.toggleModal}
                className="modal-colored-header bg-dark"
              >
                {data !== null ? "Edit Tasker" : "Add New Tasker"}
              </ModalHeader>
              <ModalBody>
                {/* {this.props.employee && this.props.employee.employeelistloading && this.props.tasker && this.props.tasker.listloading && <LoaderWidget />} */}

                <Row>
                  <Col md={12}>
                    <Row>
                      <Col md="6" sm="12">
                        <AvForm>
                          <AvField
                            name="dept-name"
                            label="Tasker Name"
                            type="text"
                            value={this.state.name}
                            onChange={(e) => {
                              this.setState({ name: e.target.value });
                            }}
                            required
                            placeholder="Enter Tasker Name"
                          />
                        </AvForm>
                      </Col>
                      <Col md="6" sm="12">
                        <p className="mb-1 font-weight-bold">Assign to</p>
                        <Select
                          placeholder="Assign to"
                          isClearable={true}
                          value={this.state.selectedLead}
                          options={this.convertRecilist(
                            this.props.employee &&
                              this.props.employee.employee &&
                              this.props.employee.employee.data
                          )}
                          onChange={(e) => {
                            this.handleAssigneeChange(e);
                          }}
                          className="react-select mb-3"
                          classNamePrefix="react-select"
                        ></Select>
                      </Col>
                      <Col md="6" sm="12">
                        <p className="mb-1 font-weight-bold">Select Type</p>
                        <Select
                          placeholder="Select Type"
                          options={periodOptions}
                          onChange={(e) => {
                            this.handleTypeChange(e);
                          }}
                          className="react-select mb-3"
                          classNamePrefix="react-select"
                        ></Select>
                      </Col>
                      <Col md="6" sm="12">
                        <p className="mb-1 font-weight-bold">Select Deadline</p>
                        <DatePicker
                          // value={date || ''}
                          className="form-control bg-white"
                          value={this.state.selectedWeek}
                          onChange={(e) => {
                            this.handleTimeChange(e);
                          }}
                          placeholder="Select Date"
                        />
                      </Col>
                      <Col md="12" sm="12">
                        <FormGroup>
                          <Label for="exampleText">Description</Label>
                          <Input
                            type="textarea"
                            name="text"
                            id="exampleText"
                            rows="4"
                            onChange={(e) => {
                              this.setState({ desc: e.target.value });
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12" sm="12">
                        <p className="mb-1 font-weight-bold">Attach Files</p>
                        <FileUploader
                          onFileUpload={(data) => {
                            this.setState({ Upfiles: data });
                          }}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={this.toggleModal}>
                  Cancel
                </Button>{" "}
                {data !== null ? (
                  <Button color="success" onClick={() => this.updateTasker()}>
                    Update Task
                  </Button>
                ) : (
                  <Button color="success" onClick={() => this.addTasker()}>
                    Add Task
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

// export default TaskerAddEdit;
const mapStateToProps = (state) => {
  return {
    employee: state.Employee,
  };
};
export default connect(mapStateToProps, {
  getTaskerAdd,
  getEmployeeList,
  getTaskerUpdate,
})(TaskerAddEdit);
