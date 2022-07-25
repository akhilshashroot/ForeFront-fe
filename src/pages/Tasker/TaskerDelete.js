import React, { Component } from 'react';
import { Row, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './style.scss'
import { connect } from 'react-redux';
import { getTaskerList,  getTaskerDelete } from '../../redux/actions';
class TaskerDelete extends React.Component {

    toggleModal = () => {
        this.props.closeDeleteModal()
    }

    deleteTasker = () => {
        console.log(this.props)
        this.props.getTaskerDelete(this.props.data.asgnmnt_id)
       
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.tasker && this.props.tasker.taskerDelete ){
            if(prevProps.tasker.taskerDelete !== this.props.tasker.taskerDelete){
                this.props.records.splice(this.props.index,1)
           
                this.props.getTaskerList()
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
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">Tasker Delete</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <h4>Are you sure to delete this tasker?</h4>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="dark" onClick={this.toggleModal}>
                                    Cancel
                                </Button>{' '}
                                <Button color="danger" onClick={() => this.deleteTasker()}>
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



const mapStateToProps = (state) => {
    return {
        tasker: state.Tasker,
        employee: state.Employee,
    };
};
export default connect(mapStateToProps, {
    getTaskerList,

    getTaskerDelete,

})(TaskerDelete);