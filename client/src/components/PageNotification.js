import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function PageNotification() {
    const [showNoti, setShowNoti] = useState(true);
    const toggleShowNoti = () => setShowNoti(!showNoti);


    return (
        <Row className='border-danger w-100'>
            <Col md={6} className="border-danger w-100 mb-2">
                <Button className="border-0 bg-warning w-100 mx-1 mb-2" onClick={() => setShowNoti(true)}>
                    <strong>Click to</strong> Show All Notifications
                </Button>
                <Toast show={showNoti} onClose={toggleShowNoti} className="border-success w-100 mx-1 mb-2">
                    <Toast.Header>
                        <strong className="me-auto"><FontAwesomeIcon icon={faCircleCheck} size="lg" style={{ color: "#96d35f", }} className='mx-3'/>Login</strong>
                        <small>1 min ago</small>
                    </Toast.Header>
                    <Toast.Body>Welcome,You just successfully Loggined!</Toast.Body>
                </Toast>

            </Col>

        </Row>
    );
}

export default PageNotification;