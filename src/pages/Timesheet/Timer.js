// @flow
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Select from 'react-select';
import {
    Card,
    CardBody,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Col,
    Button,
    Spinner,
} from 'reactstrap';
import { getLoggedInUser } from '../../helpers/authUtils';

import './styles.css';

const punchinoptions = [
    { value: '1', label: 'Regular' },
    { value: '2', label: 'Work From Home' },
    { value: '3', label: 'Extra Hours' },
    { value: '4', label: 'Flexi Hours' },
    { value: '5', label: 'Over Time' },
];

const Timer = (props) => {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [breaktime, setBreakTime] = useState(0);
    const [breaktimerOn, setBreakTimerOn] = useState(JSON.parse(localStorage.getItem('breakstatus')));
    const colors = ['#0acf97', '#f9375e', '#f8f8f8'];
    const [location, setLocation] = useState('');
    const [btnstatus, setBtnstatus] = useState(false);
    const [punchstatus, setPunchstatus] = useState(JSON.parse(localStorage.getItem('ispunchedin')));
    const now = new Date();
    const labels = 24;

    const apexOpts = {
        grid: {
            padding: {
                left: 0,
                right: 0,
            },
        },
        tooltip: {
            theme:'light',
            fillSeriesColor: true,
        },
        chart: {
            type: 'donut',
            parentHeightOffset: 0,
            toolbar: {
                show: false,
            },
        },
     
        dataLabels: {
            enabled: false,
        },
        zoom: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        labels: ['Work Hours', 'Break Hours', 'Remaining Hours'],
        colors: colors,
        xaxis: {
            type: 'string',
            categories: labels,
         
            axisBorder: {
                show: false,
            },
            labels: {},
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    let valuelen = val.toString().length;
                    return val + 'Hrs';
                    // if (valuelen == 1) {
                    //     return '00:0' + val + ' Hrs';
                    // } else if (valuelen == 2) {
                    //     return '00:' + val + ' Hrs';
                    // } else if (valuelen >= 3) {
                    //     let newstr = val.toString()
                    //     let hrs = newstr.substring(0, valuelen-2);
                    //     let mins1 = newstr.split('')[valuelen-1]
                    //     let mins2 = newstr.split('')[valuelen-2]
                    //     return hrs+":"+mins2+mins1 + 'Hrs';

                    // } else {

                    //     return val + 'Hrs';
                    // }
                },
                offsetX: -15,
            },
       
        },
    };
    let today = new Date().getDate();
    let currentdata = props.graph?.at(-1);
    const workedhours =
        today == parseInt(currentdata?.date) ? parseFloat(currentdata.worked_time.replace(' : ', '.')) : 0;
    const breakhours =
        today == parseInt(currentdata?.date) ? parseFloat(currentdata.total_break.replace(' : ', '.')) : 0;
    const totalHours = 15.0 - (workedhours + breakhours);

    const apexData = [workedhours, breakhours, totalHours];
    useEffect(() => {
        setTimeout(() => {
            let pstatus = JSON.parse(localStorage.getItem('ispunchedin'));
            let adata = JSON.parse(localStorage.getItem('attendance'));

            setPunchstatus(pstatus);
            var today = new Date().getDate();
            if (adata?.data?.log) {
                let currentdata = adata.data.log.at(-1);
                if (pstatus) {
                    // setTime(currentdata.punchin_time.split(' ')[3] || '00:00');
                    setTime('00:00');
                } else if (!pstatus) {
                    if (parseInt(currentdata.date) === today) {
                        setTime(currentdata?.worked_time || '00:00');
                    } else {
                        setTime('00:00');
                    }
                }
            } else {
                setTime('00:00');
            }
        }, 1000);
    }, [JSON.parse(localStorage.getItem('ispunchedin'))]);

    useEffect(() => {
        let breakdata = JSON.parse(localStorage.getItem('breakstatus'));

        setBreakTimerOn(breakdata);
    }, [JSON.parse(localStorage.getItem('breakstatus'))]);

    const handlePunchin = () => {
        if (location !== '' && location !== null) {
            let data = {
                user_id: getLoggedInUser().id,
                work_loc: location.value,
            };

            props.getTimesheetPunchin(data);
        } else {
            props.emptyAllFields('Please Select Location');
        }
    };
    const handlePunchout = () => {
        let data = {
            user_id: getLoggedInUser().id,
        };
        if (window.confirm('Are you sure to Punch Out ?')) {
            props.getTimesheetPunchout(data);
        }
    };

    const handleBreak = (status) => {
        let data = {
            user_id: getLoggedInUser().id,
            breakstatus: status,
        };
        if (status == 'off' && window.confirm('Want to Take a Break ?')) {
            props.getTimesheetBreak(data);
            setBreakTimerOn(true);
        }

        if (status == 'on') {
            props.getTimesheetBreak(data);
            setBreakTimerOn(false);
        }
    };

    return (
        <Card>
            <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="header-title mb-3">Attendance</h4>
                    {!punchstatus && (
                        <Select
                            options={punchinoptions}
                            onChange={(e) => setLocation(e)}
                            className="react-select mb-3 w-50"
                            classNamePrefix="react-select"></Select>
                    )}
                </div>

                <div className="apex-charts-wrapper position-relative">
                    <Chart options={apexOpts} series={apexData} type="donut" className="apex-charts" height={236} />
                    <h3 className="counttimer text-center">
                        <span className="mb-0">
                            {time}
                            <br /> <small className="text-muted">Hrs</small>
                        </span>
                    </h3>
                </div>
                <Row className="justify-content-center mt-3">
                    {!punchstatus && (
                        <Col md={6}>
                            <Button color="success" className="btn-block rounded-pill" onClick={() => handlePunchin()}>
                                {props.data && props.data.listloading ? (
                                    <Spinner animation="border" size="sm" />
                                ) : (
                                    <>
                                        <i className="uil-stopwatch-slash mr-1"></i>Punch In
                                    </>
                                )}
                            </Button>
                        </Col>
                    )}

                    {punchstatus && (
                        <>
                            {!breaktimerOn && (
                                <>
                                    <Col md={6}>
                                        <Button
                                            color="warning"
                                            className="btn-block rounded-pill"
                                            onClick={() => {
                                                handleBreak('off');
                                            }}>
                                            <i className="  uil-food mr-1"></i>Break
                                        </Button>
                                    </Col>
                                    <Col md={6}>
                                        <Button
                                            color="danger"
                                            className="btn-block rounded-pill"
                                            onClick={() => {
                                                handlePunchout();
                                            }}>
                                            {props.data && props.data.listloading ? (
                                                <Spinner animation="border" size="sm" />
                                            ) : (
                                                <>
                                                    <i className="uil-stopwatch-slash mr-1"></i>Punch Out
                                                </>
                                            )}
                                        </Button>
                                    </Col>
                                </>
                            )}
                            {breaktimerOn && (
                                <Col md={4}>
                                    <Button
                                        color="info"
                                        className="btn-block rounded-pill"
                                        onClick={() => {
                                            handleBreak('on');
                                        }}>
                                        <i className="  uil-food mr-1"></i>
                                        GetIn
                                    </Button>
                                </Col>
                            )}
                        </>
                    )}
                </Row>
                {today === parseInt(currentdata?.date) && currentdata?.punchin_time && (
                    <>
                        <hr />
                        <Row>
                            <Col className="text-center">
                                <small className="text-muted">Punchin</small>
                                <br />
                                <h4>
                                    <span className="p-1 badge badge-success">{currentdata?.punchin_time} </span>
                                </h4>
                            </Col>
                            {currentdata?.total_break && punchstatus && (
                                <Col className="text-center">
                                    <small className="text-muted">Break Time</small>
                                    <br />
                                    <h4>
                                        <span className="p-1 badge badge-warning">
                                            {currentdata?.total_break.split(':')[0]} Hrs :{' '}
                                            {currentdata?.total_break.split(':')[1]} mins{' '}
                                        </span>
                                    </h4>
                                </Col>
                            )}
                            {currentdata?.punchout_time !== `Haven't Punched Out` && (
                                <Col className="text-center">
                                    <small className="text-muted">Punchout</small>
                                    <br />
                                    <h4>
                                        <span className="p-1 badge badge-danger">{currentdata?.punchout_time} </span>
                                    </h4>
                                </Col>
                            )}
                        </Row>
                    </>
                )}
            </CardBody>
        </Card>
    );
};

export default Timer;
