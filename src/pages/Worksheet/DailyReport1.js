import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, FormGroup, Input, Label, Row, Table, Card, CardBody } from 'reactstrap';
import { getDailyReportAdd, getTicketData, getWorksheetTicketList } from '../../redux/actions';
import DailyActivity from './DailyActivity';
import { getLoggedInUser } from '../../helpers/authUtils';
import UpdateTIcketModal1 from './UpdateTIcketModal1';
import ViewReportModal from './ViewReportModal';
import { toast, Zoom } from 'react-toastify';
import './styles.css'
const emptyAllFields = (msg) => toast.warning(msg, { transition: Zoom });

class DailyReport1 extends React.Component {
    state = {
        ticketHandled: 0,
        ticketResoluved: 0,
        ticketPending: 0,
        displayTicketAdd: false,
        time: '0 - 5 min',
        ticketURL: '',
        ticketResponse: '',
        data: '',
        modal: false,
        hrInterviewtaken: 0,
        disableHrInt: true,
        viewReport: false,
    };

    componentDidMount = () => {};
    componentDidUpdate(prevProps, prevState) {
        if (this.props.dailyReport !== prevProps.dailyReport) {
            if (
                this.props.dailyReport &&
                this.props.dailyReport.data &&
                this.props.dailyReport.data.work_activity &&
                this.props.dailyReport.data.work_activity.daily_act_ticket
            ) {
                if (this.props.dailyReport.data.work_activity.daily_act_ticket.length != 0) {
                    this.setState({
                        ticketHandled: this.props.dailyReport?.data?.work_activity?.daily_act_ticket[0]?.reply,
                        ticketResoluved: this.props.dailyReport?.data?.work_activity?.daily_act_ticket[1]?.reply,
                        ticketPending: this.props.dailyReport?.data?.work_activity?.daily_act_ticket[2]?.reply,
                    });
                }
            }
        }

        if (this.props.dailyReportAdd) {
            if (this.props.dailyReportAdd !== prevProps.dailyReportAdd) {
                this.props.getWorksheetTicketList();
            }
        }
    }

    toggle = (data) => {
        this.setState({ data: data, modal: true });
    };
    toggle1 = () => {
        this.setState({ data: '', modal: false });
    };

    switch = () => {
        this.setState({ viewReport: true });
    };
    switch1 = () => {
        this.setState({ viewReport: false });
    };

    addTicket = () => {
        this.setState({
            displayTicketAdd: true,
            ticketHandled: this.state.ticketHandled==='' ? 1:parseInt(this.state.ticketHandled) + 1,
        });
    };

    cancelTicketAdd = () => {
        this.setState({
            displayTicketAdd: false,
            ticketHandled: parseInt(this.state.ticketHandled) - 1,
        });
    };

    saveTicket = () => {
        let s = {
            daily_act_id: 599,
            daily_inputValue: this.state.ticketHandled,
            ticket_url: this.state.ticketURL,
            ticket_response: this.state.ticketResponse,
            ticket_sla: this.state.time,
            user_id: getLoggedInUser().id,
        };
        this.props.getDailyReportAdd(s);
        this.setState({ displayTicketAdd: false });
        this.setState({ ticketURL: '', ticketResponse: '' });
    };

    saveDailyTicket = () => {
        let data = {
            daily_act_id_pend: 601,
            daily_inputValue_pend: this.state.ticketPending,
            daily_act_id_resol: 600,
            daily_inputValue_resol: this.state.ticketResoluved,
            user_id: getLoggedInUser().id,
        };
        this.props.getTicketData(data);
    };

    updateHRTask = () => {
        let data = {
            daily_act_id: 7003,
            user_id: getLoggedInUser().id,
            daily_inputValue: 1,
        };
        this.props.getDailyReportAdd(data);
    };

    HrInterview = () => {
        let data = {
            daily_act_id: 6492,
            user_id: getLoggedInUser().id,
            daily_inputValue: this.state.hrInterviewtaken,
        };
        this.props.getDailyReportAdd(data);
    };

