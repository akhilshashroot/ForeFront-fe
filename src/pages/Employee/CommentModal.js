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
import { getPerformanceUpdate } from "../../redux/actions";
import { connect } from "react-redux";
import { getLoggedInUser } from "../../helpers/authUtils";
import { toast, ToastContainer, Zoom } from "react-toastify";

class CommentModal extends React.Component {
  state = {
    text: "",
  };

  componentDidMount() {
    console.log(this.props.data);
  }

  componentDidUpdate(prevProps, prevState) {}

  addComment = () => {
      let send = {
        "field": this.props?.data?.apiTitle,
        "value": this.props?.data?.value,////////current value
        "new_value": this.props?.performanceValue,
        "comment": this.state.text,
        "user_id":this.props.userid 
        }
        this.props.getPerformanceUpdate(send);
        this.props.toggle1();
  };

  render() {
    const { data, toggle1, modal } = this.props;
    return (
      <React.Fragment>
        <Modal toggle={toggle1} isOpen={modal} size="lg">
          <ModalHeader toggle={toggle1}>Add Comment</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Input
                type="textarea"
                name="text"
                id="exampleText"
                rows="5"
                value={this.state.text}
                onChange={(e) => this.setState({ text: e.target.value })}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              disabled={this.state.text == ""}
              onClick={this.addComment}
            >
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={toggle1}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <ToastContainer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, { getPerformanceUpdate })(CommentModal);
