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
import {  } from "../../redux/actions";

class PreviousShiftModal extends Component {
  state = {
    previousShiftDate: "Please Select",
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.shift && this.props.shift.shiftEdit) {
      if (prevProps.shift.shiftEdit !== this.props.shift.shiftEdit) {
        this.props.previousShift(this.state.previousShiftDate)
      }
    }
    if (this.props.shift && this.props.shift.shiftSwap) {
      if (prevProps.shift.shiftSwap !== this.props.shift.shiftSwap) {
        this.props.previousShift(this.state.previousShiftDate)
      }
    }
    if (this.props.shift && this.props.shift.swapDelete) {
      if (prevProps.shift.swapDelete !== this.props.shift.swapDelete) {
        this.props.previousShift(this.state.previousShiftDate)
      }
    }
    if (this.props.shift && this.props.shift.shiftComment) {
      if (prevProps.shift.shiftComment !== this.props.shift.shiftComment) {
        this.props.previousShift(this.state.previousShiftDate)
      }
    }
   
  }

  render() {
    const { modal, toggle1, previousShift } = this.props;
    return (
      <div>
        <Modal isOpen={modal} toggle={toggle1} size={"lg"}>
          <ModalHeader toggle={toggle1}>Generate Previous Shifts</ModalHeader>
          <ModalBody>
            <h4>Members:</h4>
            <FormGroup>
              <Input
                type="select"
                name="select"
                id="exampleSelect2"
                className="custom-select mt-3"
                onChange={(e) => this.setState({
                  previousShiftDate:e.target.value
                })}
              >
                <option>Please Select</option>
                {this.props.weeks &&
                  this.props.weeks.data &&
                  this.props.weeks.data.length !== 0 &&
                  this.props.weeks.data.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.date_from} - {item.date_to}
                    </option>
                  ))}
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => previousShift(this.state.previousShiftDate)}
              disabled={this.state.previousShiftDate == "Please Select"}
            >
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={toggle1}>
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
    weeks: state.Shift.getWeeks,
    shift: state.Shift,
  };
};
export default connect(mapStateToProps, {  })(
  PreviousShiftModal
);

