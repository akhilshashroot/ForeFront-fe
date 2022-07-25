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
    UncontrolledTooltip,
    TabContent, TabPane,
    Nav, NavItem, NavLink
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import InventoryDetails from "./InventoryDetails"
import InventoryAddEdit from "./InventoryAdd"
import InventoryDelete from "./InventoryDelete"
import { toast, ToastContainer, Zoom } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
// import "../../assets/scss/toastr.scss"
import { connect } from 'react-redux';
import { getInventoryList, getInventoryAdd, getInventoryUpdate, getInventoryDelete } from '../../../redux/actions';
import LoaderWidget from '../../../components/Loader';
import classnames from 'classnames';
import { getLoggedInUser } from '../../../helpers/authUtils';



 

const InventoryConfig = (props) => {
  
    
    
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
            text: 'Inventory Name',
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
                    <i className="uil uil-trash-alt dept-trash widget-icon bg-danger-lighten text-danger" id="delete" onClick={() => deleteInventory(row, rowIndex)}></i>
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
  
        if (props.inventory && !props.inventory.inventory) {
     let data = {}
     data.role= getLoggedInUser().role_number;
     data.invtype = 1
     console.log(data)
        props.getInventoryList({data})
         
            
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

    const edit = (row, index) => {     
        setToggleAddEditModal(true)
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

    return (
        <>
            <Card>
                <CardBody>
                    <React.Fragment>
                        <Row>
                            <Col className="text-right mb-1">
                            <Button color="danger" className="mb-2" onClick={() => handleAddEditModal()}>
                                        <i className="mdi mdi-plus-circle mr-2"></i> Add New Inventory
                                    </Button>
                                
                            </Col>
                        </Row>
                        {/* <Row>
                        <Col md={12}>
                            <Card>
                            <CardBody>
                                <h4 className="header-title mb-3">Tabs Bordered Justified</h4>

                                <Nav tabs className="nav-justified nav-bordered">
                                    {tabContents.map((tab, index) => {
                                        return (
                                            <NavItem key={index}>
                                                <NavLink
                                                    href="#"
                                                    className={classnames({ active: this.state.activeTab === tab.id })}
                                                    onClick={() => {
                                                        this.toggle(tab.id);
                                                    }}>
                                                    <i
                                                        className={classnames(
                                                            tab.icon,
                                                            'd-lg-none',
                                                            'd-block',
                                                            'mr-1'
                                                        )}></i>
                                                    <span className="d-none d-lg-block">{tab.title}</span>
                                                </NavLink>
                                            </NavItem>
                                        );
                                    })}
                                </Nav>

                                <TabContent activeTab={this.state.activeTab}>
                                    {tabContents.map((tab, index) => {
                                        return (
                                            <TabPane tabId={tab.id} key={index}>
                                                <Row>
                                                    <Col sm="12">
                                                        <p className="mt-3">{tab.text}</p>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                        );
                                    })}
                                </TabContent>
                            </CardBody>
                        </Card>
                        
                        </Col>
                        </Row> */}
                        {props.inventory && props.inventory.listloading && <LoaderWidget />}
                        {props.inventory && props.inventory.inventory && props.inventory.inventory.data &&
                            <BootstrapTable
                                bootstrap4
                                keyField={"dep_id"}
                                data={props.inventory && props.inventory.inventory && props.inventory.inventory.data}
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
                                index={index} inventoryDeletedSuccess={inventoryDeletedSuccess} inventory={props.inventory}  getInventoryList={props.getInventoryList}/>
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
        inventory: state.Inventory,
       
    }
};
export default connect(
    mapStateToProps,
    { getInventoryList, getInventoryAdd, getInventoryUpdate, getInventoryDelete }
)(InventoryConfig)