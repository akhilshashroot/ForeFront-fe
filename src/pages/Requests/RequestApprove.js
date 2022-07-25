import React, { Component } from 'react';
import { Row, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './style.scss'

class RequestApprove extends React.Component {

    toggleModal = () => {
        this.props.closeApproveModal()
    }

    approveRequest = () => {
        this.props.getRequestApprove(this.props.data.lv_id)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.request && this.props.request.requestApprove ){
            if(prevProps.request.requestApprove !== this.props.request.requestApprove){
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
                            isOpen={this.props.toggleApproveModal}
                            toggle={this.toggleModal}
                            className="modal-dialog-top"
                            // size="lg"
                        >
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">Request Approve</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <h4>Are you sure to approve this request?</h4>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="dark" onClick={this.toggleModal}>
                                    Cancel
                                </Button>{' '}
                                <Button color="danger" onClick={() => this.approveRequest()}>
                                    Approve
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default RequestApprove