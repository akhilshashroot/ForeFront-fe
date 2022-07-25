import React, { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const EditCommentModal = ({ commentModal, commentModal1, commentData,getShiftComment }) => {
  const [data, setData] = useState("");

  const updateComment = () =>{
    let send={
      comment:data,
      id:commentData.id
    }
    getShiftComment(send);
    commentModal1();
  }

  useEffect(()=>{
    setData(commentData.comment)
  },[commentData])

  return (
    <div>
      <Modal isOpen={commentModal} toggle={commentModal1} size={"lg"}>
        <ModalHeader toggle={commentModal1}>Edit Comment</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="exampleText">Comment</Label>
            <Input
              type="textarea"
              name="text"
              id="exampleText"
              rows="5"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={updateComment}>Submit</Button>{" "}
          <Button color="secondary" onClick={commentModal1}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditCommentModal;
