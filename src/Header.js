import React from "react";
import Search from "./Search";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { context } from "./context";

const Header = () => {
  const { favorites } = React.useContext(context);

  return (
    <Navbar expand="lg" variant="dark">
      <Navbar.Brand as={Link} to="/" className="ms-5">
        {/* <img src={logo} style={icon} className="icon" href="#" /> */}
        <span>movieDB v3</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className=""
        style={{ flexGrow: "0", flexBasis: "100%" }}
      >
        <Search />
        <Nav
          style={{
            fontSize: "1.2em",
            // float: "right",
          }}
          className="me-5"
        >
          <Nav.Link as={Link} to="/genres/movie" className="">
            Movies
          </Nav.Link>
          <Nav.Link as={Link} to="/genres/tv" className="">
            TV Shows
          </Nav.Link>
          <Nav.Link as={Link} to="/favorite" className="">
            Favorite{" "}
            <Badge
              pill
              bg="danger"
              style={{
                fontSize: "11px",
                position: "relative",
                bottom: "2px",
                color: "aliceblue",
              }}
            >
              {favorites.length}
            </Badge>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
