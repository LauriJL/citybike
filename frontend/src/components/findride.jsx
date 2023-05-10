import React from "react";
import { useState, useEffect } from "react";
import { Container, Form, FormGroup } from "react-bootstrap";
import axios from "axios";

const FindRide = (props) => {
  const [baseUrl, BaseUrl] = useState(`http://localhost:8000/api/`);
  const [stations, setStations] = useState();
  const [origin, setOrigin] = useState(0);
  const [destination, setDestination] = useState(0);

  const getStations = async () => {
    try {
      const response = await axios.get(baseUrl + `stationlist`);
      setStations(response.data);
      console.log(response.data);
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

      console.log(response.data);
    } catch (error) {
      return error.response;
    }
  };

  useEffect(() => {
    getStations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container className="mt-5">
      <select
        onChange={(e) => {
          console.log(e.target.value);
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
      <select
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
      <button onClick={getTrip}>Get</button>
    </Container>
  );
};

export default FindRide;