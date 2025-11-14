import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, Spinner, Form } from "react-bootstrap";
import boombox from "../../assets/boombox.png";
import placeholder from "../../assets/station-placeholder.png";
import "./RadioWidget.css";

const RadioWidget = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStation, setCurrentStation] = useState(null);
  const [country, setCountry] = useState("US");
  const [volume, setVolume] = useState(0.5);
  const [genre, setGenre] = useState("jazz");

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume, currentStation]);
  useEffect(() => {
    const fetchStations = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/radio/${genre}?country=${country}`);
        if (!response.ok) throw new Error("Failed to fetch stations");
        const data = await response.json();

        // Shuffle helper
        const shuffle = (array) => {
          const arr = [...array];
          for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
          return arr;
        };

        let shuffled = shuffle(data);

        // If there's a current station, make sure it's visible in the new 12
        if (currentStation) {
          const exists = shuffled.find(
            (s) => s.stationuuid === currentStation.stationuuid
          );
          if (!exists) {
            shuffled = [currentStation, ...shuffled];
          }
        }

        // Limit to 12 for layout
        const limited = shuffled.slice(0, 12);
        setStations(limited);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, [genre, country]);

  return (
    <Container
      fluid
      className="p-3 text-white bg-dark rounded"
      style={{ height: "100vh" }}
    >
      <h3>Radio Widget</h3>

      <Row className="mt-3 d-flex align-items-center justify-content-center flex-column">
        <Col md={6} offset={6} className="text-center">
          <div className="radio-image">
            <img
              src={boombox}
              alt="Radio Icon"
              style={{ width: "250px", height: "250px" }}
            />
          </div>
        </Col>
      </Row>
      <Row className="mt-3 g-2 justify-content-center">
        <Col xs={6} sm={4} md={3}>
          <Form.Select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="jazz">Jazz</option>
            <option value="rock">Rock</option>
            <option value="classical">Classical</option>
            <option value="pop">Pop</option>
          </Form.Select>
        </Col>
        <Col xs={6} sm={4} md={3}>
          <Form.Select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="FR">France</option>
          </Form.Select>
        </Col>
      </Row>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="light" />
        </div>
      )}
      {error && <p className="text-center text-danger">{error}</p>}
      {currentStation && (
        <div className="mt-4 text-center g-2">
          <h5>Now Playing: {currentStation.name}</h5>
          <audio ref={audioRef} autoPlay src={currentStation.url_resolved} />
        </div>
      )}
      <div className="btn-control-group mt-3 text-center">
        <button onClick={() => audioRef.current.play()}>▶</button>
        <button onClick={() => audioRef.current.pause()}>⏸</button>
        <button
          onClick={() => {
            setStations((prev) => {
              const arr = [...prev];
              for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
              }

              // Keep the current station visible
              if (
                currentStation &&
                !arr.find((s) => s.stationuuid === currentStation.stationuuid)
              ) {
                arr[0] = currentStation;
              }
              return arr;
            });
          }}
        >
          ↻
        </button>
      </div>
      <input
        type="range"
        className="volume-control mx-auto mt-2"
        min={0}
        max={1}
        step={0.1}
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
      />
      <Row className="mt-4 g-3 justify-content-center align-items-center ms-5">
        {stations.map((station) => (
          <Col
            key={station.stationuuid}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="ms-5"
          >
            <Card
              bg="secondary"
              text="white"
              className="h-100 cursor-pointer"
              onClick={() => setCurrentStation(station)}
              style={{ cursor: "pointer" }}
            >
              <Card.Img
                className="w-100"
                variant="top"
                src={station.favicon || placeholder}
                style={{
                  height: "100px",
                  objectFit: "cover",
                  backgroundColor: "#333",
                }}
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
    </Container>
  );
};
export default RadioWidget;
