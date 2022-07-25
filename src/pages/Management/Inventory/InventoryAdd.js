import React, { Component } from 'react';
import {
    Row,
    Col,
    Card,
    CardBody,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import './style.scss';
import { AvForm, AvField } from 'availity-reactstrap-validation';
// import DepImg from "../../assets/images/texa/add-inventory.png"
import Select from 'react-select';
// import LoaderWidget from '../../components/Loader';
import { connect } from 'react-redux';
import { getDepartmentList, getTeamList, getEmployeeList } from '../../../redux/actions';
import FileUploader from '../../../components/FileUploader';

const inventoryOptions = [
    { value: '1', label: 'Laptop' },
    { value: '2', label: 'Desktop' },
    { value: '3', label: 'Keyboard' },
    { value: '4', label: 'Mouse' },
    { value: '5', label: 'Miscellenaeos' },
];
class InventoryAddEdit extends React.Component {
    state = {
        selectedLead: null,
        isLoading: false,
        name: null,
        desc: null,
        hashid: null,
        brand: null,
        specification: null,
        inv_number: null,
        team: null,
        file: [],
    };

    toggleModal = () => {
        this.props.closeAddEditModal();
    };

    componentDidMount = () => {
        if (this.props.toggleAddEditModal) {
            if (this.props.data !== null) {
                this.setState({
                    name: this.props.data.dep_name,
                });
            }
        }

        if (this.props.team && !this.props.team.team) {
            this.props.getTeamList();
        }
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.props.inventory && this.props.inventory.inventoryAdd) {
            if (prevProps.inventory.inventoryAdd !== this.props.inventory.inventoryAdd) {
                this.props.getInventoryList();

                this.toggleModal();
            }
        }
        if (this.props.inventory && this.props.inventory.inventoryUpdate) {
            if (prevProps.inventory.inventoryUpdate !== this.props.inventory.inventoryUpdate) {
                this.props.getInventoryList();

                this.toggleModal();
            }
        }
    }

    convertEmployee = (data) => {
        var employeeData = [];
        data &&
            data.forEach((value) => {
                employeeData.push({ label: value.firstname + value.lastname, value: value._id });
            });
        return employeeData;
    };

    addInventory() {
       
        if (this.state.inv_number !== null && 
            this.state.hashid !== null &&
            this.state.brand !== null &&
            this.state.specification !== null &&
            this.state.team !== null &&
            this.state.file !== null &&
            this.state.inv_number !== '' && 
            this.state.hashid !== '' &&
            this.state.brand !== '' &&
            this.state.specification !== '' &&
            this.state.team !== '' &&
            this.state.file !== '' 
           
            ) {
                const formData = new FormData();
                formData.append('select_inv_item', this.state.inv_number);
                formData.append('serialno', this.state.hashid);
                formData.append('brandname', this.state.brand);
                formData.append('item_spec', this.state.specification);
                formData.append('select_team2', this.state.team);
                if(this.state.file.length > 0){
                    for (let i = 0; i < this.state.file.length; i++) {
                        formData.append("invoice", this.state.file[i]);
                    }
                }
            // let data = {
            //     select_inv_item: this.state.inv_number,
            //     serialno:this.state.hashid,
            //     brandname: this.state.brand,
            //     item_spec:this.state.specification,
            //     select_team2: this.state.team,
            //     invoice:this.state.file,
            // };
            console.log(formData);
            this.props.getInventoryAdd(formData);
        } else {
            this.props.emptyAllFields();
        }
    }

    updateInventory = () => {
        if (this.state.name !== null && this.state.name !== '') {
            let data = {
                dep_name: this.state.name,
                dep_id: this.props.data.dep_id,
            };
            this.props.getInventoryUpdate(data);
        } else {
            this.props.emptyAllFields();
        }
    };

    UpdateInvtype=(e)=>{
        this.setState({ inv_number : e.value });
    }
    UpdateTeam=(e)=>{
        this.setState({ team : e.value });
    }

    convertRecilist = (data) => {
        var Data = [];

        data &&
            data.forEach((value) => {
                Data.push({ label: value.name, value: value.team_id });
            });
        return Data;
    };

    render() {
        const { selectedLead, name, desc } = this.state;
        const { data } = this.props;
        return (
            <React.Fragment>
                <Card className="dept-details-card">
                    <CardBody>
                        <Modal
                            isOpen={this.props.toggleAddEditModal}
                            toggle={this.toggleModal}
                            className="modal-dialog-centered"
                            size="lg">
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">
                                {data !== null ? 'Edit Inventory' : 'Add New Inventory'}
                            </ModalHeader>
                            <ModalBody>
                                {/* {this.props.employee && this.props.employee.employeelistloading && this.props.inventory && this.props.inventory.listloading && <LoaderWidget />} */}
                                <AvForm>
                                    <Row>
                                        <Col md={12}>
                                            <Row>
                                                <Col md={6}>
                                                    <p className="text-dark" style={{ marginBottom: '10px' }}>
                                                        Inventory Type
                                                    </p>
                                                    <Select
                                                        label="Inventory Type"
                                                        className="react-select mb-3"
                                                        classNamePrefix="react-select"
                                                        required
                                                        onChange={(e) => { this.UpdateInvtype(e) }}   
                                                        options={inventoryOptions}></Select>
                                                </Col>
                                                <Col md={6}>
                                                    <AvField
                                                        name="hashID"
                                                        label="Hashroot ID"
                                                        type="text"
                                                        onChange={(e) => {
                                                            this.setState({ hashid: e.target.value });
                                                        }}
                                                        required
                                                        placeholder="Enter Hashroot ID"
                                                    />
                                                </Col>

                                                <Col md={6}>
                                                    <AvField
                                                        name="brand"
                                                        label="Brand Name"
                                                        onChange={(e) => {
                                                            this.setState({ brand: e.target.value });
                                                        }}
                                                        type="text"
                                                        required
                                                        placeholder="Enter Brand Name"
                                                    />
                                                </Col>
                                                <Col md={6}>
                                                    <p className="text-dark" style={{ marginBottom: '10px' }}>
                                                        Team
                                                    </p>
                                                    <Select
                                                        label="Inventory Type"
                                                        className="react-select mb-3"
                                                        classNamePrefix="react-select"
                                                        onChange={(e) => { this.UpdateTeam(e) }}  ired
                                                        options={this.convertRecilist(
                                                            this.props.team &&
                                                                this.props.team.team &&
                                                                this.props.team.team.data
                                                        )}></Select>
                                                </Col>
                                                <Col md={12}>
                                                    <FormGroup>
                                                        <Label for="exampleText">Specification</Label>
                                                        <Input type="textarea" name="text" id="exampleText" rows="5"              onChange={(e) => { this.setState({ specification: e.target.value }) }} />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={12}>
                                                    <Label for="fileuploader">Upload Invoice</Label>
                                                    <FileUploader
                                                        id="fileuploader"
                                                        onFileUpload={(files) => {
                                                            this.setState({file:files})
                                                            console.log(files);
                                                        }}
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
                                {data !== null ? (
                                    <Button color="success" onClick={() => this.updateInventory()}>
                                        Update Inventory
                                    </Button>
                                ) : (
                                    <Button color="success" onClick={() => this.addInventory()}>
                                        Add Inventory
                                    </Button>
                                )}
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
        department: state.Department,
        team: state.Team,
        employee: state.Employee,
    };
};
export default connect(mapStateToProps, { getDepartmentList, getTeamList, getEmployeeList })(InventoryAddEdit);
