// Packages
import React from "react";
import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import axios from "axios";

// Assets
import DurationConversion from "../functions/durationconversion";
import TimestampConversion from "../functions/timestampconversion";
import Pagination from "./pagination";

const TripsReturn = (props) => {
  const link = `${props.baseURL}return/${props.id}`;
  const [tripsReturn, setTripsReturn] = useState([]);
  const [count, setCount] = useState(0);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  // Get all return trips to the station
  const getReturn = async () => {
    try {
      const response = await axios.get(link);
      console.log("response tripsto: ", response);
      setTripsReturn(response.data.results);
      setCount(response.data.count);
      setTotalPages(Math.ceil(response.data.count / 16));
      setNextURL(response.data.next);
      setPrevURL(response.data.previous);
    } catch (error) {
      return error.response;
    }
  };

  useEffect(() => {
    getReturn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <h4>
          Return trips to {props.name} (total {count} trips)
        </h4>
      </Row>
      <Row>
        <div className="row">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Departure time from {props.name}</th>
                  <th>Return time at {props.name}</th>
                  <th>Duration</th>
                  <th>Distance</th>
                </tr>
              </thead>
              <tbody>
                {tripsReturn.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{TimestampConversion(item.dep_time)}</td>
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
          setData={setTripsReturn}
        />
      )}
    </Container>
  );
};

export default TripsReturn;
