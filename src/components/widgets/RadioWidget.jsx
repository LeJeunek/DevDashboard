import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import boombox from "../../assets/boombox.png";

const RadioWidget = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStation, setCurrentStation] = useState(null);
  const [country, setCountry] = useState("US");

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch(
          "https://de1.api.radio-browser.info/json/stations/bytag/jazz"
        );
        if (!response.ok) throw new Error("Failed to fetch stations");
        const data = await response.json();
        setStations(data.slice(0, 12)); // limit to 12 for layout
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  return (
    <Container fluid className="p-3 text-white bg-dark rounded">
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
      </Row>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="light" />
        </div>
      )}

      {error && <p className="text-center text-danger">{error}</p>}

      <Row className="mt-4 g-3">
        {stations.map((station) => (
          <Col key={station.stationuuid} xs={12} sm={6} md={4} lg={3}>
            <Card
              bg="secondary"
              text="white"
              className="h-100"
              onClick={() => setCurrentStation(station)}
            >
              <Card.Img
                variant="top"
                src={station.favicon || "https://via.placeholder.com/150"}
                style={{ height: "100px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title className="fs-6">{station.name}</Card.Title>
                <Card.Text className="text-muted">
                  {station.country || "Unknown Country"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {currentStation && (
        <div className="mt-4 text-center">
          <h5>Now Playing: {currentStation.name}</h5>
          <audio
            controls
            autoPlay
            src={currentStation.url_resolved}
            style={{ width: "100%", maxWidth: "500px" }}
          />
        </div>
      )}
    </Container>
  );
};
export default RadioWidget;
