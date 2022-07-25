import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './style.scss'
import { AvForm, AvField } from 'availity-reactstrap-validation';
// import DepImg from "../../assets/images/texa/add-department.png"
import Select from 'react-select';
// import LoaderWidget from '../../components/Loader';


const leads = [
    { value: '5fc78772db194609be7ca210', label: 'Magmina' },
    { value: '7fc78772db194609be7ca210', label: 'Peter' },
    { value: '6fc78772db194609be7ca210', label: 'Thomas' },
]
class DepartmentAddEdit extends React.Component {

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
                  
                        name : this.props.data.dep_name,
                 
                    })
                
            }
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.department && this.props.department.departmentAdd ){
            if(prevProps.department.departmentAdd !== this.props.department.departmentAdd){
                this.props.getDepartmentList()
           
                this.toggleModal()
            }
        }
        if(this.props.department && this.props.department.departmentUpdate ){
            if(prevProps.department.departmentUpdate !== this.props.department.departmentUpdate){
                this.props.getDepartmentList()
              
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

 

     addDepartment(){
        if(((this.state.name) !== null) && ((this.state.name ) !== "")){
            let data = {
                dep_name: this.state.name,
            }
             this.props.getDepartmentAdd(data)

        }
        else {
            this.props.emptyAllFields()
        }

    }

    

    updateDepartment = () => {
        if(((this.state.name) !== null) && ((this.state.name) !== "")){
            let data = {
                dep_name: this.state.name,
                dep_id: this.props.data.dep_id
            }
            this.props.getDepartmentUpdate(data)
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
                                {data !== null ? "Edit Department" : "Add New Department"}</ModalHeader>
                            <ModalBody>
                            {/* {this.props.employee && this.props.employee.employeelistloading && this.props.department && this.props.department.listloading && <LoaderWidget />} */}
                                <AvForm>
                                    <Row>
                                   
                                        <Col md={12}>
                                            <Row>
                                                <Col md="12" sm="12" lg="12">
                                                    <AvField
                                                        name="dept-name"
                                                        label="Department Name"
                                                        type="text"
                                                        value={name || ""}
                                                        onChange={(e) => { this.setState({ name: e.target.value }) }}
                                                        required
                                                        placeholder="Enter Department Name"
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
                                    <Button color="success" onClick={() => this.updateDepartment()}>
                                        Update Department
                                    </Button>
                                :
                                    <Button color="success" onClick={()=> this.addDepartment()}>
                                        Add Department
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

export default DepartmentAddEdit