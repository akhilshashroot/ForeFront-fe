import React, { Component } from 'react';
import { Row, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './style.scss'

class LeaverequestDelete extends React.Component {

    toggleModal = () => {
        this.props.closeDeleteModal()
    }

    deleteLeaverequest = () => {
        console.log(this.props)
        this.props.getLeaverequestDelete(this.props.data.dep_id)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.leaverequest && this.props.leaverequest.leaverequestDelete ){
            if(prevProps.leaverequest.leaverequestDelete !== this.props.leaverequest.leaverequestDelete){
                this.props.records.splice(this.props.index,1)
           
                this.props.getLeaverequestList()
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
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">Leaverequest Delete</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <h4>Are you sure to delete this leaverequest?</h4>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="dark" onClick={this.toggleModal}>
                                    Cancel
                                </Button>{' '}
                                <Button color="danger" onClick={() => this.deleteLeaverequest()}>
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

export default LeaverequestDelete