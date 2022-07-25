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
import { toast, ToastContainer, Zoom } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
// import "../../assets/scss/toastr.scss"
import { connect } from 'react-redux';
import { getNotificationList } from '../../../redux/actions';

import LoaderWidget from '../../../components/Loader';



const NotificationConfig = (props) => {
    const notificationAddedSucsess = () => toast.success("Notification Added Successfully", { transition: Zoom })
    const notificationDeletedSuccess = () => toast.success("Notification Deleted Successfully", { transition: Zoom })
    const notificationUpdated = () => toast.info("Notification Updated Successfully", { transition: Zoom })
    const emptyAllFields = () => toast.warning("Please Fill All Fields", { transition: Zoom })

    const history = useHistory();
    const [index, setIndex] = useState(null);
  


    const columns = [
     
        {
            dataField: 'not_id',
            text: 'ID',
            headerStyle: { width: "10%" },
            headerClasses:"bg-dark text-white py-2",
            sort: true,
           
            formatter: (cell, row, rowIndex, formatExtraData) =>
                < div  style={{lineHeight: "normal",margin:0 }}>
                    <p >{row.not_id}</p>
                </div>
        },
        {
            dataField: 'fullname',
            text: 'Notification Name',
            headerClasses:"bg-dark text-white py-2",
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0 }}>
                    <p id="name">{row.fullname}</p>
                
                </div>,
         
            
        },       
        
      
    ];

    useEffect(() => {
        if (props.notification && !props.notification.notification) {
            
            props.getNotificationList()
         
            
        }

    
       
    }, [])



    return (
        <>
            <Card>
                <CardBody>
                    <React.Fragment>
                      
                        {props.notification && props.notification.listloading && <LoaderWidget />}
                        {props.notification && props.notification.notification && props.notification.notification.data &&
                            <BootstrapTable
                                bootstrap4
                                keyField={"not_id"}
                                data={props.notification && props.notification.notification && props.notification.notification.data}
                                columns={columns}
                                pagination={paginationFactory({ sizePerPage: 10 })}
                                wrapperClasses="table-responsive"
                                                        
                                hover
                                condensed
                                noDataIndication={() => "There are no records to display"}
                            />                        
                        }

                       
                    </React.Fragment>
                </CardBody>
            </Card>
          
        </>
    )
}

const mapStateToProps = state => {

    return {
        notification: state.Notification,
       
    }
};
export default connect(
    mapStateToProps,
    { getNotificationList}
)(NotificationConfig)