// @flow
import { width } from 'britecharts-react';
import React from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Media from 'reactstrap/lib/Media';
import './styles.css';

const Statistics = () => {
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card className="widget-inline">
                        <CardBody className="p-0">
                            <Row className="no-gutters">
                                <Col  className="col-mx-1 res_cards">
                                    <Card className="shadow-none m-0">
                                        <CardBody className="text-center">
                                            <i className="dripicons-clock text-muted font-24"></i>
                                            <h3>
                                                <span>-503:38</span>
                                            </h3>
                                            <p className="text-muted font-15 mb-0">Mandatory Hours</p>
                                        </CardBody>
                                    </Card>
                                </Col>

                                <Col  className="col-mx-1 res_cards">
                                    <Card className="card shadow-none m-0 border-left">
                                        <CardBody className="text-center">
                                            <i className="dripicons-suitcase text-muted font-24"></i>
                                            <h3>
                                                <span>50:06</span>
                                            </h3>
                                            <p className="text-muted font-15 mb-0">Worked Hours</p>
                                        </CardBody>
                                    </Card>
                                </Col>

                                <Col   className="col-mx-1 res_cards">
                                    <Card className="card shadow-none m-0 border-left">
                                        <CardBody className="text-center">
                                            <i className="dripicons-alarm text-muted font-24"></i>
                                            <h3>
                                                <span>00:00</span>
                                            </h3>
                                            <p className="text-muted font-15 mb-0">Extra Hours</p>
                                        </CardBody>
                                    </Card>
                                </Col>

                                <Col  className="col-mx-1 res_cards">
                                    <Card className="card shadow-none m-0 border-left">
                                        <CardBody className="text-center">
                                            <i className="dripicons-to-do text-muted font-24"></i>
                                            <h3>
                                                <span>00:00</span>
                                            </h3>
                                            <p className="text-muted font-15 mb-0">Overtime Hours</p>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col  className="col-mx-1 res_cards">
                                    <Card className="card shadow-none m-0 border-left">
                                        <CardBody className="text-center">
                                            <i className="dripicons-time-reverse text-muted font-24"></i>
                                            <h3>
                                                <span>00:00</span>
                                            </h3>
                                            <p className="text-muted font-15 mb-0">Flexi Hours</p>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Statistics;
