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
  Input,
} from "reactstrap";
import "./style.scss";
import { AvForm, AvField } from "availity-reactstrap-validation";
// import DepImg from "../../assets/images/texa/add-project.png"
import Select from "react-select";
// import LoaderWidget from '../../components/Loader';
import { connect } from "react-redux";
import { getEmployeeList } from "../../../redux/actions";
import { getLoggedInUser } from '../../../helpers/authUtils';


class ProjectAddEdit extends React.Component {
  state = {
    selectedLead: null,
    isLoading: false,
    name: null,
    desc: null,
    selectEmployees:null,

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
        this.setState({
          name: this.props.data.pr_name,
          desc: this.props.data.pr_description,  

      
        });
        this.handleEmployeeChange(this.convertRecilist(this.props.data.pr_userids))
 
      }
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.project && this.props.project.projectAdd) {
      if (prevProps.project.projectAdd !== this.props.project.projectAdd) {
        this.props.getProjectList();

        this.toggleModal();
      }
    }
    if (this.props.project && this.props.project.projectUpdate) {
      if (
        prevProps.project.projectUpdate !== this.props.project.projectUpdate
      ) {
        this.props.getProjectList();

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

  addProject() {
    if (this.state.name !== null  && this.state.desc !== null && this.state.selectEmployees !== null
        && this.state.name !== "" && this.state.desc !== "" && this.state.selectEmployees !== "") {
        let userId = (this.state.selectEmployees).map((e) => e.value);
      let data = {
        project_name : this.state.name,
        project_desc: this.state.desc,
        users: userId,
        user_id: getLoggedInUser().id
      };
      this.props.getProjectAdd(data);
    } else {
      this.props.emptyAllFields();
    }
  }

  updateProject = () => {
    if (this.state.name !== null  && this.state.desc !== null && this.state.selectEmployees !== null
      && this.state.name !== "" && this.state.desc !== "" && this.state.selectEmployees !== "") {
      let userId = (this.state.selectEmployees).map((e) => e.value);
    let data = {
      pr_id : this.props.data.pr_id,
      project_name : this.state.name,
      project_desc: this.state.desc,
      users: userId,
      user_id: getLoggedInUser().id
    };
    this.props.getProjectUpdate(data);
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

  handleEmployeeChange = (e)=>{
      this.setState({
        selectEmployees: e
      })
  }


  
  render() {
      const { selectedLead, name, desc,selectEmployees } = this.state;
      const { data } = this.props;
    //  if(this.props.employee &&this.props.employee.employee && this.props.employee.employee.data){
    //     let empoptions =   this.props.employee &&this.props.employee.employee && this.props.employee.employee.data
    //     let arrayemp =empoptions.filter(e => e.id.includes([476]))
    //     console.log((empoptions))
    //     console.log((selectEmployees))
    //     console.log((arrayemp))
      
        
    //  }
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
                {data !== null ? "Edit Project" : "Add New Project"}
              </ModalHeader>
              <ModalBody>
                {/* {this.props.employee && this.props.employee.employeelistloading && this.props.project && this.props.project.listloading && <LoaderWidget />} */}
                <AvForm>
                  <Row>
                    <Col md={12}>
                      <Row>
                        <Col md="12">
                          <AvField
                            name="dept-name"
                            label="Project Name"
                            type="text"
                            value={name || ""}
                            onChange={(e) => {
                              this.setState({ name: e.target.value });
                            }}
                            required
                            placeholder="Enter Project Name"
                          />
                        </Col>
                        <Col md="12">
                          <p className="mb-1 font-weight-bold">
                            Select Employees
                          </p>
                          <Select
                            isMulti={true}
                            isClearable={true}
                            className="react-select mb-3"
                            classNamePrefix="react-select"
                            options={this.convertRecilist(
                              this.props.employee &&
                                this.props.employee.employee &&
                                this.props.employee.employee.data
                            )}
                            defaultValue={selectEmployees || ''}
                            onChange={(e)=>this.handleEmployeeChange(e)}
                          ></Select>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <Label for="exampleText">Description</Label>
                            <Input
                              type="textarea"
                              name="text"
                              id="exampleText"
                              rows="5"
                              value={desc || ''}
                              onChange={(e) => {
                                this.setState({ desc: e.target.value });
                              }}
                            />
                          </FormGroup>
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
                  <Button color="success" onClick={() => this.updateProject()}>
                    Update Project
                  </Button>
                ) : (
                  <Button color="success" onClick={() => this.addProject()}>
                    Add Project
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

export default connect(mapStateToProps, { getEmployeeList })(ProjectAddEdit);
