import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import "./LandingPage.css";
import {Link, useNavigate} from 'react-router-dom';

const LandingPage = () => {
  
  const history  = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if(userInfo){
      history("/mynotes");
    }

  }, [history])
  
  return (
    <div className="main">
      <Container>
        <Row>
        <div className="intro-text mb-5">
          <h1 className="text-center intro-text">Welcome to the MakeNotes</h1>
        </div>
        <div className="d-flex flex-row justify-content-evenly align-items-center mt-5">
        <div className="d-flex flex-row justify-content-evenly align-items-center ">
          <Link to="/register">
          <button className="btn btn-danger">
            Signup
          </button>
          </Link>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <Link to="/login">
          <button className="btn btn-danger">
            Login
          </button>
          </Link>
        </div>
        </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
