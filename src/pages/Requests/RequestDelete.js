import React, { Component } from 'react';
import { Row, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './style.scss'

class RequestDelete extends React.Component {

    toggleModal = () => {
        this.props.closeDeleteModal()
    }

    deleteRequest = () => {
        this.props.getRequestDelete(this.props.data.lv_id)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.request && this.props.request.requestDelete ){
            if(prevProps.request.requestDelete !== this.props.request.requestDelete){
                this.props.records.splice(this.props.index,1)
                this.props.getRequestList()
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
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">Request Delete</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <h4>Are you sure to delete this request?</h4>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="dark" onClick={this.toggleModal}>
                                    Cancel
                                </Button>{' '}
                                <Button color="danger" onClick={() => this.deleteRequest()}>
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

export default RequestDelete