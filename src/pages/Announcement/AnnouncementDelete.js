import React, { Component } from 'react';
import { Row, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './style.scss'

class AnnouncementDelete extends React.Component {

    toggleModal = () => {
        this.props.closeDeleteModal()
    }

    deleteAnnouncement = () => {

        this.props.getAnnouncementDelete(this.props.data.id)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.announcement && this.props.announcement.announcementDelete ){
            if(prevProps.announcement.announcementDelete !== this.props.announcement.announcementDelete){
                this.props.records.splice(this.props.index,1)
           
                this.props.getAnnouncementList()
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
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">Announcement Delete</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <h4>Are you sure to delete this announcement?</h4>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="dark" onClick={this.toggleModal}>
                                    Cancel
                                </Button>{' '}
                                <Button color="danger" onClick={() => this.deleteAnnouncement()}>
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

export default AnnouncementDelete