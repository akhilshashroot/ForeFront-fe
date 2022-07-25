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
import { getEmployeeList, getMonthlyreportList } from '../../../redux/actions';
import DatePicker from 'react-flatpickr';
import HyperDatepicker from '../../../components/Datepicker';
import ConfigureActivity from './ConfigureActivity';
import ConfigureJobdes from './ConfigureJobdes';
const MonthlyReportConfig = (props) => {
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
    
        let monyear = value.split('-');
        let swap = swapnum(monyear[0], monyear[1]);
        let converteddate = (swap.join().replace(/,/g, '-'));
      
        setDatemonth(converteddate);
    };

    const swapnum = (x, y) => {
        var b = y;
        y = x;
        x = b;
        return [x, y];
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
    const GetMonthlyreport = () => {
        if (employee !== null && datemonth !== null && employee !== '' && datemonth !== '') {
            let data = {
                user_id: employee,
                month_pick: datemonth,
            };
            props.getMonthlyreportList(data);
        } else {
            emptyAllFields();
        }
    };

    let workData =
        props.monthlyreport &&
        props.monthlyreport.monthlyreport &&
        props.monthlyreport.monthlyreport.data &&
        props.monthlyreport.monthlyreport.data.monthly_checklist &&
        props.monthlyreport.monthlyreport.data.monthly_checklist;

    return (
        <>
            <Card>
                <CardBody>
                    <Row>
                        <Col md={6}>
                            <h5>Manage Activities</h5>
                        </Col>
                        <Col md={6} className="text-right">
                            {/* <Button color="primary" className="mr-3" onClick={handleJobdesModal}>
                                Manage JD
                            </Button> */}
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
                        <h5>Monthly Report Viewer</h5>
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
                            <Col md={4} className="my-auto text-right">
                                <Button color="danger" onClick={() => GetMonthlyreport()}>
                                    Get Monthlyreport Report
                                </Button>
                            </Col>
                        </Row>

                        {props.monthlyreport && props.monthlyreport.listloading && <LoaderWidget />}
                        {props.monthlyreport &&
                            props.monthlyreport.monthlyreport &&
                            props.monthlyreport.monthlyreport.data &&
                            props.monthlyreport.monthlyreport.data && (
                                <>
                                    <BootstrapTable
                                        bootstrap4
                                        keyField={'dep_id'}
                                        data={
                                            props.monthlyreport &&
                                            props.monthlyreport.monthlyreport &&
                                            props.monthlyreport.monthlyreport.data &&
                                            props.monthlyreport.monthlyreport.data.monthly_workreport_act
                                        }
                                        columns={columns}
                                        wrapperClasses="table-responsive"
                                        hover
                                        condensed
                                        noDataIndication={() => 'There are no records to display'}
                                    />

                                    <Row>
                                        {workData && workData.length>0
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
        monthlyreport: state.Monthlyreport,
    };
};
export default connect(mapStateToProps, { getEmployeeList, getMonthlyreportList })(MonthlyReportConfig);
