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
    Alert,
    UncontrolledAlert,
} from 'reactstrap';

import { AvForm, AvField } from 'availity-reactstrap-validation';

import Select from 'react-select';

import { connect } from 'react-redux';
import {
    getDepartmentList,
    getDailyactivityList,
    getDailyactivityDelete,
    getDailyactivityAdd,
} from '../../../redux/actions';
import { getLoggedInUser } from '../../../helpers/authUtils';
import { toast, Zoom } from 'react-toastify';

const typeOptions = [
    { value: '1', label: 'Text Field' },
];
class ConfigureActivity extends React.Component {
    emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
    state = {
        selectedLead: null,
        isLoading: false,
        name: null,
        desc: null,
        selectDepartment: null,
        selectType: null,
        activityData: null,
        updatedData: null,
    };
    selectRef = null;

    clearValue = () => {
        this.selectRef.select.clearValue();
    };

    toggleModal = () => {
        this.props.closeActivityModal();
    };

    componentDidMount = () => {
        if (this.props.department && !this.props.department.department) {
            this.props.getDepartmentList();
        }
        if (this.props.dailyactivity && !this.props.dailyactivity.dailyactivity) {
            let data = {
                dep_id: undefined,
            };
            this.props.getDailyactivityList(data);
        }
        // if (this.props.activity && !this.props.activity.activity) {
        //     this.props.getDailyactivityList();
        // }
    };
    componentDidUpdate(prevProps, prevState) {
        // if(this.props.dailyactivity && this.props.dailyactivity.dailyactivity && this.props.dailyactivity.dailyactivity.data ){
        //     if (prevProps.dailyactivity.dailyactivity !== undefined && prevProps.dailyactivity.dailyactivity.data.daily_activities !== this.props.dailyactivity.dailyactivity.data.daily_activities ) {
        //         console.log('this.props.dailyactivity.dailyactivity', prevProps.dailyactivity.dailyactivity.data.daily_activities);
        //         let data = this.state.updatedData
        //         this.props.getDailyactivityList(data);
        //     }
        // }
    }

    convertRecilist = (data) => {
        var Data = [];
        data &&
            data.forEach((value) => {
                Data.push({ label: value.dep_name, value: value.dep_id });
            });
        return Data;
    };

    handleDepartmentChange = (e) => {
        this.clearValue();
        this.setState({
            selectDepartment: e,
            name: '',
        });
        if (e !== null) {
            let data = {
                dep_id: e.value,
            };
            this.setState({ updatedData: data });
            if (this.props.dailyactivity) {
                this.props.getDailyactivityList(data);
            }
        }
    };

    handleTypeChange = (e) => {
        if (e!==''){
            this.setState({
                selectType: e,
            });
        } else{
            this.setState({
                selectType: '',
            });
        }
       
    };

    addActivity = () => {
        if (
            this.state.name !== null &&
            this.state.selectType !== null &&
            this.state.updatedData !== null &&
            this.state.name !== '' &&
            this.state.selectType !== '' &&
            this.state.updatedData !== ''
        ) {
            let data = {
                dep_id: this.state.updatedData.dep_id,
                field_type_id: this.state.selectType.value,
                daily_activity: this.state.name,
            };
            this.props.getDailyactivityAdd(data);
            let dep = this.state.updatedData;
            this.props.getDailyactivityList(dep);
        } else {
            this.emptyAllFields();
        }
    };

    updateProject = () => {};

    DeleteActivity = (a_data) => {
        this.props.getDailyactivityDelete(a_data.daily_act_id);
        let data = this.state.updatedData;
        this.props.getDailyactivityList(data);
    };

