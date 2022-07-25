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
    getDailyjobdesAdd,
} from '../../../redux/actions';
import { getLoggedInUser } from '../../../helpers/authUtils';
import { toast, Zoom } from 'react-toastify';

const typeOptions = [
    { value: '1', label: 'Text Field' },
    { value: '2', label: 'CheckBox' },
    { value: '3', label: 'Number' },
];
class ConfigureJobdes extends React.Component {
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
        jd: null,
    };
  

    toggleModal = () => {
        this.props.closeJobdesModal();
    };

    componentDidMount = () => {
        if (this.props.department && !this.props.department.department) {
            this.props.getDepartmentList();
        }
        if (this.props.dailyactivity && !this.props.dailyactivity.dailyactivity) {
            this.setState({
                jd:''
            })
            let data = {
                dep_id: null,
            
            };
            this.props.getDailyactivityList(data);
        }
        if ( this.props.dailyactivity &&
            this.props.dailyactivity.dailyactivity &&
            this.props.dailyactivity.dailyactivity.data &&
            this.props.dailyactivity.dailyactivity.data.jd){
            this.setState({jd:this.props.dailyactivity.dailyactivity.data.jd[0].job_desc})
        }
        // if (this.props.activity && !this.props.activity.activity) {
        //     this.props.getDailyactivityList();
        // }
    };
    componentDidUpdate(prevProps, prevState) {
        if(this.props.dailyactivity && this.props.dailyactivity.dailyactivity && this.props.dailyactivity.dailyactivity.data ){
            if (prevProps.dailyactivity.dailyactivity !== undefined && prevProps.dailyactivity.dailyactivity.data.daily_activities !== this.props.dailyactivity.dailyactivity.data.daily_activities ) {
                if ( this.props.dailyactivity &&
                    this.props.dailyactivity.dailyactivity &&
                    this.props.dailyactivity.dailyactivity.data &&
                    this.props.dailyactivity.dailyactivity.data.jd){
                    this.setState({jd:this.props.dailyactivity.dailyactivity.data.jd[0].job_desc})
                }
            }
        }
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
  
        this.setState({
            selectDepartment: e,
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



    addJobdes = () => {
        if (
            this.state.jd !== null &&

            this.state.updatedData !== null &&
            this.state.jd !== '' &&
     
            this.state.updatedData !== ''
        ) {
            let data = {
                dep_id: this.state.updatedData.dep_id,
                jd_desc: this.state.jd,
            
            };
    
            this.props.getDailyjobdesAdd(data);
            this.toggleModal();
        } else {
            this.emptyAllFields();
        }
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
                    isOpen={this.props.toggleJobdesModal}
                    toggle={this.toggleModal}
                    className="modal-dialog-centered"
                    size="lg">
                    <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">
                        Manage Job Descriptions
                    </ModalHeader>
                    <ModalBody className="pt-0">
                        <AvForm>
                            <Row>
                                <Col md={12}>
                                    <Card>
                                        <CardBody>
                                            <Row>
                                               
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
                                                {this.props.dailyactivity &&
                                                this.props.dailyactivity.dailyactivity &&
                                                this.props.dailyactivity.dailyactivity.data &&
                                                this.props.dailyactivity.dailyactivity.data.jd &&

                                                (
                                                    <>
                                                <Col md="12">
                                                
                                                    <FormGroup>
                                                    <Label for="exampleText">Job Description</Label>
                                                    <Input type="textarea" name="text" id="exampleText" rows="8"  
                                             placeholder="Enter Job Description"
                                                    value={ this.state.jd|| ''}       
                                                    onChange={(e) => { this.setState({ jd: e.target.value }) }} />
                                                </FormGroup>
                                                
                                                
                                            
                                                </Col>
                                             
                                                <Col md={12}>
                                                    <Button
                                                        color="success"
                                                        className="btn btn-block"
                                                        onClick={() => this.addJobdes()}>
                                                        <i className="fa fa-plus"></i>
                                                        update Job Description
                                                    </Button>
                                                </Col>
                                                </>
                                                        )}
                                            </Row>
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
    getDailyjobdesAdd
})(ConfigureJobdes);
