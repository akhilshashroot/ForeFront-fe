import React, { Component } from "react";
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
  FormGroup,
  Input,
  CustomInput,
  Label,
} from "reactstrap";
// import DepImg from "../../assets/images/texa/department.jpg"
import "./style.scss";
import { toast, Zoom } from "react-toastify";
import { getTaskerAdminComment,getTaskerList } from "../../redux/actions";
import { connect } from "react-redux";
import { getLoggedInUser } from "../../helpers/authUtils";

class TaskerDetails extends React.Component {
  state = {
    comment: "",
    completed: false,
  };

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.tasker && this.props.tasker.taskerComment) {
      if (prevProps.tasker.taskerComment !== this.props.tasker.taskerComment) {
        this.props.getTaskerList();
        this.props.toggle();

      }
    }
  }

  sendComment = () => {
    let send={
      "creater_id":this.props.data.creator_id,
      "comment":this.state.comment,
      "status": this.state.completed,
      "task_id":this.props.data.asgnmnt_id
    }
    this.props.getTaskerAdminComment(send);
  };

  render() {
    const { data, toggle, modal } = this.props;
    return (
      <React.Fragment>
        <Modal toggle={toggle} isOpen={modal} size="lg">
          <ModalHeader toggle={toggle}>{data && data.title}</ModalHeader>
          <ModalBody>
            <div>
              <Table className="mb-0">
                <thead>
                  <tr>
                    <th>Assignee</th>
                    <th>Assigner</th>
                    <th>Assigned Date </th>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Deadline</th>
                    <th>Attachments</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{data.assignee}</td>
                    <td>{data.assign_to}</td>
                    <td>{data.date}</td>
                    <td>{data.title}</td>
                    {data.Status == 1 ? (
                      <td>
                        <span className="badge badge-success">Completed</span>
                      </td>
                    ) : (
                      <td>
                        {" "}
                        <span className="badge badge-danger">Pending</span>{" "}
                      </td>
                    )}

                    <td>{data.date}</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </Table>
              <button className="btn badge badge-danger">
                Task Description
              </button>
              <p>{data.body}</p>
              <button className="btn badge badge-success">Conversation</button>
              {data.comments &&
                data.comments.length !== 0 &&
                data.comments.map((item, index) => (
                  <div>
                    <span>{item.name}</span>{" "}
                    <span className="text-right">{item.date}</span>
                    <br />
                    <span>{item.comments}</span>
                  </div>
                ))}
              <FormGroup className="mt-3">
                <Label for="exampleText">Enter Comment</Label>
                <Input
                  type="textarea"
                  name="text"
                  id="exampleText"
                  rows="5"
                  value={this.state.comment}
                  onChange={(e) => this.setState({ comment: e.target.value })}
                />
              </FormGroup>
              <CustomInput
                type="checkbox"
                id="exampleCustomCheckbox"
                label="Completed"
                className="text-center mr-3 mt-1"
                defaultChecked={this.state.completed}
                onChange={() =>
                  this.setState({ completed: !this.state.completed })
                }
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.sendComment} disabled={this.state.comment==""}>
              Send
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasker:state.Tasker
  };
};
export default connect(mapStateToProps, {getTaskerAdminComment,getTaskerList})(TaskerDetails);
