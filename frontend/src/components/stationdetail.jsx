// Packages
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

// Assets
import TripsFrom from "./tripsfrom";
import TripsTo from "./tripsto";
import TripsReturn from "./tripsreturn";
import "../css/styles.css";

const StationDetail = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [fromTable, setFromTable] = useState(true);
  const [toTable, setToTable] = useState(false);
  const [returnTable, setReturnTable] = useState(false);

  // URLs
  const baseURLDetails = "http://127.0.0.1:8000/api/stations";
  const baseURLTrips = "http://127.0.0.1:8000/api/";
  const linkDetails = `${baseURLDetails}/${id}`;

  // Get station info
  const getStationDetail = async () => {
    try {
      const response = await axios.get(linkDetails);
      setDetails(response.data);
      console.log(response.data.x_coord);
    } catch (error) {
      return error.response;
    }
  };

  const openFrom = () => {
    setToTable(false);
    setReturnTable(false);
    setFromTable(true);
  };

  const openTo = () => {
    setFromTable(false);
    setReturnTable(false);
    setToTable(true);
  };

  const openReturn = () => {
    setFromTable(false);
    setToTable(false);
    setReturnTable(true);
  };

  useEffect(() => {
    getStationDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Row>
        <Col className="mt-4 address-box">
          <div className="mt-4">
            <h3>{details.name_fi}</h3>
            <h5>{details.name_se}</h5>
            <p>
              {details.address_fi} <br /> {details.city_fi}
            </p>
            <p>Capacity: {details.capacity}</p>
          </div>
        </Col>
        <Col className="mt-4 buttons-box">
          <div className="mt-4">
            {fromTable && (
              <p>
                {" "}
                <Button className="buttons disabled" onClick={() => openFrom()}>
                  Get trips from {details.name_fi}
                </Button>
              </p>
            )}
            {!fromTable && (
              <p>
                {" "}
                <Button className="buttons" onClick={() => openFrom()}>
                  Get trips from {details.name_fi}
                </Button>
              </p>
            )}

            {toTable && (
              <p>
                <Button className="buttons disabled" onClick={() => openTo()}>
                  Get trips to {details.name_fi}
                </Button>
              </p>
            )}
            {!toTable && (
              <p>
                <Button className="buttons" onClick={() => openTo()}>
                  Get trips to {details.name_fi}
                </Button>
              </p>
            )}

            {returnTable && (
              <p>
                <Button
                  className="buttons disabled"
                  onClick={() => openReturn()}
                >
                  Get return trips to {details.name_fi}
                </Button>
              </p>
            )}
            {!returnTable && (
              <p>
                <Button className="buttons" onClick={() => openReturn()}>
                  Get return trips to {details.name_fi}
                </Button>
              </p>
            )}
          </div>
        </Col>
      </Row>
      {fromTable && (
        <TripsFrom id={id} baseURL={baseURLTrips} name={details.name_fi} />
      )}
      {toTable && (
        <TripsTo id={id} baseURL={baseURLTrips} name={details.name_fi} />
      )}
      {returnTable && (
        <TripsReturn id={id} baseURL={baseURLTrips} name={details.name_fi} />
      )}
    </Container>
  );
};

export default StationDetail;
