import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import PageTitle from "../../components/PageTitle";
import TaskerConfig from "./TaskerConfig";
import classnames from "classnames";
import { connect } from "react-redux";
import {
  getEmployeeList,
  getTaskerList,
  getTaskerAdd,
  getTaskerUpdate,
  getTaskerDelete,
} from "../../redux/actions";
import TaskerOthers from "./TaskerOthers";
import { toast, ToastContainer, Zoom } from 'react-toastify';


type TabsProps = {};

type TabsState = {
  activeTab?: string,
};
class Tasker extends React.Component {
  constructor(props: TabsProps) {
    super(props);
    this.state = { activeTab: "1" };
    this.toggle = this.toggle.bind(this);
  }

  state = {
    taskdata: [],
    empdata: [],
  };
  componentDidMount() {
    if (this.props.tasker && !this.props.tasker.tasker) {
      this.props.getTaskerList();
    }
    if (this.props.employee && !this.props.employee.employee) {
      this.props.getEmployeeList();
    }
  }

  componentDidUpdate(prevProps: TabsProps) {
    if (prevProps.tasker.tasker !== this.props.tasker.tasker) {
      if (
        this.props.tasker &&
        this.props.tasker.tasker &&
        this.props.tasker.tasker.data
      ) {
        if (this.state.activeTab === "1") {
          this.setState({
            taskdata: this.props.tasker.tasker.data.taskListOwn,
          });
        }
        if (
          this.props.employee &&
          this.props.employee.employee &&
          this.props.employee.employee.data
        ) {
          let employeedata = this.props.employee.employee.data;
          this.setState({ empdata: employeedata });
        }
      }
    }
  }
  /**
   * Toggle the tab
   */
  toggle = (tab: string) => {
    if (this.state.activeTab !== tab) {
      if (
        this.props.tasker &&
        this.props.tasker.tasker &&
        this.props.tasker.tasker.data
      ) {
        if (tab == "1") {
          this.setState({
            taskdata: this.props.tasker.tasker.data.taskListOwn,
          });
        } else if (tab == "2") {
          this.setState({
            taskdata: this.props.tasker.tasker.data.tasklistOthers,
          });
        }
      }

      this.setState({
        activeTab: tab,
      });
    }
  };

  render() {
    const tabContents = [
      {
        id: "1",
        title: "My Tasks",
        icon: "mdi mdi-home-variant",
      },
      {
        id: "2",
        title: "Other Employee Tasks",
        icon: "mdi mdi-account-circle",
      },
    ];

    return (
      <>
        <PageTitle
          breadCrumbItems={[{ label: "Tasker", active: true }]}
          title={"Tasker"}
        />

        <Row>
          {/* tab justified */}
          <Col sm={12}>
            <Card>
              <CardBody>
                <Nav tabs className="nav-pills bg-nav-pills nav-justified">
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
                        <TaskerConfig
                          taskdata={this.state.taskdata}
                          employees={this.state.empdata}
                          getTaskerDelete={this.props.getTaskerDelete}
                          getTaskerList={this.props.getTaskerList}
                          tasker={this.props.tasker}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="12">
                        <TaskerOthers
                          taskdata={this.state.taskdata}
                          employee={this.props.employee?.employee?.data}
                          getTaskerDelete={this.props.getTaskerDelete}
                          getTaskerList={this.props.getTaskerList}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <ToastContainer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasker: state.Tasker,
    employee: state.Employee,
  };
};
export default connect(mapStateToProps, {
  getTaskerList,
  getTaskerAdd,
  getTaskerUpdate,
  getTaskerDelete,
  getEmployeeList,
})(Tasker);
