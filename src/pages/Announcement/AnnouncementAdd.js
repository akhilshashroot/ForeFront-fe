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
  Label,
  Input,
  FormGroup,
} from "reactstrap";
import "./style.scss";
import { AvForm, AvField } from "availity-reactstrap-validation";
// import DepImg from "../../assets/images/texa/add-announcement.png"
import Select from "react-select";
// import LoaderWidget from '../../components/Loader';
import SimpleMDEReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { connect } from "react-redux";
import {
  getDepartmentList,
  getTeamList,
  getEmployeeList,
} from "../../redux/actions";

const reciepientOptions = [
  { value: "all", label: "All" },
  { value: "team", label: "Team" },
  { value: "individual", label: "Individual" },
  { value: "department", label: "Department" },
];
const noticecolorOptions = [
  { value: "level 1", label: "Common" },
  { value: "level 2", label: "Intermediate" },
  { value: "level 3", label: "Important" },
];

const delay = 1000;
// const options = {
//     autosave: {
//         enabled: true,
//         uniqueId: 1,
//         delay,
//     },
// };

class AnnouncementAddEdit extends React.Component {
  state = {
    selectedLead: null,
    isLoading: false,
    name: null,
    desc: null,
    showtype: false,
    typehead: "",
    typevalue: "",
    type: null,
    reciepient: null,
    notice_type: null,
    announcement: null,
  };

  toggleModal = () => {
    this.props.closeAddEditModal();
  };

