import React from "react";
import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import axios from "axios";

// Assets
import TimeConversion from "../functions/timeconversion";
import Pagination from "./pagination";

const Trips = () => {
  const link = `http://localhost:8000/api/rides`;
  const [trips, setTrips] = useState([]);
  const [rides, setRides] = useState([]);
  const [count, setCount] = useState(0);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  // const [p1, setP1] = useState("");
  // const [p2, setP2] = useState("");
  // const [params, setParams] = useState([]);

  useEffect(() => {
    getTrips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTrips = async () => {
    try {
      const response = await axios.get(link);
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
    <Container className="mt-5">
      <Row>
        <h4>All Rides ({count})</h4>
      </Row>
      {/* <input
        type="search"
        placeholder="From"
        value={p1}
        onChange={(e) => setP1(e.target.value)}
        className="input"
      />
      <input
        type="search"
        placeholder="To"
        value={p2}
        onChange={(e) => setP2(e.target.value)}
        className="input"
      /> */}
      <Row>
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
                      <td>{item.dep_time}</td>
                      <td>{item.ret_station_name}</td>
                      <td>{item.ret_time}</td>
                      <td>{TimeConversion(item.duration)}</td>
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