import React, { useEffect } from "react";
import { Card, CardBody, Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import { connect } from "react-redux";
import { getSkillUpdate, getSkillList } from "../../redux/actions";

const Skills = (props) => {
  useEffect(() => {
    if (props.worksheet && props.worksheet.skillUpdate) {
      if (
        props.worksheet &&
        props.worksheet.skillUpdate &&
        !props.worksheet.skillUpdate.status
      ) {
        props.getSkillList();
      }
    }
  }, []);

  const statusUpdate = (id) => {
    let data = {
      skill_id: id,
    };
    props.getSkillUpdate(data);
  };

  return (
    <div>
      {props.worksheet &&
        props.worksheet.skill &&
        props.worksheet.skill.data &&
        props.worksheet.skill.data.length !== 0 && (
          <h4 className="header-title">Skills</h4>
        )}

      <Row className="mb-3">
        <Col md={4}>
          {props.worksheet &&
            props.worksheet.skill &&
            props.worksheet.skill.data &&
            props.worksheet.skill.data.length !== 0 &&
            props.worksheet.skill.data.map((item) => (
              <ListGroup key={item.skill_id}>
                <ListGroupItem className="d-flex justify-content-between align-items-center">
                  {item.skill_name}{" "}
                  {item.status == 0 && (
                    <i
                      className="uil uil-check  widget-icon bg-danger-lighten text-danger"
                      onClick={() => statusUpdate(item.skill_id)}
                    ></i>
                  )}
                  {item.status == 1 && (
                    <i className="uil  uil-check widget-icon bg-success-lighten text-success"></i>
                  )}
                </ListGroupItem>
              </ListGroup>
            ))}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    worksheet: state.Worksheet,
  };
};
export default connect(mapStateToProps, { getSkillUpdate, getSkillList })(
  Skills
);
