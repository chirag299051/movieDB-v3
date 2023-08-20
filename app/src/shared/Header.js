import React, { useEffect } from "react";
import Search from "../shared/Search";
import { Navbar, Nav, Button } from "react-bootstrap";
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

  const [cookies, removeCookie] = useCookies([]);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        dispatch(setModal("login"));
      }
      const { data } = await axios.post(
        `${serverUrl}`,
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      console.log("_user :", _user);
      console.log("DATA: ", data);
      return status && (removeCookie("token"), dispatch(setUser(user)));
    };
    verifyCookie();
  }, [cookies, removeCookie, dispatch]);

  useEffect(() => {
    if (cookies.token) {
      dispatch(setModal(false));
    }
  }, [cookies, dispatch]);

  const logout = async () => {
    await axios.post(`${serverUrl}/logout`);

    removeCookie("token");
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
    <Navbar expand="lg" variant="dark">
      <Navbar.Brand as={Link} to="/" className="ms-5">
        <span>movieDB v3</span>
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
              as={Link}
              to="/"
              className={page === "home" ? "navLink select" : "navlink"}
              onClick={() => dispatch(setPage("home"))}
            >
              HOME
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/genres/movie"
              className={page === "movie" ? "navLink select" : "navlink"}
              onClick={() => dispatch(setPage("movie"))}
            >
              MOVIES
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/genres/tv"
              className={page === "tv" ? "navLink select" : "navlink"}
              onClick={() => dispatch(setPage("tv"))}
            >
              TV SHOWS
            </Nav.Link>
          </div>
          <Search />
          &emsp;&emsp;&emsp;&emsp;
          <Nav.Link className="navLinks" onClick={toggleTheme}>
            THEME {theme === "light" ? <FiSun /> : <FiMoon />}
          </Nav.Link>
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          {!_user ? (
            <Nav.Link
              as={Link}
              to="/"
              onClick={() => dispatch(setModal("login"))}
              className="blue"
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
                as={Link}
                to={"/profile/" + _user._id}
                className="blue"
              >
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
