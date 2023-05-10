// Packages
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import React from "react";

// Assets
import "../css/styles.css";

const NavBar = () => {
  return (
    <Navbar className="navbar-color">
      <Container>
        <Navbar.Brand className="navbar-brand" href="/">
          CityBike
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link className="nav-link" href="/">
            Bike Stations
          </Nav.Link>
          <Nav.Link href="/trips">All Rides</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
