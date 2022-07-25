import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Card, CardBody, Form, FormGroup, Input, Button, UncontrolledTooltip, Label } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderWidget from '../../components/Loader';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getEmployeeList ,getAttendanceList} from '../../redux/actions';
import DatePicker from 'react-flatpickr';
import HyperDatepicker from '../../components/Datepicker';

const AttendanceConfig = (props) => {
    const emptyAllFields = () => toast.warning("Please Fill All Fields", { transition: Zoom })
    useEffect(() => {
        if (props.employee && !props.employee.employee) {
            props.getEmployeeList();
        }
        // if (props.attendance && !props.attendance.attendance) {
        //     props.getAttendanceList(employee,datemonth);
        // }
    }, []);
    const [employee,setEmployee] = useState('');
    const [datemonth,setDatemonth] = useState('');

    const columns = [
     
        {
            dataField: 'SL.NO',
            text: 'SL.NO',
            headerStyle: { width: "5%" },
            headerClasses:"bg-dark text-white py-2 ",
            sort: true,
           
            formatter: (cell, row, rowIndex, formatExtraData) =>
                < div  style={{lineHeight: "normal",margin:0 }}>
                    <p >{rowIndex+1}</p>
                </div>
        },
        {
            dataField: 'punchin_date',
            text: 'Date',
            headerClasses:"bg-dark text-white py-2",
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0 }}>
                    <p id="name">{row.punchin_date}</p>
                
                </div>,
         
            
        },       
           
        {
            dataField: 'punchin',
            text: 'Punchin Time',
            headerClasses:"bg-dark text-white py-2",
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0 }}>
                    <p id="punchin" className=" mb-0">{row.punchin}</p>
                    <h5 id="pip"><span className=" mb-0 badge badge-dark-lighten">{row.punchin_ip }</span></h5>
                
                </div>,
         
            
        },       
        {
            dataField: 'punchout',
            text: 'Punchout Time',
            headerClasses:"bg-dark text-white py-2",
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0 }}>
                    <p id="punchin" className=" mb-0">{row.punchout}</p>
                    <h5 id="pip"><span className=" mb-0 badge badge-dark-lighten">{row.punchout_ip }</span></h5>
                
                </div>,
         
            
        },   
        {
            dataField: 'work_loc',
            text: 'Work Mode',
            headerClasses:"bg-dark text-white py-2",
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0 }}>
                    <p id="name">{row.work_loc}</p>
                
                </div>,
         
            
        },     
        {
            dataField: 'worked_time',
            text: 'Work Time',
            headerClasses:"bg-dark text-white py-2",
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0 }}>
             <h4><span className=" mb-0 badge badge-success">{row.worked_time }</span></h4>
                
                </div>,
         
            
        },     
        {
            dataField: 'total_break',
            text: 'Break Time',
            headerClasses:"bg-dark text-white py-2",
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) =>
            < div  style={{lineHeight: "normal",margin:0 }}>
             <h4><span className=" mb-0 badge badge-warning">{row.total_break }</span></h4>
                
                </div>,
         
            
        },     
        
        // {
        //     dataField: 'actions',
        //     text: 'Actions',
        //     headerStyle: { width: "20%" },
        //     headerClasses:"bg-dark text-white py-2",
        //     formatter: (cell, row, rowIndex, formatExtraData) =>
        //     < div  style={{lineHeight: "normal",margin:0,cursor:"pointer" }}>

        //             <i className="uil uil-edit widget-icon mr-2" id="edit" onClick={() => edit(row, rowIndex)}></i>
        //             <i className="uil uil-trash-alt dept-trash widget-icon bg-danger-lighten text-danger" id="delete" onClick={() => deleteDepartment(row, rowIndex)}></i>
        //             <UncontrolledTooltip placement="top" target="edit">
        //                 Edit
        //             </UncontrolledTooltip>
        //             <UncontrolledTooltip placement="top" target="delete">
        //                 Delete
        //             </UncontrolledTooltip>
        //         </div>
        // }
    ];



    const handleEmployeeChange = (value) => {
        if (value) {
            setEmployee(value.value);
        }
      
    };
    const handleMonthchange = (value) => {
        let monyear = value.split('-');
        let swap = swapnum(monyear[0], monyear[1]);
        let converteddate = (swap.join().replace(/,/g, ''));
       setDatemonth(converteddate);
    };
    const swapnum = (x, y) => {
        var b = y;
        y = x;
        x = b;
        return [x, y];
    };

 
    const convertRecilist = (data) => {
        var Data = [];
        data &&
            data.forEach((value) => {
                Data.push({ label: value.fullname, value: value.id });
            });
        return Data;
    };
const GetAttendance=()=>{
    if(employee !== null && datemonth !== null && employee !== '' && datemonth !== ''){
        let data ={
            user_id:employee,
            month_pick_attendancedat:datemonth
      }
           props.getAttendanceList(data);
    } else{
        emptyAllFields();
    }



}
    return (
        <>
            <Card>
                <CardBody>
                    <React.Fragment>
                        <Row>
                            <Col md={4}>
                                <p className="mb-1 font-weight-bold">Select Employee</p>
                                <Select
                                    placeholder="Select Employee"
                                    isClearable={true}
                                    options={convertRecilist(
                                        props.employee && props.employee.employee && props.employee.employee.data
                                    )}
                                    onChange={(e) => {
                                        handleEmployeeChange(e);
                                    }}
                                    className="react-select mb-3"
                                    classNamePrefix="react-select"></Select>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <p className="mb-1 font-weight-bold">Select Month</p>

                                    <Input
                                        type="month"
                                        name="month"
                                        id="exampleMonth"
                                        defaultValue="YYYY-MM"
                                        placeholder="date month"
                                        onChange={(e) => {
                                            handleMonthchange(e.target.value);
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={4} className="my-auto">
                                <Button color="danger" onClick={()=>GetAttendance()}>Get Attendance Report</Button>
                            </Col>
                        </Row>

                      {props.attendance && props.attendance.listloading && <LoaderWidget />}
                        {props.attendance && props.attendance.attendance && props.attendance.attendance.data &&
                            <BootstrapTable
                                bootstrap4
                                keyField={"dep_id"}
                                data={props.attendance && props.attendance.attendance && props.attendance.attendance.data}
                                columns={columns}
                                pagination={paginationFactory({ sizePerPage: 10 })}
                                wrapperClasses="table-responsive"
                                                        
                                hover
                                condensed
                                noDataIndication={() => "There are no records to display"}
                            />                        
                        }

                    </React.Fragment>
                </CardBody>
            </Card>
            <ToastContainer />
        </>
    );
};
const mapStateToProps = (state) => {
 
    return {
        employee: state.Employee,
        attendance: state.Attendance,
    };
};
export default connect(mapStateToProps, { getEmployeeList , getAttendanceList})(AttendanceConfig);
