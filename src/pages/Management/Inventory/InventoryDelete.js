import React, { Component } from 'react';
import { Row, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './style.scss'
import { getLoggedInUser } from '../../../helpers/authUtils';

class InventoryDelete extends React.Component {

    toggleModal = () => {
        this.props.closeDeleteModal()
    }

    deleteInventory = () => {
        this.props.getInventoryDelete(this.props.data.inv_id)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.inventory && this.props.inventory.inventoryDelete ){
            if(prevProps.inventory.inventoryDelete !== this.props.inventory.inventoryDelete){
                this.props.records.splice(this.props.index,1)
      
                this.props.getInventoryList()
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
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">Inventory Delete</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <h4>Are you sure to delete this inventory?</h4>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="dark" onClick={this.toggleModal}>
                                    Cancel
                                </Button>{' '}
                                <Button color="danger" onClick={() => this.deleteInventory()}>
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

export default InventoryDelete