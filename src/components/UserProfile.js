import React, { useState, useEffect } from "react";
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
import { connect } from "react-redux";
import { getSettingsUpdate } from "../redux/actions";
import { toast, ToastContainer, Zoom } from "react-toastify";

const UserProfile = ({ toggle, modal, ...props }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    if (props.setting.settingsUpdate) {
      toggle()
    }
  }, [props.setting && props.setting.settingsUpdate]);

  const updateProfile = () => {
    let data = {
      username: name,
      password: password,
    };
    props.getSettingsUpdate(data);
  };

  return (
    <div>
      <Modal toggle={toggle} isOpen={modal} size="lg">
        <ModalHeader toggle={toggle}>User Profile</ModalHeader>
        <ModalBody className="row">
          <FormGroup className="col-lg-6 mx-auto">
            <Label for="Username">Username</Label>

            <Input
              placeholder="Enter Username"
              type="text"
              name="text"
              id="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="col-lg-6 mx-auto">
            <Label for="Password">Password</Label>

            <Input
              placeholder="Enter Password"
              type="password"
              name="text"
              id="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={updateProfile}
            disabled={name === "" || password === ""}
          >
            Update
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <ToastContainer />
    </div>
  );
};

// export default UserProfile;
const mapStateToProps = (state) => {
  return {
    user: state.User,
    setting: state.Settings,
  };
};
export default connect(mapStateToProps, { getSettingsUpdate })(UserProfile);
