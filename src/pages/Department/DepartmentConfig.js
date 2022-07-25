import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import {
    Row,
    Col,
    Card,
    CardBody,
    Form,
    FormGroup,
    Input,
    Button,
    UncontrolledTooltip
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import DepartmentDetails from "./DepartmentDetails"
import DepartmentAddEdit from "./DepartmentAdd"
import DepartmentDelete from "./DepartmentDelete"
import { toast, ToastContainer, Zoom } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
// import "../../assets/scss/toastr.scss"
import { connect } from 'react-redux';
import { getDepartmentList, getDepartmentAdd, getDepartmentUpdate, getDepartmentDelete } from '../../redux/actions';
import LoaderWidget from '../../components/Loader';



const DepartmentConfig = (props) => {
    const departmentAddedSucsess = () => toast.success("Department Added Successfully", { transition: Zoom })
    const departmentDeletedSuccess = () => toast.success("Department Deleted Successfully", { transition: Zoom })
    const departmentUpdated = () => toast.info("Department Updated Successfully", { transition: Zoom })
    const emptyAllFields = () => toast.warning("Please Fill All Fields", { transition: Zoom })

    const history = useHistory();
    const [toggleDetailsModal, setToggleDetailsModal] = useState(false);
    const [toggleAddEditModal, setToggleAddEditModal] = useState(false);
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
    const [departmentData, setDepartmentData] = useState(null);
    const [index, setIndex] = useState(null);
  


    const columns = [
     
        {
            dataField: 'dep_id',
            text: 'ID',
            headerStyle: { width: "10%" },
            headerClasses:"bg-dark text-white py-2",
            sort: true,
           
            formatter: (cell, row, rowIndex, formatExtraData) =>
                < div  style={{lineHeight: "normal",margin:0 }}>
                    <p >{row.dep_id}</p>
                </div>
        },
        {
            dataField: 'dep_name',
            text: 'Department Name',
            headerClasses:"bg-dark text-white py-2",
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0 }}>
                    <p id="name">{row.dep_name}</p>
                
                </div>,
         
            
        },       
        
        {
            dataField: 'actions',
            text: 'Actions',
            headerStyle: { width: "20%" },
            headerClasses:"bg-dark text-white py-2",
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0,cursor:"pointer" }}>

                    <i className="uil uil-edit widget-icon mr-2" id="edit" onClick={() => edit(row, rowIndex)}></i>
                    <i className="uil uil-trash-alt dept-trash widget-icon bg-danger-lighten text-danger" id="delete" onClick={() => deleteDepartment(row, rowIndex)}></i>
                    <UncontrolledTooltip placement="top" target="edit">
                        Edit
                    </UncontrolledTooltip>
                    <UncontrolledTooltip placement="top" target="delete">
                        Delete
                    </UncontrolledTooltip>
                </div>
        }
    ];

    useEffect(() => {
  
        if (props.department && !props.department.department) {
            
            props.getDepartmentList()
         
            
        }

       
    }, [])

    const handleDetailsModal = (row) => {
        setToggleDetailsModal(true)
        setDepartmentData(row)
    }
    const closeDetailsModal = () => {
        setToggleDetailsModal(false)
        setDepartmentData(null)
    }

    const handleAddEditModal = () => {
        setToggleAddEditModal(true)
        setDepartmentData(null)
    }
    const closeAddEditModal = () => {
        setToggleAddEditModal(false)
        setDepartmentData(null)
    }

    const edit = (row, index) => {     
        setToggleAddEditModal(true)
        setDepartmentData(row)
        setIndex(index)
    }

    const deleteDepartment = (row, index) => {
        setDepartmentData(row)
        setToggleDeleteModal(true)
        setIndex(index)
    }

    const closeDeleteModal = () => {
        setToggleDeleteModal(false)
        setDepartmentData(null)
        setIndex(null)
    }

    return (
        <>
            <Card>
                <CardBody>
                    <React.Fragment>
                        <Row>
                            <Col className="text-right mb-1">
                            <Button color="danger" className="mb-2" onClick={() => handleAddEditModal()}>
                                        <i className="mdi mdi-plus-circle mr-2"></i> Add New Department
                                    </Button>
                                
                            </Col>
                        </Row>
                        {props.department && props.department.listloading && <LoaderWidget />}
                        {props.department && props.department.department && props.department.department.data &&
                            <BootstrapTable
                                bootstrap4
                                keyField={"dep_id"}
                                data={props.department && props.department.department && props.department.department.data}
                                columns={columns}
                                pagination={paginationFactory({ sizePerPage: 10 })}
                                wrapperClasses="table-responsive"
                                                        
                                hover
                                condensed
                                noDataIndication={() => "There are no records to display"}
                            />                        
                        }

                        {/* Details Modal */}
                        {toggleDetailsModal &&
                            <DepartmentDetails toggleDetailsModal={toggleDetailsModal} closeDetailsModal={closeDetailsModal}
                                data={departmentData} />
                        }

                        {/* Add/Edit Modal */}
                        {toggleAddEditModal &&
                            <DepartmentAddEdit toggleAddEditModal={toggleAddEditModal} closeAddEditModal={closeAddEditModal} emptyAllFields={emptyAllFields}
                                data={departmentData} index={index} departmentAddedSucsess={departmentAddedSucsess}
                                departmentUpdated={departmentUpdated} getDepartmentAdd={props.getDepartmentAdd} getDepartmentUpdate={props.getDepartmentUpdate}
                                department={props.department} getDepartmentList={props.getDepartmentList}   />
                        }

                        {/* Delete Modal */}
                        {toggleDeleteModal &&
                            <DepartmentDelete toggleDeleteModal={toggleDeleteModal} closeDeleteModal={closeDeleteModal} getDepartmentDelete={props.getDepartmentDelete}
                                data={departmentData} records={props.department && props.department.department && props.department.department.data}
                                index={index} departmentDeletedSuccess={departmentDeletedSuccess} department={props.department}  getDepartmentList={props.getDepartmentList}/>
                        }
                    </React.Fragment>
                </CardBody>
            </Card>
            <ToastContainer />
        </>
    )
}
const mapStateToProps = state => {

    return {
        department: state.Department,
       
    }
};
export default connect(
    mapStateToProps,
    { getDepartmentList, getDepartmentAdd, getDepartmentUpdate, getDepartmentDelete }
)(DepartmentConfig)