import React, { Component } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";

import {
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Label,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
// import DepImg from "../../assets/images/texa/employee.jpg"
import "./style.scss";

import { connect } from "react-redux";
import {
  getEmployeeSkillList,
  getEmployeeSkillAdd,
  getEmployeeSkillDelete,
  getEmployeeSkillReview,
} from "../../redux/employee/actions";

class EmployeeSkill extends React.Component {
  state = {
    name: null,
  };

  toggleModal = () => {
    this.props.closeSkillImporovementModal();
  };

  componentDidMount() {
    this.props.getEmployeeSkillList(this.props.data.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.employeeskill && this.props.employeeskill.employeeSkillAdd) {
      if (
        prevProps.employeeskill.employeeSkillAdd !==
        this.props.employeeskill.employeeSkillAdd
      ) {
        this.props.getEmployeeSkillList(this.props.data.id);
      }
    }

    if (
      this.props.employeeskill &&
      this.props.employeeskill.employeeSkillDelete
    ) {
      if (
        prevProps.employeeskill.employeeSkillDelete !==
        this.props.employeeskill.employeeSkillDelete
      ) {
        this.props.getEmployeeSkillList(this.props.data.id);
      }
    }

    if (
      this.props.employeeskill &&
      this.props.employeeskill.employeeSkillReviewAdd
    ) {
      if (
        prevProps.employeeskill.employeeSkillReviewAdd !==
        this.props.employeeskill.employeeSkillReviewAdd
      ) {
        this.props.getEmployeeSkillList(this.props.data.id);
      }
    }
  }

  addSkill = () => {
    if (this.state.name != null && this.state.name != "") {
      let data = {
        skillname: this.state.name,
        user_id: this.props.data.id,
      };
      this.props.getEmployeeSkillAdd(data);
    }
  };

  deleteSkill = (id) => {
    this.props.getEmployeeSkillDelete(id);
  };

  skillCompletedDelete = (skillid) => {
    let data = {
      skill_id: skillid,
      skill_update_status: 1,
      skill_verify_status: 0,
    };
    this.props.getEmployeeSkillReview(data);
  };

  skillReviewTick = (skillid) => {
    let data = {
      skill_id: skillid,
      skill_update_status: 1,
      skill_verify_status: 1,
    };
    this.props.getEmployeeSkillReview(data);
  };


  skillReviewCancel = (skillid) =>{
    let data = {
      skill_id: skillid,
      skill_update_status: 0,
      skill_verify_status: 0,
    };
    this.props.getEmployeeSkillReview(data);
  }

  render() {
    return (
      <React.Fragment>
        <Card className="dept-details-card">
          <CardBody>
            <Modal
              isOpen={this.props.toggleSkillImporovementModal}
              toggle={this.toggleModal}
              className="modal-dialog-centered"
              size="lg"
            >
              <ModalHeader
                toggle={this.toggleModal}
                className="modal-colored-header bg-primary"
              >
                Update Skill Set
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Col md={6}>
                    <Card>
                      <CardBody>
                        <Label>Add Skill</Label>
                        <Input
                          name="dept-name"
                          label="Add Skill"
                          type="text"
                          value={this.state.name || ""}
                          onChange={(e) => {
                            this.setState({ name: e.target.value });
                          }}
                          placeholder="Enter Skill Name"
                        />
                        <Button className="mt-2" onClick={this.addSkill}>
                          Add
                        </Button>
                        <h4 className="header-title py-2">Skills Added</h4>
                        {this.props.employeeskill &&
                          this.props.employeeskill.employeeskill &&
                          this.props.employeeskill.employeeskill.data &&
                          this.props.employeeskill.employeeskill.data.added.map(
                            (item) => (
                              <ListGroup key={item.skill_id}>
                                <ListGroupItem>
                                  {item.skill_name}
                                  <i
                                    className="uil uil-trash-alt text-danger"
                                    onClick={() =>
                                      this.deleteSkill(item.skill_id)
                                    }
                                  ></i>
                                </ListGroupItem>
                              </ListGroup>
                            )
                          )}
                      </CardBody>
                    </Card>
                  </Col>

                  <Col md={6}>
                    <Card>
                      <CardBody>
                        <h4 className="header-title py-2">Added for Review</h4>
                        {this.props.employeeskill &&
                          this.props.employeeskill.employeeskill &&
                          this.props.employeeskill.employeeskill.data &&
                          this.props.employeeskill.employeeskill.data.review.map(
                            (item) => (
                              <ListGroup key={item.skill_id}>
                                <ListGroupItem>
                                  {item.skill_name}
                                  <i
                                    className="uil dripicons-checkmark text-primary"
                                    onClick={() =>
                                      this.skillReviewTick(item.skill_id)
                                    }
                                  ></i>
                                  <i className="uil uil-trash-alt text-danger"  onClick={() =>
                                      this.skillReviewCancel(item.skill_id)
                                    }></i>
                                </ListGroupItem>
                              </ListGroup>
                            )
                          )}

                        <h4 className="header-title py-2">Skills Completed</h4>
                        {this.props.employeeskill &&
                          this.props.employeeskill.employeeskill &&
                          this.props.employeeskill.employeeskill.data &&
                          this.props.employeeskill.employeeskill.data.completed.map(
                            (item) => (
                              <ListGroup key={item.skill_id}>
                                <ListGroupItem>
                                  {item.skill_name}
                                  <i
                                    className="uil uil-trash-alt text-danger"
                                    onClick={() =>
                                      this.skillCompletedDelete(item.skill_id)
                                    }
                                  ></i>
                                </ListGroupItem>
                              </ListGroup>
                            )
                          )}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </ModalBody>
            </Modal>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employeeskill: state.Employee,
  };
};

export default connect(mapStateToProps, {
  getEmployeeSkillList,
  getEmployeeSkillAdd,
  getEmployeeSkillDelete,
  getEmployeeSkillReview,
})(EmployeeSkill);
