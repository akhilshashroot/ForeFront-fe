// @flow
import React, { Component } from 'react';
import { Row, Col, Card, CardBody, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import LaptopInventory from './tabs/laptop';
import { toast, ToastContainer, Zoom } from "react-toastify"




type InventoryConfigProps = {};

type InventoryConfigState = {
    activeTab?: string,
};
class InventoryConfig extends Component<InventoryConfigProps, InventoryConfigState> {
    constructor(props: InventoryConfigProps) {
        super(props);
        this.state = { activeTab: '1', inv_number:'1' };
        this.toggle = this.toggle.bind(this);
    }

    /**
     * Toggle the tab
     */
    toggle = (tab: string) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
                inv_number:tab
            });
        }
    };

    render() {
 
        const tabContents = [
            {
                id: '1',
                title: 'Laptop',
                icon: 'mdi mdi-home-variant',
                
            },
            {
                id: '2',
                title: 'Desktop',
                icon: 'mdi mdi-account-circle',
                
            },
            {
                id: '3',
                title: 'Keyboard',
                icon: 'mdi mdi-settings-outline',
                
            },
            {
                id: '4',
                title: 'Mouse',
                icon: 'mdi mdi-settings-outline',
                
            },
            {
                id: '5',
                title: 'Miscellaneous',
                icon: 'mdi mdi-settings-outline',
                
            },
        ];
let inv_number = this.state.inv_number;
        return (
            <React.Fragment>
           

                <Row>
               

                    {/* tab justified */}
                    <Col lg={12}>
                        <Card>
                            <CardBody>
                           

                                <Nav tabs className="nav-pills bg-nav-pills nav-justified">
                                    {tabContents.map((tab, index) => {
                                        return (
                                            <NavItem key={index}>
                                                <NavLink
                                                    href="#"
                                                    className={classnames({ active: this.state.activeTab === tab.id })}
                                                    onClick={() => {
                                                        this.toggle(tab.id);
                                                    }}>
                                                    <i
                                                        className={classnames(
                                                            tab.icon,
                                                            'd-lg-none',
                                                            'd-block',
                                                            'mr-1'
                                                        )}></i>
                                                    <span className="d-none d-lg-block">{tab.title}</span>
                                                </NavLink>
                                            </NavItem>
                                        );
                                    })}
                                </Nav>

                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1" >
                                        <Row>
                                            <Col sm="12">
                                       
                                            <LaptopInventory inv_number={inv_number}/>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2" >
                                        <Row>
                                            <Col sm="12">
                                            <LaptopInventory inv_number={inv_number}/>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="3" >
                                        <Row>
                                            <Col sm="12">
                                            <LaptopInventory inv_number={inv_number}/>
                                           
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="4" >
                                        <Row>
                                            <Col sm="12">
                                     
                                            <LaptopInventory inv_number={inv_number}/>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="5" >
                                        <Row>
                                            <Col sm="12">
                                    
                                            <LaptopInventory inv_number={inv_number}/>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                  
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

         
                <ToastContainer />

            </React.Fragment>
        );
    }
}

export default InventoryConfig;
