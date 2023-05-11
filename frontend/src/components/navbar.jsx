// Packages
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
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
          <NavDropdown title="Bike Trips" id="basic-nav-dropdown">
            <NavDropdown.Item href="/findride">
              Search Bike Trips
            </NavDropdown.Item>
            <NavDropdown.Item href="/allrides">All Bike Trips</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
