//Packages
import React from "react";
import { useState, useEffect } from "react";
import { Container, Button, Row, Table } from "react-bootstrap";
import axios from "axios";

// Assets
import DurationConversion from "../functions/durationconversion";
import TimestampConversion from "../functions/timestampconversion";
import Pagination from "./pagination";

const FindRide = (props) => {
  // const baseUrl = `http://localhost:8000/api/`;
  const [stations, setStations] = useState();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [trips, setTrips] = useState([]);
  const [count, setCount] = useState(0);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState(false);
  const [link, setLink] = useState(`http://localhost:8000/api/rides`);
  const [paginationLink, setPaginationLink] = useState();

  const getStations = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/stationlist`);
      setStations(response.data);
      setOrigin(response.data[0].id);
      setDestination(response.data[0].id);
    } catch (error) {
      return error.response;
    }
  };

  const getTrip = async () => {
    try {
      const response = await axios.get(link + `/${origin}&${destination}`);
      setPaginationLink(link + `/${origin}&${destination}`);
      setTrips(response.data.results);
      setCount(response.data.count);
      setTotalPages(Math.ceil(response.data.count / 16));
      setNextURL(response.data.next);
      setPrevURL(response.data.previous);
      setOrigin(stations[0].name_fi);
      setDestination(stations[0].name_fi);
      setSearch(true);
    } catch (error) {
      return error.response;
    }
  };

  const resetTrips = () => {
    window.location.reload();
  };

  useEffect(() => {
    getStations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container className="mt-4">
      <div className="buttons-box">
        <h3 className="mb-4 mt-4 ml-2">Search Bike Trips</h3>
        <label className="input-label">From: </label>
        <select
          className="input"
          onChange={(e) => {
            setOrigin(e.target.value);
          }}
        >
          {stations &&
            stations.map((station) => {
              return (
                <option key={station.id} value={station.id}>
                  {station.name_fi}
                </option>
              );
            })}
        </select>
        <label className="input-label">To: </label>
        <select
          className="input"
          onChange={(e) => {
            setDestination(e.target.value);
          }}
        >
          {stations &&
            stations.map((station) => {
              return (
                <option key={station.id} value={station.id}>
                  {station.name_fi}
                </option>
              );
            })}
        </select>
        <Button className="btn btn-success input-button" onClick={getTrip}>
          Get Trips
        </Button>
        <Button className="btn btn-warning" onClick={resetTrips}>
          Reset
        </Button>
      </div>
      {search && (
        <Row className="mt-5">
          <div className="row">
            <h5>
              <b>{count}</b> trips found
            </h5>

            <div className="table-responsive mt-2">
              <Table striped bordered hover>
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
      )}
      {count > 0 && (
        <Pagination
          link={paginationLink}
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

export default FindRide;
