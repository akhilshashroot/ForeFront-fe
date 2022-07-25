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
  Label,

} from "reactstrap";
import Select from 'react-select';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import RequestDetails from "./RequestDetails";
import RequestAddEdit from "./RequestAdd";
import RequestDelete from "./RequestDelete";
import RequestApprove from "./RequestApprove";
import RequestReject from "./RequestReject";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "../../assets/scss/toastr.scss"
import { connect } from "react-redux";
import {
  getRequestList,
  getRequestApprove,
  getRequestReject,
  getRequestDelete,
} from "../../redux/actions";
import LoaderWidget from "../../components/Loader";

//Search table
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";

const defaultSorted = [
  {
    dataField: "id",
    order: "asc",
  },
];

const RequestConfig = (props) => {
  const parseDate = (str) => {
    if (str) {
      var mdy = str.split("-");
      return new Date(mdy[2], mdy[1], mdy[0] - 1);
    }
  };

  const datediff = (first, second) => {
    let diff = Math.round((second - first) / (1000 * 60 * 60 * 24) + 1);
    if (diff == 1) return "1 Day";
    else return diff + " Days";
  };

  const requestAddedSucsess = () =>
    toast.success("Request Added Successfully", { transition: Zoom });
  const requestDeletedSuccess = () =>
    toast.success("Request Deleted Successfully", { transition: Zoom });
  const requestApprovedSuccess = () =>
    toast.info("Request Approved Successfully", { transition: Zoom });
  const requestRejectedSuccess = () =>
    toast.info("Request Approved Successfully", { transition: Zoom });
  const emptyAllFields = () =>
    toast.warning("Please Fill All Fields", { transition: Zoom });

  const history = useHistory();
  const [toggleDetailsModal, setToggleDetailsModal] = useState(false);
  const [toggleAddEditModal, setToggleAddEditModal] = useState(false);
  const [toggleApproveModal, setToggleApproveModal] = useState(false);
  const [toggleRejectModal, setToggleRejectModal] = useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
  const [requestData, setRequestData] = useState(null);
  const [index, setIndex] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [data,setData]=useState([]);
const leavestatusoptions=[
  { value: 'all', label: `All` },
  { value: 0, label: `Pending` },
  { value: 1, label: 'Approved' },
  { value: 2, label: 'Rejected' },
]
    const columns = [
      
        {
            dataField: 'lv_aply_date',
            text: 'Request Date',

      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>
          <div style={{ lineHeight: "normal", margin: 0 }}>
            <p>{row.lv_aply_date}</p>
          </div>
          <div></div>
        </div>
      ),
    },
    {
      dataField: "fullname",
      text: "Employee Name",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <p id="name">{row.fullname}</p>
        </div>
      ),
    },
    {
      dataField: "consentof",
      text: "Consent of",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <p id="name">{row.consentof}</p>
        </div>
      ),
    },
    {
      dataField: "lv_title",
      text: "Leave Type",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <p id="name">{row.lv_title}</p>
        </div>
      ),
    },
    {
      dataField: "lv_date",
      text: "Dates Requested",
      headerClasses: "bg-dark text-white py-2",
      sort: false,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <p className="m-0" id="name">
            {row.lv_date}{" "}
            {row.lv_date_to === row.lv_date ? "" : " to " + row.lv_date_to}{" "}
          </p>
          <h5 className="badge badge-rounded badge-secondary-lighten">
            {" "}
            {datediff(parseDate(row.lv_date), parseDate(row.lv_date_to))}{" "}
          </h5>
        </div>
      ),
    },
    {
      dataField: "lv_status",
      text: "Leave Status",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <h4 id="lv_status">
            <span
              className={
                row.lv_status == 0 ? "badge badge-warning" :row.lv_status ==1? "badge badge-success":"badge badge-danger"

              }
            >
              {row.lv_status == 0 ? "Pending" :row.lv_status ==1? "Approved":"Rejected"}
            </span>
          </h4>
        </div>
      ),
    },
    {
      dataField: "lv_file",
      text: "Files",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <p id="name">
            {row.lv_file !== "" ? (
              <Button id="download" download>
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
          {row.lv_status != 0 ? (
            <>
              <i
                className="uil uil-trash-alt dept-trash widget-icon bg-secondary-lighten text-secondary"
                id="delete"
                onClick={() => deleteRequest(row, rowIndex)}
              ></i>

              <UncontrolledTooltip placement="top" target="delete">
                Delete
              </UncontrolledTooltip>
            </>
          ) : (
            <>
              <i
                className="uil  uil-check widget-icon bg-success-lighten text-success"
                id="approve"
                onClick={() => approveRequest(row, rowIndex)}
              ></i>
              <i
                className="uil uil-multiply dept-trash widget-icon bg-danger-lighten text-danger"
                id="reject"
                onClick={() => rejectRequest(row, rowIndex)}
              ></i>
              <i
                className="uil uil-trash-alt dept-trash widget-icon bg-secondary-lighten text-secondary"
                id="delete"
                onClick={() => deleteRequest(row, rowIndex)}
              ></i>
              <UncontrolledTooltip placement="top" target="approve">
                Approve
              </UncontrolledTooltip>
              <UncontrolledTooltip placement="top" target="reject">
                Reject
              </UncontrolledTooltip>
              <UncontrolledTooltip placement="top" target="delete">
                Delete
              </UncontrolledTooltip>
            </>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (props.request && !props.request.request) {
      props.getRequestList();
    }
    if(props.request &&
        props.request.request &&
        props.request.request.data){
            setData( props.request.request.data)
        }
  }, [props.request &&
    props.request.request &&
    props.request.request.data]);

  const handleDetailsModal = (row) => {
    setToggleDetailsModal(true);
    setRequestData(row);
  };
  const closeDetailsModal = () => {
    setToggleDetailsModal(false);
    setRequestData(null);
  };

  const handleAddEditModal = () => {
    setToggleAddEditModal(true);
    setRequestData(null);
  };
  const closeAddEditModal = () => {
    setToggleAddEditModal(false);
    setRequestData(null);
  };

  const deleteRequest = (row, index) => {
    setRequestData(row);
    setToggleDeleteModal(true);
    setIndex(index);
  };

  const approveRequest = (row, index) => {
    setRequestData(row);
    setToggleApproveModal(true);
    setIndex(index);
  };
  const rejectRequest = (row, index) => {
    setRequestData(row);
    setToggleRejectModal(true);
    setIndex(index);
  };

  const closeApproveModal = () => {
    setToggleApproveModal(false);
    setRequestData(null);
    setIndex(null);
  };
  const closeRejectModal = () => {
    setToggleRejectModal(false);
    setRequestData(null);
    setIndex(null);
  };
  const closeDeleteModal = () => {
    setToggleDeleteModal(false);
    setRequestData(null);
    setIndex(null);
  };

  //Search Table
  const { SearchBar } = Search;
  
  const leaveChange =(e) =>{ 
         let data=props.request && props.request.request && props.request.request.data;
         let filterData;
      if (data) {  
        if(e.value!=="all"){
          filterData = (data).filter((item) => item.lv_status === e.value);
              setData(filterData)
           
        } else {
          filterData = (data)
          setData(filterData)
        }
      
      }
  }
  return (
    <>
      <Card>
        <CardBody>
          <React.Fragment>
            <Row>
              <Col className="text-right mb-1"></Col>
            </Row>
            {props.request && props.request.listloading && <LoaderWidget />}
           
            {props.request &&
              props.request.request &&
              props.request.request.data && (
                <ToolkitProvider
                  bootstrap4
                  keyField="id"
                  data={
                    data
                  }
                  columns={columns}
                  search
                  exportCSV={{ onlyExportFiltered: true, exportAll: false }}
                >
                  {(props) => (
                    <React.Fragment>
                      <Row>
                        <Col md={6} className="d-flex justify-content-start flex-column">
                        <Label for="Search">Search</Label>
                          <SearchBar id="Search" {...props.searchProps} />
                        </Col>
                        <Col>
                          <Form>
                            <FormGroup>
                              <Label for="exampleSelect">Select Leave Status</Label>
                              <Select
                                type="select"
                                name="Select"
                                id="exampleSelect"
                                onChange={leaveChange}
                                options={leavestatusoptions}
                              ></Select>
                         
                          
                            </FormGroup>
                          </Form>
                        </Col>
                      </Row>

                      <BootstrapTable
                        keyField={"desg_id"}
                        {...props.baseProps}
                        bordered={false}
                        pagination={paginationFactory({ sizePerPage: 10 })}
                        wrapperClasses="table-responsive"
                      />
                    </React.Fragment>
                  )}
                </ToolkitProvider>
              )}

            {/* Details Modal */}
            {toggleDetailsModal && (
              <RequestDetails
                toggleDetailsModal={toggleDetailsModal}
                closeDetailsModal={closeDetailsModal}
                data={requestData}
              />
            )}

            {/* Approve Modal */}
            {toggleApproveModal && (
              <RequestApprove
                toggleApproveModal={toggleApproveModal}
                closeApproveModal={closeApproveModal}
                getRequestApprove={props.getRequestApprove}
                data={requestData}
                records={
                  props.request &&
                  props.request.request &&
                  props.request.request.data
                }
                index={index}
                requestApprovedSuccess={requestApprovedSuccess}
                request={props.request}
                getRequestList={props.getRequestList}
              />
            )}
            {/* Reject Modal */}
            {toggleRejectModal && (
              <RequestReject
                toggleRejectModal={toggleRejectModal}
                closeRejectModal={closeRejectModal}
                getRequestReject={props.getRequestReject}
                data={requestData}
                records={
                  props.request &&
                  props.request.request &&
                  props.request.request.data
                }
                index={index}
                requestRejectedSuccess={requestRejectedSuccess}
                request={props.request}
                getRequestList={props.getRequestList}
              />
            )}

            {/* Delete Modal */}
            {toggleDeleteModal && (
              <RequestDelete
                toggleDeleteModal={toggleDeleteModal}
                closeDeleteModal={closeDeleteModal}
                getRequestDelete={props.getRequestDelete}
                data={requestData}
                records={
                  props.request &&
                  props.request.request &&
                  props.request.request.data
                }
                index={index}
                requestDeletedSuccess={requestDeletedSuccess}
                request={props.request}
                getRequestList={props.getRequestList}
              />
            )}
          </React.Fragment>
        </CardBody>
      </Card>
      <ToastContainer />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    request: state.Request,
  };
};
export default connect(mapStateToProps, {
  getRequestList,
  getRequestApprove,
  getRequestReject,
  getRequestDelete,
})(RequestConfig);
