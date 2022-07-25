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
    Input,
    Label,
} from 'reactstrap';
import './style.scss';
import { AvForm, AvField } from 'availity-reactstrap-validation';
// import DepImg from "../../assets/images/texa/add-tasker.png"
import Select from 'react-select';
// import LoaderWidget from '../../components/Loader';
import { getMytaskAdd, getEmployeeListUser, getMytaskList } from '../../redux/actions';
import { connect } from 'react-redux';
import { getLoggedInUser } from '../../helpers/authUtils';

const leads = [
    { value: '5fc78772db194609be7ca210', label: 'Magmina' },
    { value: '7fc78772db194609be7ca210', label: 'Peter' },
    { value: '6fc78772db194609be7ca210', label: 'Thomas' },
];

const period = [
    { label: 'One Time', value: 'ONE' },
    { label: 'Monthly', value: 'Monthly' },
    { label: 'Weekly', value: 'Weekly' },
    { label: 'Daily', value: 'Daily' },
];

const weekly = [
    { label: 'Monday', value: 1 },
    { label: 'Tuesday', value: 2 },
    { label: 'Wednesday', value: 3 },
    { label: 'Thursday', value: 4 },
    { label: 'Friday', value: 5 },
    { label: 'Saturday', value: 6 },
    { label: 'Sunday', value: 0 },
];

class TaskerAddEdit extends React.Component {
    state = {
        deadline: false,
        weekly: false,
        selectedLead: null,
        isLoading: false,
        name: null,
        desc: null,
        taskTitle: null,
        employee: null,
        duration: null,
        file: null,
        taskAssigned: null,
        date: null,
        day: null,
    };

    toggleModal = () => {
        this.props.closeAddEditModal();
    };

    componentDidMount = () => {
        if (this.props.employee && !this.props.employee.employee) {
            this.props.getEmployeeListUser();
        }
        if (this.props.toggleAddEditModal) {
            if (this.props.data !== null) {
                this.setState({
                    name: this.props.data.dep_name,
                });
            }
        }
    };
    componentDidUpdate(prevProps, prevState) {
        // if (this.props.tasker && this.props.tasker.taskerAdd) {
        //   if (prevProps.tasker.taskerAdd !== this.props.tasker.taskerAdd) {
        //     this.props.getTaskerList();

        //     this.toggleModal();
        //   }
        // }
        // if (this.props.tasker && this.props.tasker.taskerUpdate) {
        //   if (prevProps.tasker.taskerUpdate !== this.props.tasker.taskerUpdate) {
        //     this.props.getTaskerList();

        //     this.toggleModal();
        //   }
        // }
        if (this.props.task && this.props.task.mytaskAdd) {
            if (prevProps.task.mytaskAdd !== this.props.task.mytaskAdd) {
                this.toggleModal();
                this.props.getMytaskList();
            }
        }
    }

    convertEmployee = (data) => {
        var employeeData = [];
        data &&
            data.forEach((value) => {
                employeeData.push({
                    label: value.firstname + value.lastname,
                    value: value._id,
                });
            });
        return employeeData;
    };

    addTasker() {
        if (this.state.name !== null && this.state.name !== '') {
            let data = {
                dep_name: this.state.name,
            };
            this.props.getTaskerAdd(data);
        } else {
            this.props.emptyAllFields();
        }
    }

    updateTasker = () => {
        if (this.state.name !== null && this.state.name !== '') {
            let data = {
                dep_name: this.state.name,
                dep_id: this.props.data.dep_id,
            };
            this.props.getTaskerUpdate(data);
        } else {
            this.props.emptyAllFields();
        }
    };
    convertRecilist = (data) => {
        var Data = [];
        data &&
            data.forEach((value) => {
                Data.push({ label: value.name, value: value.id });
            });
        return Data;
    };

    handleAssigneeChange = (e) => {
        this.setState({ selectedLead: e });
    };
    fileChange = (e) => {
        this.setState({ file: e.target.files[0] });
    };

    durationChange = (e) => {
        this.setState({ duration: e });
        if (e.value === 'ONE') {
            this.setState({ deadline: true });
            this.setState({ weekly: false });
        } else if (e.value === 'Weekly') {
            this.setState({ weekly: true });
            this.setState({ deadline: false });
        } else {
            this.setState({ weekly: false, deadline: false });
        }
    };

