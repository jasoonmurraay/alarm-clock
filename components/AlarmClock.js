import React, { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import moment from "moment";

function AlarmClock() {
    const [showModal, setShowModal] = useState(false);
    const [alarms, setAlarms] = useState([]);

    const addAlarm = (alarm) => {
        setAlarms([...alarms, alarm]);
        setShowModal(false);
    };

    const deleteAlarm = (index) => {
        const newAlarms = [...alarms];
        newAlarms.splice(index, 1);
        setAlarms(newAlarms);
    };

    const snoozeAlarm = (index) => {
        const newAlarms = [...alarms];
        newAlarms[index].time = moment().add(10, "minutes");
        setAlarms(newAlarms);
    };

    return (
        <div className="container">
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Add Alarm
            </Button>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Days</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {alarms.map((alarm, index) => (
                        <tr key={index}>
                            <td>{alarm.time.format("LT")}</td>
                            <td>{alarm.days.join(", ")}</td>
                            <td>
                                <Button variant="danger" onClick={() => deleteAlarm(index)}>
                                    Delete
                                </Button>{" "}
                                <Button variant="secondary" onClick={() => snoozeAlarm(index)}>
                                    Snooze
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Alarm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AlarmForm addAlarm={addAlarm} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

function AlarmForm({ addAlarm }) {
    const [time, setTime] = useState(moment());
    const [days, setDays] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        addAlarm({ time, days });
    };

    const handleDayChange = (event) => {
        const selectedDay = event.target.value;
        if (days.includes(selectedDay)) {
            setDays(days.filter((day) => day !== selectedDay));
        } else {
            setDays([...days, selectedDay]);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="time">
                <Form.Label>Time:</Form.Label>
                <Form.Control
                    type="time"
                    value={time.format("HH:mm")}
                    onChange={(event) => setTime(moment(event.target.value, "HH:mm"))}
                />
            </Form.Group>
            <Form.Group controlId="days">
                <Form.Label>Days:</Form.Label>
                <div>
                    <Form.Check
                        inline
                        type="checkbox"
                        label="Sun"
                        value="Sun"
                        checked={days.includes("Sun")}
                        onChange={handleDayChange}
                    />
                    <Form.Check
                        inline
                        type="checkbox"
                        label="Mon"
                        value="Mon"
                        checked={days.includes("Mon")}
                        onChange={handleDayChange} />
                    <Form.Check
                        inline
                        type="checkbox"
                        label="Tue"
                        value="Tue"
                        checked={days.includes("Tue")}
                        onChange={handleDayChange}
                    />
                    <Form.Check
                        inline
                        type="checkbox"
                        label="Wed"
                        value="Wed"
                        checked={days.includes("Wed")}
                        onChange={handleDayChange}
                    />
                    <Form.Check
                        inline
                        type="checkbox"
                        label="Thu"
                        value="Thu"
                        checked={days.includes("Thu")}
                        onChange={handleDayChange}
                    />
                    <Form.Check
                        inline
                        type="checkbox"
                        label="Fri"
                        value="Fri"
                        checked={days.includes("Fri")}
                        onChange={handleDayChange}
                    />
                    <Form.Check
                        inline
                        type="checkbox"
                        label="Sat"
                        value="Sat"
                        checked={days.includes("Sat")}
                        onChange={handleDayChange}
                    />
                </div>
            </Form.Group>
            <Button type="submit">Add Alarm</Button>
        </Form>
    );
}

export default AlarmClock

