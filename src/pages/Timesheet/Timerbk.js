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
} from 'reactstrap';
import './styles.css';
const punchinoptions = [
    { value: '1', label: 'Work From Home' },
    { value: '2', label: 'Office' },
    { value: '3', label: 'Over Time' },
];
const Timer = () => {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [breaktime, setBreakTime] = useState(0);
    const [breaktimerOn, setBreakTimerOn] = useState(false);
    const colors = ['#0acf97', '#fa5c7c', '#f8f8f8'];

    useEffect(() => {
        let interval = null;
        let breakinterval = null;

        if (timerOn) {
       
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!timerOn) {
            console.log(time)
            clearInterval(interval);
        }
        if (breaktimerOn) {
            breakinterval = setInterval(() => {
                setBreakTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!breaktimerOn) {
            clearInterval(breakinterval);
        }

        return () => {
            clearInterval(interval);
            clearInterval(breakinterval);
        };
    }, [timerOn]);

    const now = new Date();
    const labels = 24;



     
        


    const apexOpts = {
        grid: {
            padding: {
                left: 0,
                right: 0,
            },
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
        labels: ['Work Hours', 'Break Time', 'Total Hours'],
        colors: colors,
        xaxis: {
            type: 'string',
            categories: labels,
            tooltip: {
                enabled: false,
            },
            axisBorder: {
                show: false,
            },
            labels: {},
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return val + '%';
                },
                offsetX: -15,
            },
        },
    };
    const hour = Math.floor((time / 600000) % 60);
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const bhour = Math.floor((breaktime / 600000) % 60);
    const bminutes = Math.floor((breaktime / 60000) % 60);
    const bseconds = Math.floor((breaktime / 1000) % 60);
    const apexData = [
        parseFloat(minutes+'.'+seconds),
        parseFloat(bminutes+'.'+bseconds),
        parseFloat(60-minutes),
    ];


    return (
        <Card>
            <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="header-title mb-3">Attendance</h4>

                    <Select
                        options={punchinoptions}
                        className="react-select mb-3 w-50"
                        classNamePrefix="react-select"></Select>
                </div>

                <div className="apex-charts-wrapper position-relative">
                    <Chart options={apexOpts} series={apexData} type="donut" className="apex-charts" height={236} />
                    <h3 className="counttimer">
                        {!breaktimerOn && (
                            <span>
                                <span>{('0' + hour).slice(-2)}:</span>
                                <span>{('0' + minutes).slice(-2)}:</span>
                                <span>{('0' + seconds).slice(-2)}</span>
                                {/* <span>{('0' + ((time / 10) % 100)).slice(-2)}</span> */}
                            </span>
                        )}

                        {breaktimerOn && (
                            <span className="text-danger">
                                <span>{('0' + bhour).slice(-2)}:</span>
                                <span>{('0' + bminutes).slice(-2)}:</span>
                                <span>{('0' + bseconds).slice(-2)}</span>
                                {/* <span>{('0' + ((time / 10) % 100)).slice(-2)}</span> */}
                            </span>
                        )}

                        <small className="text-muted">HOURS</small>
                    </h3>
                </div>
                <Row className="justify-content-center mt-3">
                    {!timerOn && time === 0 && (
                        <Col md={6}>
                            <Button color="success" className="btn-block rounded-pill" onClick={() => setTimerOn(true)}>
                                <i className="uil-stopwatch mr-1"></i> Punch In
                            </Button>
                        </Col>
                    )}
                    {timerOn && (
                        <>
                            <Col md={6}>
                                <Button
                                    color="warning"
                                    className="btn-block rounded-pill"
                                    onClick={() => {
                                        setTimerOn(false);
                                        setBreakTimerOn(true);
                                    }}>
                                    <i className="  uil-food mr-1"></i>Break
                                </Button>
                            </Col>
                            <Col md={6}>
                                <Button
                                    color="danger"
                                    className="btn-block rounded-pill"
                                    onClick={() => {
                                        setTime(0);
                                        setBreakTime(0);
                                        setTimerOn(false);
                                        setBreakTimerOn(false);
                                    }}>
                                    <i className="uil-stopwatch-slash mr-1"></i>Punch Out
                                </Button>
                            </Col>
                        </>
                    )}
                    {!timerOn && time > 0 && (
                        <Col md={4}>
                            <Button
                                color="info"
                                className="btn-block rounded-pill"
                                onClick={() => {
                                    setTimerOn(true);
                                    setBreakTimerOn(false);
                                }}>
                                <i className="  uil-food mr-1"></i>GetIn
                            </Button>
                        </Col>
                    )}
                </Row>
            </CardBody>
        </Card>
    );
};

export default Timer;
