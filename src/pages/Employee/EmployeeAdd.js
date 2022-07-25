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
  Label,
  CustomInput,
  Input,
} from "reactstrap";
import "./style.scss";
import { AvForm, AvField } from "availity-reactstrap-validation";
// import DepImg from "../../assets/images/texa/add-employee.png"
import Select from "react-select";
// import LoaderWidget from '../../components/Loader';

import defaultavatar from "../../assets/images/avatar-blue.png";
import { API_BASE_URL } from "../../services/hostSetting";
const baseUrl = API_BASE_URL;

const leads = [
  { value: "5fc78772db194609be7ca210", label: "Magmina" },
  { value: "7fc78772db194609be7ca210", label: "Peter" },
  { value: "6fc78772db194609be7ca210", label: "Thomas" },
];

class EmployeeAddEdit extends React.Component {
  state = {
    selectedLead: null,
    isLoading: false,
    name: null,
    desc: null,
    empid: null,
    email: null,
    password: null,
    fullname: null,
    phone: null,
    gender: null,
    dep_id: null,
    team_id: null,
    desgn_id: null,
    date_of_join: null,
    dob: null,
    cert_list: "",
    buddy_assigned: null,
    date_of_exit: null,
    core_status: false, ///default value==0
    wfh: false, ///default value==0
    notice_period: false, ///default value==0
  };

  toggleModal = () => {
    this.props.closeAddEditModal();
  };

