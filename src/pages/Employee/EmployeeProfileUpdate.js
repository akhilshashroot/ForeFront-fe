import React, { Component } from "react";
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
  CustomInput,
  Input,
} from "reactstrap";
import "./style.scss";
import { AvForm, AvField } from "availity-reactstrap-validation";
// import DepImg from "../../assets/images/texa/add-employee.png"
import Select from "react-select";
// import LoaderWidget from '../../components/Loader';
import { connect } from "react-redux";
import { getDesignationList } from "../../redux/designation/actions";
import { getTeamList } from "../../redux/team/actions";
import { getDepartmentList } from "../../redux/department/actions";
import defaultavatar from "../../assets/images/avatar-blue.png";
import { API_BASE_URL } from '../../services/hostSetting';
const baseUrl = API_BASE_URL;


const leads = [
  { value: "5fc78772db194609be7ca210", label: "Magmina" },
  { value: "7fc78772db194609be7ca210", label: "Peter" },
  { value: "6fc78772db194609be7ca210", label: "Thomas" },
];

let designationOptions = [];
let teamOptions = [];
let departmentOptions = [];
class EmployeeProfileUpdate extends React.Component {
  state = {
    selectedLead: null,
    isLoading: false,
    profileImage: "",
    ImageFile:[],
  };

  toggleModal = () => {
    this.props.closeImageModal();
  };

  componentDidMount = () => {
    this.props.getDesignationList();
    this.props.getTeamList();
    this.props.getDepartmentList();

    if (this.props.toggleImageModal) {
      if (this.props.data !== null) {
     
        this.setState({
            profileImage: this.props.data.img,
        });
      
      }
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.employee && this.props.employee.employeeProfileAdd) {
      if (prevProps.employee.employeeProfileAdd !== this.props.employee.employeeProfileAdd) {
        this.props.getEmployeeList();

        this.toggleModal();
      }
    }
  
    if (
      this.props.designation &&
      this.props.designation.designation &&
      this.props.designation.designation.data
    ) {
      designationOptions = this.props.designation.designation.data.map(
        (item) => ({ value: item.desg_id, label: item.designation })
      );
    }
    if (this.props.team && this.props.team.team && this.props.team.team.data) {
      teamOptions = this.props.team.team.data.map((item) => ({
        value: item.team_id,
        label: item.name,
      }));
    }
    if (
      this.props.department &&
      this.props.department.department &&
      this.props.department.department.data
    ) {
      departmentOptions = this.props.department.department.data.map((item) => ({
        value: item.dep_id,
        label: item.dep_name,
      }));
    }
  }

  convertEmployee = (data) => {
    var employeeData = [];
    data &&
      data.forEach((value) => {
        employeeData.push({
          label: value.firstname + value.lastname,
          value: value._id,
        });
      });
    return employeeData;
  };

  updateEmployee = () => {
    if (this.state.ImageFile) {

  let formData = new FormData();
    formData.append('image', this.state.ImageFile);
    formData.append('id', this.props.data.id);
      this.props.getEmployeeProfileAdd(formData);
    } else {
      this.props.emptyAllFields();
    }
  };


  render() {
      
console.log(this.props);
    const {
     
      profileImage,ImageFile
    } = this.state;
    const { data } = this.props;
    const handleImageChange = (e) => {
        this.setState({ImageFile: e.target.files[0]})
        this.setState({profileImage: URL.createObjectURL(e.target.files[0])})
     
      };
      
    return (
      <React.Fragment>
        <Card className="dept-details-card">
          <CardBody>
            <Modal
              isOpen={this.props.toggleImageModal}
              toggle={this.toggleModal}
              className="modal-dialog-centered"
              size="lg"
            >
              <ModalHeader
                toggle={this.toggleModal}
                className="modal-colored-header bg-dark"
              >
                {data !== null ? "Edit Employee" : "Add New Employee"}
              </ModalHeader>
              <ModalBody>
                  <Col md={12} className="text-center">
                    <label
                      htmlFor="photo-upload"
                      className="custom-file-upload fas "
                    >
                      <div className="img-wrap img-upload position-relative">
                        <div className="avatar-lg rounded-circle hoverupload bg-danger">
                                         <i className="text-white h1 uil-cloud-upload"></i>
                                       </div>
                        <img
                          style={{ objectFit: "cover" }}
                          className="img-thumbnail avatar-xl rounded-circle"
                          htmlFor="photo-upload"
                          src={profileImage|| defaultavatar}
                        />
                      </div>
                      <input
                        id="photo-upload"
                        type="file"
                        onChange={(e) => handleImageChange(e)}
                      />
                    </label>
                  </Col>
                </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={this.toggleModal}>
                  Cancel
                </Button>{" "}
                <Button color="success" onClick={() => this.updateEmployee()}>
                    Update Profile Photo
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
    designation: state.Designation,
    team: state.Team,
    department: state.Department,
  };
};

export default connect(mapStateToProps, {
  getDesignationList,
  getTeamList,
  getDepartmentList,
})(EmployeeProfileUpdate);
