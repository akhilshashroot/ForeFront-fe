import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import { getUserList ,getUserUpdate} from "../../redux/actions";
import LoaderWidget from "../../components/Loader";
import { toast, Zoom } from "react-toastify";
import { ToastContainer } from "react-toastify";


const UserprofileDetails = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodgroup, setBloodgroup] = useState("");
  const [certificates, setCertificates] = useState("");

  useEffect(() => {
    props.getUserList();
    setName(
      props.user &&
        props.user.user &&
        props.user.user.data &&
        props.user.user.data.fullname
    );
    // setPassword(
    //   props.user &&
    //     props.user.user &&
    //     props.user.user.data &&
    //     props.user.user.data.fullname
    // );
    setDate(
      props.user &&
        props.user.user &&
        props.user.user.data &&
        props.user.user.data.dob
    );
    setPhone(
      props.user &&
        props.user.user &&
        props.user.user.data &&
        props.user.user.data.phone
    );
    setBloodgroup(
      props.user &&
        props.user.user &&
        props.user.user.data &&
        props.user.user.data.bloodgroup
    );
    setCertificates(
      props.user &&
        props.user.user &&
        props.user.user.data &&
        props.user.user.data.cert_list
    );
  }, [
    props.user &&
      props.user.user &&
      props.user.user.data &&
      props.user.user.data.fullname,
  ]);

  const updateData = () =>{
    if(name!==""){
        const data={
          phone: phone,
          fullname: name,
          dob: date,
          bloodgroup: bloodgroup,
          cert_list: certificates,
          password:password
      }
      props.getUserUpdate(data);
    }else{
      toast.warning("Please Fill All Fields", { transition: Zoom });

    }
  }

  return (
    <>
      <Card>
        {props.user && props.user.listloading ? (
          <LoaderWidget />
        ) : (
          <CardBody>
            <Row>
              <Col md={4}></Col>
              <Col md={4}>
                <div className="text-center">
                  <FormGroup>
                    <Label for="text">Name</Label>
                    <Input
                      type="text"
                      name="text"
                      id="text"
                      defaultValue={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="examplePassword"
                      placeholder="Enter Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="exampleDate">Date</Label>
                    <Input
                      type="date"
                      name="date"
                      id="exampleDate"
                      placeholder="date placeholder"
                      defaultValue={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="text">Phone</Label>
                    <Input
                      type="text"
                      name="text"
                      id="text"
                      defaultValue={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="text">Blood Group</Label>
                    <Input
                      type="text"
                      name="text"
                      id="text"
                      defaultValue={bloodgroup}
                      onChange={(e) => setBloodgroup(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="text">Certificates</Label>
                    <Input
                      type="text"
                      name="text"
                      id="text"
                      defaultValue={certificates}
                      onChange={(e) => setCertificates(e.target.value)}
                    />
                  </FormGroup>
                  <hr />
                  <Button className="btn btn-success" onClick={updateData}>Update</Button>
                </div>
              </Col>
              <Col md={4}></Col>
            </Row>
          </CardBody>
        )}
      </Card>
      <ToastContainer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.User,
  };
};
export default connect(mapStateToProps, { getUserList, getUserUpdate })(UserprofileDetails);