    render() {
        const {
            ticketHandled,
            ticketResoluved,
            ticketPending,
            displayTicketAdd,
            time,
            ticketURL,
            ticketResponse,
            data,
            modal,
        } = this.state;
        const { dailyReport, getDailyReportAdd, dailyReportAdd, ticketList, getTicketData, getWorksheetTicketList } =
            this.props;
        console.log(
            '🚀 ~ file: DailyReport1.js ~ line 72 ~ DailyReport1 ~ ticketHandled',
            ticketHandled,
            typeof ticketHandled
        );

        return (
            <Card>
                <CardBody>
                    {dailyReport &&
                        dailyReport.data &&
                        dailyReport.data.work_activity &&
                        dailyReport.data.work_activity.daily_act &&
                        dailyReport.data.work_activity.daily_act.length !== 0 && (
                            <div>
                                <h4 className="header-title">Daily Activities</h4>
                            </div>
                        )}

                    {dailyReport && dailyReport.data && dailyReport.data.punchin && (
                        <button className="btn btn-danger" style={{display:'none'}} onClick={this.switch}>
                            View Report
                        </button>
                    )}
                    <ViewReportModal switch1={this.switch1} viewReport={this.state.viewReport} />

                    {dailyReport &&
                        dailyReport.data &&
                        dailyReport.data.work_activity &&
                        dailyReport.data.work_activity.daily_act_hr_task.length !== 0 &&
                        dailyReport.data.work_activity.daily_act_hr_task.map((item, index) => (
                            <div key={index}>
                                {item.daily_act}
                                {item.reply === '' && (
                                    <i
                                        className="uil uil-multiply  widget-icon bg-danger-lighten text-danger ml-5"
                                        onClick={this.updateHRTask}></i>
                                )}
                                {item.reply !== '' && (
                                    <i className="uil  uil-check widget-icon bg-success-lighten text-success ml-5"></i>
                                )}
                            </div>
                        ))}

                    {dailyReport &&
                        dailyReport.data &&
                        dailyReport.data.work_activity &&
                        dailyReport.data.work_activity.daily_act_hr.length !== 0 &&
                        dailyReport.data.work_activity.daily_act_hr.map((item, index) => (
                            <div key={index} className="mt-3">
                                <div className="form-group w-15 ">
                                    <label> {item.daily_act}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        defaultValue={item.reply}
                                        onChange={(e) =>
                                            this.setState({
                                                hrInterviewtaken: e.target.value,
                                                disableHrInt: false,
                                            })
                                        }
                                    />
                                    <Button
                                        className="btn btn-success  mt-2"
                                        disabled={this.state.disableHrInt || this.state.hrInterviewtaken == ''}
                                        onClick={this.HrInterview}>
                                        Save Tickets
                                    </Button>
                                </div>
                            </div>
                        ))}

                    {!dailyReport?.data?.punchin && dailyReport?.data?.work_activity?.daily_act_ticket?.length != 0 && (
                        <Row>
                            <Col md={4}>
                                <Label htmlFor="text">Tickets handled</Label>
                                <Input
                                    type="number"
                                    name="text"
                                    id="text"
                                    value={parseInt(ticketHandled)||''}
                                    onChange={(e) => this.setState({ ticketHandled: e.target.value })}
                                    disabled
                                />
                                <button
                                    className="btn btn-success mt-1"
                                    onClick={this.addTicket}
                                    disabled={displayTicketAdd}>
                                    Add
                                </button>
                            </Col>
                            <Col md={4}>
                                <Label for="text">Tickets resolved</Label>
                                <Input
                                    type="number"
                                    name="text"
                                    id="text"
                                    value={ticketResoluved || ''}
                                    onChange={(e) => this.setState({ ticketResoluved: e.target.value })}
                                />
                            </Col>
                            <Col md={4}>
                                <Label for="text">Tickets pending</Label>

                                <Input
                                    type="number"
                                    name="text"
                                    id="text"
                                    value={ticketPending || ''}
                                    onChange={(e) => this.setState({ ticketPending: e.target.value })}
                                />
                                <button
                                    className="btn btn-success mt-1 float-right"
                                    onClick={this.saveDailyTicket}
                                    disabled={ticketResoluved == '' || ticketPending == ''}>
                                    Save Tickets
                                </button>
                            </Col>
                        </Row>
                    )}
                    {displayTicketAdd && (
                        <div>
                            <Row className="mt-3">
                                <Col md={10}>
                                    <FormGroup>
                                        <Label for="text">Ticket URL</Label>
                                        <Input
                                            type="text"
                                            name="text"
                                            id="text"
                                            value={ticketURL}
                                            onChange={(e) => this.setState({ ticketURL: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Label for="exampleSelect">Initial Response Time</Label>
                                        <Input
                                            type="select"
                                            name="select"
                                            id="exampleSelect"
                                            placeholder="select"
                                            value={time}
                                            onChange={(e) => this.setState({ time: e.target.value })}>
                                            <option value="0 - 5 min">0 - 5 min</option>{' '}
                                            <option value="5 - 10 min">5 - 10 min</option>{' '}
                                            <option value="10 - 15 min">10 - 15 min</option>{' '}
                                            <option value="15 - 20 min">15 - 20 min</option>{' '}
                                            <option value="20 - 25 min">20 - 25 min</option>{' '}
                                            <option value="25 - 30 min">25 - 30 min</option>{' '}
                                            <option value="30 - 35 min">30 - 35 min</option>{' '}
                                            <option value="35 - 40 min">35 - 40 min</option>{' '}
                                            <option value="40 - 45 min">40 - 45 min</option>{' '}
                                            <option value="45 - 50 min">45 - 50 min</option>{' '}
                                            <option value="50 - 55 min">50 - 55 min</option>{' '}
                                            <option value="55 - 60 min">55 - 60 min</option>{' '}
                                            <option value="above 1 hour">above 1 hour</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={10}>
                                    <FormGroup>
                                        <Label for="exampleText">Ticket Response</Label>
                                        <Input
                                            type="textarea"
                                            name="text"
                                            id="exampleText"
                                            rows="3"
                                            value={ticketResponse}
                                            onChange={(e) => this.setState({ ticketResponse: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={2} className="d-flex justify-content-between align-items-center">
                                    <button
                                        className="btn btn-success "
                                        onClick={this.saveTicket}
                                        disabled={this.state.ticketURL == '' || this.state.ticketResponse == ''}>
                                        Save
                                    </button>
                                    <i
                                        className="uil uil-times  widget-icon bg-danger-lighten text-danger"
                                        onClick={this.cancelTicketAdd}></i>
                                </Col>
                            </Row>
                        </div>
                    )}
                    {ticketList && ticketList.data && ticketList.data.length !== 0 && (
                        <Table className="mb-0">
                            <thead>
                                <tr>
                                    <th>Ticket Url </th>
                                    <th>Response</th>
                                    <th>SLA</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ticketList.data.map((record, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">
                                                {' '}
                                                <a href={record.url}>{record.url}</a>{' '}
                                            </th>
                                            <td>{record.response}</td>
                                            <td>{record.sla}</td>
                                            <td>
                                                <a onClick={() => this.toggle(record)} className="link">
                                                    Update Response
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    )}
                    <hr />
                    {dailyReport &&
                        dailyReport.data &&
                        dailyReport.data.work_activity &&
                        dailyReport.data.work_activity.daily_act != 0 &&
                        dailyReport.data.work_activity.daily_act.map((item, index) => (
                            <DailyActivity
                                key={index}
                                item={item}
                                getDailyReportAdd={getDailyReportAdd}
                                emptyAllFields={emptyAllFields}
                                getWorksheetTicketList={getWorksheetTicketList}
                                dailyReportAdd={dailyReportAdd}
                            />
                        ))}
                    <UpdateTIcketModal1 modal={modal} toggle1={this.toggle1} data={this.state.data} />
                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dailyReport: state.Worksheet.dailyReport,
        ticketList: state.Worksheet.ticketList,
        dailyReportAdd: state.Worksheet.dailyReportAdd,
    };
};
export default connect(mapStateToProps, {
    getDailyReportAdd,
    getTicketData,
    getWorksheetTicketList,
})(DailyReport1);
