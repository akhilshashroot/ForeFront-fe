import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Table,
} from "reactstrap";
import { connect } from "react-redux";
import { viewReportList } from "../../redux/actions";
import { getLoggedInUser } from "../../helpers/authUtils";

class ViewReportModal extends Component {

  state = {
    value: 0,
  };

  componentDidMount = () => {};

  componentDidUpdate(prevProps, prevState) {}

  dateChange = (val) => {
    let data = {
      user_id: getLoggedInUser().id,
      date_of_report: val,
    };
    this.props.viewReportList(data);
  };

  render() {
    const { viewReport, switch1,report } = this.props;
    return (
      <div>
        <Modal isOpen={viewReport} toggle={switch1} size={"lg"}>
          <ModalHeader toggle={switch1}>Update Response</ModalHeader>
          <ModalBody>
            <Row>
              <Col md={4}></Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleDate">Date</Label>
                  <Input
                    type="date"
                    name="date"
                    id="exampleDate"
                    placeholder="date placeholder"
                    onChange={(e) => this.dateChange(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={4}></Col>
            </Row>
            <Table className="mb-0" responsive size="lg">
              <thead>
                <tr>
                  <th>Ticket Id	</th>
                  <th>Response</th>
                  <th>SLA</th>
                </tr>
              </thead>
              <tbody>
                {report && report.report && report.report.data && report.report.data.map((record, index) => {
                  return (
                    <tr key={index}>
                      <td>{record.ticket_id}</td>
                      <td>{record.response}</td>
                      <td>{record.sla}</td>
                    </tr>
                  );
                })}
            
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Update</Button>{" "}
            <Button color="secondary" onClick={switch1}>
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
    report:state.Worksheet
  };
};
export default connect(mapStateToProps, { viewReportList })(ViewReportModal);
