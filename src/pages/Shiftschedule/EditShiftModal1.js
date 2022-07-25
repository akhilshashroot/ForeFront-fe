import React from "react";
import {
  Button,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Select from "react-select";
import { useEffect, useState } from "react";
import { getLoggedInUser } from "../../helpers/authUtils";

const EditShiftModal = ({ displayModal, toggle1, team, getShiftEdit,editShiftId}) => {
  const [members, setMembers] = useState([]);
  
  const convertEmployee = (data) => {
    var employeeData = [];
    data &&
      data.forEach((value) => {
        employeeData.push({
          label: value.fullname,
          value: value.id,
        });
      });
    return employeeData;
  };

  const membersChange = (e) => {
    let membersData = [];
    e &&
      e.forEach((value) => {
        membersData.push(value.label);
      });

    setMembers(membersData);
  };

  const submit = () => {
    let data = {
      user_id: getLoggedInUser().id,
      users: members,
      shiftId:editShiftId
    };
    getShiftEdit(data);
    toggle1();
  };

  return (
    <Modal isOpen={displayModal} toggle={toggle1} size={"lg"}>
      <ModalHeader toggle={toggle1}>Edit Shift</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="team">Members</Label>

          <Select
            isMulti={true}
            label="team"
            className="react-select mb-3"
            classNamePrefix="react-select"
            options={convertEmployee(team)}
            onChange={(e) => membersChange(e)}
          ></Select>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={submit}>
          Submit
        </Button>{" "}
        <Button color="secondary" onClick={toggle1}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditShiftModal;
