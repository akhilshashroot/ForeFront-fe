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
    getMonthlyactivityList,
    getMonthlyactivityDelete,
    getMonthlyactivityAdd,
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
        if (this.props.monthlyactivity && !this.props.monthlyactivity.monthlyactivity) {
            let data = {
                dep_id: undefined,
            };
            this.props.getMonthlyactivityList(data);
        }
        // if (this.props.activity && !this.props.activity.activity) {
        //     this.props.getMonthlyactivityList();
        // }
    };
    componentDidUpdate(prevProps, prevState) {
        // if(this.props.monthlyactivity && this.props.monthlyactivity.monthlyactivity && this.props.monthlyactivity.monthlyactivity.data ){
        //     if (prevProps.monthlyactivity.monthlyactivity !== undefined && prevProps.monthlyactivity.monthlyactivity.data.monthly_activities !== this.props.monthlyactivity.monthlyactivity.data.monthly_activities ) {
        //         console.log('this.props.monthlyactivity.monthlyactivity', prevProps.monthlyactivity.monthlyactivity.data.monthly_activities);
        //         let data = this.state.updatedData
        //         this.props.getMonthlyactivityList(data);
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
            if (this.props.monthlyactivity) {
                this.props.getMonthlyactivityList(data);
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
                ma_field_type: this.state.selectType.value,
                ma_activity: this.state.name,
            };
            console.log('data', data);
            this.props.getMonthlyactivityAdd(data);
            let dep = this.state.updatedData;
            this.props.getMonthlyactivityList(dep);
        } else {
            this.emptyAllFields();
        }
    };

    updateProject = () => {};

    DeleteActivity = (a_data) => {
        console.log('a_data', a_data);
        this.props.getMonthlyactivityDelete(a_data.ma_id);
        let data = this.state.updatedData;
        this.props.getMonthlyactivityList(data);
    };

    render() {
        const { selectedLead, name, desc, selectDepartments, activityData ,selectType} = this.state;
        const { data } = this.props;
        let ac_data = [];
        if (
            this.props.monthlyactivity &&
            this.props.monthlyactivity.monthlyactivity &&
            this.props.monthlyactivity.monthlyactivity.data
        ) {
            ac_data = this.props.monthlyactivity.monthlyactivity.data;

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

                                            {this.props.monthlyactivity &&
                                                this.props.monthlyactivity.monthlyactivity &&
                                                this.props.monthlyactivity.monthlyactivity.data &&
                                                this.props.monthlyactivity.monthlyactivity.data && (
                                                    <>
                                                        {ac_data.length !== 0 ? (
                                                            Object.keys(ac_data).map(function (keyName, keyIndex) {
                                                                return (
                                                                    <Alert
                                                                        className="d-flex justify-content-between align-items-center"
                                                                        color="light"
                                                                        key={keyName}>
                                                                        {ac_data[keyName].ma_activity}
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
        monthlyactivity: state.Monthlyactivity,
    };
};

export default connect(mapStateToProps, {
    getDepartmentList,
    getMonthlyactivityList,
    getMonthlyactivityDelete,
    getMonthlyactivityAdd,
})(ConfigureActivity);
