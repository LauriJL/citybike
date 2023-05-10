// Packages
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";

// Assets
import Pagination from "./pagination";

const Stations = () => {
  const link = `http://localhost:8000/api/stationlist`;
  const [searchTxt, setSearchTxt] = useState("");
  const [stations, setStations] = useState([]);
  const [count, setCount] = useState(0);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getStations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTxt]);

  const getStations = async () => {
    try {
      const endpoint = `http://localhost:8000/api/stations/?search=${searchTxt}`;
      const response = await axios.get(endpoint);
      setStations(response.data.results);
      setCount(response.data.count);
      setTotalPages(Math.ceil(response.data.count / 16));
      setNextURL(response.data.next);
      setPrevURL(response.data.previous);
      console.log(endpoint);
    } catch (error) {
      return error.response;
    }
  };

  const onClick = (id) => {
    navigate(`station/${id}`);
  };

  return (
    <section className="container mt-4">
      <h3 className="mb-4 mt-4 ml-2">Bike Stations</h3>
      <input
        type="search"
        placeholder="Search stations..."
        value={searchTxt}
        onChange={(e) => setSearchTxt(e.target.value)}
        className="input"
      />
      <br />
      <br />
      <div className="row mb-4">
        {stations.map((station) => (
          <Card
            onClick={() => onClick(station.id)}
            className="station-card"
            key={station.id}
          >
            <Card.Body>
              <Card.Title>{station.name_fi}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {station.name_se}
              </Card.Subtitle>
            </Card.Body>
          </Card>
        ))}
      </div>
      {count > 0 && (
        <Pagination
          link={link}
          count={count}
          totalPages={totalPages}
          next={nextURL}
          previous={prevURL}
          setData={setStations}
        />
      )}
    </section>
  );
};

export default Stations;
