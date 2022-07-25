import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";

import { connect } from "react-redux";

const TicketCount = (props) => {
  return (
    <>
      {props.worksheet &&
        props.worksheet.ticket &&
        props.worksheet.ticket.data &&
        props.worksheet.ticket.data.length !==0 &&
          (
            <Row>
              <Col>
                    <Row className="no-gutters">
                      <Col className="col-mx-1 res_cards">
                        <Card className="shadow-none m-0">
                          <CardBody className="text-center">
                            <h3>
                              <span>{props.worksheet.ticket.data.ticket_data.handled}</span>
                            </h3>
                            <p className="text-muted font-15 mb-0">
                              Handled Tickets
                            </p>
                          </CardBody>
                        </Card>
                      </Col>

                      <Col className="col-mx-1 res_cards">
                        <Card className="card shadow-none m-0 border-left">
                          <CardBody className="text-center">
                            <h3>
                              <span>{props.worksheet.ticket.data.ticket_data.resolved}</span>
                            </h3>
                            <p className="text-muted font-15 mb-0">
                              Resolved Tickets
                            </p>
                          </CardBody>
                        </Card>
                      </Col>

                      <Col className="col-mx-1 res_cards">
                        <Card className="card shadow-none m-0 border-left">
                          <CardBody className="text-center">
                            <h3>
                              <span>{props.worksheet.ticket.data.ticket_data.pending}</span>
                            </h3>
                            <p className="text-muted font-15 mb-0">
                              Pending Tickets
                            </p>
                          </CardBody>
                        </Card>
                      </Col>

                      <Col className="col-mx-1 res_cards">
                        <Card className="card shadow-none m-0 border-left">
                          <CardBody className="text-center">
                            {/* <i className="dripicons-to-do text-muted font-24"></i> */}
                            <h3>
                              <span>{props.worksheet.ticket.data.ticket_data.sla}</span>
                            </h3>
                            <p className="text-muted font-15 mb-0">
                              SLA Violations
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                 
              </Col>
            </Row>
          )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    worksheet: state.Worksheet,
  };
};
export default connect(mapStateToProps, {})(TicketCount);
