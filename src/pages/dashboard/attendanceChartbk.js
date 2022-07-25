// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';
import './styles.css'
// simple bar chart
const AttendanceChart = (props) => {
    const { data } = props;
    // const apexBarChartOpts = {
    //     chart: {
    //         id:'chart2',
    //         height: 380,
    //         type: 'area',
    //         toolbar: {
    //             autoSelected: "pan",
    //             show: false
    //           },
    //         zoom: {
    //             enabled: true,
    //         },
    //     },
       
    //     grid: {
    //         borderColor: "#555",
    //         clipMarkers: false,
    //         yaxis: {
    //           lines: {
    //             show: false
    //           }
    //         }
    //       },
    //     plotOptions: {
    //         bar: {
    //             horizontal: false,
    //             dataLabels: {
    //                 position: 'top',
    //             },
    //         },
    //     },
    //     dataLabels: {
    //         enabled: false,
    //         offsetX: -6,
    //         style: {
    //             fontSize: '12px',
    //             colors: ['#fff'],
    //         },
    //     },
    //     colors: ['#fa5c7c', '#727cf5'],
    //     stroke: {
    //         show: true,
    //         width: 2,
    //         colors: ['#fa5c7c', '#727cf5'],
    //     },
    //     markers: {
    //         size: 5,
    //         colors: ['#fa5c7c', '#727cf5'],
    //         strokeColor: ['#fa5c7c', '#727cf5'],
    //         strokeWidth: 3
    //       },

    //     xaxis: {
         
    //         categories: data?.log.map((e) => e.punchin_time),
    //     },
    //     yaxis: {
    //         min: (min) => {
    //             return min;
    //         },
    //     },
    //     legend: {
    //         offsetY: 10,
    //         position: 'top',
    //     },
    //     states: {
    //         hover: {
    //             filter: 'none',
    //         },
    //     },
    //     grid: {
    //         borderColor: '#f1f3fa',
    //     },
    // };
    const apexBarChartOpts = {
        chart: {
            id: "chart2",
            type: "area",
            height: 230,
            foreColor: "#ccc",
            toolbar: {
              autoSelected: "pan",
              show: false
            }
          },
          colors: ['#fa5c7c', '#727cf5'],
          stroke: {
            width: 3
          },
          grid: {
            borderColor: "#555",
            clipMarkers: false,
            yaxis: {
              lines: {
                show: false
              }
            }
          },
          dataLabels: {
            enabled: false
          },
          fill: {
            gradient: {
              enabled: true,
              opacityFrom: 0.55,
              opacityTo: 0
            }
          },
          markers: {
            size: 5,
            colors: ['#fa5c7c', '#727cf5'],
            strokeColor:   ['#fa5c7c', '#727cf5'],
            strokeWidth: 3
          },
      
          tooltip: {
            theme: "light"
          },
          xaxis: {
         
            categories: data?.log.map((e) => e.punchin_time),
        },
        yaxis: {
            min: (min) => {
                return min;
            },
        },
    };
    const baseChartoptions = {
        chart: {
            id: "chart1",
            height: 120,
            type: "bar",
            foreColor: "#ccc",
            brush: {
              target: "chart2",
              enabled: true
            },
            selection: {
              enabled: true,
              fill: {
                color: "#fff",
                opacity: 0.4
              },
              xaxis: {
                min: new Date("27 Jul 2017 10:00:00").getTime(),
                max: new Date("14 Aug 2017 10:00:00").getTime()
              }
            }
          },
          colors: ["#FF0080"],
     
          stroke: {
            width: 2
          },
          grid: {
            borderColor: "#444"
          },
          markers: {
            size: 0
          },
    
          xaxis: {
            categories: data?.log.map((e) => e.punchin_time),
        },
        yaxis: {
            min: (min) => {
                return min;
            },
        },
    };
    let hoursData = (val) => {
        if(val='break'){
            let newdata = data?.log.map((e) => e.total_break.replace(' : ', '.'));
            return newdata;
        }
        
    };
    const apexBarChartData = [
        {
            name: 'Break hours',
            data: hoursData('break'),
        },
        {
            name: 'Work hours',
            data: data?.log.map((e) => e.worked_time.replace(' : ', '.')),
        },
    ];

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mb-3">Attendance Chart</h4>
                <Chart options={apexBarChartOpts} series={apexBarChartData} type="area" className="apex-charts" />
                <Chart  options={baseChartoptions} series={apexBarChartData} type="bar" className="apex-charts" />
            </CardBody>
        </Card>
    );
};

export default AttendanceChart;
