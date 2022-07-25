// @flow
import React ,{useState,useEffect} from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { toast, ToastContainer, Zoom } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from '../../components/PageTitle';
import { getLoggedInUser } from '../../helpers/authUtils';
import { connect } from 'react-redux';
import {  getSettingsUpdate } from '../../redux/actions';


const SettingsConfig = (props) => {
    const emptyAllFields = () =>  toast.warning("Please Fill All Fields", { transition: Zoom }) 
    const [passtype,Setpasstype] = useState(false);
    const [username,Setusername] = useState(getLoggedInUser().username);
    const [password,Setpassword] = useState("");
    const togglePassword=()=>{
        Setpasstype(!passtype);
    }
const updateSettings = () => {
    
    if (username && password) {
      
        const data = {
            username: username,
            password: password,          
        }
       
        props.getSettingsUpdate(data);
    
    }
    else{
        {emptyAllFields()};
    }
   
}

    return (
        <React.Fragment>
             <ToastContainer />
            <Row>           

                <Col lg={6}>
                    <Card>
                        <CardBody>
                            <h4 className="header-title mb-3">Credential Settings</h4>
                            <AvForm>
                                <AvGroup className="position-relative">
                                    <Label for="username">User Name</Label>
                                    <AvInput name="firstname" 
                                    placeholder="Enter Username"
                                     id="username" 
                                     value={getLoggedInUser().username}
                                     onChange={(e) => { Setusername(e.target.value) }}
                                     required />
                                    {/* <AvFeedback tooltip>Enter Username</AvFeedback> */}
                                </AvGroup>

                                <AvGroup className="position-relative">
                                    <Label for="password">Password</Label>
                                    <div className="input-group">                         
                                        <AvInput 
                                        type={passtype ? "text" : "password"}
                                        placeholder="Enter Password" 
                                        name="password" 
                                        onChange={(e) => { Setpassword(e.target.value) }}
                                        required 
                                        />
                                        <InputGroupAddon addonType="append">   
                                        <Button  color="dark" onClick={togglePassword}>
                                        <i className={passtype ?"mdi mdi-eye-off":"mdi mdi-eye" }></i>
                                        </Button> 
                                </InputGroupAddon>
                                        {/* <AvFeedback tooltip>Please enter a password.</AvFeedback> */}
                                    </div>
                                </AvGroup>

                                <Button color="danger" onClick={updateSettings}>
                                    Update Credentials
                                </Button>
                            </AvForm>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};
const mapStateToProps = state => {

    return {
        settings: state.Settings,
       
    }
};
export default connect(
    mapStateToProps,
    { getSettingsUpdate }
)(SettingsConfig)
