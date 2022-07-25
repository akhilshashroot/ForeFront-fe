import React, { useState } from 'react';
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Select from 'react-select';

const SwapShiftModal = ({ swapShiftModal, swapModal1, team, swapShiftId, getShiftSwap }) => {
    const [shift, setShift] = useState('');
    const [swap, setSwap] = useState('');
    const [date, setDate] = useState('');

    const convertEmployee = (data) => {
        var employeeData = [];
        data &&
            data.forEach((value) => {
                employeeData.push({
                    label: value.fullname,
                    value: value.id,
                });
            });
        return employeeData;
    };

    const swapSubmit = () => {
        let data = {
            shift: shift.label,
            swap: swap.label,
            shiftId: swapShiftId,
            swapDate: date,
        };
        getShiftSwap(data);
        swapModal1();
    };

    return (
        <Modal isOpen={swapShiftModal} toggle={swapModal1} size={'lg'}>
            <ModalHeader toggle={swapModal1}>Swap Shift</ModalHeader>
            <ModalBody>
                <Row className=" justify-content-center">
                    <Col md={6}>
                        <FormGroup>
                            <Label for="team">Shift:</Label>
                            <Select
                                label="team"
                                className="react-select mb-3 w-100"
                                classNamePrefix="react-select"
                                options={convertEmployee(team)}
                                onChange={(e) => setShift(e)}></Select>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="team">Swap With:</Label>
                            <Select
                                label="team"
                                className="react-select mb-3 w-100"
                                classNamePrefix="react-select"
                                options={convertEmployee(team)}
                                onChange={(e) => setSwap(e)}></Select>
                        </FormGroup>
                    </Col>
                    <Col md={12}>
                        <FormGroup>
                            <Label for="exampleDate">Swap date:</Label>
                            <Input
                                type="date"
                                name="date"
                                id="exampleDate"
                                placeholder="date placeholder"
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={swapSubmit}>
                    Swap
                </Button>{' '}
                <Button color="secondary" onClick={swapModal1}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default SwapShiftModal;