    render() {
        const { selectedLead, name, desc, selectDepartments, activityData ,selectType} = this.state;
        const { data } = this.props;
        let ac_data = [];
        if (
            this.props.dailyactivity &&
            this.props.dailyactivity.dailyactivity &&
            this.props.dailyactivity.dailyactivity.data &&
            this.props.dailyactivity.dailyactivity.data.daily_activities
        ) {
            ac_data = this.props.dailyactivity.dailyactivity.data.daily_activities;
        }

        //  }

        return (
            <React.Fragment>
                <Modal
                    isOpen={this.props.toggleActivityModal}
                    toggle={this.toggleModal}
                    className="modal-dialog-centered"
                    size="lg">
                    <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">
                        Manage Activity
                    </ModalHeader>
                    <ModalBody className="pt-0">
                        <AvForm>
                            <Row>
                                <Col md={6}>
                                    <Card>
                                        <CardBody>
                                            <Row>
                                                <Col md={12}>
                                                    <h5 className="text-primary">Add Activitiy</h5>
                                                    <hr />
                                                </Col>
                                                <Col md={12}>
                                                    <p className="mb-1">Select Departments</p>
                                                    <Select
                                                        isClearable={true}
                                                        className="react-select mb-2"
                                                        classNamePrefix="react-select"
                                                        options={this.convertRecilist(
                                                            this.props.department &&
                                                                this.props.department.department &&
                                                                this.props.department.department.data
                                                        )}
                                                        onChange={(e) => this.handleDepartmentChange(e)}></Select>
                                                </Col>
                                                <Col md="12">
                                                    <AvField
                                                        name="dept-name"
                                                        label="Activity Name"
                                                        type="text"
                                                        value={name||''}
                                                        onChange={(e) => {
                                                            this.setState({ name: e.target.value });
                                                        }}
                                                        
                                                        placeholder="Enter Activity Name"
                                                    />
                                                </Col>
                                                <Col md={12}>
                                                    <p className="mb-1 ">Select Input Type</p>
                                                    <Select
                                                      ref={(ref) => {
                                                        this.selectRef = ref;
                                                    }}
                                                        isClearable={true}
                                                    
                                                        className="react-select mb-3"
                                                        classNamePrefix="react-select"
                                                        options={typeOptions}
                                                        onChange={(e) => this.handleTypeChange(e)}></Select>
                                                </Col>
                                                <Col md={12}>
                                                    <Button
                                                        color="success"
                                                        className="btn btn-block"
                                                        onClick={() => this.addActivity()}>
                                                        <i className="fa fa-plus"></i>
                                                        Add Activity
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <Card>
                                        <CardBody>
                                            <h5 className="text-primary">List Activitiy</h5>
                                            <hr />

                                            {this.props.dailyactivity &&
                                                this.props.dailyactivity.dailyactivity &&
                                                this.props.dailyactivity.dailyactivity.data &&
                                                this.props.dailyactivity.dailyactivity.data.daily_activities && (
                                                    <>
                                                        {ac_data.length !== 0 ? (
                                                            Object.keys(ac_data).map(function (keyName, keyIndex) {
                                                                return (
                                                                    <Alert
                                                                        className="d-flex justify-content-between align-items-center"
                                                                        color="light"
                                                                        key={keyName}>
                                                                        {ac_data[keyName].daily_act}
                                                                        <Button
                                                                            className="btn-danger"
                                                                            onClick={this.DeleteActivity.bind(
                                                                                this,
                                                                                ac_data[keyName]
                                                                            )}>
                                                                            <i className="mdi mdi-delete"></i>
                                                                        </Button>
                                                                    </Alert>
                                                                );
                                                            }, this)
                                                        ) : (
                                                            <p className="text-muted tex-center w-100">
                                                                No Activity Found
                                                            </p>
                                                        )}
                                                    </>
                                                )}
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </AvForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        department: state.Department,
        dailyactivity: state.Dailyactivity,
    };
};

export default connect(mapStateToProps, {
    getDepartmentList,
    getDailyactivityList,
    getDailyactivityDelete,
    getDailyactivityAdd,
})(ConfigureActivity);
