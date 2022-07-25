import React, { Component } from 'react';
import { Row, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './style.scss'

class HashbookDelete extends React.Component {

    toggleModal = () => {
        this.props.closeDeleteModal()
    }

    deleteHashbook = () => {
        this.props.getHashbookDelete(this.props.data.id)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.hashbook && this.props.hashbook.hashbookDelete ){
            if(prevProps.hashbook.hashbookDelete !== this.props.hashbook.hashbookDelete){
                this.props.records.splice(this.props.index,1)
           
                this.props.getHashbookList()
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
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">Hashbook Delete</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <h4>Are you sure to delete this hashbook?</h4>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="dark" onClick={this.toggleModal}>
                                    Cancel
                                </Button>{' '}
                                <Button color="danger" onClick={() => this.deleteHashbook()}>
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

export default HashbookDelete