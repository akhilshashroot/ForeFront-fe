import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Label,
  Row,
  UncontrolledButtonDropdown,
} from "reactstrap";
import classnames from "classnames";

import PageTitle from "../../components/PageTitle";
import { connect } from "react-redux";
import {
  getEmployeePerformance,
  getEmployeeUpdateMandatory,
  getEmployeeResetOvertime,
  getEmployeeWarning,
} from "../../redux/employee/actions";
import { toast, Zoom, ToastContainer } from "react-toastify";
import EvaluationCategories from "./EvaluationCategories";

const resetChangeToast = () =>
  toast.success("Reset Successfull", { transition: Zoom });
const resetOverTime = () =>
  toast.success("Reset Overtime Successfull", { transition: Zoom });
const hourlist = [
  { value: "60", label: "-1 min" },
  { value: "300", label: "-5 min" },
  { value: "600", label: "-10 min" },
  { value: "1800", label: "-30 min" },
  { value: "3600", label: "-1 Hour" },
  { value: "29700", label: "-1 day" },
  { value: "59400", label: "-2 day" },
  { value: "89100", label: "-3 day" },
  { value: "118800", label: "-4 day" },
  { value: "148500", label: "-5 day" },
];
class EmployeePerformance extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: "1", inv_number: "1" };
    this.toggle = this.toggle.bind(this);
  }
  /**
   * Toggle the tab
   */
  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        inv_number: tab,
      });
    }
  };

  state = {
    id: null,
    resetHour: "reset",
    warningLevel: "",
  };

  componentDidMount() {
    this.setState({ id: this.props.match.params.id });
    this.props.getEmployeePerformance(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.employeePerformance &&
      this.props.employeePerformance.employeePerformance
    ) {
      if (
        prevProps.employeePerformance.employeePerformance !==
        this.props.employeePerformance.employeePerformance
      ) {
        this.setState({
          warningLevel:
            this.props.employeePerformance.employeePerformance.data
              .warning_level,
        });
      }
    }
    if (
      this.props.employeePerformance &&
      this.props.employeePerformance.employeeResetOvertime
    ) {
      if (
        prevProps.employeePerformance.employeeResetOvertime !==
        this.props.employeePerformance.employeeResetOvertime
      ) {
        this.props.getEmployeePerformance(this.props.match.params.id);
      }
    }
    if (
      this.props.employeePerformance &&
      this.props.employeePerformance.employeeUpdateMandatory
    ) {
      if (
        prevProps.employeePerformance.employeeUpdateMandatory !==
        this.props.employeePerformance.employeeUpdateMandatory
      ) {
        this.props.getEmployeePerformance(this.props.match.params.id);
      }
    }
  }

  resetChange = (e) => {
    if (e != "reset") {
      if (window.confirm("Are you sure ?")) {
        let send = {
          work_id:
            this.props.employeePerformance?.employeePerformance?.data
              ?.weekly_status?.wrk_id,
          seconds: e,
          user_id: this.props.match.params.id,
        };
        this.props.getEmployeeUpdateMandatory(send);
        resetChangeToast();
      } else {
        this.setState({ resetHour: "reset" });
      }
    }
  };

  resetOverTime = () => {
    if (window.confirm("Are you sure ?")) {
      this.props.getEmployeeResetOvertime(
        this.props.employeePerformance?.employeePerformance?.data?.weekly_status
          ?.wrk_id
      );
      resetOverTime();
    }
  };

  handleWarning = () => {
    let send = {
      warning_level: this.state.warningLevel,
      user_id: this.state.id,
    };
    this.props.getEmployeeWarning(send);
  };
  handleChangewarning = (e) => {
    this.setState({ warningLevel: e.target.value });
  };
  render() {
    let inv_number = this.state.inv_number;
    const tabContents = [
      {
        id: "1",
        title: "Evaluation Categories",
        icon: "mdi mdi-home-variant",
      },
      {
        id: "2",
        title: "Evaluation History",
        icon: "mdi mdi-account-circle",
      },
    ];
    return (
      <>
        <PageTitle
          breadCrumbItems={[{ label: "Evaluation Portal", active: true }]}
          title={"Evaluation Portal"}
        />
        <Card>
          <CardBody>
            <div>
              {this.props.employeePerformance.employeePerformance &&
                this.props.employeePerformance.employeePerformance.data && (
                  <>
                    <div className="d-flex justify-content-between align-items-center">
                      <Button
                        className="mx-1 w-100"
                        style={{ whiteSpace: "nowrap" }}
                        outline
                        color="primary"
                      >
                        <i
                          className="uil uil-clock-eight  mr-1 h4"
                          id="edit"
                        ></i>
                        {
                          this.props.employeePerformance.employeePerformance
                            .data.weekly_status.pending_hrs
                        }
                      </Button>
                      <UncontrolledButtonDropdown
                        className="mx-1 w-100"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        <DropdownToggle color="primary" outline caret>
                          Reset Hours
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-animated">
                          {hourlist.map((e, i) => {
                            return (
                              <DropdownItem
                                key={e.label + i}
                                onClick={() => this.resetChange(e.value)}
                              >
                                {e.label}
                              </DropdownItem>
                            );
                          })}
                        </DropdownMenu>
                      </UncontrolledButtonDropdown>
                      <Button
                        className="mx-1 w-100"
                        style={{ whiteSpace: "nowrap" }}
                        outline
                        color="primary"
                      >
                        Overtime :{" "}
                        {
                          this.props.employeePerformance.employeePerformance
                            .data.weekly_status.overtime
                        }{" "}
                      </Button>
                      <Button
                        className="mx-1 w-100"
                        style={{ whiteSpace: "nowrap" }}
                        outline
                        color="primary"
                      >
                        EH :{" "}
                        {
                          this.props.employeePerformance.employeePerformance
                            .data.weekly_status.extra_hrs
                        }{" "}
                      </Button>
                      <Button
                        className="mx-1 w-100"
                        style={{ whiteSpace: "nowrap" }}
                        color="danger"
                        onClick={this.resetOverTime}
                      >
                        Reset
                      </Button>
                      <Button
                        className="mx-1 w-100"
                        style={{ whiteSpace: "nowrap" }}
                        outline
                        color="primary"
                      >
                        Total Score : 0
                      </Button>
                      <Button
                        className="mx-1 w-100"
                        style={{ whiteSpace: "nowrap" }}
                        outline
                        color="success"
                      >
                        Employee :{" "}
                        {
                          this.props.employeePerformance.employeePerformance
                            .data.fullname
                        }
                      </Button>
                    </div>
                    <div className="d-flex justify-content-around"></div>
                  </>
                )}

              <Nav tabs className="nav-pills bg-nav-pills nav-justified mt-4">
                {tabContents.map((tab, index) => {
                  return (
                    <NavItem key={index}>
                      <NavLink
                        href="#"
                        className={classnames({
                          active: this.state.activeTab === tab.id,
                        })}
                        onClick={() => {
                          this.toggle(tab.id);
                        }}
                      >
                        <i
                          className={classnames(
                            tab.icon,
                            "d-lg-none",
                            "d-block",
                            "mr-1"
                          )}
                        ></i>
                        <span className="d-none d-lg-block">{tab.title}</span>
                      </NavLink>
                    </NavItem>
                  );
                })}
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <EvaluationCategories
                        data={
                          this.props?.employeePerformance &&
                          this.props?.employeePerformance
                            ?.employeePerformance &&
                          this.props?.employeePerformance?.employeePerformance
                            ?.data !== undefined &&
                          this.props?.employeePerformance?.employeePerformance
                            ?.data
                        }
                        handleWarning={this.handleWarning}
                        handleChangewarning={this.handleChangewarning}
                        warningLevel={this.state.warningLevel}
                      />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12"></Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </CardBody>
        </Card>
        <ToastContainer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employeePerformance: state.Employee,
  };
};

export default connect(mapStateToProps, {
  getEmployeePerformance,
  getEmployeeUpdateMandatory,
  getEmployeeResetOvertime,
  getEmployeeWarning,
})(EmployeePerformance);
