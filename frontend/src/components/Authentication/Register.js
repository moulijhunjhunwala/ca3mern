import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ErrorComponent from "../ErrorComponent";
import Loading from "../Loading";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { register } from "../../Actions/userAction";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const history = useNavigate();

  useEffect(() => {
    if (userInfo) {
      history("/mynotes");
    }
  }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(register(name,email, password, pic));
    }
  };

  const postPicture = (pics) => {
    if (!pics) {
      return setPicMessage("Please Select an image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "MakeNotes");
      data.append("cloud_name", "dn2r7apz8");
      fetch("https://api.cloudinary.com/v1_1/dn2r7apz8/image/upload", {
        method: "post",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.secure_url);
          setPic(data.secure_url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please select jpeg or png image only");
    }
  };

  return (
    <Container className="Login-Form">
      <h1 className="my-2">Sign Up</h1>
      {error && <ErrorComponent>{error}</ErrorComponent>}
      {message && <ErrorComponent>{message}</ErrorComponent>}
      {loading && <Loading />}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        {picMessage && <ErrorComponent>{picMessage}</ErrorComponent>}
        <Form.Group controlId="pic" className="mb-3">
          <Form.Label>Default file input example</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => postPicture(e.target.files[0])}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Row className="my-2">
        <Col>
          Already a user ?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login here
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
