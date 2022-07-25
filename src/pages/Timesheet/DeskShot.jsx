import React from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import FileUploaderNew from '../../components/FileUploaderNew';
import { useState } from 'react';
import { getLoggedInUser } from '../../helpers/authUtils';
const DeskShot = (props) => {
    const [files,setFiles]=useState([])
    const uplodScreenShots=()=>{
        if(files?.length>0){
            let formData = new FormData
            formData.append('user_id', getLoggedInUser().id )
            formData.append('screenshots',files[0] )

        props.getDeskshotAdd(formData)
            
        } else{
            props.emptyAllFields('Please Upload Screenshot')
            
        }
    }

    return (
        <Card >
            <CardBody >
                <h4 className="header-title mb-3">Upload Desk ScreenShot</h4>

                <FileUploaderNew
                    onFileUpload={(data) => {
                        setFiles(data)
                    }}
                />
                <div className='text-center w-100 py-2'>
   
                <Button color='danger' className='rounded-pill' onClick={()=>uplodScreenShots()}>Upload ScreenShots</Button>
         
                </div>
             
            </CardBody>
        </Card>
    );
};

export default DeskShot;
