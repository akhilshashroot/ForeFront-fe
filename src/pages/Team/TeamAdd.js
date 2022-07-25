import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './style.scss'
import { AvForm, AvField } from 'availity-reactstrap-validation';
// import DepImg from "../../assets/images/texa/add-team.png"
import Select from 'react-select';
// import LoaderWidget from '../../components/Loader';


const leads = [
    { value: '5fc78772db194609be7ca210', label: 'Magmina' },
    { value: '7fc78772db194609be7ca210', label: 'Peter' },
    { value: '6fc78772db194609be7ca210', label: 'Thomas' },
]
class TeamAddEdit extends React.Component {

    state = {
        selectedLead: null,
        isLoading: false,
        name: null,
        desc: null,
        mail_id: null,
    }

    toggleModal = () => {
        this.props.closeAddEditModal()
    }

    componentDidMount = () => {
      
        if(this.props.toggleAddEditModal){
            if (this.props.data !== null) {

                    this.setState({
                  
                        name : this.props.data.name,
                        mail_id : this.props.data.mail_ids,
                 
                    })
                
            }
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.team && this.props.team.teamAdd ){
            if(prevProps.team.teamAdd !== this.props.team.teamAdd){
                this.props.getTeamList()
           
                this.toggleModal()
            }
        }
        if(this.props.team && this.props.team.teamUpdate ){
            if(prevProps.team.teamUpdate !== this.props.team.teamUpdate){
                this.props.getTeamList()
           
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

 

     addTeam(){
        if(((this.state.name) !== null) && ((this.state.name ) !== "")){
            let data = {
                team_name: this.state.name,
            }
             this.props.getTeamAdd(data)

        }
        else {
            this.props.emptyAllFields()
        }

    }

    

    updateTeam = () => {
        if(((this.state.name) !== null) && ((this.state.name) !== "")){
            let data = {
                team_name: this.state.name,
                mail_id: this.state.mail_id,
                team_id: this.props.data.team_id
            }
            this.props.getTeamUpdate(data)
        }
        else {
            this.props.emptyAllFields()
        }

    }

    render() {
        const { selectedLead, name, desc ,mail_id} = this.state
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
                                {data !== null ? "Edit Team" : "Add New Team"}</ModalHeader>
                            <ModalBody>
                            {/* {this.props.employee && this.props.employee.employeelistloading && this.props.team && this.props.team.listloading && <LoaderWidget />} */}
                                <AvForm>
                                    <Row>
                                   
                                        <Col md={12}>
                                            <Row>
                                                <Col md="12" sm="12" lg="12">
                                                    <AvField
                                                        name="dept-name"
                                                        label="Team Name"
                                                        type="text"
                                                        value={name || ""}
                                                        onChange={(e) => { this.setState({ name: e.target.value }) }}
                                                        required
                                                        placeholder="Enter Team Name"
                                                    />
                                                </Col>
                                                {data !== null &&
                                                <Col md="12" sm="12" lg="12">
                                                    <AvField
                                                        name="mail_id"
                                                        label="Mail ID of team manager"
                                                        type="text"
                                                        value={mail_id || ""}
                                                        onChange={(e) => { this.setState({ mail_id: e.target.value }) }}                                                        
                                                        placeholder="Enter Mail ID of team manager"
                                                    />
                                                </Col> }
                                             
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
                                    <Button color="success" onClick={() => this.updateTeam()}>
                                        Update Team
                                    </Button>
                                :
                                    <Button color="success" onClick={()=> this.addTeam()}>
                                        Add Team
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

export default TeamAddEdit