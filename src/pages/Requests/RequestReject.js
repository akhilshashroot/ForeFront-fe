import React, { Component } from 'react';
import { Row, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './style.scss'

class RequestReject extends React.Component {

    toggleModal = () => {
        this.props.closeRejectModal()
    }

    rejectRequest = () => {
    
        this.props.getRequestReject(this.props.data.lv_id)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.request && this.props.request.requestReject ){
            if(prevProps.request.requestReject !== this.props.request.requestReject){
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
                            isOpen={this.props.toggleRejectModal}
                            toggle={this.toggleModal}
                            className="modal-dialog-top"
                            // size="lg"
                        >
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">Request Reject</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <h4>Are you sure to reject this request?</h4>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="dark" onClick={this.toggleModal}>
                                    Cancel
                                </Button>{' '}
                                <Button color="danger" onClick={() => this.rejectRequest()}>
                                    Reject
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default RequestReject