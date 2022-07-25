import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
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
    UncontrolledTooltip,
    TabContent, TabPane,
    Nav, NavItem, NavLink
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import InventoryDetails from "../InventoryDetails"
import InventoryAddEdit from "../InventoryAdd"
import InventoryDelete from "../InventoryDelete"
import { toast, ToastContainer, Zoom } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { saveAs } from "file-saver";

// import "../../assets/scss/toastr.scss"
import { connect } from 'react-redux';
import { getInventoryList,getTeamList, getInventoryAdd, getInventoryUpdate, getInventoryDelete } from '../../../../redux/actions';
import LoaderWidget from '../../../../components/Loader';
import classnames from 'classnames';
import { getLoggedInUser } from '../../../../helpers/authUtils';




const LaptopInventory=(props)=> {  
    
    const inventoryAddedSucsess = () => toast.success("Inventory Added Successfully", { transition: Zoom })
    const inventoryDeletedSuccess = () => toast.success("Inventory Deleted Successfully", { transition: Zoom })
    const inventoryUpdated = () => toast.info("Inventory Updated Successfully", { transition: Zoom })
    const emptyAllFields = () => toast.warning("Please Fill All Fields", { transition: Zoom })

    const history = useHistory();
    const [toggleDetailsModal, setToggleDetailsModal] = useState(false);
    const [toggleAddEditModal, setToggleAddEditModal] = useState(false);
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
    const [inventoryData, setInventoryData] = useState(null);
    const [index, setIndex] = useState(null);
    const [download, setDownload] = useState(null);
    const [inv,Setinv]=useState(props.inv_number);

    const handleteam=(e)=>{

        if(props.team && props.team.team && props.team.team.data){
           
            if(e){
                let tdata= props.team && props.team.team && props.team.team.data
                let team = tdata.filter(item=>item.team_id == e)
             if(team[0]){
                 return team[0].name
             }
             else{
                 return ""
             }
            }
           
        }


    }
  
    const columns = [
        {
            dataField: 'SL.NO',
            text: 'SL.NO',
    
            headerClasses:"bg-dark text-white py-2",
            sort: true,
           
            formatter: (cell, row, rowIndex, formatExtraData) =>
                < div  style={{lineHeight: "normal",margin:0 }}>
                    <p >{rowIndex+1}</p>
                </div>
        },
     
        {
            dataField: 'inv_id',
            text: 'ID',

            headerClasses:"bg-dark text-white py-2",
            sort: true,
           
            formatter: (cell, row, rowIndex, formatExtraData) =>
                < div  style={{lineHeight: "normal",margin:0 }}>
                    <p >{row.inv_id}</p>
                </div>
        },
        {
            dataField: 'inv_brand',
            text: 'Brand',
            headerClasses:"bg-dark text-white py-2",
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0 }}>
                    <p id="name">{row.inv_brand}</p>
                
                </div>,
         
            
        },       
        {
            dataField: 'inv_specs',
            text: 'Specification',
            headerClasses:"bg-dark text-white py-2",
            headerStyle: { width: "30%" },
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0 }}>
                    <p id="name">{row.inv_specs}</p>
                
                </div>,
         
            
        },       
        {
            dataField: 'inv_team',
            text: 'Team',
            headerClasses:"bg-dark text-white py-2",
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0 }}>
                    <p id="name">{handleteam(row.inv_team)}</p>                
                </div>,
         
            
        },       
        
        {
            dataField: 'actions',
            text: 'Actions',
            headerStyle: { width: "20%" },
            headerClasses:"bg-dark text-white py-2",
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0,cursor:"pointer" }}>

                    {/* <i className="uil uil-edit widget-icon mr-2" id="edit" onClick={() => edit(row, rowIndex)}></i> */}
                    <button className="btn btn-outline-success btn-sm" id="download" onClick={() => edit(row, rowIndex)}><i className="uil  uil-cloud-download"></i>  Invoice</button>
                    <i className="uil uil-trash-alt dept-trash widget-icon bg-danger-lighten text-danger" id="delete" onClick={() => deleteInventory(row, rowIndex)}></i>
                    <UncontrolledTooltip placement="top" target="download">
                        Download
                    </UncontrolledTooltip>
                    <UncontrolledTooltip placement="top" target="delete">
                        Delete
                    </UncontrolledTooltip>
                </div>
        }
    ];

    useEffect(() => {  
      
        if (props.inventory && !props.inventory.inventory) {
     
        props.getInventoryList()  
        }
        if (props.team && !props.team.team) {     
        props.getTeamList()  
        }

       
    }, [])

    const handleDetailsModal = (row) => {
        setToggleDetailsModal(true)
        setInventoryData(row)
    }
    const closeDetailsModal = () => {
        setToggleDetailsModal(false)
        setInventoryData(null)
    }

    const handleAddEditModal = () => {
        setToggleAddEditModal(true)
        setInventoryData(null)
    }
    const closeAddEditModal = () => {
        setToggleAddEditModal(false)
        setInventoryData(null)
    }
    const saveFile = (data) => {
     
        saveAs(
            data
        );
      };

    const edit = (row, index) => {     
        // setToggleAddEditModal(true)
        
        saveFile(row.inv_invoice)
        setInventoryData(row)
        setIndex(index)
    }

    const deleteInventory = (row, index) => {
        setInventoryData(row)
        setToggleDeleteModal(true)
        setIndex(index)
    }

    const closeDeleteModal = () => {
        setToggleDeleteModal(false)
        setInventoryData(null)
        setIndex(null)
    }
    let dynamicdata = null
