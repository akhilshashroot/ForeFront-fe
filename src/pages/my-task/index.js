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
import TaskerConfig from "./MytaskConfig";
import classnames from "classnames";
import { connect } from "react-redux";
import {
  getEmployeeList,
  getTaskerList,
  getTaskerAdd,
  getTaskerUpdate,
  getTaskerDelete,
  getEmployeeListUser,
  getMytaskList,
  getMytaskAdd,
} from "../../redux/actions";
import TaskerOthers from "./MytaskOthers";
import TaskerCompleted from "./MytaskCompleted";
import LoaderWidget from "../../components/Loader";
import { ToastContainer } from "react-toastify";


class MyTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: "1" };
    this.toggle = this.toggle.bind(this);
  }

  state = {
    taskdata: null,
    empdata: null,
  };
  componentDidMount() {
    if (this.props.employee && !this.props.employee.employee) {
      this.props.getEmployeeListUser();
      // this.props.getMytaskList();
    }
    if (this.props.task && !this.props.task.task) {
      this.props.getMytaskList();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.task.mytask !== this.props.task.mytask) {
      if (
        this.props.task &&
        this.props.task.mytask &&
        this.props.task.mytask.data
      ) {
        this.setState({ taskdata: this.props.task.mytask.data });

        if (
          this.props.employee &&
          this.props.employee.employee &&
          this.props.employee.employee.data
        ) {
          this.setState({ empdata: this.props.employee.employee.data });
        }
      }
    }
  }
  /**
   * Toggle the tab
   */
  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      if (
        this.props.task &&
        this.props.task.task &&
        this.props.task.task.data
      ) {
        this.setState({ taskdata: this.props.task.task.data });
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
        title: "Task Assigned to others",
        icon: "mdi mdi-home-variant",
      },
      {
        id: "2",
        title: "My Task",
        icon: "mdi mdi-account-circle",
      },
      {
        id: "3",
        title: "Task Completed",
        icon: "mdi mdi-account-circle",
      },
    ];

    return (
      <>
        <PageTitle
          breadCrumbItems={[{ label: "Tasker", active: true }]}
          title={"Tasker"}
        />
        {/* {this.props && this.props.task && this.props.task.listloading && <LoaderWidget />} */}
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
                          loading={this.props.task.listloading}
                          employees={this.state.empdata}
                          //   getTaskerDelete={this.props.getTaskerDelete}
                          //   getTaskerList={this.props.getTaskerList}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="12">
                        <TaskerOthers
                          taskdata={this.state.taskdata}
                          loading={this.props.task.listloading}
                          // employees={this.state.empdata}
                          // getTaskerDelete={this.props.getTaskerDelete}
                          // getTaskerList={this.props.getTaskerList}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Col sm="12">
                        <TaskerCompleted
                          taskdata={this.state.taskdata}
                          loading={this.props.task.listloading}
                          // employees={this.state.empdata}
                          // getTaskerDelete={this.props.getTaskerDelete}
                          // getTaskerList={this.props.getTaskerList}
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
    employee: state.Employee,
    task: state.Mytasks,
  };
};
export default connect(mapStateToProps, {
  getTaskerList,
  getTaskerAdd,
  getTaskerUpdate,
  getTaskerDelete,
  getEmployeeList,
  getEmployeeListUser,
  getMytaskList,
  getMytaskAdd,
})(MyTask);