  componentDidMount = () => {
    if (this.props.toggleAddEditModal) {
      if (this.props.data !== null) {     
       
        this.setState({
          core_status: this.props.data.core_status==0?false:true,
          wfh: this.props.data.wfh==0?false:true,
          notice_period: this.props.data.notice_period==0?false:true,
          password: this.props.data.password,
          empid: this.props.data.emp_id,
          email: this.props.data.email,
          imageDisplay: true,
          fullname: this.props.data.fullname,
          phone: this.props.data.phone,
          date_of_exit: this.props.data.date_of_exit,
          dep_id: this.props.data.department,
          date_of_join: this.props.data.date_of_join,
          dob: this.props.data.dob,
          cert_list: this.props.data.cert_list,
          buddy_assigned: this.props.data.buddy_assigned,
        });
        this.genderChange(this.props.data.gender);
        this.departmentChange(
          this.convertDepartment(this.props.department.data).filter(
            (e) => e.label === this.props.data.department
          )[0]
        );

        this.teamChange(
          this.convertTeam(this.props.team.data).filter(
            (e) => e.label === this.props.data.team
          )[0]
        );

        this.designationChange(
          this.convertDesignation(this.props.designation.data).filter(
            (e) => e.label === this.props.data.designation
          )[0]
        );

        if (this.props.data.img) {
          this.setState({ profileimage: this.props.data.img });
        }
      }
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.employee && this.props.employee.employeeAdd) {
      if (prevProps.employee.employeeAdd !== this.props.employee.employeeAdd) {
        this.props.getEmployeeList();

        this.toggleModal();
      }
    }
    if (this.props.employee && this.props.employee.employeeUpdate) {
      if (
        prevProps.employee.employeeUpdate !== this.props.employee.employeeUpdate
      ) {
        this.props.getEmployeeList();

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
  convertDesignation = (data) => {
    var designationData = [];
    data &&
      data.forEach((value) => {
        designationData.push({
          label: value.designation,
          value: value.desg_id,
        });
      });
    return designationData;
  };
  convertTeam = (data) => {
    var teamData = [];
    data &&
      data.forEach((value) => {
        teamData.push({
          label: value.name,
          value: value.team_id,
        });
      });
    return teamData;
  };
  convertDepartment = (data) => {
    var departmentData = [];
    data &&
      data.forEach((value) => {
        departmentData.push({
          label: value.dep_name,
          value: value.dep_id,
        });
      });
    return departmentData;
  };

  addEmployee() {
 

    if (
      this.state.email !== null &&
      this.state.email !== "" &&
      this.state.empid !== null &&
      this.state.empid !== "" &&
      this.state.fullname !== null &&
      this.state.fullname !== "" &&
      this.state.gender !== null &&
      this.state.gender !== "" &&
      // this.state.dob !== null &&
      // this.state.dob !== "" &&
      this.state.date_of_join !== null &&
      this.state.date_of_join !== "" &&
      this.state.password !== null &&
      this.state.password !== "" &&
    
      this.state.dep_id !== null &&
      this.state.dep_id !== "" &&
  
  
      this.state.desgn_id !== null &&
      this.state.desgn_id !== "" &&
      this.state.team_id !== null &&
      this.state.team_id !== "" 
  
      // this.state.buddy_assigned !== null &&
      // this.state.buddy_assigned !== "" &&
     
    ) {
      let data = {
        empid: this.state.empid,
        email: this.state.email,
        password: this.state.password,
        fullname: this.state.fullname,
        phone: this.state.phone,
        gender: this.state.gender,
        dep_id: this.state.dep_id.value,
        team_id: this.state.team_id.value,
        desgn_id: this.state.desgn_id.value,
        date_of_join: this.state.date_of_join,
        dob: this.state.dob,
        cert_list: this.state.cert_list,
        buddy_assigned: this.state.buddy_assigned,
        core_status: this.state.core_status?1:0,
        wfh: this.state.wfh?1:0,
        notice_period: this.state.notice_period?1:0,
      };
      this.props.getEmployeeAdd(data);
    } else {
      this.props.emptyAllFields();
    }
  }

  updateEmployee = () => {
    if (
      this.state.email !== null &&
      this.state.email !== "" &&
      this.state.empid !== null &&
      this.state.empid !== "" &&
      this.state.fullname !== null &&
      this.state.fullname !== "" &&
      this.state.gender !== null &&
      this.state.gender !== "" &&
      // this.state.dob !== null &&
      // this.state.dob !== "" &&
      this.state.date_of_join !== null &&
      this.state.date_of_join !== "" &&
      this.state.password !== null &&
      this.state.password !== "" &&
    
      this.state.dep_id !== null &&
      this.state.dep_id !== "" &&
  
  
      this.state.desgn_id !== null &&
      this.state.desgn_id !== "" &&
      this.state.team_id !== null &&
      this.state.team_id !== "" 
      ) {    
      
      let data = {
        empid: this.state.empid,
        email: this.state.email,
        password: this.state.password,
        fullname: this.state.fullname,
        phone: this.state.phone,
        gender: this.state.gender,
        dep_id: this.state.dep_id?this.state.dep_id.value:'',
        team_id: this.state.team_id.value,
        desgn_id: this.state.desgn_id?this.state.desgn_id.value:'',
        date_of_join: this.state.date_of_join,
        dob: this.state.dob,
        cert_list: this.state.cert_list,
        buddy_assigned: this.state.buddy_assigned?this.state.buddy_assigned:'',
        core_status: this.state.core_status?1:0,
        wfh: this.state.wfh?1:0,
        notice_period: this.state.notice_period?1:0,
        
      };
      let id=this.props.data.id
      this.props.getEmployeeUpdate(data,id);
    } else {
      this.props.emptyAllFields();
    }
  };

  designationChange = (e) => {
    this.setState({
      desgn_id: e,
    });
  };

  departmentChange = (e) => {
    this.setState({
      dep_id: e,
    });
  };

  teamChange = (e) => {
    this.setState({
      team_id: e,
    });
  };

  genderChange = (e) => {
    this.setState({
      gender: e,
    });
  };

  coreEmployee = (e) => {
    this.setState({
      core_status: e,
    });
  };

  noticePeriod = (e) => {
    this.setState({
      notice_period: e,
    });
  };

  workFromHome = (e) => {
    this.setState({
      wfh: e,
    });
  };

  render() {
    const {
      selectedLead,
      name,
      desc,
      empid,
      email,
      password,
      fullname,
      phone,
      dep_id,
      team_id,
      desgn_id,
      date_of_join,
      dob,
      cert_list,
      buddy_assigned,
      wfh,
      core_status,
      notice_period,
      imageDisplay,
      date_of_exit,
    } = this.state;
    const { data } = this.props;
    return (
      <React.Fragment>
        <Card className="dept-details-card">
          <CardBody>
            <Modal
              isOpen={this.props.toggleAddEditModal}
              toggle={this.toggleModal}
              className="modal-dialog-centered modal-dialog-scrollable"
              size="xl"
            >
              <ModalHeader
                toggle={this.toggleModal}
                className="modal-colored-header bg-dark"
              >
                {data !== null ? "Edit Employee" : "Add New Employee"}
              </ModalHeader>
              <ModalBody>
                {/* {this.props.employee && this.props.employee.employeelistloading && this.props.employee && this.props.employee.listloading && <LoaderWidget />} */}
                <AvForm>
                  <Row>
                    <Col md={12}>
                      <Row>
                        <Col md={4}>
                          <AvField
                            name="dept-name"
                            label="Full Name"
                            type="text"
                            value={fullname || ""}
                            onChange={(e) => {
                              this.setState({ fullname: e.target.value });
                            }}
                            placeholder="Enter Full Name"
                          />
                          
                             <AvField
                             name="dept-name"
                             label="Password"
                             type="password"
                             value={password || ""}
                             onChange={(e) => {
                               this.setState({ password: e.target.value });
                             }}
                             placeholder="Enter Passowrd"
                           /> 
                       
                          <FormGroup>
                            <Label for="exampleSelect">Designation</Label>

                            <Select
                              label="Designation"
                              className="react-select mb-3"
                              classNamePrefix="react-select"
                              defaultValue={desgn_id || ""}
                              onChange={(e) => this.designationChange(e)}
                              options={this.convertDesignation(
                                this.props.designation.data
                              )}
                            ></Select>
                          </FormGroup>
                          <FormGroup>
                            <Label for="exampleDate">Date Of Birth</Label>
                            <Input
                              type="date"
                              name="date"
                              id="exampleDate"
                              placeholder="date placeholder"
                              // defaultValue={dob || ""}
                              value={dob || ""}
                              onChange={(e) => {
                                console.log(e.target.value);
                                this.setState({ dob: e.target.value });
                              }}
                            />
                          </FormGroup>
                          <AvField
                            name="dept-name"
                            label="Certificates"
                            type="text"
                            value={cert_list || ""}
                            onChange={(e) => {
                              this.setState({ cert_list: e.target.value });
                            }}
                            placeholder="Enter Certificates"
                          />
                          {this.props.data !== null && (
                            <FormGroup>
                              <Label for="exampleDate">Date Of Exit</Label>
                              <Input
                                type="date"
                                name="date"
                                id="exampleDate"
                                placeholder="date placeholder"
                                value={date_of_exit || ""}
                                onChange={(e) => {
                                  console.log(e.target.value);
                                  this.setState({
                                    date_of_exit: e.target.value,
                                  });
                                }}
                              />
                            </FormGroup>
                          )}
                        </Col>
                        <Col md={4}>
                          <AvField
                            name="dept-name"
                            label="Enter Email"
                            type="text"
                            value={email || ""}
                            onChange={(e) => {
                              this.setState({ email: e.target.value });
                            }}
                            placeholder="Enter Email"
                          />
                          <FormGroup>
                            <Label for="exampleCheckbox">Gender</Label>
                            <div>
                              <CustomInput
                                type="radio"
                                id="exampleCustomRadio"
                                name="gender"
                                label="Male"
                                value="male"
                                defaultChecked={this.state.gender == "male"}
                                onChange={(e) =>
                                  this.genderChange(e.target.value)
                                }
                              />
                              <CustomInput
                                type="radio"
                                id="exampleCustomRadio3"
                                name="gender"
                                label="Female"
                                value="female"
                                defaultChecked={this.state.gender == "female"}
                                onChange={(e) =>
                                  this.genderChange(e.target.value)
                                }
                              />
                            </div>
                          </FormGroup>
                          <FormGroup>
                            <Label for="exampleDate">Date Of Joining</Label>
                            <Input
                              type="date"
                              name="date"
                              id="exampleDate"
                              placeholder="date placeholder"
                              value={date_of_join || ""}
                              onChange={(e) => {
                                this.setState({ date_of_join: e.target.value });
                              }}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label for="team">Department</Label>

                            <Select
                              label="team"
                              className="react-select mb-3"
                              classNamePrefix="react-select"
                              defaultValue={dep_id || ""}
                              onChange={(e) => this.departmentChange(e)}
                              options={this.convertDepartment(
                                this.props.department.data
                              )}
                            ></Select>
                          </FormGroup>
                          <CustomInput
                            type="switch"
                            id="Core Employees"
                            label="Core Employees"
                            name="Core Employees"
                            // defaultValue={true || ""}
                            defaultChecked={core_status || ""}
                            onChange={(e) =>
                              this.coreEmployee(e.target.checked)
                            }
                          />
                          <CustomInput
                            type="switch"
                            id="Notice Period"
                            label="Notice Period"
                            name="Notice Period"
                            defaultChecked={notice_period || ""}
                            onChange={(e) =>
                              this.noticePeriod(e.target.checked)
                            }
                          />
                        </Col>

                        <Col md={4}>
                          <AvField
                            name="dept-name"
                            label="EMP ID"
                            type="text"
                            value={empid || ""}
                            onChange={(e) => {
                              this.setState({ empid: e.target.value });
                            }}
                            placeholder="Enter EMP ID"
                          />
                          <AvField
                            name="dept-name"
                            label="Phone"
                            type="number"
                            value={phone || ""}
                            onChange={(e) => {
                              this.setState({ phone: e.target.value });
                            }}
                            placeholder="Enter Phone Number"
                          />
                          <FormGroup>
                            <Label for="team">Team</Label>

                            <Select
                              label="team"
                              className="react-select mb-3"
                              classNamePrefix="react-select"
                              defaultValue={team_id || ""}
                              onChange={(e) => this.teamChange(e)}
                              options={this.convertTeam(this.props.team.data)}
                            ></Select>
                          </FormGroup>
                          <AvField
                            name="dept-name"
                            label="Buddy Assigned"
                            type="text"
                            value={buddy_assigned || ""}
                            onChange={(e) => {
                              this.setState({ buddy_assigned: e.target.value });
                            }}
                            placeholder="Enter Buddy Assigned"
                          />
                          <CustomInput
                            type="switch"
                            id="Limit Work From Home Time"
                            label="Limit Work From Home Time"
                            defaultChecked={wfh || ""}
                            onChange={(e) =>
                              this.workFromHome(e.target.checked)
                            }
                          />
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
                  <Button color="success" onClick={() => this.updateEmployee()}>
                    Update Employee
                  </Button>
                ) : (
                  <Button color="success" onClick={() => this.addEmployee()}>
                    Add Employee
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

export default EmployeeAddEdit;
