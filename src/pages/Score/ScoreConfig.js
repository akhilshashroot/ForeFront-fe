import React, { useEffect, useState } from "react";

import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "../../assets/scss/toastr.scss"
import { connect } from "react-redux";
import {
  getScoreList,
  getScoreAdd,
  getScoreUpdate,
  getScoreDelete,
} from "../../redux/actions";
import LoaderWidget from "../../components/Loader";
import PETable from "./PETable";
import IETable from "./IETable";
import CETable from "./CETable";
import EvaluationHistory from "./EvaluationHistory";

const ScoreConfig = (props) => {


  useEffect(() => {
    if (props.score && !props.score.score) {
      props.getScoreList();
    }
  }, [props.score && props.score.score && props.score.score.data]);

 

  return (
    <>
      <PETable />
      <IETable />
      <CETable />
      <ToastContainer />
      <EvaluationHistory />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    score: state.Score,
  };
};
export default connect(mapStateToProps, {
  getScoreList,
  getScoreAdd,
  getScoreUpdate,
  getScoreDelete,
})(ScoreConfig);
