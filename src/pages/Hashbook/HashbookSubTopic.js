import React, { useState } from "react";
import {
  FormGroup,
  Input,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import SimpleMDEReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useParams } from "react-router-dom";

import { connect } from "react-redux";
import { getHashbookSubTopicAdd } from "../../redux/actions";

const delay = 1000;
const options = {
  autosave: {
    enabled: false,
    uniqueId: 1,
    delay,
  },
};

const HashbookSubTopic = ({ toggle1, modal, getHashbookSubTopicAdd }) => {
  const { id } = useParams();
  const [text, setText] = useState("");

  const createSubTopic = () => {
    let send = {
      user_id: 5,
      title: text,
      discussion_id: id,
    };
    getHashbookSubTopicAdd(send);
    toggle1();
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle1} size={"lg"}>
        <ModalHeader toggle={toggle1}>New Sub Topic</ModalHeader>
        <ModalBody>
          {/* <Row>
            <Col md={12}>
              <AvForm>
                <SimpleMDEReact
                  id={1}
                  options={options}
                  onChange={handleTopicChange}
                  value={topic || ""}
                />
              </AvForm>
             
            </Col>
          </Row> */}
          {/* <SimpleMDEReact
              id={1}
              options={options}
              onChange={handleTopicChange}
              value={topic || ""}
            /> */}
          <FormGroup>
            <Label for="exampleText">Post Your New Topic</Label>
            <Input
              type="textarea"
              name="text"
              id="exampleText"
              rows="5"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={createSubTopic} disabled={text==""}>
            Create
          </Button>{" "}
          <Button color="secondary" onClick={toggle1}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    hashbook: state.Hashbook,
  };
};
export default connect(mapStateToProps, {
  getHashbookSubTopicAdd,
})(HashbookSubTopic);
