import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {
  Badge,
  Input,
  ListGroup,
  ListGroupItem,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import Select from "react-select";
import EditShiftModal1 from "./EditShiftModal1";
import SwapShiftModal1 from "./SwapShiftModal1";
import { connect } from "react-redux";
import {
  getFirstShiftEdit,
  getPreviousShift,
  getFirstShiftSwap,
  getSwapDelete,
  getShiftComment,
} from "../../redux/actions";
import EditCommentModal from "./EditCommentModal";

class PreviousShiftTable extends Component {
  state = {
    displayModal: false,
    swapShiftModal: false,
    commentModal: false,
    commentData: "",
    data: [],
    editShiftId: 0,
    swapShiftId: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.shift && this.props.shift.shiftEdit) {
      if (prevProps.shift.shiftEdit !== this.props.shift.shiftEdit) {
        this.toggle1();
      }
    }
    if (this.props.shift && this.props.shift.shiftSwap) {
      if (prevProps.shift.shiftSwap !== this.props.shift.shiftSwap) {
        this.swapModal1();
      }
    }
  }

  toggle = (id) => {
    this.setState({ editShiftId: id });
    this.setState({ displayModal: true });
  };
  toggle1 = () => {
    this.setState({ displayModal: false });
  };

  swapModal = (id) => {
    this.setState({ swapShiftId: id });
    this.setState({ swapShiftModal: true });
  };
  swapModal1 = () => {
    this.setState({ swapShiftModal: false });
  };
  commentModal = (data) => {
    this.setState({ commentModal: true, commentData: data });
  };
  commentModal1 = () => {
    this.setState({ commentModal: false });
  };

  deleteShift = (row) => {
    this.props.getSwapDelete(row.id);
  };

  deleteSwap = (id) => {
    this.props.getSwapDelete(id);
  };

  columns = [
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
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <Input
            value={row?.shift?.filter((e) => e?.shift == "morning")[0]?.users}
            type="text"
          />
          {row?.own_shift == 1 && (
            <div className="d-flex justify-content-around mt-2">
              <button
                className="btn-rounded btn btn-info"
                onClick={() =>
                  this.toggle(
                    row?.shift?.filter((e) => e?.shift == "morning")[0]?.id
                  )
                }
              >
                Edit
              </button>
              <button
                className="btn-rounded btn btn-success"
                onClick={() =>
                  this.swapModal(
                    row?.shift?.filter((e) => e?.shift == "morning")[0]?.id
                  )
                }
              >
                Swap
              </button>
            </div>
          )}

          {row?.shift?.filter((e) => e?.shift == "morning")[0]?.swap?.length !==
            0 && (
            <ListGroup className="mt-2">
              {row.shift
                .filter((e) => e.shift == "morning")[0]
                .swap.map((item, index) => (
                  <ListGroupItem
                    key={index}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {item.swap_user.split("swapped with")[0]}{" "}
                      <i className=" uil-exchange"></i>{" "}
                      {item.swap_user.split("swapped with")[1]}
                    </span>

                    <Badge color="danger" pill>
                      <i
                        className="uil uil-multiply text-white"
                        id="delete"
                        onClick={() => this.deleteSwap(item.id)}
                      ></i>
                      <UncontrolledTooltip placement="top" target="delete">
                        Delete
                      </UncontrolledTooltip>
                    </Badge>
                  </ListGroupItem>
                ))}{" "}
            </ListGroup>
          )}
        </div>
      ),
    },
    {
      dataField: "evening",
      text: "Evening",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <Input
            value={row.shift.filter((e) => e.shift == "evening")[0].users}
            type="text"
          />
          {row?.own_shift == 1 && (
            <div className="d-flex justify-content-around mt-2">
              <button
                className="btn-rounded btn btn-info"
                onClick={() =>
                  this.toggle(
                    row.shift.filter((e) => e.shift == "evening")[0].id
                  )
                }
              >
                Edit
              </button>
              <button
                className="btn-rounded btn btn-success"
                onClick={() =>
                  this.swapModal(
                    row.shift.filter((e) => e.shift == "evening")[0].id
                  )
                }
              >
                Swap
              </button>
            </div>
          )}

          {row.shift.filter((e) => e.shift == "evening")[0].swap.length !==
            0 && (
            <ListGroup className="mt-2">
              {row.shift
                .filter((e) => e.shift == "evening")[0]
                .swap.map((item, index) => (
                  <ListGroupItem
                    key={index}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {item.swap_user.split("swapped with")[0]}{" "}
                      <i className=" uil-exchange"></i>{" "}
                      {item.swap_user.split("swapped with")[1]}
                    </span>

                    <Badge color="danger" pill>
                      <i
                        className="uil uil-multiply text-white"
                        id="delete"
                        onClick={() => this.deleteSwap(item.id)}
                      ></i>
                      <UncontrolledTooltip placement="top" target="delete">
                        Delete
                      </UncontrolledTooltip>
                    </Badge>
                  </ListGroupItem>
                ))}{" "}
            </ListGroup>
          )}
        </div>
      ),
    },
    {
      dataField: "night",
      text: "Night",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <Input
            value={row.shift.filter((e) => e.shift == "night")[0].users}
            type="text"
          />
          {row?.own_shift == 1 && (
            <div className="d-flex justify-content-around mt-2">
              <button
                className="btn-rounded btn btn-info"
                onClick={() =>
                  this.toggle(row.shift.filter((e) => e.shift == "night")[0].id)
                }
              >
                Edit
              </button>
              <button
                className="btn-rounded btn btn-success"
                onClick={() =>
                  this.swapModal(
                    row.shift.filter((e) => e.shift == "night")[0].id
                  )
                }
              >
                Swap
              </button>
            </div>
          )}

          {row.shift.filter((e) => e.shift == "night")[0].swap.length !== 0 && (
            <ListGroup className="mt-2">
              {row.shift
                .filter((e) => e.shift == "night")[0]
                .swap.map((item, index) => (
                  <ListGroupItem
                    key={index}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {item.swap_user.split("swapped with")[0]}{" "}
                      <i className=" uil-exchange"></i>{" "}
                      {item.swap_user.split("swapped with")[1]}
                    </span>

                    <Badge color="danger" pill>
                      <i
                        className="uil uil-multiply text-white"
                        id="delete"
                        onClick={() => this.deleteSwap(item.id)}
                      ></i>
                      <UncontrolledTooltip placement="top" target="delete">
                        Delete
                      </UncontrolledTooltip>
                    </Badge>
                  </ListGroupItem>
                ))}{" "}
            </ListGroup>
          )}
        </div>
      ),
    },
    {
      dataField: "off",
      text: "Off",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <Input
            value={row.shift.filter((e) => e.shift === "off")[0].users}
            type="text"
          />
          {row?.own_shift == 1 && (
            <div className="d-flex justify-content-around mt-2">
              <button
                className="btn-rounded btn btn-info"
                onClick={() =>
                  this.toggle(row.shift.filter((e) => e.shift == "off")[0].id)
                }
              >
                Edit
              </button>
              <button
                className="btn-rounded btn btn-success"
                onClick={() =>
                  this.swapModal(
                    row.shift.filter((e) => e.shift == "off")[0].id
                  )
                }
              >
                Swap
              </button>
            </div>
          )}

          {row.shift.filter((e) => e.shift == "off")[0].swap.length !== 0 && (
            <ListGroup className="mt-2">
              {row.shift
                .filter((e) => e.shift == "off")[0]
                .swap.map((item, index) => (
                  <ListGroupItem
                    key={index}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {item.swap_user.split("swapped with")[0]}{" "}
                      <i className=" uil-exchange"></i>{" "}
                      {item.swap_user.split("swapped with")[1]}
                    </span>

                    <Badge color="danger" pill>
                      <i
                        className="uil uil-multiply text-white"
                        id="delete"
                        onClick={() => this.deleteSwap(item.id)}
                      ></i>
                      <UncontrolledTooltip placement="top" target="delete">
                        Delete
                      </UncontrolledTooltip>
                    </Badge>
                  </ListGroupItem>
                ))}{" "}
            </ListGroup>
          )}
        </div>
      ),
    },
    {
      dataField: "comment",
      text: "Comment",
      headerClasses: "bg-dark text-white py-2",
      style: { width: "10rem" },
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          <Input value={row.comment} type="text" />
          {row?.own_shift == 1 && (
            <div className="d-flex justify-content-around mt-2">
              <button
                className="btn-rounded btn btn-info"
                onClick={
                  () => this.commentModal(row)
                  // row.shift.filter((e) => e.shift == "comment")[0].id
                }
              >
                Edit
              </button>
            </div>
          )}
        </div>
      ),
    },
    {
      dataField: "Actions",
      text: "Actions",
      headerClasses: "bg-dark text-white py-2",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div style={{ lineHeight: "normal", margin: 0 }}>
          {/* <button className="btn btn-success" onClick={() => this.deleteShift(row)}>
            Delete
          </button> */}
        </div>
      ),
    },
  ];

  render() {
    const { data } = this.props;
    return (
      <div>
        {data && (
          <BootstrapTable
            style={{ overflow: "visible" }}
            responsive
            bootstrap4
            keyField={"day"}
            data={data}
            columns={this.columns}
            wrapperClasses="table-responsive"
            hover
            condensed
            noDataIndication={() => "There are no records to display"}
          />
          //    <Table className="mb-0" responsive>
          //    <thead>
          //      <tr>
          //        <th>Day</th>
          //        <th>Morning</th>
          //        <th>Evening</th>
          //        <th>Night</th>
          //        <th>Off</th>
          //        <th>Comment</th>
          //        <th>Action</th>
          //      </tr>
          //    </thead>
          //    <tbody>
          //      {records.map((record, index) => {
          //        return (
          //          <tr key={index}>
          //            <td>{record.id}</td>
          //            <td>
          //              <Input defaultValue={"as"} />
          //              <div className="d-flex justify-content-around mt-2">
          //                <button
          //                  className="btn-rounded btn btn-info"
          //                  onClick={this.toggle}
          //                >
          //                  Edit
          //                </button>
          //                <button
          //                  className="btn-rounded btn btn-success"
          //                  onClick={this.swapModal}
          //                >
          //                  Swap
          //                </button>
          //              </div>
          //            </td>
          //            <td>
          //              <Input defaultValue={"as"} />
          //              <div className="d-flex justify-content-around mt-2">
          //                <button
          //                  className="btn-rounded btn btn-info"
          //                  onClick={this.toggle}
          //                >
          //                  Edit
          //                </button>
          //                <button
          //                  className="btn-rounded btn btn-success"
          //                  onClick={this.swapModal}
          //                >
          //                  Swap
          //                </button>
          //              </div>
          //            </td>
          //            <td>
          //              {" "}
          //              <Input defaultValue={"as"} />
          //              <div className="d-flex justify-content-around mt-2">
          //                <button
          //                  className="btn-rounded btn btn-info"
          //                  onClick={this.toggle}
          //                >
          //                  Edit
          //                </button>
          //                <button
          //                  className="btn-rounded btn btn-success"
          //                  onClick={this.swapModal}
          //                >
          //                  Swap
          //                </button>
          //              </div>
          //            </td>
          //            <td>
          //              {" "}
          //              <Input defaultValue={"as"} />
          //              <div className="d-flex justify-content-around mt-2">
          //                <button
          //                  className="btn-rounded btn btn-info"
          //                  onClick={this.toggle}
          //                >
          //                  Edit
          //                </button>
          //                <button
          //                  className="btn-rounded btn btn-success"
          //                  onClick={this.swapModal}
          //                >
          //                  Swap
          //                </button>
          //              </div>
          //            </td>
          //            <td>
          //              {" "}
          //              <Input defaultValue={"as"} />
          //              <div className="d-flex justify-content-around mt-2">
          //                <button
          //                  className="btn-rounded btn btn-info"
          //                  onClick={this.toggle}
          //                >
          //                  Edit
          //                </button>
          //              </div>
          //            </td>
          //            <td>-</td>
          //          </tr>
          //        );
          //      })}
          //    </tbody>
          //  </Table>
        )}

        <EditShiftModal1
          editShiftId={this.state.editShiftId}
          displayModal={this.state.displayModal}
          toggle1={this.toggle1}
          team={
            this.props.team && this.props.team.team && this.props.team.team.data
          }
          getShiftEdit={this.props.getFirstShiftEdit}
          getPreviousShift={this.props.getPreviousShift}
        />
        <SwapShiftModal1
          swapShiftModal={this.state.swapShiftModal}
          swapModal1={this.swapModal1}
          team={
            this.props.team && this.props.team.team && this.props.team.team.data
          }
          swapShiftId={this.state.swapShiftId}
          getShiftSwap={this.props.getFirstShiftSwap}
        />
        <EditCommentModal
          commentModal={this.state.commentModal}
          commentModal1={this.commentModal1}
          commentData={this.state.commentData}
          getShiftComment={this.props.getShiftComment}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    team: state.Shift,
    shift: state.Shift,
    user: state.User,
  };
};
export default connect(mapStateToProps, {
  getFirstShiftEdit,
  getFirstShiftSwap,
  getPreviousShift,
  getSwapDelete,
  getShiftComment,
})(PreviousShiftTable);
