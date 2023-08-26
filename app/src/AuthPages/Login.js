import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { setModal, setUser } from "../store/actions/userActions";
import Loading from "../shared/Loading";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Login = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) => {
    toast.info(msg, {
      icon: "✘",
      theme: "dark",
      closeButton: false,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${serverUrl}/login`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message, user } = data;
      dispatch(setUser(user));
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setModal(null));
      setLoading(false);

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          history.push("/");
        }, 1000);
        dispatch(setModal(null));
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }

    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      login={props.login}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="modal-title" id="contained-modal-title-vcenter">
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>
          <button type="submit">Submit</button>
          {loading ? (
            <Loading />
          ) : (
            <span>
              Dont have an account?{" "}
              <Button onClick={props.signup}>Signup</Button>
            </span>
          )}
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
