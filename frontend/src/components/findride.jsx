import React from "react";
import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import axios from "axios";

const FindRide = (props) => {
  const baseUrl = `http://localhost:8000/api/`;
  const [stations, setStations] = useState();
  const [origin, setOrigin] = useState(0);
  const [destination, setDestination] = useState(0);

  const getStations = async () => {
    try {
      const response = await axios.get(baseUrl + `stationlist`);
      setStations(response.data);
      setOrigin(response.data[0].id);
      setDestination(response.data[0].id);
      console.log("stationlist: ", response.data[0].id);
      // console.log("first station in list", stations[0].id);
    } catch (error) {
      return error.response;
    }
  };

  const getTrip = async () => {
    try {
      let link = baseUrl + `rides/${origin}&${destination}`;
      console.log("link: ", link);
      const response = await axios.get(link);
      props.setTrips(response.data.results);
      props.setCount(response.data.count);
      props.setTotalPages(Math.ceil(response.data.count / 16));
      props.setNextURL(response.data.next);
      props.setPrevURL(response.data.previous);
      setOrigin(stations[0].id);
      setDestination(stations[0].id);
      console.log(response.data);
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
    <Container className="mt-2 left-align">
      <h5 className="left-align">Search for trips</h5>
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
          console.log(e.target.value);
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
    </Container>
  );
};

export default FindRide;
