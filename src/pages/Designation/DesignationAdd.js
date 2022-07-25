import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './style.scss'
import { AvForm, AvField } from 'availity-reactstrap-validation';
// import DepImg from "../../assets/images/texa/add-designation.png"
import Select from 'react-select';
// import LoaderWidget from '../../components/Loader';


const leads = [
    { value: '5fc78772db194609be7ca210', label: 'Magmina' },
    { value: '7fc78772db194609be7ca210', label: 'Peter' },
    { value: '6fc78772db194609be7ca210', label: 'Thomas' },
]
class DesignationAddEdit extends React.Component {

    state = {
        selectedLead: null,
        isLoading: false,
        name: null,
        desc: null,
    }

    toggleModal = () => {
        this.props.closeAddEditModal()
    }

    componentDidMount = () => {
      
        if(this.props.toggleAddEditModal){
            if (this.props.data !== null) {

                    this.setState({
                  
                        name : this.props.data.designation,
                 
                    })
                
            }
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.designation && this.props.designation.designationAdd ){
            if(prevProps.designation.designationAdd !== this.props.designation.designationAdd){
                this.props.getDesignationList()            
                this.toggleModal()
            }
        }
        if(this.props.designation && this.props.designation.designationUpdate ){
            if(prevProps.designation.designationUpdate !== this.props.designation.designationUpdate){
                this.props.getDesignationList()
             
                this.toggleModal()
            }
        }
    }

    convertEmployee = data => {
        var employeeData = []
        data && data.forEach((value) => {
            employeeData.push({ "label": value.firstname + value.lastname, "value": value._id })
        })
        return employeeData
    }

 

     addDesignation(){
        if(((this.state.name) !== null) && ((this.state.name ) !== "")){
            let data = {
                designation: this.state.name,
            }
             this.props.getDesignationAdd(data)

        }
        else {
            this.props.emptyAllFields()
        }

    }

    

    updateDesignation = () => {
        if(((this.state.name) !== null) && ((this.state.name) !== "")){
            let data = {
                designation: this.state.name,
                desg_id: this.props.data.desg_id
            }
            this.props.getDesignationUpdate(data)
        }
        else {
            this.props.emptyAllFields()
        }

    }

    render() {
        const { selectedLead, name, desc } = this.state
        const { data } = this.props
        return (
            <React.Fragment>
                <Card className="dept-details-card">
                    <CardBody>
                        <Modal
                            isOpen={this.props.toggleAddEditModal}
                            toggle={this.toggleModal}
                            className="modal-dialog-centered"
                            size="lg"
                        >
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">
                                {data !== null ? "Edit Designation" : "Add New Designation"}</ModalHeader>
                            <ModalBody>
                            {/* {this.props.employee && this.props.employee.employeelistloading && this.props.designation && this.props.designation.listloading && <LoaderWidget />} */}
                                <AvForm>
                                    <Row>
                                   
                                        <Col md={12}>
                                            <Row>
                                                <Col md="12" sm="12" lg="12">
                                                    <AvField
                                                        name="dept-name"
                                                        label="Designation Name"
                                                        type="text"
                                                        value={name || ""}
                                                        onChange={(e) => { this.setState({ name: e.target.value }) }}
                                                        required
                                                        placeholder="Enter Designation Name"
                                                    />
                                                </Col>
                                             
                                            </Row>
                                        </Col>

                                    </Row>
                                </AvForm>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={this.toggleModal}>
                                    Cancel
                                </Button>{' '}
                                {data !== null ?
                                    <Button color="success" onClick={() => this.updateDesignation()}>
                                        Update Designation
                                    </Button>
                                :
                                    <Button color="success" onClick={()=> this.addDesignation()}>
                                        Add Designation
                                    </Button>
                                }
                            </ModalFooter>
                        </Modal>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default DesignationAddEdit