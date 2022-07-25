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
  } from "reactstrap";
// import DepImg from "../../assets/images/texa/department.jpg"
import "./style.scss";
import { toast, Zoom } from "react-toastify";
import { getCommentAdd, getMytaskList } from "../../redux/actions";
import { connect } from "react-redux";
import { getLoggedInUser } from "../../helpers/authUtils";

class MytaskDetails extends React.Component {
  state = {
    comment: "",
    completed: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.task && this.props.task.mycommentAdd) {
      if (prevProps.task.mycommentAdd !== this.props.task.mycommentAdd) {
        console.log("in")
        this.props.getMytaskList();
        this.props.toggle();
      }
    }
  }


  submitComment = () => {
    if (this.state.comment !== "") {
      let send = {
        comment: this.state.comment,
        status: this.state.completed ? 1 : 0,
        task_id: this.props.data.id,
        user_id: getLoggedInUser().id,
      };
      this.props.getCommentAdd(send);
    } else {
      toast.warning("Please Fill All Fields", { transition: Zoom });
    }
  };

  render() {
    const { data, toggle, modal } = this.props;
    return (
      <React.Fragment>
      
            <Modal toggle={toggle} isOpen={modal} size="lg">
              <ModalHeader toggle={toggle}>{data && data.title}</ModalHeader>
              <ModalBody>
                {data && data.assignee && (
                  <div>
                    <Table className="mb-0">
                      <thead>
                        <tr>
                          <th>Assignee</th>
                          <th>Assigner</th>
                          <th>Date</th>
                          <th>Task</th>
                          <th>Status</th>
                          <th>Deadline</th>
                          <th>Attachments</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{data.assignee}</td>
                          <td>{data.assigner}</td>
                          <td>{data.date}</td>
                          <td>{data.task_description}</td>
                          <td></td>
                          <td>{data.deadline}</td>
                          <td>-</td>
                        </tr>
                      </tbody>
                    </Table>
                    <h4 className="badge badge-danger">Task Description</h4>
                    <p>{data.task_description}</p>
                    <h4 className="badge badge-success">Conversations</h4>

                    {data.comment.length == 0
                      ? "no comments!"
                      : data.comment.map((item, index) => (
                          <Card key={index}>
                            <CardBody>
                              <span>{item.name}</span> -{" "}
                              <span className="text-danger">{item.date}</span>{" "}
                              <br />
                              <span>{item.comments}</span>
                            </CardBody>
                          </Card>
                        ))}

                    <FormGroup className="pt-2">
                      <Input
                        placeholder="Enter Comments"
                        type="textarea"
                        name="text"
                        id="exampleText"
                        rows="3"
                        value={this.state.comment}
                        onChange={(e) =>
                          this.setState({ comment: e.target.value })
                        }
                      />
                    </FormGroup>
                    <div className="d-flex justify-content-center">
                      <CustomInput
                        type="checkbox"
                        id="exampleCustomCheckbox"
                        label="Completed"
                        className="mr-3 mt-1"
                        defaultChecked={this.state.completed}
                        onChange={() =>
                          this.setState({ completed: !this.state.completed })
                        }
                      />
                      <Button
                        className="btn btn-success"
                        onClick={()=>this.submitComment()}
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                {/* <Button color="primary" onClick={toggle}>
              Do Something
            </Button>{" "} */}
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
    task: state.Mytasks,
  };
};
export default connect(mapStateToProps, {
  getCommentAdd,
  getMytaskList,
})(MytaskDetails);
