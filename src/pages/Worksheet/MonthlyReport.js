import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast, Zoom } from 'react-toastify';
import { CardBody,Card, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import {} from '../../redux/actions';
import MonthlyActivity from './MonthlyActivity';
const emptyAllFields = (msg) => toast.warning(msg, { transition: Zoom });

const MonthlyReport = ({ monthlyReport }) => {
    useEffect(() => {}, []);

    return (
        <Card>
            <CardBody>
                {monthlyReport &&
                    monthlyReport.data &&
                    monthlyReport.data.montly_act &&
                    monthlyReport.data.montly_act.length != 0 && (
                        <div>
                            <h4 className="header-title">Monthly Activities</h4>
                        </div>
                    )}
                <hr />
                {monthlyReport &&
                    monthlyReport.data &&
                    monthlyReport.data.montly_act &&
                    monthlyReport.data.montly_act.length != 0 &&
                    monthlyReport.data.montly_act.map((item, index) => <MonthlyActivity key={index} item={item} emptyAllFields={emptyAllFields}/>)}
            </CardBody>
        </Card>
    );
};

const mapStateToProps = (state) => {
    return {
        monthlyReport: state.Worksheet.monthlyReport,
    };
};
export default connect(mapStateToProps, {})(MonthlyReport);
