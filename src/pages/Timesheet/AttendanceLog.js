import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Card, CardBody, Col, Row } from 'reactstrap';
import moment from 'moment';
import './styles.css';
const columns = [
    {
        dataField: 'work_loc',
        text: 'Shift Type',
        headerStyle: { width: '10%' },
        headerClasses: 'bg-dark text-white py-2',
        sort: false,
        formatter: (cell, row, rowIndex, formatExtraData) => (
            <div style={{ lineHeight: 'normal', margin: 0 }}>
                {typeof row.work_loc == 'object' ? (
                    row.work_loc.reverse().map((e, i) => {
                        return (
                            <>
                                <p>{row.work_loc[i]}</p>
                                <br />
                                <br />
                            </>
                        );
                    })
                ) : (
                    <p>{row.work_loc}</p>
                )}
            </div>
        ),
    },
    {
        dataField: 'punchin_time',
        text: 'Punchin Time',
        headerStyle: { width: '10%' },
        headerClasses: 'bg-dark text-white py-2',
        sort: false,
        formatter: (cell, row, rowIndex, formatExtraData) => (
            <div style={{ lineHeight: 'normal', margin: 0 }}>
                {typeof row.punchin_time == 'object' ? (
                    row.punchin_time.reverse().map((e, i) => {
                        return (
                            <>
                                <p>{row.punchin_time[i] ? row.punchin_time[i] : row.date[i]}</p>
                                <small className="text-primary">{row.punchin_ip[i]}</small>
                                <br />
                                <br />
                            </>
                        );
                    })
                ) : (
                    <>
                        <p>{row.punchin_time ? row.punchin_time : row.date}</p>
                        <small className="text-primary">{row.punchin_ip}</small>
                    </>
                )}
            </div>
        ),
    },
    {
        dataField: 'punchout_time',
        text: 'Punchout Time',
        headerStyle: { width: '10%' },
        headerClasses: 'bg-dark text-white py-2',
        sort: false,
        formatter: (cell, row, rowIndex, formatExtraData) => (
            <div style={{ lineHeight: 'normal', margin: 0 }}>
                {typeof row.punchout_time == 'object' ? (
                    row.punchout_time.reverse().map((e, i) => {
                        return (
                            <>
                                {row.punchout_time[i] == "Haven't Punched Out" ? (
                                    <>
                                        <h5 className="text-danger mb-0">{row.punchout_time[i]}</h5>
                                        <br />
                                <br />
                                    </>
                                ) : (
                                    <>
                                        <p>{row.punchout_time[i] ? row.punchout_time[i] : row.date[i]}</p>
                                        <small className="text-primary">{row.punchin_ip[i]}</small>
                                        <br />
                                        <br />
                                    </>
                                )}
                            </>
                        );
                    })
                ) : (
                    <>
                        {row.punchout_time == "Haven't Punched Out" ? (
                            <>
                                <h5 className="text-danger mb-0">{row.punchout_time}</h5>
                            </>
                        ) : (
                            <>
                                <p>{row.punchout_time ? row.punchout_time : row.date}</p>
                                <small className="text-primary">{row.punchin_ip}</small>
                            </>
                        )}
                    </>
                )}
            </div>
        ),
    },

    {
        dataField: 'total_break',
        text: 'Break Time',
        headerStyle: { width: '10%' },
        headerClasses: 'bg-dark text-white py-2',
        sort: false,
        formatter: (cell, row, rowIndex, formatExtraData) => (
            <div style={{ lineHeight: 'normal', margin: 0 }}>
                {typeof row.total_break == 'object' ? (
                    row.break_times.reverse()&&row.total_break.reverse().map((e, i) => {
                        return (
                           
                            <>
                           
                                <p>
                                    {row.total_break[i] ? (
                                        <>
                                            Total Break:<strong> {row.total_break[i]} Hrs</strong>
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </p>
                                {row.break_times[i] ? (
                                    <>
                                        {row.break_times[i].length > 0 &&
                                          row.break_times[i].map((e) => <small className="text-primary">{e}</small>)}
                                    </>
                                ) : (
                                    ''
                                )}
                                <br />
                                <br />
                            </>
                        );
                    })
                ) : (
                    <>
                        <p>
                            {row.total_break ? (
                                <>
                                    Total Break:<strong> {row.total_break} Hrs</strong>
                                </>
                            ) : (
                                ''
                            )}
                        </p>
                        {row.break_times ? (
                            <>
                                {row.break_times.length > 0 &&
                                    row.break_times.reverse().map((e) => (
                                        <small className="text-primary">
                                            {e}
                                            <br />
                                      
                                        </small>
                                    ))}
                            </>
                        ) : (
                            ''
                        )}
                    </>
                )}
            </div>
        ),
    },
    {
        dataField: 'worked_time',
        text: 'Work Hours',
        headerStyle: { width: '10%' },
        headerClasses: 'bg-dark text-white py-2',
        sort: false,
        formatter: (cell, row, rowIndex, formatExtraData) => (
            <div style={{ lineHeight: 'normal', margin: 0 }}>
                {typeof row.worked_time == 'object' ? (
                    row.worked_time.reverse().map((e, i) => {
                        return (
                            <>
                                <p>
                                    <strong>{row.worked_time[i] ? row.worked_time[i] + ' Hrs' : ''} </strong>
                                </p>
                                <br />
                                <br />
                            </>
                        );
                    })
                ) : (
                    <>
                        <p>
                            <strong>{row.worked_time ? row.worked_time + ' Hrs' : ''} </strong>
                        </p>
                    </>
                )}
            </div>
        ),
    },
];
const convertTime = (data) => {
    let newDate2 = moment(data).format('MMM Do, YYYY hh:mm A ');
    return newDate2;
};
const AttendanceLog = (props) => {
    const newdata = props.data ? [...props.data].reverse() : [];

    //copied the array
    const copyData = props.data ? [...props.data] : [];
    //extracting available dates only
    let newone = copyData?.map((e) => e.date);
    //extracting substring
    let subString = copyData[0]?.punchin_time?.split(' ')[1];

    //filling empty array with indexes with max date
    let emptyData = Array.from({ length: Math.max(...newone) }, (_, i) => {
        return { date: ((i + 1).toString() + ' ' + subString).toString() };
    });

    //comparing and appending empty array with data if availble else with date only
    for (let i = 0; i < Math.max(...newone); i++) {
        if (copyData[i]?.date - 1 == copyData[i - 1]?.date - 1) {
            emptyData[copyData[i - 1]?.date - 1] = {
                date: copyData[i - 1]?.date,
                punchin_time: [copyData[i - 1].punchin_time, copyData[i].punchin_time],
                punchin_ip: [copyData[i - 1].punchin_ip, copyData[i].punchin_ip],
                punchout_time: [copyData[i - 1].punchout_time, copyData[i].punchout_time],
                punchout_ip: [copyData[i - 1].punchout_ip, copyData[i].punchout_ip],
                total_break: [copyData[i - 1].total_break, copyData[i].total_break],
                worked_time: [copyData[i - 1].worked_time, copyData[i].worked_time],
                work_loc: [copyData[i - 1].work_loc, copyData[i].work_loc],
                break_times: [copyData[i - 1].break_times, copyData[i].break_times],
                break_status: [copyData[i - 1].break_status, copyData[i].break_status],
            };
        } else {
            emptyData[copyData[i]?.date - 1] = copyData[i];
        }
    }

    //reversing array for displaying latest date
    let finalOutData = [...emptyData].reverse() || [];
    console.log('🚀 ~ file: AttendanceLog.js ~ line 137 ~ AttendanceLog ~ finalOutData', finalOutData);

    // ================================BACKUP================================
    // //copied the array
    // const copyData = props.data ? [...props.data] : [];
    // //extracting available dates only
    // let newone = copyData?.map((e) => e.date);
    // //extracting substring
    // let subString = copyData[0]?.punchin_time?.split(' ')[1];

    // //filling empty array with indexes with max date
    // let emptyData = Array.from({ length: Math.max(...newone) }, (_, i) => {
    //     return { date: ((i + 1).toString() + ' ' + subString).toString() };
    // });

    // //comparing and appending empty array with data if availble else with date only
    // for (let i = 0; i < Math.max(...newone); i++) {
    //     emptyData[copyData[i]?.date - 1] = copyData[i];
    // }

    // //reversing array for displaying latest date
    // let finalOutData = [...emptyData].reverse() || [];
    // ================================BACKUP================================

    return (
        <Card>
            <CardBody>
                <BootstrapTable
                    bootstrap4
                    keyField={'punchin_time'}
                    data={finalOutData}
                    columns={columns}
                    wrapperClasses="table-responsive"
                    hover
                    striped
                    noDataIndication={() => 'There are no records to display'}
                />
            </CardBody>
        </Card>
    );
};

export default AttendanceLog;
