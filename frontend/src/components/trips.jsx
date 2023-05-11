import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

// Assets
import DurationConversion from "../functions/durationconversion";
import TimestampConversion from "../functions/timestampconversion";
import Pagination from "./pagination";

const Trips = () => {
  const [link, setLink] = useState(`http://localhost:8000/api/rides/`);
  const [loading, setLoading] = useState(false);
  const [trips, setTrips] = useState([]);
  const [count, setCount] = useState(0);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getTrips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTrips = async () => {
    try {
      const response = await axios.get(link);
      setLoading(true);
      setTrips(response.data.results);
      setCount(response.data.count);
      setTotalPages(Math.ceil(response.data.count / 16));
      setNextURL(response.data.next);
      setPrevURL(response.data.previous);
    } catch (error) {
      return error.response;
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4 mt-4 ml-2">All Bike Trips (total {count})</h3>
      {loading ? (
        <Row className="mt-5">
          <div className="row">
            <div className="table-responsive">
              <Table striped bordered hover className="table">
                <thead>
                  <tr>
                    <th>Origin</th>
                    <th>Departure time</th>
                    <th>Destination</th>
                    <th>Arrival time</th>
                    <th>Duration</th>
                    <th>Distance</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.dep_station_name}</td>
                        <td>{TimestampConversion(item.dep_time)}</td>
                        <td>{item.ret_station_name}</td>
                        <td>{TimestampConversion(item.ret_time)}</td>
                        <td>{DurationConversion(item.duration)}</td>
                        <td>{(item.dist / 1000).toFixed(2)} km</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </Row>
      ) : (
        <Spinner animation="border" />
      )}
      {count > 0 && (
        <Pagination
          link={link}
          count={count}
          totalPages={totalPages}
          next={nextURL}
          previous={prevURL}
          setData={setTrips}
          setLoading={setLoading}
        />
      )}
    </Container>
  );
};

export default Trips;
