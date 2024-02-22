import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function YearCalendar({ commitData }) {
  const daysInYear = 365; // Adjust for leap years if needed

  return (
    <Container>
      <Row>
        {Array.from({ length: daysInYear }, (_, i) => (
          <Col key={i} style={{ backgroundColor: commitData[i] ? 'green' : 'lightgray' }}>
            {i + 1}
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default YearCalendar