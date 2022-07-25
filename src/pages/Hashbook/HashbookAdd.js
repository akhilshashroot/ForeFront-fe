import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './style.scss'
import { getLoggedInUser } from '../../helpers/authUtils';
import { AvForm, AvField } from 'availity-reactstrap-validation';
// import DepImg from "../../assets/images/texa/add-hashbook.png"
import Select from 'react-select';
// import LoaderWidget from '../../components/Loader';
import SimpleMDEReact from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

const delay = 1000;
const options = {
    autosave: {
        enabled: true,
        uniqueId: 1,
        delay,
    },
};

const leads = [
    { value: '5fc78772db194609be7ca210', label: 'Magmina' },
    { value: '7fc78772db194609be7ca210', label: 'Peter' },
    { value: '6fc78772db194609be7ca210', label: 'Thomas' },
]
class HashbookAddEdit extends React.Component {

    state = {
        selectedLead: null,
        isLoading: false,
        desc: null,
        name: null,
        topic:null,
    }

    toggleModal = () => {
        this.props.closeAddEditModal()
    }

    componentDidMount = () => {
      
        if(this.props.toggleAddEditModal){
            if (this.props.data !== null) {

                    this.setState({
                  
                        topic : this.props.data.title,
                 
                    })
                
            }
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.hashbook && this.props.hashbook.hashbookAdd ){
            if(prevProps.hashbook.hashbookAdd !== this.props.hashbook.hashbookAdd){
                this.props.getHashbookList()
           
                this.toggleModal()
            }
        }
        if(this.props.hashbook && this.props.hashbook.hashbookUpdate ){
            if(prevProps.hashbook.hashbookUpdate !== this.props.hashbook.hashbookUpdate){
                this.props.getHashbookList()
              
                this.toggleModal()
            }
        }
        // if(this.props.hashbook && this.props.hashbook.hashbookSubTopicAdd ){
        //     if(prevProps.hashbook.hashbookSubTopicAdd !== this.props.hashbook.hashbookSubTopicAdd){
        //         this.props.history.push('/employee/hashbook');
        //     }
        // }

    }

    convertEmployee = data => {
        var employeeData = []
        data && data.forEach((value) => {
            employeeData.push({ "label": value.firstname + value.lastname, "value": value._id })
        })
        return employeeData
    }

 

     addHashbook(){

        if(((this.state.topic) !== null) && ((this.state.topic ) !== "")){
            let data = {
                title: this.state.topic, 
                 user_id: getLoggedInUser().id
            }
             this.props.getHashbookAdd(data)

        }
        else {
            this.props.emptyAllFields()
        }

    }

    

    updateHashbook = () => {
        if(((this.state.topic) !== null) && ((this.state.topic) !== "")){
            let data = {
                title: this.state.topic,
                id: this.props.data.id
            }
            this.props.getHashbookUpdate(data)
        }
        else {
            this.props.emptyAllFields()
        }

    }

    handleTopic = (e) => {
        this.setState({ topic: e });
    };

    render() {
        const { selectedLead, name, desc,topic } = this.state
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
                                {data !== null ? "Edit Topic" : "Add New Topic"}</ModalHeader>
                            <ModalBody>
                            {/* {this.props.employee && this.props.employee.employeelistloading && this.props.hashbook && this.props.hashbook.listloading && <LoaderWidget />} */}
                                <AvForm>
                                    <Row>
                                   
                                        <Col md={12}>
                                            <Row>
                                                <Col md="12" sm="12" lg="12">
                                                    {/* <AvField
                                                        name="dept-name"
                                                        label="Hashbook Name"
                                                        type="text"
                                                        value={name || ""}
                                                        onChange={(e) => { this.setState({ name: e.target.value }) }}
                                                        required
                                                        placeholder="Enter Hashbook Name"
                                                    /> */}
                                                    <SimpleMDEReact
                                                        id={1}
                                                        options={options}
                                                        onChange={(e) => {
                                                            this.handleTopic(e);
                                                        }}
                                                        value={ topic || ''}
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
                                    <Button color="success" onClick={() => this.updateHashbook()}>
                                        Update Hashbook
                                    </Button>
                                :
                                    <Button color="success" onClick={()=> this.addHashbook()}>
                                        Add Hashbook
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

export default HashbookAddEdit