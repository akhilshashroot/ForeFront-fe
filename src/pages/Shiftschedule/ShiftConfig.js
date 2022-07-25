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
import cellEditFactory from "react-bootstrap-table2-editor";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "../../assets/scss/toastr.scss"
import { connect } from "react-redux";
import {
  getTeamMembersList,
  getUserList,
  getWeeksList,
  getShiftCreate,
  getPreviousShift,
  getPreviewShift,
} from "../../redux/actions";
import LoaderWidget from "../../components/Loader";
import { Type } from "react-bootstrap-table2-editor";
import Select from "react-select";
import PreviousShiftModal from "./PreviousShiftModal";
import { getLoggedInUser } from "../../helpers/authUtils";
import "./style.scss";
import PreviousShiftTable1 from "./PreviousShiftTable1";
import PreviousShiftTable from "./PreviousShiftTable";
import ShiftConfigCreate from "./ShiftConfigCreate";
const ShiftConfig = (props) => {
  const departmentAddedSucsess = () =>
    toast.success("Department Added Successfully", { transition: Zoom });
  const departmentDeletedSuccess = () =>
    toast.success("Department Deleted Successfully", { transition: Zoom });
  const departmentUpdated = () =>
    toast.info("Department Updated Successfully", { transition: Zoom });
  const emptyAllFields = (msg) => toast.warning(msg, { transition: Zoom });
  const shifts = ["morning_shift", "evening_shift", "night_shift", "off"];
  const intialArray = (val) => {
    let newData = shifts.map((e) => {
      return { day: val, val: e + "[]", member: "-" };
    });
    return newData;
  };
  const history = useHistory();
  const [shiftTable, setShiftTable] = useState(false);
  const [previousTable, setPreviousTable] = useState(false);
  const [currentTable, setCurrentTable] = useState(false);
  const [newTable, setNewTable] = useState(true);
  const [toggleDetailsModal, setToggleDetailsModal] = useState(false);
  const [toggleAddEditModal, setToggleAddEditModal] = useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
  const [departmentData, setDepartmentData] = useState(null);
  const [mondayData, setMondayData] = useState(intialArray("Monday"));

  const [tuesdayData, setTuesdayData] = useState(intialArray("Tuesday"));
  const [wednesdayData, setWednesdayData] = useState(intialArray("Wednesday"));
  const [thursdayData, setThursdayData] = useState(intialArray("Thursday"));
  const [fridayData, setFridayData] = useState(intialArray("Friday"));
  const [saturdayData, setSaturdayData] = useState(intialArray("Saturday"));
  const [sundayData, setSundayData] = useState(intialArray("Sunday"));
  const [index, setIndex] = useState(null);
  const [modal, setModal] = useState(false);
  const [submitData, setSubmitData] = useState();
  const [prevDate, setPrevdate] = useState();
  useEffect(() => {
    if (props.user?.user) {
      props.getUserList();
    }
    if (props.user?.user?.data) {
      props.getTeamMembersList({ teamid: props.user?.user?.data?.team_id });
    }
    if (props.user?.user?.data?.team_id) {
      props.getPreviewShift(props.user?.user?.data.team_id);
      props.getWeeksList(props.user?.user?.data.team_id);
    }
  }, [props.user?.user?.data?.team_id]);

  const toggle = () => {
    setPreviousTable(true);
    setShiftTable(false);
    setModal(true);
  };
  const toggle1 = () => {
    setModal(false);
    setShiftTable(false);
    setCurrentTable(true);
  };

  const convertTeams = (data) => {
    var categroyData = [];
    data &&
      data.forEach((value) => {
        categroyData.push({
          label: value.fullname,
          value: value.id,
        });
      });
    return categroyData;
  };

  const previousShift = (e) => {
    setShiftTable(false);
    setPrevdate(e);
    toggle1();
    props.getPreviousShift(e);
  };

  const handleChange = (e, val, day) => {
    if (e !== null) {
      if (day == "Monday") {
        let preData = mondayData.findIndex((m) => m.val === val);
        if (preData !== -1) {
          let copy = [...mondayData];
          let newData = {
            day: day,
            val: val,
            member: val === "comment" ? e : e.label,
          };
          copy[preData] = newData;
          setMondayData([...copy]);
        } else {
          let newData = [
            { day: day, val: val, member: val === "comment" ? e : e.label },
          ];
          setMondayData([...mondayData, ...newData]);
        }
      } else if (day == "Tuesday") {
        let preData = tuesdayData.findIndex((m) => m.val === val);
        if (preData !== -1) {
          let copy = [...tuesdayData];
          let newData = { day: day, val: val, member: e.label };
          copy[preData] = newData;
          setTuesdayData([...copy]);
        } else {
          let newData = [{ day: day, val: val, member: e.label }];
          setTuesdayData([...tuesdayData, ...newData]);
        }
      } else if (day == "Wednesday") {
        let preData = wednesdayData.findIndex((m) => m.val === val);
        if (preData !== -1) {
          let copy = [...wednesdayData];
          let newData = { day: day, val: val, member: e.label };
          copy[preData] = newData;
          setWednesdayData([...copy]);
        } else {
          let newData = [{ day: day, val: val, member: e.label }];
          setWednesdayData([...wednesdayData, ...newData]);
        }
      } else if (day == "Thursday") {
        let preData = thursdayData.findIndex((m) => m.val === val);
        if (preData !== -1) {
          let copy = [...thursdayData];
          let newData = { day: day, val: val, member: e.label };
          copy[preData] = newData;
          setThursdayData([...copy]);
        } else {
          let newData = [{ day: day, val: val, member: e.label }];
          setThursdayData([...thursdayData, ...newData]);
        }
      } else if (day == "Friday") {
        let preData = fridayData.findIndex((m) => m.val === val);
        if (preData !== -1) {
          let copy = [...fridayData];
          let newData = { day: day, val: val, member: e.label };
          copy[preData] = newData;
          setFridayData([...copy]);
        } else {
          let newData = [{ day: day, val: val, member: e.label }];
          setFridayData([...fridayData, ...newData]);
        }
      } else if (day == "Saturday") {
        let preData = saturdayData.findIndex((m) => m.val === val);
        if (preData !== -1) {
          let copy = [...fridayData];
          let newData = { day: day, val: val, member: e.label };
          copy[preData] = newData;
          setSaturdayData([...copy]);
        } else {
          let newData = [{ day: day, val: val, member: e.label }];
          setSaturdayData([...fridayData, ...newData]);
        }
      } else if (day == "Sunday") {
        let preData = sundayData.findIndex((m) => m.val === val);
        if (preData !== -1) {
          let copy = [...sundayData];
          let newData = { day: day, val: val, member: e.label };
          copy[preData] = newData;
          setSundayData([...copy]);
        } else {
          let newData = [{ day: day, val: val, member: e.label }];
          setSundayData([...sundayData, ...newData]);
        }
      }
    }
  };

  const getDropDown = (value, day) => {
    if (value === "comment") {
      return (
        <input
          onChange={(e) => handleChange(e.target.value, value, day)}
          type="text"
          className="form-control"
          placeholder="Enter Comments"
        />
      );
    } else {
      return (
        <Select
          isSearchable={true}
          isClearable={false}
          onChange={(e) => handleChange(e, value, day)}
          placeholder={`Select Member`}
          className="react-select"
          classNamePrefix="react-select"
          options={convertTeams(props.shift?.team?.data)}
        ></Select>
      );
    }
  };
  console.log(
    "🚀  file: ShiftConfig.js  line 76  ShiftConfig  prevDate",
    prevDate
  );

  const data = [
    {
      day: "Monday",
      morning: getDropDown("morning_shift[]", "Monday"),
      evening: getDropDown("evening_shift[]", "Monday"),
      night: getDropDown("night_shift[]", "Monday"),
      off: getDropDown("off[]", "Monday"),
      comment: getDropDown("comment", "Monday"),
    },
    {
      day: "Tuesday",
      morning: getDropDown("morning_shift[]", "Tuesday"),
      evening: getDropDown("evening_shift[]", "Tuesday"),
      night: getDropDown("night_shift[]", "Tuesday"),
      off: getDropDown("off[]", "Tuesday"),
      comment: getDropDown("comment", "Tuesday"),
    },
    {
      day: "Wednesday",
      morning: getDropDown("morning_shift[]", "Wednesday"),
      evening: getDropDown("evening_shift[]", "Wednesday"),
      night: getDropDown("night_shift[]", "Wednesday"),
      off: getDropDown("off[]", "Wednesday"),
      comment: getDropDown("comment", "Wednesday"),
    },
    {
      day: "Thursday",
      morning: getDropDown("morning_shift[]", "Thursday"),
      evening: getDropDown("evening_shift[]", "Thursday"),
      night: getDropDown("night_shift[]", "Thursday"),
      off: getDropDown("off[]", "Thursday"),
      comment: getDropDown("comment", "Thursday"),
    },
    {
      day: "Friday",
      morning: getDropDown("morning_shift[]", "Friday"),
      evening: getDropDown("evening_shift[]", "Friday"),
      night: getDropDown("night_shift[]", "Friday"),
      off: getDropDown("off[]", "Friday"),
      comment: getDropDown("comment", "Friday"),
    },
    {
      day: "Saturday",
      morning: getDropDown("morning_shift[]", "Saturday"),
      evening: getDropDown("evening_shift[]", "Saturday"),
      night: getDropDown("night_shift[]", "Saturday"),
      off: getDropDown("off[]", "Saturday"),
      comment: getDropDown("comment", "Saturday"),
    },
    {
      day: "Sunday",
      morning: getDropDown("morning_shift[]", "Sunday"),
      evening: getDropDown("evening_shift[]", "Sunday"),
      night: getDropDown("night_shift[]", "Sunday"),
      off: getDropDown("off[]", "Sunday"),
      comment: getDropDown("comment", "Sunday"),
    },
  ];

  const columns = [
    {
      dataField: "Day",
      text: "Day",
      // headerStyle: { width: "10%" },
      headerClasses: "bg-dark text-white py-2",
      sort: true,

      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <p>{row.day}</p>
        </div>
      ),
    },

    {
      dataField: "morning",
      text: "Morning",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>{row.morning}</div>
      ),
    },
    {
      dataField: "evening",
      text: "Evening",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>{row.evening}</div>
      ),
    },
    {
      dataField: "night",
      text: "Night",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>{row.night}</div>
      ),
    },
    {
      dataField: "off",
      text: "Off",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>{row.off}</div>
      ),
    },
    {
      dataField: "comment",
      text: "Comment",
      headerClasses: "bg-dark text-white py-2",
      style: { width: "10rem" },
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>{row.comment}</div>
      ),
    },
    {
      dataField: "Actions",
      text: "Actions",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <button
            className="btn btn-success"
            onClick={() => submit(row, rowIndex)}
          >
            Send
          </button>
        </div>
      ),
    },

    // {
    //   dataField: "actions",
    //   text: "Actions",
    //   headerStyle: { width: "20%" },
    //   headerClasses: "bg-dark text-white py-2",
    //   formatter: (cell, row, rowIndex, formatExtraData) => (
    //     <div style={{ lineHeight: "normal", margin: 0 }}>
    //       <button
    //         className="btn btn-success"
    //         onClick={() => submit(row, rowIndex)}
    //       >
    //         Send
    //       </button>

    //     </div>
    //   ),
    // },
  ];

  const submit = (row, index) => {
    if (row.day === "Monday") {
      if (mondayData.length > 0) {
        let data = mondayData.reduce(
          (a, v) => ({ ...a, [v.val]: v.member }),
          {}
        );
        data.user_id = getLoggedInUser().id;
        data.day = "Monday";
        data.team_id = props.user?.user?.data?.team_id;
        props.getShiftCreate(data);
      } else {
        emptyAllFields("Please Assign Members");
      }
    }
    if (row.day === "Tuesday") {
      if (tuesdayData.length > 0) {
        let data = tuesdayData.reduce(
          (a, v) => ({ ...a, [v.val]: v.member }),
          {}
        );
        data.user_id = getLoggedInUser().id;
        data.day = "Tuesday";
        data.team_id = props.user?.user?.data?.team_id;
        props.getShiftCreate(data);
      } else {
        emptyAllFields("Please Assign Members");
      }
    }
    if (row.day === "Wednesday") {
      if (wednesdayData.length > 0) {
        let data = wednesdayData.reduce(
          (a, v) => ({ ...a, [v.val]: v.member }),
          {}
        );
        data.user_id = getLoggedInUser().id;
        data.day = "Wednesday";
        data.team_id = props.user?.user?.data?.team_id;
        props.getShiftCreate(data);
      } else {
        emptyAllFields("Please Assign Members");
      }
    }
    if (row.day === "Thursday") {
      if (thursdayData.length > 0) {
        let data = thursdayData.reduce(
          (a, v) => ({ ...a, [v.val]: v.member }),
          {}
        );
        data.user_id = getLoggedInUser().id;
        data.day = "Thursday";
        data.team_id = props.user?.user?.data?.team_id;
        props.getShiftCreate(data);
      } else {
        emptyAllFields("Please Assign Members");
      }
    }
    if (row.day === "Friday") {
      if (fridayData.length > 0) {
        let data = fridayData.reduce(
          (a, v) => ({ ...a, [v.val]: v.member }),
          {}
        );
        data.user_id = getLoggedInUser().id;
        data.day = "Friday";
        data.team_id = props.user?.user?.data?.team_id;
        props.getShiftCreate(data);
      } else {
        emptyAllFields("Please Assign Members");
      }
    }
    if (row.day === "Saturday") {
      if (saturdayData.length > 0) {
        let data = saturdayData.reduce(
          (a, v) => ({ ...a, [v.val]: v.member }),
          {}
        );
        data.user_id = getLoggedInUser().id;
        data.day = "Saturday";
        data.team_id = props.user?.user?.data?.team_id;
        props.getShiftCreate(data);
      } else {
        emptyAllFields("Please Assign Members");
      }
    }
    if (row.day === "Sunday") {
      if (sundayData.length > 0) {
        let data = sundayData.reduce(
          (a, v) => ({ ...a, [v.val]: v.member }),
          {}
        );
        data.user_id = getLoggedInUser().id;
        data.day = "Sunday";
        data.team_id = props.user?.user?.data?.team_id;
        props.getShiftCreate(data);
      } else {
        emptyAllFields("Please Assign Members");
      }
    }
  };

  const handleDetailsModal = (row) => {
    setToggleDetailsModal(true);
    setDepartmentData(row);
  };
  const closeDetailsModal = () => {
    setToggleDetailsModal(false);
    setDepartmentData(null);
  };

  const handleAddEditModal = () => {
    setToggleAddEditModal(true);
    setDepartmentData(null);
  };
  const closeAddEditModal = () => {
    setToggleAddEditModal(false);
    setDepartmentData(null);
  };

  const edit = (row, index) => {
    setToggleAddEditModal(true);
    setDepartmentData(row);
    setIndex(index);
  };

  const deleteDepartment = (row, index) => {
    setDepartmentData(row);
    setToggleDeleteModal(true);
    setIndex(index);
  };

  const closeDeleteModal = () => {
    setToggleDeleteModal(false);
    setDepartmentData(null);
    setIndex(null);
  };

  return (
    <>
      <Card>
        <CardBody>
          <Row>
            <Col className="text-right mb-1">
              <Button
                color="success"
                className="mb-2"
                onClick={() => {
                  setShiftTable(true);
                  setPreviousTable(false);
                  setCurrentTable(true);
                }}
              >
                Create Shift
              </Button>
              <Button color="danger" className="mb-2 " onClick={toggle}>
                Previous Shift
              </Button>
            </Col>
          </Row>
          <PreviousShiftModal
            modal={modal}
            toggle1={toggle1}
            previousShift={previousShift}
          />
          {shiftTable && <ShiftConfigCreate />}
          {!currentTable  && props?.shift?.previewShift?.data && (
            <PreviousShiftTable1
              data={
                props.shift &&
                props?.shift?.previewShift &&
                props?.shift?.previewShift.data
              }
            />
          )}

          {previousTable && (
            <PreviousShiftTable
              data={props.shift && props?.shift?.getPreviousShift?.data}
            />
          )}
        </CardBody>
      </Card>
      <ToastContainer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.User,
    shift: state.Shift,
  };
};
export default connect(mapStateToProps, {
  getTeamMembersList,
  getUserList,
  getWeeksList,
  getShiftCreate,
  getPreviousShift,
  getPreviewShift,
})(ShiftConfig);