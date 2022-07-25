import React, { useEffect, useState } from "react";
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
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import MytaskDetails from "./MytaskDetails";
import TaskerAddEdit from "./MytaskAdd";
import TaskerDelete from "./MytaskDelete";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "../../assets/scss/toastr.scss"
// import { connect } from 'react-redux';
// import { getTaskerList, getTaskerAdd, getTaskerUpdate, getTaskerDelete } from '../../redux/actions';
import LoaderWidget from "../../components/Loader";

const TaskerConfig = (props) => {
  const taskerAddedSucsess = () =>
    toast.success("Tasker Added Successfully", { transition: Zoom });
  const taskerDeletedSuccess = () =>
    toast.success("Tasker Deleted Successfully", { transition: Zoom });
  const taskerUpdated = () =>
    toast.info("Tasker Updated Successfully", { transition: Zoom });
  const emptyAllFields = () =>
    toast.warning("Please Fill All Fields", { transition: Zoom });

  const history = useHistory();
  const [toggleDetailsModal, setToggleDetailsModal] = useState(false);
  const [toggleAddEditModal, setToggleAddEditModal] = useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
  const [taskerData, setTaskerData] = useState(null);
  const [index, setIndex] = useState(null);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState();
  // useEffect(() => {
  //   console.log(props.employees);
  // }, [props]);
  const toggle = (data) => {
    // if (props.score && props.score.score && props.score.score.data) {
    //   setModal(!modal);
    // }
    setData(null);
    setModal(false);
  };

  const toggle1 = (data) => {
    // if (props.score && props.score.score && props.score.score.data) {
    //   setModal(!modal);
    // }
    setData(data);
    setModal(true);
  };

  const getEmployeename = (id) => {
    if (id) {
      let name = props.employees.find((emp) => emp.id === id);
      if (name !== undefined && name !== null) {
        return name.name;
      } else {
        return "";
      }
    }
  };

  const columns = [
    // {
    //   dataField: "asgnmnt_id",
    //   text: "ID",
    //   headerStyle: { width: "10%" },
    //   headerClasses: "bg-dark text-white py-2",
    //   sort: true,

    //   formatter: (cell, row, rowIndex, formatExtraData) => (
    //     <div style={{ lineHeight: "normal", margin: 0 }}>
    //       <p>{row.asgnmnt_id}</p>
    //     </div>
    //   ),
    // },
    {
      dataField: "title",
      text: "Task",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          {/* <p id="name">{row.title}</p> */}
          <a onClick={() => toggle1(row)} className="link_color">
            {" "}
            {row.title}{" "}
          </a>{" "}
        </div>
      ),
    },
    {
      dataField: "Assignee",
      text: "Assignee",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <p id="name">{row.assignee}</p>
        </div>
      ),
    },

    {
      dataField: "status",
      text: "Status",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <h4>
            <span>
              {row.status == 1 ? (
                <i className="mdi mdi-circle text-success text-center"></i>
              ) : (
                <i className="mdi mdi-circle text-danger"></i>
              )}
            </span>
          </h4>
        </div>
      ),
    },
    {
      dataField: "Deadline",
      text: "Deadline",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <p id="name">{row.deadline}</p>
        </div>
      ),
    },

    {
      dataField: "task_attachment",
      text: "Attachments",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <p id="name">
            {row.task_attachment !== "" ? (
              <Button color='white' size="sm" className="btn btn-outline-success" id="download" href={row.task_attachment} download target="_blank">
                <i className="uil  uil-cloud-download"></i>
                Download
              </Button>
            ) : (
              "N/A"
            )}
          </p>
        </div>
      ),
    },

    {
      dataField: "actions",
      text: "Actions",

      headerClasses: "bg-dark text-white py-2",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0, cursor: "pointer" }}>
          <i
            className="uil uil-trash-alt dept-trash widget-icon bg-danger-lighten text-danger"
            id="delete"
            onClick={() => deleteTasker(row, rowIndex)}
          ></i>

          <UncontrolledTooltip placement="top" target="delete">
            Delete
          </UncontrolledTooltip>
        </div>
      ),
    },
  ];

  const handleDetailsModal = (row) => {
    setToggleDetailsModal(true);
    setTaskerData(row);
  };
  const closeDetailsModal = () => {
    setToggleDetailsModal(false);
    setTaskerData(null);
  };

  const handleAddEditModal = () => {
    setToggleAddEditModal(true);
    setTaskerData(null);
  };
  const closeAddEditModal = () => {
    setToggleAddEditModal(false);
    setTaskerData(null);
  };

  const edit = (row, index) => {
    setToggleAddEditModal(true);
    setTaskerData(row);
    setIndex(index);
  };

  const deleteTasker = (row, index) => {
    setTaskerData(row);
    setToggleDeleteModal(true);
    setIndex(index);
  };

  const closeDeleteModal = () => {
    setToggleDeleteModal(false);
    setTaskerData(null);
    setIndex(null);
  };

  return (
    <>
      <React.Fragment>
        <Row className="mt-3">
          <Col className="text-right mb-1">
            <Button
              color="danger"
              className="mb-2"
              onClick={() => handleAddEditModal()}
            >
              <i className="mdi mdi-plus-circle mr-2"></i> Assign Task
            </Button>
          </Col>
        </Row>
        {props.loading && <LoaderWidget />}
        {props.taskdata && props.taskdata.task_to_others && (
          <BootstrapTable
            bootstrap4
            keyField={"dep_id"}
            data={props.taskdata.task_to_others}
            columns={columns}
            pagination={paginationFactory({ sizePerPage: 10 })}
            wrapperClasses="table-responsive"
            hover
            condensed
            noDataIndication={() => "There are no records to display"}
          />
        )}

        {modal && (
          <MytaskDetails
            toggle={toggle}
            toggle1={toggle1}
            modal={modal}
            data={data}
          />
        )}

        {/* Details Modal
        {toggleDetailsModal && (
          <TaskerDetails
            toggleDetailsModal={toggleDetailsModal}
            closeDetailsModal={closeDetailsModal}
            data={taskerData}
          />
        )} */}

        {/* Add/Edit Modal */}
        {toggleAddEditModal && (
          <TaskerAddEdit
            toggleAddEditModal={toggleAddEditModal}
            closeAddEditModal={closeAddEditModal}
            emptyAllFields={emptyAllFields}
            data={taskerData}
            index={index}
            // taskerAddedSucsess={taskerAddedSucsess}
            taskerUpdated={taskerUpdated}
            getTaskerAdd={props.getTaskerAdd}
            getTaskerUpdate={props.getTaskerUpdate}
            tasker={props.tasker}
            getTaskerList={props.getTaskerList}
            employee={props && props.employees && props.employees}
          />
        )}

        {/* Delete Modal */}
        {toggleDeleteModal && (
          <TaskerDelete
            toggleDeleteModal={toggleDeleteModal}
            closeDeleteModal={closeDeleteModal}
            data={taskerData}
            // getTaskerDelete={props.getTaskerDelete}
            // records={props.taskdata}
            // index={index}
            // taskerDeletedSuccess={taskerDeletedSuccess}
            // tasker={props.tasker}
            // getTaskerList={props.getTaskerList}
          />
        )}
      </React.Fragment>

      {/* <ToastContainer /> */}
    </>
  );
};

export default TaskerConfig;
