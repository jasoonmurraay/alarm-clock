import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const options = { hour: "numeric", minute: "numeric" };

    return (
        <Container className="text-center mt-5">
            <h1>{time.toLocaleTimeString([], options)}</h1>
        </Container>
    );
}

export default Clock;
