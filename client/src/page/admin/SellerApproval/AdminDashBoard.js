import { faCheck, faClock, faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminDashboard = (props) => {
  const [pending, setPending] = useState(0);
  const [approved, setApproved] = useState(0);
  const [rejected, setRejected] = useState(0);

  const calculateStatus = () => {
    let approvedCount = 0;
    let rejectedCount = 0;
    let pendingCount = 0;

    props.sellers.forEach((s) => {
      if (s.sellerStatus === "Approved") {
        approvedCount += 1;
      } else if (s.sellerStatus === "Rejected") {
        rejectedCount += 1;
      } else {
        pendingCount += 1;
      }
    });
    setApproved(approvedCount);
    setRejected(rejectedCount);
    setPending(pendingCount);
  };

  useEffect(() => {
    calculateStatus();
  }, [props.sellers]);

  return (
    <Container fluid className="mb-5">
      <Row>
        <Col md={12} className="content">
          {/* Main Content */}

          <Row>
            <Col md={4}>
              <Card className="border-warning text-warning text-center">
                <Card.Body>
                  <Card.Title>
                    <FontAwesomeIcon icon={faClock} className="mx-1" />
                    Pending...
                  </Card.Title>
                  <Card.Text>{pending === 0 ? "..." : pending}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-danger text-danger text-center">
                <Card.Body>
                  <Card.Title>
                    <FontAwesomeIcon icon={faXmark} className="mx-1" />
                    Rejected
                  </Card.Title>
                  <Card.Text>{rejected === 0 ? "..." : rejected}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-success text-success text-center">
                <Card.Body>
                  <Card.Title>
                    <FontAwesomeIcon icon={faCheck} className="mx-1" />
                    Approved
                  </Card.Title>
                  <Card.Text>{approved === 0 ? "..." : approved}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
