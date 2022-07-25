import React, { Component } from 'react';
import { Row, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './style.scss'

class DesignationDelete extends React.Component {

    toggleModal = () => {
        this.props.closeDeleteModal()
    }

    deleteDesignation = () => {
        console.log(this.props)
        this.props.getDesignationDelete(this.props.data.desg_id)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.designation && this.props.designation.designationDelete ){
            if(prevProps.designation.designationDelete !== this.props.designation.designationDelete){
                this.props.records.splice(this.props.index,1)
                this.props.getDesignationList()
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
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">Designation Delete</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <h4>Are you sure to delete this designation?</h4>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="dark" onClick={this.toggleModal}>
                                    Cancel
                                </Button>{' '}
                                <Button color="danger" onClick={() => this.deleteDesignation()}>
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

export default DesignationDelete