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
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import InterviewDetails from "./InterviewDetails";
import InterviewAddEdit from "./InterviewAdd";
import InterviewDelete from "./InterviewDelete";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "../../assets/scss/toastr.scss"
import moment from 'moment';

import { connect } from "react-redux";
import {
  getInterviewList,
  getInterviewAdd,
  getInterviewUpdate,
  getInterviewDelete,
} from "../../redux/actions";
import LoaderWidget from "../../components/Loader";

//Search Table
const { SearchBar } = Search;

const InterviewConfig = (props) => {
  const interviewAddedSucsess = () =>
    toast.success("Interview Added Successfully", { transition: Zoom });
  const interviewDeletedSuccess = () =>
    toast.success("Interview Deleted Successfully", { transition: Zoom });
  const interviewUpdated = () =>
    toast.info("Interview Updated Successfully", { transition: Zoom });
  const emptyAllFields = () =>
    toast.warning("Please Fill All Fields", { transition: Zoom });

  const history = useHistory();
  const [toggleDetailsModal, setToggleDetailsModal] = useState(false);
  const [toggleAddEditModal, setToggleAddEditModal] = useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
  const [interviewData, setInterviewData] = useState(null);
  const [index, setIndex] = useState(null);
  const [data, setData] = useState([]);
  const offerstatusoptions = [
    { value: "all", label: `All` },
    { value: "unqualified", label: `Unqualified` },
    { value: "joined", label: "Joined" },
    { value: "declined", label: "Declined" },
    { value: "didn't appear", label: "Didn't Appear" },
    { value: "not interested", label: "Not Interested" },
  ];
  const convertTime = (data) => {
    let newDate2 = moment(data).format('DD-MM-YYYY hh:mm A ');
    return newDate2;
};
  const columns = [
    {
      dataField: "interview_date",
      text: "Interview Date",
      // headerStyle: { width: "10%" },
      headerClasses: "bg-dark text-white py-2",
      sort: true,

      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 ,whiteSpace:'nowrap'}}>
          <p>{row?.interview_date?.includes('GMT')?convertTime(row.interview_date):row.interview_date}</p>
        </div>
      ),
    },
    {
      dataField: "name",
      text: "Name",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <p id="name">{row.name}</p>
        </div>
      ),
    },

    {
      dataField: "position",
      text: "Position",
      // headerStyle: { width: "10%" },
      headerClasses: "bg-dark text-white py-2",
      sort: true,

      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <p>{row.position}</p>
        </div>
      ),
    },
    {
      dataField: "ctc",
      text: "CTC",
      // headerStyle: { width: "10%" },
      headerClasses: "bg-dark text-white py-2",
      sort: true,

      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <p>{row.ctc}</p>
        </div>
      ),
    },
    {
      dataField: "etc",
      text: "ETC",
      // headerStyle: { width: "10%" },
      headerClasses: "bg-dark text-white py-2",
      sort: true,

      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <p>{row.etc}</p>
        </div>
      ),
    },
    {
      dataField: "phone",
      text: "Phone",
      // headerStyle: { width: "10%" },
      headerClasses: "bg-dark text-white py-2",
      sort: true,

      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <p>{row.phone}</p>
        </div>
      ),
    },
    {
      dataField: "notice_period",
      text: "Notice Period",
      // headerStyle: { width: "10%" },
      headerClasses: "bg-dark text-white py-2",
      sort: true,

      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <p>{row.notice_period}</p>
        </div>
      ),
    },
    {
      dataField: "status",
      text: "Status",
      // headerStyle: { width: "10%" },
      headerClasses: "bg-dark text-white py-2",
      sort: true,

      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <p>{row.status}</p>
        </div>
      ),
    },

    {
      dataField: "actions",
      text: "Actions",
      headerStyle: { width: "20%" },
      headerClasses: "bg-dark text-white py-2",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0, cursor: "pointer" }}>
          <i className="uil uil-edit widget-icon mr-2" id="edit" onClick={() => edit(row, rowIndex)}></i>
          <i
            className="uil uil-trash-alt dept-trash widget-icon bg-danger-lighten text-danger"
            id="delete"
            onClick={() => deleteInterview(row, rowIndex)}
          ></i>
          <UncontrolledTooltip placement="top" target="edit">
                        Edit
                    </UncontrolledTooltip>
          <UncontrolledTooltip placement="top" target="delete">
            Delete
          </UncontrolledTooltip>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (props.interview && !props.interview.interview) {
      props.getInterviewList();
    }
    if(props.interview &&
        props.interview.interview &&
        props.interview.interview.data){
            setData( props.interview.interview.data)
        }
  }, [props.interview &&
    props.interview.interview &&
    props.interview.interview.data]);

  const handleDetailsModal = (row) => {
    setToggleDetailsModal(true);
    setInterviewData(row);
  };
  const closeDetailsModal = () => {
    setToggleDetailsModal(false);
    setInterviewData(null);
  };

  const handleAddEditModal = () => {
    setToggleAddEditModal(true);
    setInterviewData(null);
  };
  const closeAddEditModal = () => {
    setToggleAddEditModal(false);
    setInterviewData(null);
  };

  const edit = (row, index) => {
      setToggleAddEditModal(true)
      setInterviewData(row)
      setIndex(index)
  }

  const deleteInterview = (row, index) => {
    setInterviewData(row);
    setToggleDeleteModal(true);
    setIndex(index);
  };

  const closeDeleteModal = () => {
    setToggleDeleteModal(false);
    setInterviewData(null);
    setIndex(null);
  };

  const interviewChange = (e) => {
         let data=props.interview &&
         props.interview.interview &&
         props.interview.interview.data;
        let filterData;
     if (data) {
       if(e.value!=="all"){
         filterData = (data).filter((item) => item.status === e.value);
             setData(filterData)
       } else {
         filterData = (data)
         setData(filterData)
       }
     }
  };

  return (
    <>
      <Card>
        <CardBody>
          <React.Fragment>
            <Row>
              <Col className="text-right mb-1">
                <Button
                  color="danger"
                  className="mb-2"
                  onClick={() => handleAddEditModal()}
                >
                  <i className="mdi mdi-plus-circle mr-2"></i> Add Candidate
                </Button>
              </Col>
            </Row>
            {/* {props.interview && props.interview.listloading && <LoaderWidget />}
                        {props.interview && props.interview.interview && props.interview.interview.data &&
                            <BootstrapTable
                                bootstrap4
                                keyField={"dep_id"}
                                data={props.interview && props.interview.interview && props.interview.interview.data}
                                columns={columns}
                                pagination={paginationFactory({ sizePerPage: 10 })}
                                wrapperClasses="table-responsive"
                                                        
                                hover
                                condensed
                                noDataIndication={() => "There are no records to display"}
                            />                        
                        } */}

            {props.interview && props.interview.listloading && <LoaderWidget />}
            {props.interview &&
              props.interview.interview &&
              props.interview.interview.data && (
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
                        <Col
                          md={6}
                          className="d-flex justify-content-start flex-column"
                        >
                          <Label for="Search">Search</Label>
                          <SearchBar id="Search" {...props.searchProps} />
                        </Col>
                        <Col>
                          <Form>
                            <FormGroup>
                              <Label for="exampleSelect">
                                Select Intreview Status
                              </Label>
                              <Select
                                type="select"
                                name="Select"
                                id="exampleSelect"
                                onChange={interviewChange}
                                options={offerstatusoptions}
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
              <InterviewDetails
                toggleDetailsModal={toggleDetailsModal}
                closeDetailsModal={closeDetailsModal}
                data={interviewData}
              />
            )}

            {/* Add/Edit Modal */}
            {toggleAddEditModal && (
              <InterviewAddEdit
                toggleAddEditModal={toggleAddEditModal}
                closeAddEditModal={closeAddEditModal}
                emptyAllFields={emptyAllFields}
                data={interviewData}
                index={index}
                interviewAddedSucsess={interviewAddedSucsess}
                interviewUpdated={interviewUpdated}
                getInterviewAdd={props.getInterviewAdd}
                getInterviewUpdate={props.getInterviewUpdate}
                interview={props.interview}
                getInterviewList={props.getInterviewList}
              />
            )}

            {/* Delete Modal */}
            {toggleDeleteModal && (
              <InterviewDelete
                toggleDeleteModal={toggleDeleteModal}
                closeDeleteModal={closeDeleteModal}
                getInterviewDelete={props.getInterviewDelete}
                data={interviewData}
                records={
                  props.interview &&
                  props.interview.interview &&
                  props.interview.interview.data
                }
                index={index}
                interviewDeletedSuccess={interviewDeletedSuccess}
                interview={props.interview}
                getInterviewList={props.getInterviewList}
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
    interview: state.Interview,
  };
};
export default connect(mapStateToProps, {
  getInterviewList,
  getInterviewAdd,
  getInterviewUpdate,
  getInterviewDelete,
})(InterviewConfig);
