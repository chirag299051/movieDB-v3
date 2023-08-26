import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { setModal, setUser } from "../store/actions/userActions";
import Loading from "../shared/Loading";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Signup = (props) => {
  const history = useHistory();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { email, password, username } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) => {
    toast.info(err, {
      icon: "✘",
      theme: "dark",
      closeButton: false,
    });
  };

  const handleSuccess = (msg) =>
    toast.info(msg, {
      icon: "✘",
      theme: "dark",
      closeButton: false,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${serverUrl}/signup`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message, user } = data;
      console.log(user);
      if (user) {
        handleSuccess(message);
        dispatch(setUser(user));
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(setModal(null));

        setTimeout(() => {
          history.push("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    dispatch(setModal(null));
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      signup={props.signup}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Signup</Modal.Title>
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
            <label htmlFor="email">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Enter your username"
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
          <Button type="submit">Submit</Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        {loading ? (
          <Loading />
        ) : (
          <span>
            Already have an account?{" "}
            <Button onClick={props.login}>Login</Button>
          </span>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default Signup;