  componentDidMount = () => {
    if (this.props.department && !this.props.department.department) {
      this.props.getDepartmentList();
    }

    if (this.props.team && !this.props.team.team) {
      this.props.getTeamList();
    }
    if (this.props.employee && !this.props.employee.employee) {
      this.props.getEmployeeList();
    }

    if (this.props.toggleAddEditModal) {
      if (this.props.data !== null) {
        console.log(this.props.data);
        this.setState({
          announcement: this.props.data.notice,
        });
        this.UpdateReciType(
          reciepientOptions.filter(
            (option) => option.value === this.props.data.recepient
          )[0]
        );
        this.handleNoticeTypechange(
          noticecolorOptions.filter(
            (option) => option.value === this.props.data.notice_type
          )[0]
        );
        if(this.props.data.recepient!=="all"){
            this.handleTypechange(
                this.props.data.notice_user.map((e) => ({
                  label: e.name,
                  value: e.id,
                }))
              );
        }
     
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.announcement && this.props.announcement.announcementAdd) {
      if (
        prevProps.announcement.announcementAdd !==
        this.props.announcement.announcementAdd
      ) {
        this.props.getAnnouncementList();
        this.toggleModal();
      }
    }
    if (this.props.announcement && this.props.announcement.announcementUpdate) {
      if (
        prevProps.announcement.announcementUpdate !==
        this.props.announcement.announcementUpdate
      ) {
        this.props.getAnnouncementList();

        this.toggleModal();
      }
    }
  }

  selectRef = null;

  clearValue = () => {
    this.selectRef.select.clearValue();
  };

  handleTypechange = (e) => {
    console.log(e);
    this.setState({ type: e });
  };

  handleNoticeTypechange = (e) => {
    this.setState({ notice_type: e });
  };

  handleAnnouncement = (e) => {
    this.setState({ announcement: e });
  };

  addAnnouncement() {
    if (
      this.state.reciepient !== null &&
      this.state.reciepient.value === "all"
    ) {
      if (
        this.state.reciepient !== null &&
        this.state.announcement !== null &&
        this.state.notice_type !== null &&
        this.state.reciepient !== "" &&
        this.state.announcement !== "" &&
        this.state.notice_type !== ""
      ) {
        let data = {
          notice_text: this.state.announcement,
          notice_color: this.state.notice_type.value,
          notice_usertype: this.state.reciepient.value,
        };

        this.props.getAnnouncementAdd(data);
      } else {
        this.props.emptyAllFields();
      }
    } else if (
      this.state.reciepient !== null &&
      this.state.announcement !== null &&
      this.state.notice_type !== null &&
      this.state.type !== null &&
      this.state.reciepient !== "" &&
      this.state.announcement !== "" &&
      this.state.type !== "" &&
      this.state.notice_type !== ""
    ) {
      let typeid = this.state.type.map((e) => e.value);

      let data = {
        notice_text: this.state.announcement,
        notice_color: this.state.notice_type.value,
        notice_usertype: this.state.reciepient.value,
        notice_user: typeid,
      };

      this.props.getAnnouncementAdd(data);
    } else {
      this.props.emptyAllFields();
    }
  }

  updateAnnouncement = () => {
    if (
      this.state.reciepient !== null &&
      this.state.reciepient.value === "all"
    ) {
      if (
        this.state.reciepient !== null &&
        this.state.announcement !== null &&
        this.state.notice_type !== null &&
        this.state.reciepient !== "" &&
        this.state.announcement !== "" &&
        this.state.notice_type !== ""
      ) {
        let data = {
          id: this.props.data.id,
          notice_text: this.state.announcement,
          notice_color: this.state.notice_type.value,
          notice_usertype: this.state.reciepient.value,
        };

        this.props.getAnnouncementUpdate(data);
      } else {
        this.props.emptyAllFields();
      }
    } else if (
      this.state.reciepient !== null &&
      this.state.announcement !== null &&
      this.state.notice_type !== null &&
      this.state.type !== null &&
      this.state.reciepient !== "" &&
      this.state.announcement !== "" &&
      this.state.type !== "" &&
      this.state.notice_type !== ""
    ) {
      let typeid = this.state.type.map((e) => e.value);
      let data = {
        id: this.props.data.id,
        notice_text: this.state.announcement,
        notice_color: this.state.notice_type.value,
        notice_usertype: this.state.reciepient.value,
        notice_user: typeid,
      };

      this.props.getAnnouncementUpdate(data);
    } else {
      this.props.emptyAllFields();
    }
  };

  convertRecilist = (data, head) => {
    if (data !== "") {
      var Data = [];
      if (head === "Department") {
        data &&
          data.forEach((value) => {
            Data.push({ label: value.dep_name, value: value.dep_id });
          });
        return Data;
      } else if (head === "Team") {
        data &&
          data.forEach((value) => {
            Data.push({ label: value.name, value: value.team_id });
          });
        return Data;
      } else if (head === "Individual") {
        data &&
          data.forEach((value) => {
            Data.push({ label: value.fullname, value: value.id });
          });
        return Data;
      }
    }
  };

  UpdateReciType = (e) => {
    if (this.state.showtype) {
      this.clearValue();
    }

    this.setState({ reciepient: e });
    if (e.value !== "all") {
      this.setState({
        showtype: true,
        typehead: e.label,
      });
      if (e.value === "department") {
        this.setState({
          typevalue:
            this.props.department &&
            this.props.department.department &&
            this.props.department.department.data,
        });
      } else if (e.value === "team") {
        this.setState({
          typevalue:
            this.props.team &&
            this.props.team.team &&
            this.props.team.team.data,
        });
      } else if (e.value === "individual") {
        this.setState({
          typevalue:
            this.props.employee &&
            this.props.employee.employee &&
            this.props.employee.employee.data,
        });
      } else {
        this.setState({
          typevalue: "",
        });
      }
    } else {
      this.setState({
        showtype: false,
        typevalue: "",
      });
    }
  };

  render() {
    const {
      name,
      desc,
      typevalue,
      typehead,
      type,
      reciepient,
      notice_type,
      announcement,
    } = this.state;
    const { data } = this.props;

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
              <ModalHeader
                toggle={this.toggleModal}
                className="modal-colored-header bg-dark"
              >
                {data !== null ? "Edit Announcement" : "Add New Announcement"}
              </ModalHeader>
              <ModalBody>
                <AvForm>
                  <Row>
                    <Col md={6}>
                      <p className="mb-1 font-weight-bold">Reciepient</p>
                      <Select
                        label="Reciepient"
                        defaultValue={reciepient || ""}
                        className="react-select mb-3"
                        classNamePrefix="react-select"
                        options={reciepientOptions}
                        onChange={(e) => {
                          this.UpdateReciType(e);
                        }}
                      ></Select>
                    </Col>
                    <Col md={6}>
                      <p className="mb-1 font-weight-bold">Notice Type</p>
                      <Select
                        label="Notice Type"
                        defaultValue={notice_type || ""}
                        className="react-select mb-3"
                        classNamePrefix="react-select"
                        onChange={(e) => {
                          this.handleNoticeTypechange(e);
                        }}
                        options={noticecolorOptions}
                      ></Select>
                    </Col>
                    <Col
                      md={6}
                      className={this.state.showtype ? "d-block" : "d-none"}
                    >
                      <p className="mb-1 font-weight-bold">{typehead}</p>
                      <Select
                        ref={(ref) => {
                          this.selectRef = ref;
                        }}
                        isMulti={true}
                        isClearable={true}
                        value={type ? type : ""}
                        options={
                          this.state.showtype
                            ? this.convertRecilist(typevalue, typehead)
                            : ""
                        }
                        className="react-select mb-3"
                        classNamePrefix="react-select"
                        onChange={(e) => {
                          this.handleTypechange(e);
                        }}
                      ></Select>
                    </Col>

                    <Col md={12}>
                      <Row>
                        <Col md="12" sm="12" lg="12">
                          <p className="mb-1 font-weight-bold">Announcement</p>

                          <SimpleMDEReact
                            id={1}
                            // options={options}
                            onChange={(e) => {
                              this.handleAnnouncement(e);
                            }}
                            value={announcement || ""}
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
                </Button>{" "}
                {data !== null ? (
                  <Button
                    color="success"
                    onClick={() => this.updateAnnouncement()}
                  >
                    Update Announcement
                  </Button>
                ) : (
                  <Button
                    color="success"
                    onClick={() => this.addAnnouncement()}
                  >
                    Add Announcement
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
export default connect(mapStateToProps, {
  getDepartmentList,
  getTeamList,
  getEmployeeList,
})(AnnouncementAddEdit);
