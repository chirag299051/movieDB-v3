import React, { useEffect } from "react";
import Search from "../shared/Search";
import { Navbar, Nav } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import axios from "axios";
import { setModal, setUser } from "../store/actions/userActions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { setPage, setTheme } from "../store/actions/appActions";
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Header = () => {
  const dispatch = useDispatch();
  const _user = useSelector((state) => state.user.user);
  const page = useSelector((state) => state.app.page);
  const theme = useSelector((state) => state.app.theme);

  const history = useHistory();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      logout();
      dispatch(setModal("login"));
    } else {
      dispatch(setUser(JSON.parse(user)));
      dispatch(setModal(null));
    }
  }, []);

  const logout = async () => {
    localStorage.clear();
    await axios.post(`${serverUrl}/logout`);
    history.push("/");
    dispatch(setUser(null));
    dispatch(setModal("login"));
  };

  const toggleTheme = () => {
    dispatch(setTheme(theme === "dark" ? "light" : "dark"));
    document.documentElement.classList.add("color-theme-in-transition");
    document.documentElement.setAttribute("data-theme", theme);
    window.setTimeout(() => {
      document.documentElement.classList.remove("color-theme-in-transition");
    }, 1000);
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark">
      <Navbar.Brand as={Link} to="/" className="ms-5">
        <span>
          movieDB <span className="v3">v3</span>
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className=""
        style={{ flexGrow: "0", flexBasis: "100%" }}
      >
        <Nav
          style={{
            fontSize: "1.2em",
          }}
          className="me-5"
        >
          <div className="navLinks">
            <Nav.Link
              eventKey="1"
              as={Link}
              to="/"
              className={page === "home" ? "navLink select" : "navLink"}
              onClick={() => dispatch(setPage("home"))}
            >
              HOME
            </Nav.Link>
            <Nav.Link
              eventKey="2"
              as={Link}
              to="/genres/movie"
              className={page === "movie" ? "navLink select" : "navLink"}
              onClick={() => dispatch(setPage("movie"))}
            >
              MOVIES
            </Nav.Link>
            <Nav.Link
              eventKey="3"
              as={Link}
              to="/genres/tv"
              className={page === "tv" ? "navLink select" : "navLink"}
              onClick={() => dispatch(setPage("tv"))}
            >
              TV SHOWS
            </Nav.Link>
          </div>
          <Search />
          &emsp;&emsp;&emsp;&emsp;
          <Nav.Link eventKey="4" className="navLink" onClick={toggleTheme}>
            THEME {theme === "light" ? <FiSun /> : <FiMoon />}
          </Nav.Link>
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          {!_user ? (
            <Nav.Link
              eventKey="5"
              as={Link}
              to="/"
              onClick={() => dispatch(setModal("login"))}
              className="blue navLink"
            >
              SIGN IN
            </Nav.Link>
          ) : (
            <NavDropdown
              className="blue"
              id="nav-dropdown"
              title={_user.username}
              menuVariant="dark"
            >
              <NavDropdown.Item
                eventKey="6"
                as={Link}
                to={"/profile/" + _user._id}
                className="blue"
              >
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="7" onClick={logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
