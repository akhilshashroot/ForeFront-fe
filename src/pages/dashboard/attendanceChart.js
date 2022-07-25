// @flow
import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';
import './styles.css';
// simple bar chart
const AttendanceChart = (props) => {


    const { data, workdata } = props;
    const subractedDate = (data) => {
        var today = new Date();
        var substract_no_of_days = data;
        today.setTime(today.getTime() - substract_no_of_days * 24 * 60 * 60 * 1000);
        var substracted_date = today.getTime()
        return substracted_date
    };
    var workData = generateWorktimeseries(subractedDate(30), 30, 'work');
    var breakData = generateWorktimeseries(subractedDate(30), 30, 'break');
    var flexiData = generateWorktimeseries(subractedDate(30), 30, 'flexi');
    var extraData = generateWorktimeseries(subractedDate(30), 30, 'extra');
    var options1 = {
        chart: {
            id: 'chart2',
            type: 'area',
            height: 230,
            foreColor: '#ccc',
            toolbar: {
                autoSelected: 'pan',
                show: false,
            },
        },

        colors: ['#727cf5', '#fa5c7c', '#07bc0c', '#ffbc00'],

        stroke: {
            width: 3,
        },
        grid: {
            borderColor: '#555',
            clipMarkers: false,
            yaxis: {
                lines: {
                    show: false,
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        fill: {
            gradient: {
                enabled: true,
                opacityFrom: 0.55,
                opacityTo: 0,
            },
        },
        legend: {
            offsetY: 10,
            position: 'top',
            fontSize: '14px',
            markers: {
                width: 16,
                height: 16,
            },
        },
        markers: {
            size: 5,
            colors: ['#727cf5', '#fa5c7c', '#07bc0c', '#ffbc00'],
            strokeColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
            strokeWidth: 3,
        },

        tooltip: {
            theme: 'light',
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            min: 0,
            tickAmount: 4,
        },
    };

    var options2 = {
        chart: {
            id: 'chart1',
            height: 130,
            type: 'bar',
            foreColor: '#ccc',
            brush: {
                target: 'chart2',
                enabled: true,
            },
            selection: {
                enabled: true,
                fill: {
                    color: '#000',
                    opacity: 0.3,
                },
                stroke: {
                    width: 1,
                    dashArray: 3,
                    color: '#24292e',
                    opacity: 0.4,
                },
                xaxis: {
                    min: new Date(
                        workdata && workdata.length > 2 ? workdata?.at(-7)?.date : workdata && workdata?.at(-1)?.date
                    ).getTime(),
                    max: new Date(workdata && workdata?.at(-1)?.date).getTime(),
                },
            },
        },
        legend: {
            show: false,
        },
        colors: ['#FF0080'],

        stroke: {
            width: 2,
        },
        grid: {
            borderColor: '#444',
        },
        markers: {
            size: 0,
        },
        xaxis: {
            type: 'datetime',
            tooltip: {
                enabled: false,
            },
        },
        yaxis: {
            tickAmount: 2,
        },
    };

    function generateWorktimeseries(baseval, count, yrange) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = baseval;
            if (yrange === 'work') {
                var y = workdata[i]?.work;
            } else if (yrange === 'break') {
                var y = workdata[i]?.break;
            } else if (yrange === 'flexi') {
                var y = workdata[i]?.flexi;
            } else if (yrange === 'extra') {
                var y = workdata[i]?.extra;
            }

            series.push([x, y]);
            baseval += 86400000;
            i++;
        }
        return series;
    }

    const workDataSeries = [
        {
            name: 'Work hours',
            data: workData,
        },
        {
            name: 'Break hours',
            data: breakData,
        },
        {
            name: 'Flexi hours',
            data: flexiData,
        },
        {
            name: 'Extra hours',
            data: extraData,
        },
    ];
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mb-3">Attendance Chart</h4>
                <div id="wrapper">
                    <Chart options={options1} series={workDataSeries} type="area" height={350} />
                    <Chart options={options2} series={workDataSeries} type="bar" height={200} />
                </div>
                <div id="chart-bar"></div>
            </CardBody>
        </Card>
    );
};

export default AttendanceChart;
