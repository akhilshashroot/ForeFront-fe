// @flow
import { data } from 'jquery';
import React from 'react';
import Chart from 'react-apexcharts';
import {
    Card,
    CardBody,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Badge,
    Spinner,
} from 'reactstrap';

const About = (props) => {


    return (
        <Card>
            <CardBody>
                <h4 className="header-title">About</h4>

                {/* {props.data&&props.data.listloading && <Spinner type="grow" color='primary' style={{width:'100%',height:'100%'}} />}  
            <Spinner  color='primary'  /> */}
                <div style={{ width: '100%', height: '100%' }}>
                    <Spinner color="primary" />
                </div>
                {props.data && (
                    <ListGroup className="p-0">
                        <ListGroupItem>
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <i className="mdi mdi-account text-primary rounded-circle widget-icon mr-1"></i>
                                    Name
                                </div>
                                <div className="text-right font-weight-bold">{data.fullName}</div>
                            </div>
                        </ListGroupItem>
                        <ListGroupItem>
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <i className="mdi mdi-comment-account text-primary rounded-circle widget-icon mr-1"></i>
                                    Hashroot ID
                                </div>
                                <div className="text-right font-weight-bold">10533</div>
                            </div>
                        </ListGroupItem>
                        <ListGroupItem>
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <i className=" mdi mdi-briefcase text-primary rounded-circle widget-icon mr-1"></i>
                                    Designation
                                </div>
                                <div className="text-right font-weight-bold">Front End Developer</div>
                            </div>
                        </ListGroupItem>
                        <ListGroupItem>
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <i className="mdi mdi-account-supervisor text-primary rounded-circle widget-icon mr-1"></i>
                                    Team
                                </div>
                                <div className="text-right font-weight-bold">Innovations</div>
                            </div>
                        </ListGroupItem>
                        <ListGroupItem>
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <i className=" mdi mdi-office-building  text-primary rounded-circle widget-icon mr-1"></i>
                                    Dept.
                                </div>
                                <div className="text-right font-weight-bold">Software Development</div>
                            </div>
                        </ListGroupItem>
                        <ListGroupItem>
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <i className=" mdi mdi-calendar-account  text-primary rounded-circle widget-icon mr-1"></i>
                                    DOB
                                </div>
                                <div className="text-right font-weight-bold">03-01-1998</div>
                            </div>
                        </ListGroupItem>
                        <ListGroupItem>
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <i className="mdi mdi-phone text-primary rounded-circle widget-icon mr-1"></i>
                                    Phone No
                                </div>
                                <div className="text-right font-weight-bold">6381089164</div>
                            </div>
                        </ListGroupItem>
                        <ListGroupItem>
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <i className=" mdi mdi-water  text-primary rounded-circle widget-icon mr-1"></i>
                                    Blood Group
                                </div>
                                <div className="text-right font-weight-bold">B +ve</div>
                            </div>
                        </ListGroupItem>
                        <ListGroupItem>
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <i className=" mdi mdi-shield-account text-primary rounded-circle widget-icon mr-1"></i>
                                    Certifications
                                </div>
                                <div className="text-right font-weight-bold">NIL</div>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                )}
            </CardBody>
        </Card>
    );
};

export default About;
