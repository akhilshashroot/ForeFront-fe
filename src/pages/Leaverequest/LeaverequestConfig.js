import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Card, CardBody, Form, FormGroup, Input, Button, UncontrolledTooltip } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import LeaverequestDetails from './LeaverequestDetails';
import LeaverequestAddEdit from './LeaverequestAdd';
import LeaverequestDelete from './LeaverequestDelete';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import "../../assets/scss/toastr.scss"
import { connect } from 'react-redux';
import {
    getLeaverequestList,
    getLeaverequestUpdate,
    getLeaverequestDelete,
    getLeaverequestTypeList,
    getLeaverequestAdd,
} from '../../redux/actions';
import LoaderWidget from '../../components/Loader';
import classNames from 'classnames';

const LeaverequestConfig = (props) => {
    const leaverequestAddedSucsess = () => toast.success('Leaverequest Added Successfully', { transition: Zoom });
    const leaverequestDeletedSuccess = () => toast.success('Leaverequest Deleted Successfully', { transition: Zoom });
    const leaverequestUpdated = () => toast.info('Leaverequest Updated Successfully', { transition: Zoom });
    const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });

    const history = useHistory();
    const [toggleDetailsModal, setToggleDetailsModal] = useState(false);
    const [toggleAddEditModal, setToggleAddEditModal] = useState(false);
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
    const [leaverequestData, setLeaverequestData] = useState(null);
    const [index, setIndex] = useState(null);

    const columns = [
        {
            dataField: 'leave_date',
            text: 'Leave Dates',
            headerStyle: { width: '10%' },
            headerClasses: 'bg-dark text-white py-2',
            sort: true,

            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p>{row.leave_date}</p>
                </div>
            ),
        },
        {
            dataField: 'approvedby',
            text: 'Consent Name',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.approvedby}</p>
                </div>
            ),
        },
        {
            dataField: 'lv_purpose',
            text: 'Leave Purpose',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.lv_purpose}</p>
                </div>
            ),
        },
        {
            dataField: 'status',
            text: 'Status',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.status}</p>
                </div>
            ),
        },

        {
            dataField: 'type',
            text: 'Type',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.type}</p>
                </div>
            ),
        },

        // {
        //     dataField: 'actions',
        //     text: 'Actions',
        //     headerStyle: { width: "20%" },
        //     headerClasses:"bg-dark text-white py-2",
        //     formatter: (cell, row, rowIndex, formatExtraData) =>
        //     < div  style={{lineHeight: "normal",margin:0,cursor:"pointer" }}>

        //             <i className="uil uil-edit widget-icon mr-2" id="edit" onClick={() => edit(row, rowIndex)}></i>
        //             <i className="uil uil-trash-alt dept-trash widget-icon bg-danger-lighten text-danger" id="delete" onClick={() => deleteLeaverequest(row, rowIndex)}></i>
        //             <UncontrolledTooltip placement="top" target="edit">
        //                 Edit
        //             </UncontrolledTooltip>
        //             <UncontrolledTooltip placement="top" target="delete">
        //                 Delete
        //             </UncontrolledTooltip>
        //         </div>
        // }
    ];

    useEffect(() => {
        if (props.leaverequest && !props.leaverequest.leaverequest) {
            props.getLeaverequestList();
            if (props.leaverequest.leaverequesttype && !props.leaverequest.leaverequest.leaverequesttype) {
                props.getLeaverequestList();
            }
        }

        props.getLeaverequestTypeList();
    }, []);

    const handleDetailsModal = (row) => {
        setToggleDetailsModal(true);
        setLeaverequestData(row);
    };
    const closeDetailsModal = () => {
        setToggleDetailsModal(false);
        setLeaverequestData(null);
    };

    const handleAddEditModal = () => {
        setToggleAddEditModal(true);
        setLeaverequestData(null);
    };
    const closeAddEditModal = () => {
        setToggleAddEditModal(false);
        setLeaverequestData(null);
    };

    const edit = (row, index) => {
        setToggleAddEditModal(true);
        setLeaverequestData(row);
        setIndex(index);
    };

    const deleteLeaverequest = (row, index) => {
        setLeaverequestData(row);
        setToggleDeleteModal(true);
        setIndex(index);
    };

    const closeDeleteModal = () => {
        setToggleDeleteModal(false);
        setLeaverequestData(null);
        setIndex(null);
    };

    return (
        <>
            <React.Fragment>
                {props.leaverequest && props.leaverequest.listloading && <LoaderWidget />}
                <LeaverequestAddEdit
                    toggleAddEditModal={toggleAddEditModal}
                    closeAddEditModal={closeAddEditModal}
                    emptyAllFields={emptyAllFields}
                    index={index}
                    leaverequestAddedSucsess={leaverequestAddedSucsess}
                    leaverequestUpdated={leaverequestUpdated}
                    getLeaverequestUpdate={props.getLeaverequestUpdate}
                    leaverequest={props.leaverequest}
                    getLeaverequestList={props.getLeaverequestList}
                    getLeaverequestTypeList={props.getLeaverequestTypeList}
                    leaverequesttype={props.leaverequesttype}
                    getLeaverequestAdd={props.getLeaverequestAdd}
                />
                {props.leaverequest &&
                    props.leaverequest.leaverequest &&
                    props.leaverequest.leaverequest.data &&
                    props.leaverequest.leaverequest.data.map((item, key) => (
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col className="text-left">
                                        <h5>
                                            {' '}
                                            Type : <span className="badge badge-primary p-1 p">{item.type}</span>
                                        </h5>
                                    </Col>
                                    <Col className="text-right">
                                        <h5>
                                            Status :{' '}
                                            <span
                                                className={` p-1 badge ${classNames({
                                                    'badge-danger': item.status == 'Rejected',
                                                    'badge-warning': item.status == 'Pending',
                                                    'badge-success': item.status == 'Approved',
                                                })}`}>
                                                {item.status}
                                            </span>
                                        </h5>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-left">
                                        <h5>
                                            Date : <span> {item.leave_date} </span>
                                        </h5>
                                    </Col>
                                    <Col className="text-right">
                                        <h5>
                                            Consent of : <span> {item.approvedby} </span>
                                        </h5>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-left">
                                        <h5>
                                            Reason : <span> {item.lv_purpose} </span>
                                        </h5>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    ))}

                {/* Details Modal */}
                {toggleDetailsModal && (
                    <LeaverequestDetails
                        toggleDetailsModal={toggleDetailsModal}
                        closeDetailsModal={closeDetailsModal}
                        data={leaverequestData}
                    />
                )}

                {/* Add/Edit Modal */}
                {toggleAddEditModal && (
                    <LeaverequestAddEdit
                        toggleAddEditModal={toggleAddEditModal}
                        closeAddEditModal={closeAddEditModal}
                        emptyAllFields={emptyAllFields}
                        data={leaverequestData}
                        index={index}
                        leaverequestAddedSucsess={leaverequestAddedSucsess}
                        leaverequestUpdated={leaverequestUpdated}
                        getLeaverequestUpdate={props.getLeaverequestUpdate}
                        leaverequest={props.leaverequest}
                        getLeaverequestList={props.getLeaverequestList}
                        getLeaverequestTypeList={props.getLeaverequestTypeList}
                        leaverequesttype={props.leaverequesttype}
                        getLeaverequestAdd={props.getLeaverequestAdd}
                    />
                )}

                {/* Delete Modal */}
                {toggleDeleteModal && (
                    <LeaverequestDelete
                        toggleDeleteModal={toggleDeleteModal}
                        closeDeleteModal={closeDeleteModal}
                        getLeaverequestDelete={props.getLeaverequestDelete}
                        data={leaverequestData}
                        records={
                            props.leaverequest &&
                            props.leaverequest.leaverequest &&
                            props.leaverequest.leaverequest.data
                        }
                        index={index}
                        leaverequestDeletedSuccess={leaverequestDeletedSuccess}
                        leaverequest={props.leaverequest}
                        getLeaverequestList={props.getLeaverequestList}
                    />
                )}
            </React.Fragment>

            <ToastContainer />
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        leaverequest: state.Leaverequest,
    };
};
export default connect(mapStateToProps, {
    getLeaverequestList,
    getLeaverequestAdd,
    getLeaverequestUpdate,
    getLeaverequestDelete,
    getLeaverequestTypeList,
    getLeaverequestAdd,
})(LeaverequestConfig);
