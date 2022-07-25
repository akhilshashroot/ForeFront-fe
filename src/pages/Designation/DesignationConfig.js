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
import DesignationDetails from "./DesignationDetails"
import DesignationAddEdit from "./DesignationAdd"
import DesignationDelete from "./DesignationDelete"
import { toast, ToastContainer, Zoom } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
// import "../../assets/scss/toastr.scss"
import { connect } from 'react-redux';
import { getDesignationList, getDesignationAdd, getDesignationUpdate, getDesignationDelete } from '../../redux/actions';
import LoaderWidget from '../../components/Loader';

const defaultSorted = [
    {
        dataField: 'id',
        order: 'asc',
    },
];

const DesignationConfig = (props) => {
    const designationAddedSucsess = () => toast.success("Designation Added Successfully", { transition: Zoom })
    const designationDeletedSuccess = () => toast.success("Designation Deleted Successfully", { transition: Zoom })
    const designationUpdated = () => toast.info("Designation Updated Successfully", { transition: Zoom })
    const emptyAllFields = () => toast.warning("Please Fill All Fields", { transition: Zoom })

    const history = useHistory();
    const [toggleDetailsModal, setToggleDetailsModal] = useState(false);
    const [toggleAddEditModal, setToggleAddEditModal] = useState(false);
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
    const [designationData, setDesignationData] = useState(null);
    const [index, setIndex] = useState(null);
    const [tableData, setTableData] = useState([]);


    const columns = [
     
        {
            dataField: 'desg_id',
            text: 'ID',
            headerStyle: { width: "10%" },
            headerClasses:"bg-dark text-white py-2",
            sort: true,
           
            formatter: (cell, row, rowIndex, formatExtraData) =>
                < div  style={{lineHeight: "normal",margin:0 }}>
                    <p >{row.desg_id}</p>
                </div>
        },
        {
            dataField: 'designation',
            text: 'Designation Name',
            headerClasses:"bg-dark text-white py-2",
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0 }}>
                    <p id="name">{row.designation}</p>
                
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
                    <i className="uil uil-trash-alt dept-trash widget-icon bg-danger-lighten text-danger" id="delete" onClick={() => deleteDesignation(row, rowIndex)}></i>
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
  
        if (props.designation && !props.designation.designation) {
            
            props.getDesignationList()
         
            
        }

       
    }, [])

    const handleDetailsModal = (row) => {
        setToggleDetailsModal(true)
        setDesignationData(row)
    }
    const closeDetailsModal = () => {
        setToggleDetailsModal(false)
        setDesignationData(null)
    }

    const handleAddEditModal = () => {
        setToggleAddEditModal(true)
        setDesignationData(null)
    }
    const closeAddEditModal = () => {
        setToggleAddEditModal(false)
        setDesignationData(null)
    }

    const edit = (row, index) => {     
        setToggleAddEditModal(true)
        setDesignationData(row)
        setIndex(index)
    }

    const deleteDesignation = (row, index) => {
        setDesignationData(row)
        setToggleDeleteModal(true)
        setIndex(index)
    }

    const closeDeleteModal = () => {
        setToggleDeleteModal(false)
        setDesignationData(null)
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
                                        <i className="mdi mdi-plus-circle mr-2"></i> Add New Designation
                                    </Button>
                                
                            </Col>
                        </Row>
                        {props.designation && props.designation.listloading && <LoaderWidget />}
                        {props.designation && props.designation.designation && props.designation.designation.data &&
                            <BootstrapTable
                                bootstrap4
                                keyField={"desg_id"}
                                data={props.designation && props.designation.designation && props.designation.designation.data}
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
                            <DesignationDetails toggleDetailsModal={toggleDetailsModal} closeDetailsModal={closeDetailsModal}
                                data={designationData} />
                        }

                        {/* Add/Edit Modal */}
                        {toggleAddEditModal &&
                            <DesignationAddEdit toggleAddEditModal={toggleAddEditModal} closeAddEditModal={closeAddEditModal} emptyAllFields={emptyAllFields}
                                data={designationData} index={index} designationAddedSucsess={designationAddedSucsess}
                                designationUpdated={designationUpdated} getDesignationAdd={props.getDesignationAdd} getDesignationUpdate={props.getDesignationUpdate}
                                designation={props.designation} getDesignationList={props.getDesignationList}   />
                        }

                        {/* Delete Modal */}
                        {toggleDeleteModal &&
                            <DesignationDelete toggleDeleteModal={toggleDeleteModal} closeDeleteModal={closeDeleteModal} getDesignationDelete={props.getDesignationDelete}
                                data={designationData} records={props.designation && props.designation.designation && props.designation.designation.data}
                                index={index} designationDeletedSuccess={designationDeletedSuccess} designation={props.designation} getDesignationList={props.getDesignationList} />
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
        designation: state.Designation,
       
    }
};
export default connect(
    mapStateToProps,
    { getDesignationList, getDesignationAdd, getDesignationUpdate, getDesignationDelete }
)(DesignationConfig)