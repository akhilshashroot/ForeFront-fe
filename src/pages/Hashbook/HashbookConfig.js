import React, { useEffect, useState } from "react";
import { Link, useHistory, Route } from "react-router-dom";
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
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import HashbookDetails from "./HashbookDetails";
import HashbookAddEdit from "./HashbookAdd";
import HashbookDelete from "./HashbookDelete";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "../../assets/scss/toastr.scss"
import { connect } from "react-redux";
import {
  getHashbookList,
  getHashbookAdd,
  getHashbookUpdate,
  getHashbookDelete,
  getHashbookAuthor,
} from "../../redux/actions";
import LoaderWidget from "../../components/Loader";
import Select from "react-select";
import HashbookComment from "./HashbookComment";
import { getLoggedInUser } from "../../helpers/authUtils";

const HashbookConfig = (props) => {
  const hashbookAddedSucsess = () =>
    toast.success("Hashbook Added Successfully", { transition: Zoom });
  const hashbookDeletedSuccess = () =>
    toast.success("Hashbook Deleted Successfully", { transition: Zoom });
  const hashbookUpdated = () =>
    toast.info("Hashbook Updated Successfully", { transition: Zoom });
  const emptyAllFields = () =>
    toast.warning("Please Fill All Fields", { transition: Zoom });

  const history = useHistory();
  const [toggleDetailsModal, setToggleDetailsModal] = useState(false);
  const [toggleAddEditModal, setToggleAddEditModal] = useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
  const [hashbookData, setHashbookData] = useState(null);
  const [index, setIndex] = useState(null);
  const [data, setData] = useState([]);
  const [leavestatusoptions, setleavestatusoptions] = useState();

  const columns = [
    {
      dataField: "id",
      text: "#",
      headerStyle: { width: "10%" },
      headerClasses: "bg-dark text-white py-2",
      sort: true,

      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <p>{row.id}</p>
        </div>
      ),
      // <Link to={`/hashbooks/${row.id}`} >{row.id}</Link>
    },
    {
      dataField: "title",
      text: "Title",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        // < div  style={{lineHeight: "normal",margin:0 }}>
        //         <p id="name">{row.title}</p>

        //     </div>,
        <div>
          {getLoggedInUser().role == "User" ? (
            <Link to={`/employee/hashcomment/${row.id}`}>{row.title}</Link>
          ) : (
            <Link to={`/hashcomment/${row.id}`}>{row.title}</Link>
          )}
        </div>
      ),
    },
    {
      dataField: "Author",
      text: "Author",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <p id="name">{row.Author}</p>
        </div>
      ),
    },
    {
      dataField: "date",
      text: "Date",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <p id="name">{row.date}</p>
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
          <i
            className="uil uil-edit widget-icon mr-2"
            id="edit"
            onClick={() => edit(row, rowIndex)}
          ></i>
          <i
            className="uil uil-trash-alt dept-trash widget-icon bg-danger-lighten text-danger"
            id="delete"
            onClick={() => deleteHashbook(row, rowIndex)}
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
    if (props.hashbook && !props.hashbook.hashbook) {
      props.getHashbookAuthor();

      props.getHashbookList();
    }

    if (
      props.hashbook &&
      props.hashbook.hashbook &&
      props.hashbook.hashbook.data
    ) {
      setData(props.hashbook.hashbook.data);
    }

    if (
      props.hashbook &&
      props.hashbook.hashbookAuthor &&
      props.hashbook.hashbookAuthor.data
    ) {
      setleavestatusoptions(
        props.hashbook.hashbookAuthor.data.map((item) => ({
          value: item.Author,
          label: item.Author,
        }))
      );
      setleavestatusoptions((prevState) => [
        ...prevState,
        { value: "all", label: `All` },
      ]);
    }
  }, [
    props.hashbook && props.hashbook.hashbook && props.hashbook.hashbook.data,
    props.hashbook &&
      props.hashbook.hashbookAuthor &&
      props.hashbook.hashbookAuthor.data,
  ]);

  const handleDetailsModal = (row) => {
    setToggleDetailsModal(true);
    setHashbookData(row);
  };
  const closeDetailsModal = () => {
    setToggleDetailsModal(false);
    setHashbookData(null);
  };

  const handleAddEditModal = () => {
    setToggleAddEditModal(true);
    setHashbookData(null);
  };
  const closeAddEditModal = () => {
    setToggleAddEditModal(false);
    setHashbookData(null);
  };

  const edit = (row, index) => {
    setToggleAddEditModal(true);
    setHashbookData(row);
    setIndex(index);
  };

  const deleteHashbook = (row, index) => {
    setHashbookData(row);
    setToggleDeleteModal(true);
    setIndex(index);
  };

  const closeDeleteModal = () => {
    setToggleDeleteModal(false);
    setHashbookData(null);
    setIndex(null);
  };

  //Search Table
  const { SearchBar } = Search;

  const authorChange = (e) => {
    let data =
      props.hashbook && props.hashbook.hashbook && props.hashbook.hashbook.data;
    let filterData;
    if (data) {
      if (e.value !== "all") {
        filterData = data.filter((item) => item.Author === e.value);
        setData(filterData);
      } else {
        filterData = data;
        setData(filterData);
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
                  <i className="mdi mdi-plus-circle mr-2"></i> Add New Topic
                </Button>
              </Col>
            </Row>
            {props.hashbook && props.hashbook.listloading && <LoaderWidget />}
            {/* {props.hashbook && props.hashbook.hashbook && props.hashbook.hashbook.data &&
                            <BootstrapTable
                                bootstrap4
                                keyField={"dep_id"}
                                data={props.hashbook && props.hashbook.hashbook && props.hashbook.hashbook.data}
                                columns={columns}
                                pagination={paginationFactory({ sizePerPage: 10 })}
                                wrapperClasses="table-responsive"
                                                        
                                hover
                                condensed
                                noDataIndication={() => "There are no records to display"}
                            />                        
                        } */}

            {props.hashbook &&
              props.hashbook.hashbook &&
              props.hashbook.hashbook.data && (
                <ToolkitProvider
                  bootstrap4
                  keyField="id"
                  data={data}
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
                              <Label for="exampleSelect">Select Author</Label>
                              <Select
                                type="select"
                                name="Select"
                                id="exampleSelect"
                                onChange={authorChange}
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
              <HashbookDetails
                toggleDetailsModal={toggleDetailsModal}
                closeDetailsModal={closeDetailsModal}
                data={hashbookData}
              />
            )}

            {/* Add/Edit Modal */}
            {toggleAddEditModal && (
              <HashbookAddEdit
                toggleAddEditModal={toggleAddEditModal}
                closeAddEditModal={closeAddEditModal}
                emptyAllFields={emptyAllFields}
                data={hashbookData}
                index={index}
                hashbookAddedSucsess={hashbookAddedSucsess}
                hashbookUpdated={hashbookUpdated}
                getHashbookAdd={props.getHashbookAdd}
                getHashbookUpdate={props.getHashbookUpdate}
                hashbook={props.hashbook}
                getHashbookList={props.getHashbookList}
              />
            )}

            {/* Delete Modal */}
            {toggleDeleteModal && (
              <HashbookDelete
                toggleDeleteModal={toggleDeleteModal}
                closeDeleteModal={closeDeleteModal}
                getHashbookDelete={props.getHashbookDelete}
                data={hashbookData}
                records={
                  props.hashbook &&
                  props.hashbook.hashbook &&
                  props.hashbook.hashbook.data
                }
                index={index}
                hashbookDeletedSuccess={hashbookDeletedSuccess}
                hashbook={props.hashbook}
                getHashbookList={props.getHashbookList}
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
    hashbook: state.Hashbook,
  };
};
export default connect(mapStateToProps, {
  getHashbookList,
  getHashbookAdd,
  getHashbookUpdate,
  getHashbookDelete,
  getHashbookAuthor,
})(HashbookConfig);
