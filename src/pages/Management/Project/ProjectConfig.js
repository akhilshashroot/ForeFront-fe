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
import ProjectDetails from "./ProjectDetails"
import ProjectAddEdit from "./ProjectAdd"
import ProjectDelete from "./ProjectDelete"
import { toast, ToastContainer, Zoom } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
// import "../../assets/scss/toastr.scss"
import { connect } from 'react-redux';
import { getProjectList, getProjectAdd, getProjectUpdate, getProjectDelete } from '../../../redux/actions';
import LoaderWidget from '../../../components/Loader';



const ProjectConfig = (props) => {
    const projectAddedSucsess = () => toast.success("Project Added Successfully", { transition: Zoom })
    const projectDeletedSuccess = () => toast.success("Project Deleted Successfully", { transition: Zoom })
    const projectUpdated = () => toast.info("Project Updated Successfully", { transition: Zoom })
    const emptyAllFields = () => toast.warning("Please Fill All Fields", { transition: Zoom })

    const history = useHistory();
    const [toggleDetailsModal, setToggleDetailsModal] = useState(false);
    const [toggleAddEditModal, setToggleAddEditModal] = useState(false);
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
    const [projectData, setProjectData] = useState(null);
    const [index, setIndex] = useState(null);
  

const handleTeamNames = (e) => {
    let teamNames = e.map((e) => e.name);
   return teamNames.toString();
}
    const columns = [
     
        {
            dataField: 'pr_id',
            text: 'SL.NO',
            headerStyle: { width: "10%" },
            headerClasses:"bg-dark text-white py-2",
            sort: true,
           
            formatter: (cell, row, rowIndex, formatExtraData) =>
                < div  style={{lineHeight: "normal",margin:0 }}>
                    <p >{rowIndex+1}</p>
                </div>
        },
        {
            dataField: 'pr_name',
            text: 'Project Name',
            headerClasses:"bg-dark text-white py-2",
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0 }}>
                    <p id="name">{row.pr_name}</p>
                
                </div>,
         
        },       
        {
            dataField: 'pr_description',
            text: 'Project Description',
            headerClasses:"bg-dark text-white py-2",
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0 }}>
                    <p id="name">{row.pr_description}</p>
                
                </div>,
         
        },       
        {
            dataField: 'pr_createdby',
            text: 'Created By',
            headerClasses:"bg-dark text-white py-2",
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0 }}>
                    <p id="name">{row.pr_createdby}</p>
                
                </div>,
         
        },       
        {
            dataField: 'pr_userids',
            text: 'Users',
            headerClasses:"bg-dark text-white py-2",
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0 }}>
                    <p id="name">{handleTeamNames(row.pr_userids)}</p>
                
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
                    <i className="uil uil-trash-alt dept-trash widget-icon bg-danger-lighten text-danger" id="delete" onClick={() => deleteProject(row, rowIndex)}></i>
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
  
        if (props.project && !props.project.project) {
            
            props.getProjectList()
         
            
        }

       
    }, [])

    const handleDetailsModal = (row) => {
        setToggleDetailsModal(true)
        setProjectData(row)
    }
    const closeDetailsModal = () => {
        setToggleDetailsModal(false)
        setProjectData(null)
    }

    const handleAddEditModal = () => {
        setToggleAddEditModal(true)
        setProjectData(null)
    }
    const closeAddEditModal = () => {
        setToggleAddEditModal(false)
        setProjectData(null)
    }

    const edit = (row, index) => {     
        setToggleAddEditModal(true)
        setProjectData(row)
        setIndex(index)
    }

    const deleteProject = (row, index) => {
        setProjectData(row)
        setToggleDeleteModal(true)
        setIndex(index)
    }

    const closeDeleteModal = () => {
        setToggleDeleteModal(false)
        setProjectData(null)
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
                                        <i className="mdi mdi-plus-circle mr-2"></i> Add New Project
                                    </Button>
                                
                            </Col>
                        </Row>
                        {props.project && props.project.listloading && <LoaderWidget />}
                        {props.project && props.project.project && props.project.project.data &&
                            <BootstrapTable
                                bootstrap4
                                keyField={"dep_id"}
                                data={props.project && props.project.project && props.project.project.data}
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
                            <ProjectDetails toggleDetailsModal={toggleDetailsModal} closeDetailsModal={closeDetailsModal}
                                data={projectData} />
                        }

                        {/* Add/Edit Modal */}
                        {toggleAddEditModal &&
                            <ProjectAddEdit toggleAddEditModal={toggleAddEditModal} closeAddEditModal={closeAddEditModal} emptyAllFields={emptyAllFields}
                                data={projectData} index={index} projectAddedSucsess={projectAddedSucsess}
                                projectUpdated={projectUpdated} getProjectAdd={props.getProjectAdd} getProjectUpdate={props.getProjectUpdate}
                                project={props.project} getProjectList={props.getProjectList}   />
                        }

                        {/* Delete Modal */}
                        {toggleDeleteModal &&
                            <ProjectDelete toggleDeleteModal={toggleDeleteModal} closeDeleteModal={closeDeleteModal} getProjectDelete={props.getProjectDelete}
                                data={projectData} records={props.project && props.project.project && props.project.project.data}
                                index={index} projectDeletedSuccess={projectDeletedSuccess} project={props.project}  getProjectList={props.getProjectList}/>
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
        project: state.Project,
       
    }
};
export default connect(
    mapStateToProps,
    { getProjectList, getProjectAdd, getProjectUpdate, getProjectDelete }
)(ProjectConfig)