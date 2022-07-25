import React, { Component } from 'react';
import { Row, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './style.scss'

class TeamDelete extends React.Component {

    toggleModal = () => {
        this.props.closeDeleteModal()
    }

    deleteTeam = () => {
        this.props.getTeamDelete(this.props.data.team_id)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.team && this.props.team.teamDelete ){
            if(prevProps.team.teamDelete !== this.props.team.teamDelete){
                this.props.records.splice(this.props.index,1)
                this.props.getTeamList()
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
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">Team Delete</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <h4>Are you sure to delete this team?</h4>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="dark" onClick={this.toggleModal}>
                                    Cancel
                                </Button>{' '}
                                <Button color="danger" onClick={() => this.deleteTeam()}>
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

export default TeamDelete