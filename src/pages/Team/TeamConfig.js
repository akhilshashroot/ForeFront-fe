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
import TeamDetails from "./TeamDetails"
import TeamAddEdit from "./TeamAdd"
import TeamDelete from "./TeamDelete"
import { toast, ToastContainer, Zoom } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
// import "../../assets/scss/toastr.scss"
import { connect } from 'react-redux';
import { getTeamList, getTeamAdd, getTeamUpdate, getTeamDelete } from '../../redux/actions';
import LoaderWidget from '../../components/Loader';

const defaultSorted = [
    {
        dataField: 'id',
        order: 'asc',
    },
];

const TeamConfig = (props) => {
    const teamAddedSucsess = () => toast.success("Team Added Successfully", { transition: Zoom })
    const teamDeletedSuccess = () => toast.success("Team Deleted Successfully", { transition: Zoom })
    const teamUpdated = () => toast.info("Team Updated Successfully", { transition: Zoom })
    const emptyAllFields = () => toast.warning("Please Fill All Fields", { transition: Zoom })

    const history = useHistory();
    const [toggleDetailsModal, setToggleDetailsModal] = useState(false);
    const [toggleAddEditModal, setToggleAddEditModal] = useState(false);
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
    const [teamData, setTeamData] = useState(null);
    const [index, setIndex] = useState(null);
    const [tableData, setTableData] = useState([]);


    const columns = [
     
        {
            dataField: 'team_id',
            text: 'ID',
            headerStyle: { width: "10%" },
            headerClasses:"bg-dark text-white py-2",
            sort: true,
           
            formatter: (cell, row, rowIndex, formatExtraData) =>
                < div  style={{lineHeight: "normal",margin:0 }}>
                    <p >{row.team_id}</p>
                </div>
        },
        {
            dataField: 'name',
            text: 'Team Name',
            headerClasses:"bg-dark text-white py-2",
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0 }}>
                    <p id="name">{row.name}</p>
                
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
                    <i className="uil uil-trash-alt dept-trash widget-icon bg-danger-lighten text-danger" id="delete" onClick={() => deleteTeam(row, rowIndex)}></i>
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
  
        if (props.team && !props.team.team) {
            
            props.getTeamList()
         
            
        }

       
    }, [])

    const handleDetailsModal = (row) => {
        setToggleDetailsModal(true)
        setTeamData(row)
    }
    const closeDetailsModal = () => {
        setToggleDetailsModal(false)
        setTeamData(null)
    }

    const handleAddEditModal = () => {
        setToggleAddEditModal(true)
        setTeamData(null)
    }
    const closeAddEditModal = () => {
        setToggleAddEditModal(false)
        setTeamData(null)
    }

    const edit = (row, index) => {     
        setToggleAddEditModal(true)
        setTeamData(row)
        setIndex(index)
    }

    const deleteTeam = (row, index) => {
        setTeamData(row)
        setToggleDeleteModal(true)
        setIndex(index)
    }

    const closeDeleteModal = () => {
        setToggleDeleteModal(false)
        setTeamData(null)
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
                                        <i className="mdi mdi-plus-circle mr-2"></i> Add New Team
                                    </Button>
                                
                            </Col>
                        </Row>
                        {props.team && props.team.listloading && <LoaderWidget />}
                        {props.team && props.team.team && props.team.team.data &&
                            <BootstrapTable
                                bootstrap4
                                keyField="team_id"
                                data={props.team && props.team.team && props.team.team.data}
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
                            <TeamDetails toggleDetailsModal={toggleDetailsModal} closeDetailsModal={closeDetailsModal}
                                data={teamData} />
                        }

                        {/* Add/Edit Modal */}
                        {toggleAddEditModal &&
                            <TeamAddEdit toggleAddEditModal={toggleAddEditModal} closeAddEditModal={closeAddEditModal} emptyAllFields={emptyAllFields}
                                data={teamData} index={index} teamAddedSucsess={teamAddedSucsess}
                                teamUpdated={teamUpdated} getTeamAdd={props.getTeamAdd} getTeamUpdate={props.getTeamUpdate}
                                team={props.team} getTeamList={props.getTeamList}   />
                        }

                        {/* Delete Modal */}
                        {toggleDeleteModal &&
                            <TeamDelete toggleDeleteModal={toggleDeleteModal} closeDeleteModal={closeDeleteModal} getTeamDelete={props.getTeamDelete}
                                data={teamData} records={props.team && props.team.team && props.team.team.data}
                                index={index} teamDeletedSuccess={teamDeletedSuccess} team={props.team} getTeamList={props.getTeamList}  />
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
        team: state.Team,
       
    }
};
export default connect(
    mapStateToProps,
    { getTeamList, getTeamAdd, getTeamUpdate, getTeamDelete }
)(TeamConfig)