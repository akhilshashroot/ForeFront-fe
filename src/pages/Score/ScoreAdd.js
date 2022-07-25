import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { getLoggedInUser } from "../../helpers/authUtils";
import { getPEDataList } from "../../redux/actions";
import { connect } from "react-redux";
import LoaderWidget from "../../components/Loader";


const ScoreAdd = ({ toggle, modal, data, score,...props }) => {
  useEffect(() => {
    if (modal===true) {

      let s = {
        user_id: getLoggedInUser().id,
        field: data.Criteria,
        performance_id: score.score.data.performance_id,
      };
      props.getPEDataList(s);

    }
  }, [data && data.Criteria]);

  return (
    <Card>
      <CardBody>
        <Modal toggle={toggle} isOpen={modal}>
        {score && score.peDataloading && <LoaderWidget />}

          <ModalHeader toggle={toggle}>Client Review</ModalHeader>
          <ModalBody>

          {score && score.PEData && score.PEData.data && score.PEData.data.length==0 ? <p>No Data</p> :(
            score && score.PEData && score.PEData.data.map((item,index)=>(
              <ListGroup key={index}>
              <ListGroupItem >
                  <ListGroupItemHeading className="text-left">Score : {item.score}</ListGroupItemHeading>
                  <ListGroupItemHeading className="text-left">Date : {item.date}</ListGroupItemHeading>
                  <ListGroupItemText>
                    Comment: {item.comment}
                  </ListGroupItemText>
              </ListGroupItem>
              
            </ListGroup>
            ))
         
          )}
                
        

          </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" onClick={toggle}>
              Do Something
            </Button>{" "} */}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </CardBody>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    score: state.Score,
  };
};
export default connect(mapStateToProps, {
  getPEDataList,
})(ScoreAdd);
