import React, { Component } from 'react';
import { Row, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './style.scss'

class DepartmentDelete extends React.Component {

    toggleModal = () => {
        this.props.closeDeleteModal()
    }

    deleteDepartment = () => {
        console.log(this.props)
        this.props.getDepartmentDelete(this.props.data.dep_id)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.department && this.props.department.departmentDelete ){
            if(prevProps.department.departmentDelete !== this.props.department.departmentDelete){
                this.props.records.splice(this.props.index,1)
           
                this.props.getDepartmentList()
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
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">Department Delete</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <h4>Are you sure to delete this department?</h4>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="dark" onClick={this.toggleModal}>
                                    Cancel
                                </Button>{' '}
                                <Button color="danger" onClick={() => this.deleteDepartment()}>
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

export default DepartmentDelete