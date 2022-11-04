import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import Loading from "../Loading";
import ErrorComponent from "../ErrorComponent";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Actions/userAction";

const Login = () => {
  const [email , setEmail ] = useState("");
  const [password , setPassword ] = useState("");
  
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { error, loading, userInfo} = userLogin; 

  const history  = useNavigate();

  useEffect(() => {
   // const userInfo = localStorage.getItem("userInfo");

    if(userInfo){
      history("/mynotes");
    }

  }, [history, userInfo]);

  const submitHandler = async(e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  return (
    <Container className="Login-Form">
      <h1 className="my-2">Login Form</h1>
      {loading && <Loading/>}
      {error && <ErrorComponent variant="danger">{error}</ErrorComponent>}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email}  onChange={(e) => setEmail(e.target.value)} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Row className="my-3">
          <Col>New User ? <Link to="/register" style={{textDecoration : 'none'}}>Sign Up Here</Link></Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Login;
