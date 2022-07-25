import React, { Component } from "react";
import { Card, CardBody, Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import { connect } from "react-redux";
import { getSkillUpdate, getSkillList } from "../../redux/actions";

class Skill extends Component {
  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    worksheet: state.Worksheet,
  };
};
export default connect(mapStateToProps, { getSkillUpdate, getSkillList })(
  Skill
);
