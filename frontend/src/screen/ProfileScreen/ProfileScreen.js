import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorComponent from "../../components/ErrorComponent";
import {useNavigate} from 'react-router-dom';
import Loading from "../../components/Loading";
import { updateProfile } from "../../Actions/userAction";
import './ProfileScreen.css';

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;
  const Navigate = useNavigate();
  
  useEffect(()=>{
    if(!userInfo) {
      Navigate("/")
    }
    else{
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  },[Navigate,userInfo])

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

  const submitHandler = (e) => {
    e.preventDefault();
    if(password === confirmPassword){
      dispatch(updateProfile({ name, Email, password, pic }));
    }
  }

  return (
    <MainScreen title="EDIT PROFILE">
      <div>
        <Row className="profileContainer">
          <Col md={12} lg={12} xl={6}>
            <Form onSubmit={submitHandler}>
            {loading && <Loading />}
            {success && (<ErrorComponent variant="success"> Updated Successfully</ErrorComponent>)}
            {error && (<ErrorComponent variant="danger">{error}</ErrorComponent>)}
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-2"
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-2"
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mb-2"
                ></Form.Control>
                 </Form.Group>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mb-2"
                  ></Form.Control>
                </Form.Group>{" "}
                {picMessage && <ErrorComponent variant="danger">{picMessage}</ErrorComponent>}
                <Form.Group>
                    <Form.Label>
                      Change Profile Picture
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => postPicture(e.target.files[0])}
                      type="file"
                      id="custom-file"
                      label="Upload Profile Picture"
                      accept=".png, .jpg"
                      className="mb-3"
                    />
                </Form.Group>
                <Button type="submit" variant="danger">
                  Update
                </Button>
            </Form>
          </Col>
          <Col 
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} width="450" height="450"/>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
