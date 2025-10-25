import { Col, Container, Row } from "react-bootstrap";
import boombox from "../../assets/boombox.png";

const RadioWidget = () => {
  return (
    <Container className="p-3 text-white bg-dark rounded">
      <h3>Radio Widget</h3>
      <Row className="mt-3 d-flex align-items-center justify-content-center flex-column">
        <Col md={6} offset={6} className="text-center">
          <div className="radio-image">
            <img
              src={boombox}
              alt="Radio Icon"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
        </Col>
        <Col md={6} offset={6} className="mt-3 text-center">
          <div className="radio-controls">
            <button className="btn btn-primary me-2">Play</button>
            <button className="btn btn-secondary me-2">Pause</button>
            <button className="btn btn-danger">Stop</button>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6} offset={6} className="text-center">
          <div className="radio-list ">
            <ul>
              <li>Station 1: Jazz FM</li>
              <li>Station 2: Rock Nation</li>
              <li>Station 3: Classic Hits</li>
              <li>Station 4: News Radio</li>
              <li>Station 5: Pop Central</li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default RadioWidget;