    assignTask = () => {
        if (
            this.state.taskTitle !== null &&
            this.state.taskTitle !== '' &&
            this.state.employee !== null &&
            this.state.employee !== '' &&
            this.state.duration !== null &&
            this.state.duration !== '' &&
            this.state.taskAssigned !== null &&
            this.state.taskAssigned !== ''
        ) {
            const fd = new FormData();
            if (this.state.deadline) {
                fd.append('date', this.state.date);
            }
            if (this.state.weekly) {
                fd.append('day', this.state.day.value);
            }
            fd.append('user_id', getLoggedInUser().id);
            fd.append('title', this.state.taskTitle);
            fd.append('employee_id', this.state.employee.value);
            fd.append('period', this.state.duration.value);
            fd.append('body', this.state.taskAssigned);
            fd.append('attachment', this.state.file);
            this.props.getMytaskAdd(fd);
        } else {
            this.props.emptyAllFields();
        }
    };

    render() {
        const { selectedLead, name, desc } = this.state;
        const { data } = this.props;
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.props.toggleAddEditModal}
                    toggle={this.toggleModal}
                    className="modal-dialog-centered"
                    size="lg">
                    <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">
                        {data !== null ? 'Edit Tasker' : 'Add New Tasker'}
                    </ModalHeader>
                    <ModalBody>
                        {/* {this.props.employee && this.props.employee.employeelistloading && this.props.tasker && this.props.tasker.listloading && <LoaderWidget />} */}
                        <Row>
                            <Col md={12}>
                                <Label for="tasks">Assign Tasks</Label>

                                <Input
                                    type="text"
                                    className='mb-2'
                                    name="text"
                                    id="tasks"
                                    placeholder="Enter A Task Title"
                                    onChange={(e) => this.setState({ taskTitle: e.target.value })}
                                />
                            </Col>

                            <Col md={6}>
                                <Label> Select Employee</Label>
                                <Select
                                    htmlFor="select"
                                    isClearable={true}
                                    className="react-select mb-2"
                                    classNamePrefix="react-select"
                                    options={this.convertRecilist(
                                        this.props.employee &&
                                            this.props.employee.employee &&
                                            this.props.employee.employee.data
                                    )}
                                    onChange={(e) => this.setState({ employee: e })}></Select>
                            </Col>
                            <Col md={6}>
                                <Label> Select Duratrion</Label>
                                <Select
                                    htmlFor="select"
                                    className="react-select mb-2"
                                    classNamePrefix="react-select"
                                    // defaultValue={this.state.Interviews || ""}
                                    options={period}
                                    onChange={(e) => this.durationChange(e)}></Select>
                            </Col>
                            <Col md={6}>
                                <Label> Attach Files</Label>
                                <br />
                                <input type="file" onChange={(e) => this.fileChange(e)}   className='mb-2'/>
                            </Col>
                            {this.state.weekly && (
                                <Col md={6}>
                                              <Label> Deadline</Label>
                                    <Select
                                        htmlFor="select"
                                        className="react-select mb-2"
                                        classNamePrefix="react-select"
                                        options={weekly}
                                        onChange={(e) => this.setState({ day: e })}
                                    />
                                </Col>
                            )}

                            {this.state.deadline && (
                                <Col md={6} >
                                 
                                        <Label>Select Deadline</Label>
                                        <Input
                                            type="date"
                                            name="date"
                                            className="mb-2"
                                            id="exampleDate"
                                            placeholder="date placeholder"
                                            onChange={(e) => this.setState({ date: e.target.value })}
                                        />
                                  
                                </Col>
                            )}

                            <Col md={12}>
                            <Label>Task to be Assigned</Label>
                                    <Input
                                        type="textarea"
                                        name="text"
                                        className='mb-2'
                                        id="exampleText"
                                        placeholder="Enter Task To Be Assigned"
                                        rows="3"
                                        onChange={(e) => this.setState({ taskAssigned: e.target.value })}
                                    />
                             
                            </Col>
                            {/* <Col md={12}>
                    <FormGroup className="mt-2 text-center">
                      <button
                        className="btn btn-primary"
                        onClick={this.assignTask}
                      >
                        Assign
                      </button>
                    </FormGroup>
                  </Col> */}
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.assignTask}>
                            Assign
                        </Button>{' '}
                        <Button color="danger" onClick={this.toggleModal}>
                            Cancel
                        </Button>{' '}
                        {/* {data !== null ? (
                  <Button color="success" onClick={() => this.updateTasker()}>
                    Update Tasker
                  </Button>
                ) : (
                  <Button color="success" onClick={() => this.addTasker()}>
                    Add Tasker
                  </Button>
                )} */}
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        employee: state.Employee,
        task: state.Mytasks,
    };
};
export default connect(mapStateToProps, {
    getMytaskAdd,
    getEmployeeListUser,
    getMytaskList,
})(TaskerAddEdit);
