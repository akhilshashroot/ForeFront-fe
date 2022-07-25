import React, { Component } from 'react';
import { Row, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './style.scss'

class InterviewDelete extends React.Component {

    toggleModal = () => {
        this.props.closeDeleteModal()
    }

    deleteInterview = () => {
        console.log(this.props)
        this.props.getInterviewDelete(this.props.data.id)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.interview && this.props.interview.interviewDelete ){
            if(prevProps.interview.interviewDelete !== this.props.interview.interviewDelete){
                this.props.records.splice(this.props.index,1)
           
                this.props.getInterviewList()
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
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">Interview Delete</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <h4>Are you sure to delete this interview?</h4>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="dark" onClick={this.toggleModal}>
                                    Cancel
                                </Button>{' '}
                                <Button color="danger" onClick={() => this.deleteInterview()}>
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

export default InterviewDelete