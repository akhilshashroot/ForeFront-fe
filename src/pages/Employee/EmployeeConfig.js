import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Button,
  UncontrolledTooltip,
  Label,
  CustomInput,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  ColumnToggle,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import EmployeeDetails from "./EmployeeDetails";
import EmployeeAddEdit from "./EmployeeAdd";
import EmployeeDelete from "./EmployeeDelete";
import EmployeeSkill from "./EmployeeSkill";
import EmployeeProfileUpdate from "./EmployeeProfileUpdate";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultavatar from "../../assets/images/avatar-blue.png";
// import "../../assets/scss/toastr.scss"
import { connect } from "react-redux";
import {
  getEmployeeList,
  getEmployeeAdd,
  getEmployeeUpdate,
  getEmployeeDelete,
  getResignedEmployeeList,
  getEmployeeProfileAdd,
  getDepartmentList,
  getTeamList,
  getDesignationList,
  getEmployeeLogin,
} from "../../redux/actions";
import LoaderWidget from "../../components/Loader";
import { API_BASE_URL } from "../../services/hostSetting";
import "./styles.css";

const { ToggleList } = ColumnToggle;
//Search Table
const { SearchBar } = Search;
const baseUrl = API_BASE_URL;

const EmployeeConfig = (props) => {
  const employeeAddedSucsess = () =>
    toast.success("Employee Added Successfully", { transition: Zoom });
  const employeeDeletedSuccess = () =>
    toast.success("Employee Deleted Successfully", { transition: Zoom });
  const employeeUpdated = () =>
    toast.info("Employee Updated Successfully", { transition: Zoom });
  const emptyAllFields = () =>
    toast.warning("Please Fill All Fields", { transition: Zoom });

  const history = useHistory();
  const [toggleDetailsModal, setToggleDetailsModal] = useState(false);
  const [toggleAddEditModal, setToggleAddEditModal] = useState(false);
  const [toggleImageModal, setToggleImageModal] = useState(false);
  const [toggleSkillImporovementModal, settoggleSkillImporovementModal] =
    useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [index, setIndex] = useState(null);
  const [data, setData] = useState([]);
  const [resignedEmployee, setresignedEmployee] = useState(false);
  const [modal, setmodal] = useState(false);
  const [profileimage, setprofileimage] = useState(null);
  const [profileimage1, setprofileimage1] = useState(null);
  const [id, setId] = useState(null);

  const columns = [
    {
      dataField: "id",
      text: "EMP_ID",
      headerStyle: { width: "10%" },
      headerClasses: "bg-dark text-white py-2",
      sort: true,

      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div key={row.id} style={{ lineHeight: "normal", margin: 0 }}>
          <p>{row.emp_id}</p>
        </div>
      ),
    },
    {
      dataField: "fullname",
      text: "Fullname",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        // <div>
        //   <p>{row.fullname}</p>
        // </div>
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <div
            id="name"
            className="d-flex jsutify-content-start align-items-center w-100"
          >
            <div
              onClick={() => handleImageModal(row)}
              className="rounded-circle mr-2"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                backgroundImage: `url(${row.img ? row.img : defaultavatar})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <p className="mb-0">
              <b>{row.fullname}</b>
            </p>{" "}
          </div>
        </div>
      ),
    },
    {
      dataField: "designation",
      text: "Designation",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>
          <p>{row.designation}</p>
        </div>
      ),
    },

    {
      dataField: "team",
      text: "Team",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>
          <p>{row.team}</p>
        </div>
      ),
    },
    {
      dataField: "department",
      text: "Dept",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>
          <p>{row.department}</p>
        </div>
      ),
    },
    {
      dataField: "LOP",
      text: "LOP",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>
          <p>{row.LOP}</p>
        </div>
      ),
    },
    {
      dataField: "WFH",
      text: "WFH",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>
          <p>{row.WFH}</p>
        </div>
      ),
    },
    {
      dataField: "SWAP",
      text: "SW",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>
          <p>{row.SWAP}</p>
        </div>
      ),
    },
    {
      dataField: "date_of_join",
      text: "DOJ",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>
          <p>{row.date_of_join}</p>
        </div>
      ),
    },

    {
      dataField: "date_of_exit",
      text: "Date Of Exit",
      hidden: resignedEmployee ? false : true,
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>
          <p>{row.date_of_exit}</p>
        </div>
      ),
    },

    {
      dataField: "loginas",
      text: "Login as Employee",
      headerClasses: "bg-dark text-white py-2",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>
          <Button
            color="white"
            className="btn-outline-success btn"
            onClick={() => handleLoginas(row)}
          >
            <i className=" uil-power mr-2"></i>
            Login
          </Button>
        </div>
      ),
    },

    {
      dataField: "actions",
      text: "Actions",
      headerClasses: "bg-dark text-white py-2",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div
          style={{
            lineHeight: "normal",
            margin: 0,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          <i
            className="uil uil-star widget-icon mr-2"
            id="skill"
            onClick={() => skillImprovement(row, rowIndex)}
          ></i>
          <Link
            className="uil uil-clock-five widget-icon mr-2"
            id="performance"
            to={`/admin/employee/performance/${row.id}`}
          ></Link>
          <i
            className="uil uil-edit widget-icon mr-2 bg-success-lighten text-success"
            id="edit"
            onClick={() => edit(row, rowIndex)}
          ></i>
          <i
            className="uil uil-trash-alt  widget-icon bg-danger-lighten text-danger"
            id="delete"
            onClick={() => deleteEmployee(row, rowIndex)}
          ></i>
          <UncontrolledTooltip placement="top" target="performance">
            Performance
          </UncontrolledTooltip>
          <UncontrolledTooltip placement="top" target="skill">
            Skill Imporovement
          </UncontrolledTooltip>
          <UncontrolledTooltip placement="top" target="edit">
            Edit
          </UncontrolledTooltip>
          <UncontrolledTooltip placement="top" target="delete">
            Delete
          </UncontrolledTooltip>
        </div>
      ),
    },
  ];

  const handleLoginas = (row) => {
    let data = { email: row.email };
    props.getEmployeeLogin(data);
  };

  useEffect(() => {
    if (props.employee && !props.employee.employee) {
      if (resignedEmployee == false) {
        props.getEmployeeList();
      }
    }
    if (props.department && !props.department.department) {
      props.getDepartmentList();
    }
    if (props.team && !props.team.team) {
      props.getTeamList();
    }
    if (props.designation && !props.designation.designation) {
      props.getDesignationList();
    }
    if (
      props.employee &&
      props.employee.employee &&
      props.employee.employee.data
    ) {
      setData(props.employee.employee.data);
    }
  }, [
    props.employee && props.employee.employee && props.employee.employee.data,
  ]);

  const handleDetailsModal = (row) => {
    setToggleDetailsModal(true);
    setEmployeeData(row);
  };
  const closeDetailsModal = () => {
    setToggleDetailsModal(false);
    setEmployeeData(null);
  };

  const handleAddEditModal = () => {
    setToggleAddEditModal(true);
    setEmployeeData(null);
  };
  const handleImageModal = (row) => {
    setToggleImageModal(true);
    setEmployeeData(row);
    setIndex(index);
  };
  const closeAddEditModal = () => {
    setToggleAddEditModal(false);
    setEmployeeData(null);
  };
  const closeImageModal = () => {
    setToggleImageModal(false);
    setEmployeeData(null);
  };

  const edit = (row, index) => {
    setToggleAddEditModal(true);
    setEmployeeData(row);
    setIndex(index);
  };

  const skillImprovement = (row, index) => {
    settoggleSkillImporovementModal(true);
    setEmployeeData(row);
    setIndex(index);
  };

  const closeSkillImporovementModal = () => {
    settoggleSkillImporovementModal(false);
  };

  const deleteEmployee = (row, index) => {
    setEmployeeData(row);
    setToggleDeleteModal(true);
    setIndex(index);
  };

  const closeDeleteModal = () => {
    setToggleDeleteModal(false);
    setEmployeeData(null);
    setIndex(null);
  };

  const resignedEmployeeStatusChange = (e) => {
    if (e.target.checked == true) {
      setresignedEmployee(true);
      props.getResignedEmployeeList();
    } else if (e.target.checked == false) {
      setresignedEmployee(false);
      props.getEmployeeList();
    }
  };

  const pofileUploadImageModel = (img, id) => {
    setmodal(!modal);
    setprofileimage(img);
    setprofileimage1(img);
    setId(id);
  };

  const UploadImage = () => {
    let imageData = {
      id: id,
      img: profileimage,
    };
    props.getEmployeeProfileAdd(imageData);
  };

  return (
    <>
      <Card>
        <CardBody>
          <React.Fragment>
            <Row>
              <Col className="d-flex justify-content-between mb-1">
                <CustomInput
                  type="checkbox"
                  id="exampleCustomCheckbox"
                  label="Show Resigned Employees"
                  onChange={resignedEmployeeStatusChange}
                  checked={resignedEmployee}
                />

                <Button
                  color="danger"
                  className="mb-2"
                  onClick={() => handleAddEditModal()}
                >
                  <i className="mdi mdi-plus-circle mr-2"></i> Add New Employee
                </Button>
              </Col>
            </Row>
            {props.employee && props.employee.listloading && <LoaderWidget />}
            {
              props.employee &&
                props.employee.employee &&
                props.employee.employee.data && (
                  <ToolkitProvider
                    bootstrap4
                    keyField="id"
                    data={data}
                    columns={columns}
                    search
                    columnToggle
                  >
                    {(props) => (
                      <React.Fragment>
                        <Row>
                          <Col
                            md={4}
                            className="d-flex justify-content-start flex-column"
                          >
                            <Label for="Search">Search</Label>
                            <SearchBar id="Search" {...props.searchProps} />
                          </Col>
                        </Row>

                        <BootstrapTable
                          //  keyField={"desg_id"}
                          {...props.baseProps}
                          bordered={false}
                          pagination={paginationFactory({ sizePerPage: 10 })}
                          wrapperClasses="table-responsive"
                        />
                      </React.Fragment>
                    )}
                  </ToolkitProvider>
                )
              // <BootstrapTable
              //     bootstrap4
              //     keyField={"dep_id"}
              //     data={props.employee && props.employee.employee && props.employee.employee.data}
              //     columns={columns}
              //     pagination={paginationFactory({ sizePerPage: 10 })}
              //     wrapperClasses="table-responsive"

              //     hover
              //     condensed
              //     noDataIndication={() => "There are no records to display"}
              // />
            }

            {/* Details Modal */}
            {toggleDetailsModal && (
              <EmployeeDetails
                toggleDetailsModal={toggleDetailsModal}
                closeDetailsModal={closeDetailsModal}
                data={employeeData}
              />
            )}

            {/* Add/Edit Modal */}
            {toggleAddEditModal && (
              <EmployeeAddEdit
                toggleAddEditModal={toggleAddEditModal}
                closeAddEditModal={closeAddEditModal}
                emptyAllFields={emptyAllFields}
                data={employeeData}
                department={props.department && props.department.department}
                team={props.team && props.team.team}
                designation={props.designation && props.designation.designation}
                index={index}
                employeeAddedSucsess={employeeAddedSucsess}
                employeeUpdated={employeeUpdated}
                getEmployeeAdd={props.getEmployeeAdd}
                getEmployeeUpdate={props.getEmployeeUpdate}
                employee={props.employee}
                getEmployeeList={props.getEmployeeList}
              />
            )}
            {/* Image Modal */}
            {toggleImageModal && (
              <EmployeeProfileUpdate
                toggleImageModal={toggleImageModal}
                closeImageModal={closeImageModal}
                emptyAllFields={emptyAllFields}
                data={employeeData}
                index={index}
                employeeAddedSucsess={employeeAddedSucsess}
                employeeUpdated={employeeUpdated}
                getEmployeeProfileAdd={props.getEmployeeProfileAdd}
                getEmployeeUpdate={props.getEmployeeUpdate}
                employee={props.employee}
                getEmployeeList={props.getEmployeeList}
              />
            )}

            {/* Delete Modal */}
            {toggleDeleteModal && (
              <EmployeeDelete
                toggleDeleteModal={toggleDeleteModal}
                closeDeleteModal={closeDeleteModal}
                getEmployeeDelete={props.getEmployeeDelete}
                data={employeeData}
                records={
                  props.employee &&
                  props.employee.employee &&
                  props.employee.employee.data
                }
                index={index}
                employeeDeletedSuccess={employeeDeletedSuccess}
                employee={props.employee}
                getEmployeeList={props.getEmployeeList}
              />
            )}

            {toggleSkillImporovementModal && (
              <EmployeeSkill
                toggleSkillImporovementModal={toggleSkillImporovementModal}
                closeSkillImporovementModal={closeSkillImporovementModal}
                data={employeeData}
              />
            )}
          </React.Fragment>
        </CardBody>
      </Card>
      <ToastContainer />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    employee: state.Employee,
    department: state.Department,
    designation: state.Designation,
    team: state.Team,
  };
};
export default connect(mapStateToProps, {
  getEmployeeList,
  getEmployeeAdd,
  getEmployeeUpdate,
  getEmployeeDelete,
  getResignedEmployeeList,
  getEmployeeProfileAdd,
  getDepartmentList,
  getTeamList,
  getDesignationList,
  getEmployeeLogin,
})(EmployeeConfig);
