import React, { Component } from 'react';
import { Row, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './style.scss'

class ScoreDelete extends React.Component {

    toggleModal = () => {
        this.props.closeDeleteModal()
    }

    deleteScore = () => {
        console.log(this.props)
        this.props.getScoreDelete(this.props.data.dep_id)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.score && this.props.score.scoreDelete ){
            if(prevProps.score.scoreDelete !== this.props.score.scoreDelete){
                this.props.records.splice(this.props.index,1)
           
                this.props.getScoreList()
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
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">Score Delete</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <h4>Are you sure to delete this score?</h4>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="dark" onClick={this.toggleModal}>
                                    Cancel
                                </Button>{' '}
                                <Button color="danger" onClick={() => this.deleteScore()}>
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

export default ScoreDelete