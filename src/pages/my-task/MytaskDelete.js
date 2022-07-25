import React, { Component } from "react";
import {
  Row,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import "./style.scss";
import { connect } from "react-redux";
import {
  getMytaskDelete,
  getMytaskList
} from "../../redux/actions";
class TaskerDelete extends React.Component {
  toggleModal = () => {
    this.props.closeDeleteModal();
  };

  deleteTasker = () => {
    this.props.getMytaskDelete(this.props.data.id);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.tasker && this.props.tasker.mytaskDelete) {
      if (prevProps.tasker.mytaskDelete !== this.props.tasker.mytaskDelete) {

        this.props.getMytaskList();
        this.toggleModal();
      }
    }
  }

  render() {
    return (
      <React.Fragment>
    
            <Modal
              isOpen={this.props.toggleDeleteModal}
              toggle={this.toggleModal}
              className="modal-dialog-top"
              // size="lg"
            >
              <ModalHeader
                toggle={this.toggleModal}
                className="modal-colored-header bg-dark"
              >
                Tasker Delete
              </ModalHeader>
              <ModalBody>
                <Row>
                  <h4>Are you sure to delete this tasker?</h4>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button color="dark" onClick={this.toggleModal}>
                  Cancel
                </Button>{" "}
                <Button color="danger" onClick={() => this.deleteTasker()}>
                  Delete
                </Button>
              </ModalFooter>
            </Modal>
     
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasker: state.Mytasks,
    employee: state.Employee,
  };
};
export default connect(mapStateToProps, {
  getMytaskDelete,
  getMytaskList
})(TaskerDelete);
