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
import { getTeamList, getShiftrecordList, getShiftrecordView } from '../../redux/actions';
import DatePicker from 'react-flatpickr';
import HyperDatepicker from '../../components/Datepicker';




const weekDays = {
    'Monday': 1,'Tuesday': 2,'Wednesday': 3,'Thursday': 4,'Friday': 5,'Saturday': 6,
    'Sunday': 7
 };
const ShiftrecordConfig = (props) => {
    const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });

    const [team, setTeam] = useState('');
    const [week, setWeek] = useState('');
    const [datemonth, setDatemonth] = useState('');
    useEffect(() => {
        if (props.team && !props.team.team) {
            props.getTeamList();
        }
        
        // if (props.shiftrecord && !props.shiftrecord.shiftrecord) {
        //     let data = {
        //         team_id: team,
        //     };
        //     props.getShiftrecordList(data);
        // }
    }, []);


    
    let selectRef = null;

    const clearValue = () => {
        selectRef.select.clearValue();
    };
    const columns = [
        {
            dataField: 'att_id',
            text: 'Days',
            headerClasses: 'bg-dark text-white py-2 ',
            sort: true,

            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0,textAlign:'center' }}>
                   <h4>
                   <span className="badge badge-primary w-100">{row[0]}</span>
                   </h4>
                </div>
            ),
        },
        {
            dataField: 'morning',
            text: 'Morning',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row[1][0].users}</p>
                </div>
            ),
        },
        {
            dataField: 'evening',
            text: 'Evening',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row[1][1].users}</p>
                </div>
            ),
        },
        {
            dataField: 'night',
            text: 'Night',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row[1][1].users}</p>
                </div>
            ),
        },
        {
            dataField: 'off',
            text: 'Off',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row[1][3].users}</p>
                </div>
            ),
        },
        {
            dataField: 'off',
            text: 'Comment',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row[3].comment}</p>
                </div>
            ),
        },

      
      
       
       

    
    ];

    const handleTeamChange = (value) => {
        if (value) {
            clearValue();
            props.shiftrecord.shiftrecordView=''
            let data = {
                team_id: value.value,
            };
            props.getShiftrecordList(data);

            setTeam(value.value);
        }
    };
    const handleWeekChange = (value) => {
        if (value) {
            props.shiftrecord.shiftrecordView=''
            setWeek(value.value);
        }
    };
    const handleMonthchange = (value) => {
        let monyear = value.split('-');
        let swap = swapnum(monyear[0], monyear[1]);
        let converteddate = swap.join().replace(/,/g, '');
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
                Data.push({ label: value.name, value: value.team_id });
            });
        return Data;
    };
    const convertWeeklist = (data) => {
        var Data = [];
        data &&
            data.forEach((value) => {
                Data.push({ label: value.date_from + ' to ' + value.date_to, value: value.id });
            });
        return Data;
    };
    const GetShiftrecord = () => {
        if (team !== null && week !== null && team !== '' && week !== '') {
         
                let data = {
                    week_id: week,
                };
     
                props.getShiftrecordView(data);
        
        } else {
            emptyAllFields();
        }
    };
if(props.shiftrecord && props.shiftrecord.shiftrecordView &&props.shiftrecord.shiftrecordView.data &&props.shiftrecord.shiftrecordView.data.shiftdata){
    let newdata=props.shiftrecord &&props.shiftrecord.shiftrecordView &&props.shiftrecord.shiftrecordView.data &&props.shiftrecord.shiftrecordView.data.shiftdata
    let commentdata=props.shiftrecord &&props.shiftrecord.shiftrecordView &&props.shiftrecord.shiftrecordView.data &&props.shiftrecord.shiftrecordView.data.comment
    let creator = props.shiftrecord &&props.shiftrecord.shiftrecordView &&props.shiftrecord.shiftrecordView.data && props.shiftrecord.shiftrecordView.data.created_by
    var result = Object.keys(newdata).map((key) => [(key), newdata[key]]);
    var commentresult = Object.keys(commentdata).map((key) => [(key), commentdata[key]]);

    var newArray = [...result].map((e, i) => e.concat(commentresult[i]));
    var sorted = newArray.sort((a, b) => weekDays[a[0]] - weekDays[b[0]]);

console.log(creator)
    
}
    return (
        <>
            <Card>
                <CardBody>
                    <React.Fragment>
                        <Row>
                            <Col md={4}>
                                <p className="mb-1 font-weight-bold">Select Team</p>
                                <Select
                                    placeholder="Select Team"
                                    isClearable={true}
                                    options={convertRecilist(props.team && props.team.team && props.team.team.data)}
                                    onChange={(e) => {
                                        handleTeamChange(e);
                                    }}
                                    className="react-select mb-3"
                                    classNamePrefix="react-select"></Select>
                            </Col>
                            <Col md={4}>
                                <p className="mb-1 font-weight-bold">Select Week</p>
                                <Select
                                   ref={(ref) => {
                                    selectRef = ref;
                                }}
                                    placeholder="Select Week"
                                    isClearable={true}
                                    options={convertWeeklist(
                                        props.shiftrecord &&
                                            props.shiftrecord.shiftrecord &&
                                            props.shiftrecord.shiftrecord.data
                                    )}
                                    onChange={(e) => {
                                        handleWeekChange(e);
                                    }}
                                    className="react-select mb-3"
                                    classNamePrefix="react-select"></Select>
                            </Col>
                            <Col md={4} className="my-auto">
                                <Button color="danger" onClick={() => GetShiftrecord()}>
                                    Get Shiftrecord Report
                                </Button>
                            </Col>
                        </Row>

                        {props.shiftrecord && props.shiftrecord.listloading && <LoaderWidget />}
                        {props.shiftrecord && props.shiftrecord.shiftrecordView && props.shiftrecord.shiftrecordView.data && (
<>
                            <h4>
                                <span className="badge badge-success">Created By - <b> {props.shiftrecord.shiftrecordView.data.created_by} </b></span>

                            </h4>
                            <BootstrapTable
                                bootstrap4
                                keyField={'dep_id'}
                                data={
                                    sorted
                                }
                                columns={columns}
                                pagination={paginationFactory({ sizePerPage: 10 })}
                                wrapperClasses="table-responsive"
                                hover
                                condensed
                                noDataIndication={() => 'There are no records to display'}
                            />
                            </>
                        )}
                    </React.Fragment>
                </CardBody>
            </Card>
            <ToastContainer />
        </>
    );
};
const mapStateToProps = (state) => {

    return {
        team: state.Team,
        shiftrecord: state.Shiftrecord,
        
    };
};
export default connect(mapStateToProps, { getTeamList, getShiftrecordList, getShiftrecordView })(ShiftrecordConfig);
