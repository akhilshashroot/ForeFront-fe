import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { getTicketUpdate, getTicketList,getWorksheetTicketList } from "../../redux/actions";

class UpdateTIcketModal1 extends Component {
  state = {
    text: "",
  };

  componentDidMount = () => {
    this.setState({ text: this.props.data });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      this.setState({ text: this.props.data.response });
    }
    if (this.props.ticketUpdate) {
        if(this.props.ticketUpdate  !==  prevProps.ticketUpdate){
            this.props.getWorksheetTicketList();
        }
    }
  }

  updateResponse = () => {
    let s = {
      response: this.state.text,
      ticket_id: this.props.data.ticket_id,
    };
    this.props.getTicketUpdate(s);
    this.props.toggle1();
  };

  render() {
    const {
      modal,
      toggle1,
      data,
      getTicketUpdate,
      getTicketList,
      ticketUpdate,
    } = this.props;
    return (
      <div>
        <Modal isOpen={modal} toggle={toggle1} size={"lg"}>
          <ModalHeader toggle={toggle1}>Update Response</ModalHeader>
          <ModalBody>
            <h4>Enter updated response</h4>
            <FormGroup>
              <Input
                type="textarea"
                name="text"
                rows="5"
                defaultValue={this.state.text}
                onChange={(e) => this.setState({ text: e.target.value })}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateResponse}>
              Update
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle1}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ticketUpdate: state.Worksheet.ticketUpdate,
  };
};
export default connect(mapStateToProps, { getTicketUpdate, getTicketList ,getWorksheetTicketList})(
  UpdateTIcketModal1
);
