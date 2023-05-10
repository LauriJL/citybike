import React from "react";
import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import axios from "axios";

// Assets
import DurationConversion from "../functions/durationconversion";
import TimestampConversion from "../functions/timestampconversion";
import Pagination from "./pagination";
import FindRide from "./findride";

const Trips = () => {
  // const link = `http://localhost:8000/api/rides`;
  const [link, setLink] = useState(`http://localhost:8000/api/rides`);
  const [trips, setTrips] = useState([]);
  const [count, setCount] = useState(0);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [depStation, setDepStation] = useState("");

  useEffect(() => {
    getTrips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTrips = async () => {
    try {
      const response = await axios.get(link);
      setTrips(response.data.results);
      console.log("dep: ", response.data.results[0].dep_station_name);
      setDepStation(response.data.results[0].dep_station_name);
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
      <h3 className="mb-4 mt-4 ml-2">Bike Trips</h3>
      {count < 1 && <h4>No trips found.</h4>}
      {count > 0 && (
        <Row>
          <h4>{count} trips</h4>
        </Row>
      )}
      <FindRide
        setTrips={setTrips}
        setTotalPages={setTotalPages}
        setNextURL={setNextURL}
        setPrevURL={setPrevURL}
        setCount={setCount}
      />
      <Row className="mt-5">
        <div className="row">
          <div className="table-responsive">
            <table className="table">
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
            </table>
          </div>
        </div>
      </Row>
      {count > 0 && (
        <Pagination
          link={link}
          count={count}
          totalPages={totalPages}
          next={nextURL}
          previous={prevURL}
          setData={setTrips}
        />
      )}
    </Container>
  );
};

export default Trips;
