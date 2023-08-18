import React, { useEffect } from "react";
import Search from "../shared/Search";
import { Navbar, Nav } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { setModal, setUser } from "../store/actions/userActions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Header = () => {
  const dispatch = useDispatch();
  const _user = useSelector((state) => state.user.user);

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
      return status ? null : (removeCookie("token"), dispatch(setUser(user)));
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
          }}
          className="me-5"
        >
          <Nav.Link as={Link} to="/genres/movie" className="">
            Movies
          </Nav.Link>
          <Nav.Link as={Link} to="/genres/tv" className="">
            TV Shows
          </Nav.Link>
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          {!_user ? (
            <Nav.Link
              as={Link}
              to="/"
              onClick={() => dispatch(setModal("login"))}
              className="blue"
            >
              Sign In
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
              <NavDropdown.Item as={Link} to="/subscribe">
                Subscribe
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
