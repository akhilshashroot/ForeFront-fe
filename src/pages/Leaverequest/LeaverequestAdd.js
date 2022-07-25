import React, { Component } from 'react';
import {
    Row,
    Col,
    Card,
    CardBody,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import './style.scss';
import { AvForm, AvField } from 'availity-reactstrap-validation';
// import DepImg from "../../assets/images/texa/add-leaverequest.png"
import Select from 'react-select';
import { connect } from 'react-redux';
import { getLoggedInUser } from '../../helpers/authUtils';
import LoaderWidget from '../../components/Loader';
import { Cookies } from 'react-cookie';

const leads = [
    { value: '5fc78772db194609be7ca210', label: 'Magmina' },
    { value: '7fc78772db194609be7ca210', label: 'Peter' },
    { value: '6fc78772db194609be7ca210', label: 'Thomas' },
];
class LeaverequestAddEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            selectType: null,
            dateFrom: null,
            dateTo: null,
            daysRequired: null,
            consentOf: null,
            reason: null,
            attachProof: null,
        };
    }

    toggleModal = () => {
        this.props.closeAddEditModal();
    };

    componentDidMount = () => {
        this.setState({
            isLoading: false,
            selectType: null,
            dateFrom: null,
            dateTo: null,
            daysRequired: null,
            consentOf: null,
            reason: null,
            attachProof: null,
        });
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.props.leaverequest && this.props.leaverequest.leaverequestAdd) {
            if (prevProps.leaverequest.leaverequestAdd !== this.props.leaverequest.leaverequestAdd) {
                this.props.getLeaverequestList();
                this.setState({
                    isLoading: false,
                    selectType: null,
                    dateFrom: null,
                    dateTo: null,
                    daysRequired: null,
                    consentOf: null,
                    reason: null,
                    attachProof: null,
                });
            }
        }
        if (this.props.leaverequest && this.props.leaverequest.leaverequestUpdate) {
            if (prevProps.leaverequest.leaverequestUpdate !== this.props.leaverequest.leaverequestUpdate) {
                this.props.getLeaverequestList();
            }
        }
        if (this.props.leaveRequest && this.props.leaveRequest.leaverequestAdd) {
            if (prevProps.leaveRequest.leaverequestAdd !== this.props.leaveRequest.leaverequestAdd) {
                this.props.getLeaverequestList();
            }
        }
    }

    convertListOptions = (data) => {
        var employeeData = [];
        data &&
            data.forEach((value) => {
                employeeData.push({
                    label: value.name,
                    value: value.id,
                });
            });
        return employeeData;
    };

    addLeaverequest() {
        if (this.state.name !== null && this.state.name !== '') {
            let data = {
                dep_name: this.state.name,
            };
            this.props.getLeaverequestAdd(data);
        } else {
            this.props.emptyAllFields();
        }
    }

    updateLeaverequest = () => {
        if (this.state.name !== null && this.state.name !== '') {
            let data = {
                dep_name: this.state.name,
                dep_id: this.props.data.dep_id,
            };
            this.props.getLeaverequestUpdate(data);
        } else {
            this.props.emptyAllFields();
        }
    };

    requestListChange = (e) => {
        this.setState({
            selectType: e,
        });
    };

    proofData = (e) => {
        this.setState({ attachProof: e.target.files[0] });
    };

    requestCreate = () => {
        if (
            this.state.selectType !== null &&
            this.state.selectType !== '' &&
            this.state.dateFrom !== null &&
            this.state.dateFrom !== '' &&
            this.state.dateTo !== null &&
            this.state.dateTo !== '' &&
            this.state.daysRequired !== null &&
            this.state.daysRequired !== '' &&
            this.state.consentOf !== null &&
            this.state.consentOf !== '' &&
            this.state.reason !== null &&
            this.state.reason !== ''
        ) {
            const id = getLoggedInUser().id;
            const fd = new FormData();
            const cookies = new Cookies();
            if (cookies.get('employee').id == cookies.get('user').id) {
                fd.append('applied_as_admin', 0);
            } else {
                fd.append('applied_as_admin', 1);
            }
            fd.append('user_id', id);
            fd.append('request_type', this.state.selectType.value);
            fd.append('reason', this.state.reason);
            fd.append('approved_by', this.state.consentOf);
            fd.append('request_days', this.state.daysRequired);
            fd.append('from_date', this.state.dateFrom);
            fd.append('to_date', this.state.dateTo);
            fd.append('userfile', this.state.attachProof);
            this.props.getLeaverequestAdd(fd);
        } else {
            this.props.emptyAllFields();
        }
    };

    clearFields = () => {
        // this.props.emptyAllFields();
    };

    render() {
        const { data } = this.props;
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <AvForm>
                            <Row>
                                <Col md={12} className="d-flex justify-content-center">
                                    <Select
                                        label="Designation"
                                        className="react-select mb-3 w-50"
                                        classNamePrefix="react-select"
                                        defaultValue={this.state.selectType || ''}
                                        onChange={(e) =>
                                            this.setState({
                                                selectType: e,
                                            })
                                        }
                                        options={this.convertListOptions(this.props.leaverequest?.data)}></Select>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="exampleDate">Date / Date from</Label>
                                        <Input
                                            type="date"
                                            name="date"
                                            id="exampleDate"
                                            placeholder="Date from"
                                            // defaultValue={dob || ""}
                                            value={this.state.dateFrom || ''}
                                            onChange={(e) => {
                                                this.setState({ dateFrom: e.target.value });
                                            }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="exampleDate">Date to</Label>
                                        <Input
                                            type="date"
                                            name="date"
                                            id="exampleDate"
                                            placeholder="Date to"
                                            // defaultValue={dob || ""}
                                            value={this.state.dateTo || ''}
                                            onChange={(e) => {
                                                this.setState({ dateTo: e.target.value });
                                            }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <AvField
                                        name="dept-name"
                                        label="No. of Days Required"
                                        type="text"
                                        value={this.state.daysRequired || ''}
                                        onChange={(e) => {
                                            this.setState({ daysRequired: e.target.value });
                                        }}
                                        placeholder="Enter Days Required"
                                    />
                                </Col>
                                <Col md={3}>
                                    <AvField
                                        name="Consent Of"
                                        label="Consent Of"
                                        type="text"
                                        value={this.state.consentOf || ''}
                                        onChange={(e) => {
                                            this.setState({ consentOf: e.target.value });
                                        }}
                                        placeholder="Enter Consent of"
                                    />
                                </Col>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="exampleText">Reason</Label>
                                        <Input
                                            type="textarea"
                                            name="text"
                                            id="exampleText"
                                            rows="5"
                                            value={this.state.reason || ''}
                                            onChange={(e) => {
                                                this.setState({ reason: e.target.value });
                                            }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={8}>
                                    <Label>Attach Proof(optonal)</Label> <br />
                                    <input type="file" onChange={(e) => this.proofData(e)} />
                                </Col>

                                <Col md={4}>
                                    <Button color="success" className="float-right" onClick={this.requestCreate}>
                                        Request Leave
                                    </Button>
                                </Col>
                            </Row>
                        </AvForm>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        leaverequest: state.Leaverequest.leaverequesttype,
        leaveRequest: state.Leaverequest,
    };
};
export default connect(mapStateToProps, {})(LeaverequestAddEdit);
