import React from 'react';
import { Container } from 'reactstrap';
import logo from './assets/images/logo_sm_dark.png'
const MobileWindow = () => {
    return (
        <Container className="bg-dark text-white text-center w-100  d-flex justify-content-center align-items-center flex-column" style={{height:'100vh'}}>
           <img className='pb-2' src={logo}></img>
            <h2>Access Restricted</h2>
            <small>Please Login with Desktop or Laptop</small>
        </Container>
    );
};

export default MobileWindow;
