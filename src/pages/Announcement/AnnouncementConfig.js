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
import AnnouncementDetails from "./AnnouncementDetails"
import AnnouncementAddEdit from "./AnnouncementAdd"
import AnnouncementDelete from "./AnnouncementDelete"
import { toast, ToastContainer, Zoom } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
// import "../../assets/scss/toastr.scss"
import { connect } from 'react-redux';
import { getAnnouncementList, getAnnouncementAdd, getAnnouncementUpdate, getAnnouncementDelete,getDepartmentList } from '../../redux/actions';
import LoaderWidget from '../../components/Loader';



const AnnouncementConfig = (props) => {
    const announcementAddedSucsess = () => toast.success("Announcement Added Successfully", { transition: Zoom })
    const announcementDeletedSuccess = () => toast.success("Announcement Deleted Successfully", { transition: Zoom })
    const announcementUpdated = () => toast.info("Announcement Updated Successfully", { transition: Zoom })
    const emptyAllFields = () => toast.warning("Please Fill All Fields", { transition: Zoom })

    const history = useHistory();
    const [toggleDetailsModal, setToggleDetailsModal] = useState(false);
    const [toggleAddEditModal, setToggleAddEditModal] = useState(false);
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
    const [announcementData, setAnnouncementData] = useState(null);
    const [index, setIndex] = useState(null);
  


    const columns = [
     
        {
            dataField: 'id',
            text: 'ID',
            headerStyle: { width: "10%" },
            headerClasses:"bg-dark text-white py-2",
            sort: true,
           
            formatter: (cell, row, rowIndex, formatExtraData) =>
                < div  style={{lineHeight: "normal",margin:0 }}>
                    <p >{row.id}</p>
                </div>
        },
        {
            dataField: 'notice',
            text: 'Notice',
            headerClasses:"bg-dark text-white py-2",
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0 }}>
                    <p  id="notice">{((row.notice).replace(/<[^>]+>/g, '')).substring(0, 100)}&hellip;</p>
                
                </div>,         
            
        },   
        {
            dataField: 'notice_date',
            text: 'Notice',
            headerClasses:"bg-dark text-white py-2",
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0 }}>
                    <p id="notice_date">{row.notice_date}</p>
                
                </div>,         
            
        },    
        {
            dataField: 'recepient',
            text: 'Recepient',
            headerClasses:"bg-dark text-white py-2",
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0 }}>
                    <p id="recepient">{row.recepient}</p>
                
                </div>,         
            
        }, 
        {
            dataField: 'user',
            text: 'User',
            headerClasses:"bg-dark text-white py-2",
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0 }}>
                    <p id="recepient">{row.user}</p>
                
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
                    <i className="uil uil-trash-alt dept-trash widget-icon bg-danger-lighten text-danger" id="delete" onClick={() => deleteAnnouncement(row, rowIndex)}></i>
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
  
        if (props.announcement && !props.announcement.announcement) {
            
            props.getAnnouncementList();  
      
         
            
        }
      

       
    }, [])

    const handleDetailsModal = (row) => {
        setToggleDetailsModal(true)
        setAnnouncementData(row)
    }
    const closeDetailsModal = () => {
        setToggleDetailsModal(false)
        setAnnouncementData(null)
    }

    const handleAddEditModal = () => {
        setToggleAddEditModal(true)
        setAnnouncementData(null)
    }
    const closeAddEditModal = () => {
        setToggleAddEditModal(false)
        setAnnouncementData(null)
    }

    const edit = (row, index) => {     
        setToggleAddEditModal(true)
        setAnnouncementData(row)
        setIndex(index)
        
    }

    const deleteAnnouncement = (row, index) => {
        setAnnouncementData(row)
        setToggleDeleteModal(true)
        setIndex(index)
    }

    const closeDeleteModal = () => {
        setToggleDeleteModal(false)
        setAnnouncementData(null)
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
                                        <i className="mdi mdi-plus-circle mr-2"></i> Add New Announcement
                                    </Button>
                                
                            </Col>
                        </Row>
                        {props.announcement && props.announcement.listloading && <LoaderWidget />}
                        {props.announcement && props.announcement.announcement && props.announcement.announcement.data &&
                            <BootstrapTable
                                bootstrap4
                                keyField={"dep_id"}
                                data={props.announcement && props.announcement.announcement && props.announcement.announcement.data}
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
                            <AnnouncementDetails toggleDetailsModal={toggleDetailsModal} closeDetailsModal={closeDetailsModal}
                                data={announcementData} />
                        }

                        {/* Add/Edit Modal */}
                        {toggleAddEditModal &&
                            <AnnouncementAddEdit toggleAddEditModal={toggleAddEditModal} closeAddEditModal={closeAddEditModal} emptyAllFields={emptyAllFields}
                                data={announcementData} index={index} announcementAddedSucsess={announcementAddedSucsess}
                                announcementUpdated={announcementUpdated} getAnnouncementAdd={props.getAnnouncementAdd} getAnnouncementUpdate={props.getAnnouncementUpdate}
                                announcement={props.announcement} getAnnouncementList={props.getAnnouncementList} getDepartmentList={props.getDepartmentList}   />
                        }

                        {/* Delete Modal */}
                        {toggleDeleteModal &&
                            <AnnouncementDelete toggleDeleteModal={toggleDeleteModal} closeDeleteModal={closeDeleteModal} getAnnouncementDelete={props.getAnnouncementDelete}
                                data={announcementData} records={props.announcement && props.announcement.announcement && props.announcement.announcement.data}
                                index={index} announcementDeletedSuccess={announcementDeletedSuccess} announcement={props.announcement}  getAnnouncementList={props.getAnnouncementList}/>
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
        announcement: state.Announcement,
        department: state.Department,
       
    }
};
export default connect(
    mapStateToProps,
    { getAnnouncementList, getAnnouncementAdd, getAnnouncementUpdate, getAnnouncementDelete,getDepartmentList }
)(AnnouncementConfig)