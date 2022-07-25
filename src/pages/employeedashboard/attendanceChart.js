// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';

// simple bar chart
const AttendanceChart = () => {
    const apexBarChartOpts = {
        chart: {
            height: 380,
            type: 'bar',
            toolbar: {
                show: true,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                dataLabels: {
                    position: 'top',
                },
            },
        },
        dataLabels: {
            enabled: false,
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#fff'],
            },
        },
        colors: ['#fa5c7c', '#727cf5'],
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff'],
        },

        xaxis: {
            categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
        },
        legend: {
            offsetY: 10,
            position: 'top',
        },
        states: {
            hover: {
                filter: 'none',
            },
        },
        grid: {
            borderColor: '#f1f3fa',
        },
    };

    const apexBarChartData = [
        {
            name: 'Break hours',
            data: [15, 15, 15, 15, 15, 15, 15],
        },
        {
            name: 'Work hours',
            data: [50, 55, 45, 50, 55, 50, 45],
        },
        
    ];

    return (
        <Card >
            <CardBody>
                <h4 className="header-title mb-3">Bar Chart</h4>
                <Chart options={apexBarChartOpts} series={apexBarChartData} type="bar" className="apex-charts" />
            </CardBody>
        </Card>
    );
};

export default AttendanceChart;
