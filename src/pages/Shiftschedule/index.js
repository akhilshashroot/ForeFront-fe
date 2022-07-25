import React from "react";
import PageTitle from "../../components/PageTitle";
import ShiftConfig from "./ShiftConfig";
import { connect } from "react-redux";
import { getPreviewShift, getUserList } from "../../redux/actions";
import ShiftConfigCreate from "./ShiftConfigCreate";
import PreviousShiftTable from "./PreviousShiftTable";

class ShiftSchedule extends React.Component {
  componentDidMount() {
    if (this.props.user?.user) {
      this.props.getUserList();
    }
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.user?.user?.data !== this.props.user?.user?.data) {
      if (this.props.user?.user?.data?.team_id) {
        this.props.getPreviewShift(this.props.user?.user?.data.team_id);
      }
    }
    if (this.props.shift && this.props.shift.firstShiftEdit) {
      if (prevProps.shift.firstShiftEdit !== this.props.shift.firstShiftEdit) {
        this.props.getPreviewShift(this.props.user?.user?.data.team_id);
      }
    }
    if (this.props.shift && this.props.shift.firstShiftSwap) {
      if (prevProps.shift.firstShiftSwap !== this.props.shift.firstShiftSwap) {
        this.props.getPreviewShift(this.props.user?.user?.data.team_id);
      }
    }
  };

  render() {
    console.log(
      "🚀 ~ file: index.js ~ line 28 ~ ShiftSchedule ~ render ~ this.props?.shift?.previewShift?.data ",
      this.props?.shift?.previewShift?.data
    );
    return (
      <>
        <PageTitle
          breadCrumbItems={[{ label: "Shift Schedule", active: true }]}
          title={"Shift Schedule"}
        />
        {this.props?.shift?.previewShift?.data ? (
          <ShiftConfig />
        ) : (
          <ShiftConfigCreate />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.User,
    shift: state.Shift,
  };
};
export default connect(mapStateToProps, {
  getUserList,
  getPreviewShift,
})(ShiftSchedule);
