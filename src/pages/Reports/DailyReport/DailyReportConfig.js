import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Card, CardBody, Form, FormGroup, Input, Button, UncontrolledTooltip, Label } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderWidget from '../../../components/Loader';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getEmployeeList, getDailyreportList } from '../../../redux/actions';
import DatePicker from 'react-flatpickr';
import HyperDatepicker from '../../../components/Datepicker';
import ConfigureActivity from './ConfigureActivity';
import ConfigureJobdes from './ConfigureJobdes';
const DailyReportConfig = (props) => {
    const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });

    const [toggleActivityModal, setToggleActivityModal] = useState(false);
    const [toggleJobdesModal, setToggleJobdesModal] = useState(false);

    useEffect(() => {
        if (props.employee && !props.employee.employee) {
            props.getEmployeeList();
        }
    }, []);
    const [employee, setEmployee] = useState('');
    const [datemonth, setDatemonth] = useState('');

    const handleActivityModal = () => {
        setToggleActivityModal(true);
    };
    const closeActivityModal = () => {
        setToggleActivityModal(false);
    };
    const handleJobdesModal = () => {
        setToggleJobdesModal(true);
    };
    const closeJobdesModal = () => {
        setToggleJobdesModal(false);
    };

    const columns = [
        {
            dataField: 'att_id',
            text: 'ID',
            headerStyle: { width: '5%' },
            headerClasses: 'bg-dark text-white py-2 ',
            sort: true,

            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p>{row.att_id}</p>
                </div>
            ),
        },
        {
            dataField: 'punchin_date',
            text: 'Date',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.punchin_date}</p>
                </div>
            ),
        },

        {
            dataField: 'punchin',
            text: 'Punchin Time',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="punchin" className=" mb-0">
                        {row.punchin}
                    </p>
                    <h5 id="pip">
                        <span className=" mb-0 badge badge-dark-lighten">{row.punchin_ip}</span>
                    </h5>
                </div>
            ),
        },
        {
            dataField: 'punchout',
            text: 'Punchout Time',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="punchin" className=" mb-0">
                        {row.punchout}
                    </p>
                    <h5 id="pip">
                        <span className=" mb-0 badge badge-dark-lighten">{row.punchout_ip}</span>
                    </h5>
                </div>
            ),
        },
        {
            dataField: 'work_loc',
            text: 'Work Mode',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.work_loc}</p>
                </div>
            ),
        },
        {
            dataField: 'worked_time',
            text: 'Work Time',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <h4>
                        <span className=" mb-0 badge badge-success">{row.worked_time}</span>
                    </h4>
                </div>
            ),
        },
        {
            dataField: 'total_break',
            text: 'Break Time',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <h4>
                        <span className=" mb-0 badge badge-warning">{row.total_break}</span>
                    </h4>
                </div>
            ),
        },
    ];

    const handleEmployeeChange = (value) => {
        if (value) {
            setEmployee(value.value);
        }
    };
    const handleMonthchange = (value) => {
        let newdate = convert(value[0]);

        setDatemonth(newdate);
    };

    const convert = (str) => {
        var date = new Date(str),
            mnth = ('0' + (date.getMonth() + 1)).slice(-2),
            day = ('0' + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join('-');
    };

    const convertRecilist = (data) => {
        var Data = [];
        data &&
            data.forEach((value) => {
                Data.push({ label: value.fullname, value: value.id });
            });
        return Data;
    };
    const GetDailyreport = () => {
        if (employee !== null && datemonth !== null && employee !== '' && datemonth !== '') {
            let data = {
                user_id: employee,
                date_daily: datemonth,
            };
            props.getDailyreportList(data);
        } else {
            emptyAllFields();
        }
    };

    let workData =
        props.dailyreport &&
        props.dailyreport.dailyreport &&
        props.dailyreport.dailyreport.data &&
        props.dailyreport.dailyreport.data.attendance_det[0] &&
        props.dailyreport.dailyreport.data.attendance_det[0];

    return (
        <>
            <Card>
                <CardBody>
                    <Row>
                        <Col md={6}>
                            <h5>Manage JD & Activities</h5>
                        </Col>
                        <Col md={6} className="text-right">
                            <Button color="primary" className="mr-3" onClick={handleJobdesModal}>
                                Manage JD
                            </Button>
                            <Button color="success" onClick={handleActivityModal}>
                                Manage Activity
                            </Button>
                        </Col>
                    </Row>
                    {toggleActivityModal && (
                        <ConfigureActivity
                            toggleActivityModal={toggleActivityModal}
                            closeActivityModal={closeActivityModal}
                            emptyAllFields={emptyAllFields}
                        />
                    )}
                    {toggleJobdesModal && (
                        <ConfigureJobdes
                            toggleJobdesModal={toggleJobdesModal}
                            closeJobdesModal={closeJobdesModal}
                            emptyAllFields={emptyAllFields}
                        />
                    )}
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <React.Fragment>
                        <h5>Daily Report Viewer</h5>
                        <hr />
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
                            <Col md={4} className="mx-auto">
                                <div className="form-group">
                                    <p className="mb-1 font-weight-bold">Select Date</p>
                                    <DatePicker
                                        className="form-control bg-white"
                                        onChange={(e) => {
                                            handleMonthchange(e);
                                        }}
                                        placeholder="Select Date"
                                    />
                                </div>
                            </Col>
                            <Col md={4} className="my-auto text-right">
                                <Button color="danger" onClick={() => GetDailyreport()}>
                                    Get Dailyreport Report
                                </Button>
                            </Col>
                        </Row>

                        {props.dailyreport && props.dailyreport.listloading && <LoaderWidget />}
                        {props.dailyreport &&
                            props.dailyreport.dailyreport &&
                            props.dailyreport.dailyreport.data &&
                            props.dailyreport.dailyreport.data && (
                                <>
                                    <BootstrapTable
                                        bootstrap4
                                        keyField={'dep_id'}
                                        data={
                                            props.dailyreport &&
                                            props.dailyreport.dailyreport &&
                                            props.dailyreport.dailyreport.data &&
                                            props.dailyreport.dailyreport.data.attendance_det
                                        }
                                        columns={columns}
                                        wrapperClasses="table-responsive"
                                        hover
                                        condensed
                                        noDataIndication={() => 'There are no records to display'}
                                    />

                                    <Row>
                                        {workData
                                            ? Object.keys(workData.work_report).map(function (keyName, keyIndex) {
                                                  return (
                                                      <Col md={6} key={keyName}>
                                                          <Card>
                                                              <CardBody>
                                                                  <h5 className="text-primary">
                                                                      {workData.work_report[keyName].activity}
                                                                  </h5>
                                                                  <hr />
                                                                  <p>
                                                                      {workData.work_report[keyName].reply == '' ? (
                                                                          <span className="text-muted">
                                                                              No Response
                                                                          </span>
                                                                      ) : (
                                                                          <span className="font-weight-bold">
                                                                              {workData.work_report[keyName].reply}
                                                                          </span>
                                                                      )}
                                                                  </p>
                                                              </CardBody>
                                                          </Card>
                                                      </Col>
                                                  );
                                              })
                                            : ''}
                                    </Row>
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
        employee: state.Employee,
        dailyreport: state.Dailyreport,
    };
};
export default connect(mapStateToProps, { getEmployeeList, getDailyreportList })(DailyReportConfig);