if (props.inventory && props.inventory.inventory && props.inventory.inventory.data) {
     dynamicdata = (props.inventory && props.inventory.inventory && props.inventory.inventory.data).filter(item => item.inv_type === props.inv_number)

}
    return (
        <>
   
          
                    <React.Fragment>
                        <Row  className="mt-3">
                        <Col className="text-left mb-1">
                         <h5>{props.menutitle}</h5>
                                
                            </Col>
                            <Col className="text-right mb-1">
                            <Button color="danger" className="mb-2" onClick={() => handleAddEditModal()}>
                                        <i className="mdi mdi-plus-circle mr-2"></i> Add New Inventory
                                    </Button>
                                
                            </Col>
                        </Row>
                       
                        {props.inventory && props.inventory.listloading && <LoaderWidget />}
                        {props.inventory && props.inventory.inventory && props.inventory.inventory.data &&
                            <BootstrapTable
                                bootstrap4
                                keyField={"inv_id"}
                                data={dynamicdata}
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
                            <InventoryDetails toggleDetailsModal={toggleDetailsModal} closeDetailsModal={closeDetailsModal}
                                data={inventoryData} />
                        }

                        {/* Add/Edit Modal */}
                        {toggleAddEditModal &&
                            <InventoryAddEdit toggleAddEditModal={toggleAddEditModal} closeAddEditModal={closeAddEditModal} emptyAllFields={emptyAllFields}
                                data={inventoryData} index={index} inventoryAddedSucsess={inventoryAddedSucsess}
                                inventoryUpdated={inventoryUpdated} getInventoryAdd={props.getInventoryAdd} getInventoryUpdate={props.getInventoryUpdate}
                                inventory={props.inventory} getInventoryList={props.getInventoryList}   />
                        }

                        {/* Delete Modal */}
                        {toggleDeleteModal &&
                            <InventoryDelete toggleDeleteModal={toggleDeleteModal} closeDeleteModal={closeDeleteModal} getInventoryDelete={props.getInventoryDelete}
                                data={inventoryData} records={props.inventory && props.inventory.inventory && props.inventory.inventory.data}
                                index={index} inventoryDeletedSuccess={inventoryDeletedSuccess} inventory={props.inventory}  getInventoryList={props.getInventoryList}  inventorynumber="1"/>
                        }
                    </React.Fragment>
           
        </>
    )

}

const mapStateToProps = state => {

    return {
        inventory: state.Inventory,
        team: state.Team,
       
    }
};


export default connect(
    mapStateToProps,
    { getInventoryList, getInventoryAdd, getInventoryUpdate, getInventoryDelete ,getTeamList}
)(LaptopInventory)