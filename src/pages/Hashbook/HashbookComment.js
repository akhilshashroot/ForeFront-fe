import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
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
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
  getHashbookCommentAdd,
  getHashbookCommentDetails,
} from "../../redux/actions";
import LoaderWidget from "../../components/Loader";
import Select from "react-select";
import { AvForm, AvField } from "availity-reactstrap-validation";

import SimpleMDEReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { getLoggedInUser } from "../../helpers/authUtils";
import HashbookSubTopic from "./HashbookSubTopic";

const delay = 1000;
const options = {
  autosave: {
    enabled: false,
    uniqueId: 1,
    delay,
  },
};

const HashbookComment = (props) => {
  const hashbookAddedSucsess = () =>
    toast.success("Hashbook Added Successfully", { transition: Zoom });
  const hashbookDeletedSuccess = () =>
    toast.success("Hashbook Deleted Successfully", { transition: Zoom });
  const hashbookUpdated = () =>
    toast.info("Hashbook Updated Successfully", { transition: Zoom });
  const emptyAllFields = () =>
    toast.warning("Please Fill All Fields", { transition: Zoom });
  const params = useParams();
  const history = useHistory();
  const [toggleDetailsModal, setToggleDetailsModal] = useState(false);
  const [toggleAddEditModal, setToggleAddEditModal] = useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
  const [hashbookData, setHashbookData] = useState(null);
  const [index, setIndex] = useState(null);
  const [data, setData] = useState([]);
  const [leavestatusoptions, setleavestatusoptions] = useState();
  const [hashbokDetails, sethashbookDetails] = useState({});
  const [topic, setTopic] = useState("");
  const [subTopic, setsubTopic] = useState(false);
  const [modal, setmodal] = useState(false);
  /**
   * Show/hide the modal
   */
  /*:: toggle: () => void */
  const toggle = () => {
    setmodal(true);
  };

  const toggle1 = () => {
    setmodal(false);
  };

  const openModalWithSize = () => {
    toggle();
  };

  useEffect(() => {
    if (props.hashbook && !props.hashbook.hashbook) {
      //   props.getHashbookAuthor();

      props.getHashbookList();
    }

    if (
      props.hashbook &&
      props.hashbook.hashbookCommentDetails &&
      props.hashbook.hashbookCommentDetails.data &&
      props.hashbook.hashbookCommentDetails.data.discussion &&
      props.hashbook.hashbookCommentDetails.data.discussion !== 0
    ) {
      setsubTopic(true);
    }

    if (
      props.hashbook &&
      props.hashbook.hashbook &&
      props.hashbook.hashbook.data
    ) {
      setData(props.hashbook.hashbook.data);
      if (data.lenth !== 0) {
        let see = props.hashbook.hashbook.data.filter(
          (item) => item.id == params.id
        );
        if (see[0]) {
          sethashbookDetails(see[0]);
          let data = {
            topicid: see[0].id,
            userid: getLoggedInUser().id,
          };
          props.getHashbookCommentDetails(data);
        }
      }
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
    if (params.id) {
      let data = {
        topicid: params.id,
        userid: getLoggedInUser().id,
      };
      props.getHashbookCommentDetails(data);
    }
    // if(props.hashbook.hashbookSubTopicAdd){
    //   props.history.push('/employee/hashbook');
    //   console.log("in")
    // }
  }, [
    props.hashbook && props.hashbook.hashbook && props.hashbook.hashbook.data,
    props.hashbook &&
      props.hashbook.hashbookAuthor &&
      props.hashbook.hashbookAuthor.data,
    props.hashbook &&
      props.hashbook.hashbookCommentDetails &&
      props.hashbook.hashbookCommentDetails.data &&
      props.hashbook.hashbookCommentDetails.data.discussion &&
      props.hashbook.hashbookCommentDetails.data.discussion !== 0,
    params,
    props.hashbook.hashbookSubTopicAdd,
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

  const handleTopicChange = (e) => {
    setTopic(e);
  };

  const createComment = () => {
    if (topic !== null && topic !== "") {
      let id = params.id;

      let data = {
        user_id: getLoggedInUser().id,
        title: topic,
        discussion_id: id,
      };
      props.getHashbookCommentAdd(data);
      props.getHashbookList();
    }
  };

  return (
    <>
      <Card>
        <CardBody>
          {props.hashbook && props.hashbook.loading && <LoaderWidget /> && (
            <LoaderWidget />
          )}

          <h3>{hashbokDetails.title}</h3>
          <Row>
            <Col md={9}>
              {subTopic &&
                props.hashbook.hashbookCommentDetails.data.discussion.map(
                  (item) => (
                    <ListGroup key={item.id}>
                      <ListGroupItem>
                        <ListGroupItemHeading>
                          <p className="text-muted">
                            {" "}
                            {item.name} / {item.date}{" "}
                          </p>{" "}
                          <br />
                          {item.title}
                        </ListGroupItemHeading>
                      </ListGroupItem>
                    </ListGroup>
                  )
                )}
            </Col>
            <Col md={3}>
              <p className="text-primary">Created On: {hashbokDetails.date}</p>
              <p className="text-info">Created By: {hashbokDetails.Author}</p>

              <Button color="info" onClick={openModalWithSize}>
                New Sub Topic
              </Button>
            </Col>
            <Col>
              <Row md={9}></Row>
              <Row md={3}>
                {subTopic &&
                  props?.hashbook?.hashbookCommentDetails?.data?.subtitles &&
                  props?.hashbook?.hashbookCommentDetails?.data?.subtitles.map(
                    (item, index) => (
                      <div key={index}>
                        {getLoggedInUser().role == "User" ? (
                          <Link to={`/employee/hashcomment/${item.id}`}>
                            {item.sub_topic}
                          </Link>
                        ) : (
                          <Link to={`/hashcomment/${item.id}`}>
                            {item.sub_topic}
                          </Link>
                        )}
                      </div>
                    )
                  )}
              </Row>
            </Col>
          </Row>
          <Row className="pt-2">
            <h4>Post Your Comment</h4>
            <Col md={12}>
              <AvForm>
                <SimpleMDEReact
                  id={1}
                  options={options}
                  onChange={handleTopicChange}
                  value={topic || ""}
                />
              </AvForm>
              {/* <Button color="danger" >
                                    Cancel
                                </Button> */}
              <Button
                color="success"
                onClick={createComment}
                disabled={topic == "" || topic == null}
              >
                Create
              </Button>
            </Col>
          </Row>
          {toggle && (
            <HashbookSubTopic toggle={toggle} toggle1={toggle1} modal={modal} />
          )}
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
  getHashbookCommentAdd,
  getHashbookCommentDetails,
})(HashbookComment);
