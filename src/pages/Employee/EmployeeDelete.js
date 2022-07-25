import React, { Component } from 'react';
import { Row, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './style.scss'

class EmployeeDelete extends React.Component {

    toggleModal = () => {
        this.props.closeDeleteModal()
    }

    deleteEmployee = () => {
        console.log(this.props)
        this.props.getEmployeeDelete(this.props.data.id)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.employee && this.props.employee.employeeDelete ){
            if(prevProps.employee.employeeDelete !== this.props.employee.employeeDelete){
                this.props.records.splice(this.props.index,1)
           
                this.props.getEmployeeList()
                this.toggleModal()
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <Card className="dept-details-card">
                    <CardBody>
                        <Modal
                            isOpen={this.props.toggleDeleteModal}
                            toggle={this.toggleModal}
                            className="modal-dialog-top"
                            // size="lg"
                        >
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">Employee Delete</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <h4>Are you sure to delete this employee?</h4>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="dark" onClick={this.toggleModal}>
                                    Cancel
                                </Button>{' '}
                                <Button color="danger" onClick={() => this.deleteEmployee()}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default EmployeeDelete